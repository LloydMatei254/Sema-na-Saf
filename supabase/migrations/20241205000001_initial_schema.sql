-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'ADMIN', 'ANALYST', 'OPERATOR');
CREATE TYPE report_category AS ENUM ('NETWORK', 'MPESA', 'BILLING', 'APP_UX', 'FEATURE_REQUEST', 'OTHER');
CREATE TYPE report_severity AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE report_status AS ENUM ('RECEIVED', 'ANALYZING', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED');
CREATE TYPE input_type AS ENUM ('TEXT', 'VOICE');

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'CUSTOMER',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    department TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default teams
INSERT INTO teams (name, description, department) VALUES
    ('NOC / Radio Planning', 'Network Operations Center and Radio Planning Team', 'Network Operations'),
    ('FinTech / Customer Care', 'Financial Technology and M-PESA Support Team', 'Financial Services'),
    ('Billing / Customer Care', 'Billing Issues and Account Management Team', 'Customer Service'),
    ('Digital Product & Design', 'Mobile App and Digital Experience Team', 'Product Development'),
    ('Product Innovation', 'New Features and Product Enhancement Team', 'Innovation'),
    ('Customer Care', 'General Customer Support Team', 'Customer Service');

-- Create sequence for ticket numbers
CREATE SEQUENCE ticket_number_seq START 1;

-- Create function to generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'SEM-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(nextval('ticket_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create reports table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_number TEXT UNIQUE NOT NULL DEFAULT generate_ticket_number(),
    user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
    category report_category DEFAULT 'OTHER',
    subcategory TEXT,
    description TEXT NOT NULL,
    input_type input_type DEFAULT 'TEXT',
    severity report_severity DEFAULT 'MEDIUM',
    status report_status DEFAULT 'RECEIVED',
    location_name TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    network_type TEXT,
    assigned_team_id UUID REFERENCES teams(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Create report_telemetry table
CREATE TABLE report_telemetry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE NOT NULL,
    network_type TEXT,
    signal_strength NUMERIC,
    latency_ms INTEGER,
    cell_id TEXT,
    device_model TEXT,
    os_version TEXT,
    app_screen TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ai_analysis table
CREATE TABLE ai_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE NOT NULL,
    category report_category NOT NULL,
    subcategory TEXT,
    severity report_severity NOT NULL,
    confidence NUMERIC CHECK (confidence >= 0 AND confidence <= 1) NOT NULL,
    sentiment TEXT,
    summary TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    assigned_team_id UUID REFERENCES teams(id),
    model TEXT NOT NULL,
    raw_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create report_status_history table
CREATE TABLE report_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE NOT NULL,
    status report_status NOT NULL,
    changed_by UUID REFERENCES profiles(user_id),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE NOT NULL,
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create attachments table
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_severity ON reports(severity);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_assigned_team ON reports(assigned_team_id);
CREATE INDEX idx_reports_location ON reports(location_name);

CREATE INDEX idx_telemetry_report_id ON report_telemetry(report_id);
CREATE INDEX idx_ai_analysis_report_id ON ai_analysis(report_id);
CREATE INDEX idx_status_history_report_id ON report_status_history(report_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_attachments_report_id ON attachments(report_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Create views for dashboard
CREATE VIEW dashboard_summary AS
SELECT 
    COUNT(*) as total_reports,
    COUNT(*) FILTER (WHERE status != 'RESOLVED') as open_reports,
    COUNT(*) FILTER (WHERE severity = 'CRITICAL') as critical_reports,
    COUNT(*) FILTER (WHERE status = 'RESOLVED') as resolved_reports,
    COALESCE(AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600)::NUMERIC, 0) as avg_resolution_time
FROM reports;

CREATE VIEW reports_with_analysis AS
SELECT 
    r.id,
    r.ticket_number,
    p.full_name as user_name,
    auth.email as user_email,
    r.category::TEXT,
    r.subcategory,
    r.description,
    r.severity::TEXT,
    r.status::TEXT,
    r.location_name,
    t.name as assigned_team,
    ai.confidence as ai_confidence,
    ai.summary as ai_summary,
    r.created_at,
    r.updated_at,
    r.resolved_at
FROM reports r
LEFT JOIN profiles p ON r.user_id = p.user_id
LEFT JOIN auth.users auth ON r.user_id = auth.id
LEFT JOIN teams t ON r.assigned_team_id = t.id
LEFT JOIN ai_analysis ai ON r.id = ai.report_id;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create status history
CREATE OR REPLACE FUNCTION create_status_history()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
        INSERT INTO report_status_history (report_id, status, changed_by, comment)
        VALUES (NEW.id, NEW.status, NEW.user_id, 
                CASE 
                    WHEN TG_OP = 'INSERT' THEN 'Report created'
                    ELSE 'Status changed from ' || OLD.status || ' to ' || NEW.status
                END);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic status history
CREATE TRIGGER create_report_status_history
    AFTER INSERT OR UPDATE OF status ON reports
    FOR EACH ROW EXECUTE FUNCTION create_status_history();

-- Function to create notification when report status changes
CREATE OR REPLACE FUNCTION create_status_notification()
RETURNS TRIGGER AS $$
DECLARE
    notification_title TEXT;
    notification_message TEXT;
BEGIN
    IF TG_OP = 'INSERT' THEN
        notification_title := 'Report Received';
        notification_message := 'Your report ' || NEW.ticket_number || ' has been received and is being processed.';
    ELSIF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
        CASE NEW.status
            WHEN 'ANALYZING' THEN
                notification_title := 'Report Being Analyzed';
                notification_message := 'Your report ' || NEW.ticket_number || ' is being analyzed by our AI system.';
            WHEN 'ASSIGNED' THEN
                notification_title := 'Report Assigned';
                notification_message := 'Your report ' || NEW.ticket_number || ' has been assigned to the relevant team.';
            WHEN 'IN_PROGRESS' THEN
                notification_title := 'Report In Progress';
                notification_message := 'Work has started on your report ' || NEW.ticket_number || '.';
            WHEN 'RESOLVED' THEN
                notification_title := 'Report Resolved';
                notification_message := 'Your report ' || NEW.ticket_number || ' has been resolved. Thank you for your feedback.';
        END CASE;

        INSERT INTO notifications (user_id, report_id, title, message, type)
        VALUES (NEW.user_id, NEW.id, notification_title, notification_message, 'status_update');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status notifications
CREATE TRIGGER create_report_status_notification
    AFTER INSERT OR UPDATE OF status ON reports
    FOR EACH ROW EXECUTE FUNCTION create_status_notification();