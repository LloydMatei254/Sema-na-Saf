-- ================================================================
-- SEMA Teams Database Setup
-- Complete SQL script for teams table and sample data
-- ================================================================

-- Drop existing table if needed (CAUTION: removes all data)
-- DROP TABLE IF EXISTS public.teams CASCADE;

-- ================================================================
-- 1. CREATE TEAMS TABLE
-- ================================================================

CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  county TEXT NOT NULL,
  specialization TEXT[] DEFAULT '{}',
  capacity INTEGER DEFAULT 10,
  current_load INTEGER DEFAULT 0,
  members INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE,
  
  -- Team contact and details
  email TEXT,
  phone TEXT,
  description TEXT,
  
  -- Performance metrics
  total_assigned INTEGER DEFAULT 0,
  total_completed INTEGER DEFAULT 0,
  average_resolution_hours DECIMAL(10,2) DEFAULT 0.0,
  
  -- Constraints
  CONSTRAINT positive_capacity CHECK (capacity > 0),
  CONSTRAINT valid_load CHECK (current_load >= 0 AND current_load <= capacity)
);

-- ================================================================
-- 2. CREATE INDEXES
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_teams_county ON public.teams(county);
CREATE INDEX IF NOT EXISTS idx_teams_active ON public.teams(active);
CREATE INDEX IF NOT EXISTS idx_teams_specialization ON public.teams USING GIN(specialization);
CREATE INDEX IF NOT EXISTS idx_teams_load ON public.teams(current_load);

-- ================================================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ================================================================

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all authenticated users to read teams
CREATE POLICY "Allow authenticated users to read teams"
  ON public.teams
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow admins to insert/update/delete teams
CREATE POLICY "Allow admins to manage teams"
  ON public.teams
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- ================================================================
-- 4. CREATE TRIGGER FOR UPDATED_AT
-- ================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_teams_updated_at ON public.teams;

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- 5. INSERT SAMPLE TEAM DATA (47 Counties)
-- ================================================================

-- Major Cities Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Nairobi City Response Team', 'Nairobi', ARRAY['network', 'infrastructure', 'utilities'], 20, 8, 15, 'nairobi@sema.go.ke', '+254-712-345-001', 'Main response team for Nairobi County covering all major incidents'),
  ('Nairobi Telecom Unit', 'Nairobi', ARRAY['network', 'telecommunications', 'mobile'], 15, 6, 10, 'nairobi-telecom@sema.go.ke', '+254-712-345-002', 'Specialized team for network and telecom issues in Nairobi'),
  ('Mombasa Coastal Team', 'Mombasa', ARRAY['infrastructure', 'utilities', 'water'], 15, 7, 12, 'mombasa@sema.go.ke', '+254-712-345-003', 'Primary response team for Mombasa County'),
  ('Kisumu Lake Region Team', 'Kisumu', ARRAY['water', 'environment', 'utilities'], 12, 5, 10, 'kisumu@sema.go.ke', '+254-712-345-004', 'Covering Kisumu and lake region issues'),
  ('Nakuru Rift Valley Team', 'Nakuru', ARRAY['infrastructure', 'agriculture', 'utilities'], 12, 6, 9, 'nakuru@sema.go.ke', '+254-712-345-005', 'Rift Valley response team based in Nakuru');

-- Central Kenya Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Kiambu Metro Team', 'Kiambu', ARRAY['network', 'infrastructure', 'transport'], 10, 4, 8, 'kiambu@sema.go.ke', '+254-712-345-006', 'Metropolitan area response team'),
  ('Murang''a Highlands Team', 'Murang''a', ARRAY['agriculture', 'water', 'infrastructure'], 8, 3, 6, 'muranga@sema.go.ke', '+254-712-345-007', 'Highlands region team'),
  ('Nyeri Central Team', 'Nyeri', ARRAY['infrastructure', 'utilities', 'agriculture'], 8, 3, 6, 'nyeri@sema.go.ke', '+254-712-345-008', 'Central Kenya response unit'),
  ('Kirinyaga Rice Belt Team', 'Kirinyaga', ARRAY['agriculture', 'water', 'irrigation'], 7, 2, 5, 'kirinyaga@sema.go.ke', '+254-712-345-009', 'Agricultural focus team'),
  ('Nyandarua Highlands Team', 'Nyandarua', ARRAY['agriculture', 'water', 'utilities'], 7, 3, 5, 'nyandarua@sema.go.ke', '+254-712-345-010', 'Highland agricultural team');

-- Western Kenya Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Kakamega Western Team', 'Kakamega', ARRAY['infrastructure', 'agriculture', 'education'], 10, 5, 8, 'kakamega@sema.go.ke', '+254-712-345-011', 'Western Kenya main team'),
  ('Bungoma Border Team', 'Bungoma', ARRAY['transport', 'infrastructure', 'security'], 8, 4, 6, 'bungoma@sema.go.ke', '+254-712-345-012', 'Border region response'),
  ('Busia Border Response', 'Busia', ARRAY['transport', 'trade', 'infrastructure'], 7, 3, 5, 'busia@sema.go.ke', '+254-712-345-013', 'Uganda border region'),
  ('Vihiga Hills Team', 'Vihiga', ARRAY['agriculture', 'water', 'infrastructure'], 6, 2, 5, 'vihiga@sema.go.ke', '+254-712-345-014', 'Hill region team');

-- Nyanza Region Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Siaya Lake Team', 'Siaya', ARRAY['water', 'fishing', 'environment'], 7, 3, 5, 'siaya@sema.go.ke', '+254-712-345-015', 'Lake Victoria basin team'),
  ('Homa Bay Lakeside Team', 'Homa Bay', ARRAY['water', 'fishing', 'transport'], 8, 4, 6, 'homabay@sema.go.ke', '+254-712-345-016', 'Lakeside response unit'),
  ('Migori Border Team', 'Migori', ARRAY['agriculture', 'mining', 'infrastructure'], 7, 3, 5, 'migori@sema.go.ke', '+254-712-345-017', 'Southern Nyanza team'),
  ('Kisii Highlands Team', 'Kisii', ARRAY['agriculture', 'education', 'infrastructure'], 8, 4, 6, 'kisii@sema.go.ke', '+254-712-345-018', 'Highland region response'),
  ('Nyamira Tea Zone Team', 'Nyamira', ARRAY['agriculture', 'water', 'infrastructure'], 6, 2, 5, 'nyamira@sema.go.ke', '+254-712-345-019', 'Tea growing region');

-- Rift Valley Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Uasin Gishu Highlands Team', 'Uasin Gishu', ARRAY['agriculture', 'education', 'transport'], 9, 4, 7, 'uasingishu@sema.go.ke', '+254-712-345-020', 'Eldoret based team'),
  ('Nandi Tea Hills Team', 'Nandi', ARRAY['agriculture', 'infrastructure', 'water'], 7, 3, 5, 'nandi@sema.go.ke', '+254-712-345-021', 'Tea zone response'),
  ('Kericho Tea Capital Team', 'Kericho', ARRAY['agriculture', 'water', 'infrastructure'], 8, 3, 6, 'kericho@sema.go.ke', '+254-712-345-022', 'Tea industry focus'),
  ('Bomet Highlands Team', 'Bomet', ARRAY['agriculture', 'water', 'utilities'], 6, 2, 5, 'bomet@sema.go.ke', '+254-712-345-023', 'Highland agriculture'),
  ('Narok Tourism Team', 'Narok', ARRAY['tourism', 'wildlife', 'infrastructure'], 8, 4, 6, 'narok@sema.go.ke', '+254-712-345-024', 'Maasai Mara region'),
  ('Kajiado Pastoral Team', 'Kajiado', ARRAY['livestock', 'water', 'infrastructure'], 7, 3, 5, 'kajiado@sema.go.ke', '+254-712-345-025', 'Pastoral communities'),
  ('Baringo Rift Team', 'Baringo', ARRAY['water', 'infrastructure', 'security'], 6, 3, 5, 'baringo@sema.go.ke', '+254-712-345-026', 'Rift valley floor'),
  ('Laikipia Wildlife Team', 'Laikipia', ARRAY['wildlife', 'ranching', 'tourism'], 7, 2, 5, 'laikipia@sema.go.ke', '+254-712-345-027', 'Wildlife conservancies'),
  ('Samburu Pastoral Team', 'Samburu', ARRAY['livestock', 'water', 'security'], 6, 2, 4, 'samburu@sema.go.ke', '+254-712-345-028', 'Northern pastoral region'),
  ('Trans Nzoia Grain Team', 'Trans Nzoia', ARRAY['agriculture', 'transport', 'infrastructure'], 8, 4, 6, 'transnzoia@sema.go.ke', '+254-712-345-029', 'Grain basket region'),
  ('Elgeyo Marakwet Hills Team', 'Elgeyo-Marakwet', ARRAY['agriculture', 'athletics', 'infrastructure'], 6, 2, 5, 'elgeyomarakwet@sema.go.ke', '+254-712-345-030', 'Hill region specialists'),
  ('West Pokot Border Team', 'West Pokot', ARRAY['livestock', 'security', 'infrastructure'], 6, 2, 4, 'westpokot@sema.go.ke', '+254-712-345-031', 'Western highlands');

-- Coast Region Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Kilifi Beach Team', 'Kilifi', ARRAY['tourism', 'marine', 'infrastructure'], 8, 4, 6, 'kilifi@sema.go.ke', '+254-712-345-032', 'Coastal tourism region'),
  ('Kwale South Coast Team', 'Kwale', ARRAY['tourism', 'mining', 'infrastructure'], 7, 3, 5, 'kwale@sema.go.ke', '+254-712-345-033', 'South coast response'),
  ('Taita Taveta Wildlife Team', 'Taita-Taveta', ARRAY['tourism', 'wildlife', 'infrastructure'], 7, 3, 5, 'taitataveta@sema.go.ke', '+254-712-345-034', 'Tsavo region'),
  ('Lamu Island Team', 'Lamu', ARRAY['marine', 'tourism', 'heritage'], 6, 2, 4, 'lamu@sema.go.ke', '+254-712-345-035', 'Island and coastal heritage'),
  ('Tana River Basin Team', 'Tana River', ARRAY['water', 'agriculture', 'livestock'], 6, 3, 4, 'tanariver@sema.go.ke', '+254-712-345-036', 'River basin region');

-- Eastern Kenya Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Machakos Metro Team', 'Machakos', ARRAY['infrastructure', 'transport', 'trade'], 9, 4, 7, 'machakos@sema.go.ke', '+254-712-345-037', 'Greater Machakos area'),
  ('Makueni Dry Lands Team', 'Makueni', ARRAY['water', 'agriculture', 'livestock'], 7, 3, 5, 'makueni@sema.go.ke', '+254-712-345-038', 'Semi-arid region'),
  ('Kitui Ukambani Team', 'Kitui', ARRAY['water', 'agriculture', 'mining'], 7, 3, 5, 'kitui@sema.go.ke', '+254-712-345-039', 'Lower eastern region'),
  ('Embu Mt Kenya Team', 'Embu', ARRAY['agriculture', 'water', 'infrastructure'], 7, 3, 5, 'embu@sema.go.ke', '+254-712-345-040', 'Mt Kenya slopes'),
  ('Meru Slopes Team', 'Meru', ARRAY['agriculture', 'water', 'infrastructure'], 8, 4, 6, 'meru@sema.go.ke', '+254-712-345-041', 'Northern Mt Kenya'),
  ('Tharaka Nithi Highlands Team', 'Tharaka-Nithi', ARRAY['agriculture', 'water', 'infrastructure'], 6, 2, 5, 'tharakanithi@sema.go.ke', '+254-712-345-042', 'Highland farming');

-- Northern Kenya Teams
INSERT INTO public.teams (name, county, specialization, capacity, current_load, members, email, phone, description) VALUES
  ('Isiolo Gateway Team', 'Isiolo', ARRAY['transport', 'livestock', 'security'], 7, 3, 5, 'isiolo@sema.go.ke', '+254-712-345-043', 'Northern gateway'),
  ('Marsabit Frontier Team', 'Marsabit', ARRAY['livestock', 'water', 'security'], 6, 2, 4, 'marsabit@sema.go.ke', '+254-712-345-044', 'Far northern region'),
  ('Turkana Frontier Team', 'Turkana', ARRAY['oil', 'livestock', 'water'], 8, 3, 6, 'turkana@sema.go.ke', '+254-712-345-045', 'Northwestern frontier'),
  ('Wajir Pastoral Team', 'Wajir', ARRAY['livestock', 'water', 'trade'], 6, 2, 4, 'wajir@sema.go.ke', '+254-712-345-046', 'Northeast pastoral'),
  ('Mandera Border Team', 'Mandera', ARRAY['trade', 'livestock', 'security'], 6, 2, 4, 'mandera@sema.go.ke', '+254-712-345-047', 'Somalia border region'),
  ('Garissa Northeast Team', 'Garissa', ARRAY['livestock', 'trade', 'water'], 7, 3, 5, 'garissa@sema.go.ke', '+254-712-345-048', 'Northeast administrative center');

-- ================================================================
-- 6. VERIFY INSERTIONS
-- ================================================================

-- Count total teams
SELECT COUNT(*) as total_teams FROM public.teams;

-- Show teams by county
SELECT county, COUNT(*) as team_count 
FROM public.teams 
GROUP BY county 
ORDER BY team_count DESC, county;

-- Show team specializations
SELECT name, county, specialization 
FROM public.teams 
ORDER BY county, name;

-- Show team capacity summary
SELECT 
  COUNT(*) as total_teams,
  SUM(capacity) as total_capacity,
  SUM(current_load) as current_load,
  ROUND(AVG(current_load::numeric / capacity::numeric * 100), 2) as avg_utilization_percent
FROM public.teams;

-- ================================================================
-- 7. GRANT PERMISSIONS
-- ================================================================

-- Grant permissions to authenticated users
GRANT SELECT ON public.teams TO authenticated;
GRANT ALL ON public.teams TO service_role;

-- ================================================================
-- SETUP COMPLETE
-- ================================================================

-- To run this script in Supabase:
-- 1. Go to SQL Editor in Supabase Dashboard
-- 2. Create new query
-- 3. Paste this entire script
-- 4. Click "Run"
-- 
-- Verify success:
-- SELECT * FROM public.teams LIMIT 10;
