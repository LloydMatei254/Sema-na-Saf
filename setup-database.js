const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://kysiymdpsvluylpnjtab.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5c2l5bWRwc3ZsdXlscG5qdGFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTA3MzQ0MCwiZXhwIjoyMTA2NjQ5NDQwfQ.MBYIk75pjMgHINXBtccq_ZnTKBpf2IWS_0xlmnTQJ5k'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('Setting up database schema...')

  const schema = `
    -- Enable required extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Create profiles table
    CREATE TABLE IF NOT EXISTS profiles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'CUSTOMER',
        phone TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create tickets table
    CREATE TABLE IF NOT EXISTS tickets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        priority TEXT DEFAULT 'MEDIUM',
        status TEXT DEFAULT 'OPEN',
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        location TEXT,
        county TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        resolved_at TIMESTAMPTZ
    );

    -- Enable Row Level Security
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

    -- Create RLS policies for profiles
    CREATE POLICY "Users can view their own profile" ON profiles
        FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY "Users can update their own profile" ON profiles
        FOR UPDATE USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own profile" ON profiles
        FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- Create RLS policies for tickets
    CREATE POLICY "Users can view their own tickets" ON tickets
        FOR SELECT USING (auth.uid() = user_id OR EXISTS (
            SELECT 1 FROM profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('ADMIN', 'OPERATOR', 'ANALYST')
        ));

    CREATE POLICY "Users can create their own tickets" ON tickets
        FOR INSERT WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own tickets" ON tickets
        FOR UPDATE USING (auth.uid() = user_id OR EXISTS (
            SELECT 1 FROM profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('ADMIN', 'OPERATOR', 'ANALYST')
        ));

    -- Create function for automatic profile creation
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

    -- Create trigger for automatic profile creation
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

    -- Create function to update timestamps
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Create triggers for automatic timestamp updates
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
    CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
    CREATE TRIGGER update_tickets_updated_at
        BEFORE UPDATE ON tickets
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  `

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: schema })
    
    if (error) {
      console.error('Database setup error:', error)
      // Try alternative method - direct query
      const { error: queryError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
      
      if (queryError && queryError.code === '42P01') {
        console.log('Tables do not exist, creating via SQL...')
        // Tables don't exist, we need to set them up manually
        return false
      }
    }
    
    console.log('Database schema setup completed!')
    return true
  } catch (err) {
    console.error('Setup failed:', err)
    return false
  }
}

if (require.main === module) {
  setupDatabase().then(success => {
    if (success) {
      console.log('✅ Database setup completed successfully!')
    } else {
      console.log('❌ Database setup failed. Please run the SQL manually in Supabase dashboard.')
    }
    process.exit(success ? 0 : 1)
  })
}

module.exports = { setupDatabase }