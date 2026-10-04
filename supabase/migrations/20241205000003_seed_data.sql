-- Seed demo data for the hackathon
-- This creates realistic demo reports and data for demonstration

-- First, let's create some demo users (profiles)
-- Note: These will be linked to actual auth users created through the app

-- Demo reports with realistic Kenyan locations and issues
INSERT INTO reports (
    ticket_number,
    user_id, 
    category,
    subcategory,
    description,
    input_type,
    severity,
    status,
    location_name,
    latitude,
    longitude,
    network_type,
    created_at
) VALUES 
    -- Network Issues
    ('SEM-2024-000001', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'NETWORK', 'SLOW_DATA', 'My internet is extremely slow around Kitengela. Download speeds have dropped from 20Mbps to 2Mbps since yesterday.', 'TEXT', 'HIGH', 'ASSIGNED', 'Kitengela, Kajiado', -1.367, 36.953, '4G', NOW() - INTERVAL '2 hours'),
    
    ('SEM-2024-000002', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'NETWORK', 'NO_SIGNAL', 'Complete network outage in Rongai area since this morning. Cannot make calls or access data.', 'TEXT', 'CRITICAL', 'IN_PROGRESS', 'Rongai, Kajiado', -1.174, 36.756, '4G', NOW() - INTERVAL '4 hours'),
    
    ('SEM-2024-000003', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'NETWORK', 'CALL_DROPS', 'Frequent call drops when moving between Kasarani and Mwiki area.', 'TEXT', 'MEDIUM', 'RECEIVED', 'Kasarani, Nairobi', -1.220, 36.897, '4G', NOW() - INTERVAL '1 hour'),
    
    -- M-PESA Issues
    ('SEM-2024-000004', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'MPESA', 'FAILED_TRANSACTION', 'M-PESA transaction failed but money was deducted. Tried to send KES 5,000 to merchant.', 'TEXT', 'HIGH', 'ASSIGNED', 'Westlands, Nairobi', -1.268, 36.810, '5G', NOW() - INTERVAL '3 hours'),
    
    ('SEM-2024-000005', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'MPESA', 'SLOW_PROCESSING', 'M-PESA transactions taking too long to process, especially during peak hours.', 'TEXT', 'MEDIUM', 'RECEIVED', 'Nairobi CBD', -1.286, 36.817, '5G', NOW() - INTERVAL '30 minutes'),
    
    -- Billing Issues  
    ('SEM-2024-000006', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'BILLING', 'INCORRECT_CHARGES', 'Incorrect international call charges on my bill. I never made international calls.', 'TEXT', 'MEDIUM', 'RECEIVED', 'Karen, Nairobi', -1.319, 36.685, '4G', NOW() - INTERVAL '1 day'),
    
    ('SEM-2024-000007', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'BILLING', 'DATA_DEDUCTION', 'Data bundles being deducted even when connected to WiFi.', 'TEXT', 'LOW', 'RESOLVED', 'Thika, Kiambu', -1.033, 37.069, 'WiFi', NOW() - INTERVAL '2 days'),
    
    -- App UX Issues
    ('SEM-2024-000008', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'APP_UX', 'APP_CRASH', 'MySafaricom app crashes when trying to check account balance.', 'TEXT', 'MEDIUM', 'RESOLVED', 'Embakasi, Nairobi', -1.319, 36.892, '4G', NOW() - INTERVAL '1 day'),
    
    ('SEM-2024-000009', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'APP_UX', 'LOGIN_ISSUES', 'Cannot login to MySafaricom app. Keeps saying invalid credentials.', 'TEXT', 'HIGH', 'IN_PROGRESS', 'Ruiru, Kiambu', -1.144, 36.961, '4G', NOW() - INTERVAL '5 hours'),
    
    -- Feature Requests
    ('SEM-2024-000010', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'FEATURE_REQUEST', 'DATA_ROLLOVER', 'Please add data rollover feature so unused bundles carry to next month.', 'TEXT', 'LOW', 'RECEIVED', 'Nakuru Town', -0.303, 36.080, '4G', NOW() - INTERVAL '6 hours'),
    
    -- Create more reports for different counties to show geographic distribution
    ('SEM-2024-000011', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'NETWORK', 'POOR_COVERAGE', 'Very poor network coverage in our village. Signal strength always low.', 'TEXT', 'HIGH', 'RECEIVED', 'Machakos Town', -1.522, 37.266, '3G', NOW() - INTERVAL '8 hours'),
    
    ('SEM-2024-000012', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'MPESA', 'ATM_ISSUES', 'M-PESA ATM withdrawal failed multiple times but money still deducted.', 'TEXT', 'CRITICAL', 'ASSIGNED', 'Kisumu City', -0.091, 34.768, '4G', NOW() - INTERVAL '12 hours'),
    
    ('SEM-2024-000013', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'NETWORK', 'SLOW_SPEEDS', 'Internet speeds very slow during evening hours in our area.', 'TEXT', 'MEDIUM', 'IN_PROGRESS', 'Eldoret Town', 0.514, 35.270, '4G', NOW() - INTERVAL '1 day'),
    
    ('SEM-2024-000014', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'BILLING', 'POSTPAID_ISSUES', 'Postpaid bill showing wrong amounts. Need clarification on charges.', 'TEXT', 'MEDIUM', 'RECEIVED', 'Mombasa Island', -4.043, 39.658, '5G', NOW() - INTERVAL '18 hours'),
    
    ('SEM-2024-000015', (SELECT id FROM auth.users WHERE email = 'user@example.com' LIMIT 1), 'APP_UX', 'INTERFACE_ISSUES', 'New app update has confusing interface. Hard to find balance check.', 'TEXT', 'LOW', 'RECEIVED', 'Nyeri Town', -0.421, 36.948, '4G', NOW() - INTERVAL '2 hours');

-- Insert simulated telemetry data for the reports
INSERT INTO report_telemetry (
    report_id,
    network_type,
    signal_strength,
    latency_ms,
    cell_id,
    device_model,
    os_version,
    app_screen,
    latitude,
    longitude
)
SELECT 
    r.id,
    r.network_type,
    CASE 
        WHEN r.category = 'NETWORK' AND r.subcategory = 'NO_SIGNAL' THEN -120
        WHEN r.category = 'NETWORK' AND r.subcategory = 'POOR_COVERAGE' THEN -110
        WHEN r.category = 'NETWORK' AND r.subcategory = 'SLOW_DATA' THEN -95
        ELSE -75 + (RANDOM() * 20)::INT
    END as signal_strength,
    CASE 
        WHEN r.category = 'NETWORK' AND r.subcategory = 'SLOW_DATA' THEN 800 + (RANDOM() * 500)::INT
        ELSE 50 + (RANDOM() * 200)::INT
    END as latency_ms,
    'CELL_' || (10000 + (RANDOM() * 90000)::INT)::TEXT as cell_id,
    CASE (RANDOM() * 5)::INT
        WHEN 0 THEN 'Samsung Galaxy A54'
        WHEN 1 THEN 'iPhone 14'
        WHEN 2 THEN 'Tecno Camon 20'
        WHEN 3 THEN 'Infinix Note 30'
        ELSE 'Oppo A78'
    END as device_model,
    CASE (RANDOM() * 3)::INT
        WHEN 0 THEN 'Android 14'
        WHEN 1 THEN 'Android 13'
        WHEN 2 THEN 'iOS 17.2'
        ELSE 'Android 12'
    END as os_version,
    CASE r.category
        WHEN 'MPESA' THEN 'M-PESA'
        WHEN 'BILLING' THEN 'Account'
        WHEN 'APP_UX' THEN 'Home'
        ELSE 'Network'
    END as app_screen,
    r.latitude,
    r.longitude
FROM reports r;

-- Insert sample AI analysis for some reports
INSERT INTO ai_analysis (
    report_id,
    category,
    subcategory,
    severity,
    confidence,
    sentiment,
    summary,
    recommended_action,
    assigned_team_id,
    model
)
SELECT 
    r.id,
    r.category,
    r.subcategory,
    r.severity,
    0.85 + (RANDOM() * 0.14) as confidence, -- Between 0.85 and 0.99
    CASE (RANDOM() * 3)::INT
        WHEN 0 THEN 'frustrated'
        WHEN 1 THEN 'concerned'
        ELSE 'neutral'
    END as sentiment,
    CASE r.category
        WHEN 'NETWORK' THEN 
            CASE r.subcategory
                WHEN 'SLOW_DATA' THEN 'Customer experiencing significant data speed degradation in ' || r.location_name || '. Likely network congestion or infrastructure issue.'
                WHEN 'NO_SIGNAL' THEN 'Complete network outage reported in ' || r.location_name || '. Requires immediate investigation.'
                WHEN 'POOR_COVERAGE' THEN 'Poor signal strength reported in ' || r.location_name || '. May need additional base stations.'
                WHEN 'CALL_DROPS' THEN 'Frequent call drops between network cells. Handover optimization needed.'
                ELSE 'Network-related issue requiring technical investigation.'
            END
        WHEN 'MPESA' THEN
            CASE r.subcategory
                WHEN 'FAILED_TRANSACTION' THEN 'M-PESA transaction failure with fund deduction. Requires immediate refund processing.'
                WHEN 'SLOW_PROCESSING' THEN 'M-PESA performance degradation during peak hours. System optimization needed.'
                WHEN 'ATM_ISSUES' THEN 'M-PESA ATM withdrawal failure with fund deduction. Investigate ATM connectivity.'
                ELSE 'M-PESA service issue requiring financial team attention.'
            END
        WHEN 'BILLING' THEN 'Billing discrepancy requiring account review and correction.'
        WHEN 'APP_UX' THEN 'Mobile application usability issue requiring product team review.'
        WHEN 'FEATURE_REQUEST' THEN 'Product enhancement suggestion for evaluation by innovation team.'
        ELSE 'Customer feedback requiring appropriate department review.'
    END as summary,
    CASE r.category
        WHEN 'NETWORK' THEN 'Investigate network infrastructure in affected area. Check base station performance and capacity.'
        WHEN 'MPESA' THEN 'Process immediate refund if applicable. Investigate M-PESA system performance.'
        WHEN 'BILLING' THEN 'Review customer account and correct billing errors. Provide explanation to customer.'
        WHEN 'APP_UX' THEN 'Test app functionality and fix bugs. Improve user interface based on feedback.'
        WHEN 'FEATURE_REQUEST' THEN 'Evaluate feature request feasibility and add to product roadmap if viable.'
        ELSE 'Route to appropriate department for investigation and resolution.'
    END as recommended_action,
    CASE r.category
        WHEN 'NETWORK' THEN (SELECT id FROM teams WHERE name = 'NOC / Radio Planning' LIMIT 1)
        WHEN 'MPESA' THEN (SELECT id FROM teams WHERE name = 'FinTech / Customer Care' LIMIT 1)
        WHEN 'BILLING' THEN (SELECT id FROM teams WHERE name = 'Billing / Customer Care' LIMIT 1)
        WHEN 'APP_UX' THEN (SELECT id FROM teams WHERE name = 'Digital Product & Design' LIMIT 1)
        WHEN 'FEATURE_REQUEST' THEN (SELECT id FROM teams WHERE name = 'Product Innovation' LIMIT 1)
        ELSE (SELECT id FROM teams WHERE name = 'Customer Care' LIMIT 1)
    END as assigned_team_id,
    'gpt-4-turbo' as model
FROM reports r
WHERE r.status != 'RECEIVED'; -- Only for reports that have been processed

-- Update reports to assign teams based on AI analysis
UPDATE reports 
SET assigned_team_id = ai.assigned_team_id,
    category = ai.category,
    subcategory = ai.subcategory,
    severity = ai.severity
FROM ai_analysis ai 
WHERE reports.id = ai.report_id;

-- Mark some reports as resolved with resolution times
UPDATE reports 
SET status = 'RESOLVED',
    resolved_at = created_at + INTERVAL '2 hours' + (RANDOM() * INTERVAL '48 hours')
WHERE ticket_number IN ('SEM-2024-000007', 'SEM-2024-000008');