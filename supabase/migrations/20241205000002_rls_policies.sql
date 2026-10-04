-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin/operator
CREATE OR REPLACE FUNCTION is_admin_user(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.user_id = is_admin_user.user_id 
        AND role IN ('ADMIN', 'OPERATOR', 'ANALYST')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (is_admin_user(auth.uid()));

-- Admins can update any profile
CREATE POLICY "Admins can update any profile" ON profiles
    FOR UPDATE USING (is_admin_user(auth.uid()));

-- TEAMS POLICIES (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view teams" ON teams
    FOR SELECT USING (auth.role() = 'authenticated');

-- REPORTS POLICIES
-- Users can view their own reports
CREATE POLICY "Users can view own reports" ON reports
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own reports
CREATE POLICY "Users can insert own reports" ON reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reports (limited fields)
CREATE POLICY "Users can update own reports" ON reports
    FOR UPDATE USING (
        auth.uid() = user_id 
        AND status IN ('RECEIVED', 'ANALYZING')
    );

-- Admins can view all reports
CREATE POLICY "Admins can view all reports" ON reports
    FOR SELECT USING (is_admin_user(auth.uid()));

-- Admins can update any report
CREATE POLICY "Admins can update all reports" ON reports
    FOR UPDATE USING (is_admin_user(auth.uid()));

-- REPORT TELEMETRY POLICIES
-- Users can view telemetry for their own reports
CREATE POLICY "Users can view own report telemetry" ON report_telemetry
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE reports.id = report_telemetry.report_id 
            AND reports.user_id = auth.uid()
        )
    );

-- Users can insert telemetry for their own reports
CREATE POLICY "Users can insert own report telemetry" ON report_telemetry
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE reports.id = report_telemetry.report_id 
            AND reports.user_id = auth.uid()
        )
    );

-- Admins can view all telemetry
CREATE POLICY "Admins can view all telemetry" ON report_telemetry
    FOR SELECT USING (is_admin_user(auth.uid()));

-- AI ANALYSIS POLICIES
-- Users can view AI analysis for their own reports
CREATE POLICY "Users can view own AI analysis" ON ai_analysis
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE reports.id = ai_analysis.report_id 
            AND reports.user_id = auth.uid()
        )
    );

-- Only system/admins can insert AI analysis
CREATE POLICY "Admins can insert AI analysis" ON ai_analysis
    FOR INSERT WITH CHECK (is_admin_user(auth.uid()));

-- Admins can view all AI analysis
CREATE POLICY "Admins can view all AI analysis" ON ai_analysis
    FOR SELECT USING (is_admin_user(auth.uid()));

-- REPORT STATUS HISTORY POLICIES
-- Users can view status history for their own reports
CREATE POLICY "Users can view own report status history" ON report_status_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE reports.id = report_status_history.report_id 
            AND reports.user_id = auth.uid()
        )
    );

-- System can insert status history (triggered automatically)
CREATE POLICY "System can insert status history" ON report_status_history
    FOR INSERT WITH CHECK (true);

-- Admins can view all status history
CREATE POLICY "Admins can view all status history" ON report_status_history
    FOR SELECT USING (is_admin_user(auth.uid()));

-- NOTIFICATIONS POLICIES
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- System can insert notifications
CREATE POLICY "System can insert notifications" ON notifications
    FOR INSERT WITH CHECK (true);

-- Admins can view all notifications
CREATE POLICY "Admins can view all notifications" ON notifications
    FOR SELECT USING (is_admin_user(auth.uid()));

-- ATTACHMENTS POLICIES
-- Users can view attachments for their own reports
CREATE POLICY "Users can view own report attachments" ON attachments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE reports.id = attachments.report_id 
            AND reports.user_id = auth.uid()
        )
    );

-- Users can insert attachments for their own reports
CREATE POLICY "Users can insert own report attachments" ON attachments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM reports 
            WHERE reports.id = attachments.report_id 
            AND reports.user_id = auth.uid()
        )
    );

-- Admins can view all attachments
CREATE POLICY "Admins can view all attachments" ON attachments
    FOR SELECT USING (is_admin_user(auth.uid()));

-- AUDIT LOGS POLICIES
-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (is_admin_user(auth.uid()));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- Function to create profile after user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        'CUSTOMER'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile after signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage buckets (run this after setting up Supabase project)
-- This will be handled in the setup instructions