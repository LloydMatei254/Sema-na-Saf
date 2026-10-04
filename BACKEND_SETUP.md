# SEMA Backend Setup with Supabase

This guide will help you set up the complete Supabase backend for the SEMA Voice of the Customer application.

## Prerequisites

- Supabase account with project `kysiymdpsvluylpnjtab`
- Node.js and npm installed
- OpenAI API key (for AI analysis)

## Step 1: Configure Environment Variables

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/kysiymdpsvluylpnjtab

2. Navigate to **Settings** > **API** and copy:
   - Project URL: `https://kysiymdpsvluylpnjtab.supabase.co`
   - `anon` `public` key
   - `service_role` `secret` key

3. Update `.env.local`:
```env
VITE_SUPABASE_URL=https://kysiymdpsvluylpnjtab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Your anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Your service role key
OPENAI_API_KEY=sk-... # Your OpenAI API key
```

## Step 2: Database Setup

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Run each migration file in order:
   - `supabase/migrations/20241205000001_initial_schema.sql`
   - `supabase/migrations/20241205000002_rls_policies.sql`
   - `supabase/migrations/20241205000003_seed_data.sql`

### Option B: Using Supabase CLI

```bash
npm install -g supabase
supabase login
supabase link --project-ref kysiymdpsvluylpnjtab
supabase db push
```

## Step 3: Storage Setup

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket named `voice-reports`
3. Set bucket to **Private** 
4. Add policy for authenticated users:

```sql
-- Policy for voice-reports bucket
CREATE POLICY "Users can upload their own voice reports" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'voice-reports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own voice reports" ON storage.objects
FOR SELECT USING (
  bucket_id = 'voice-reports'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## Step 4: Edge Functions Setup

1. Go to **Edge Functions** in your Supabase dashboard
2. Create three new functions:
   - `create-report`
   - `analyze-report`
   - `resolve-report`

3. Copy the code from `supabase/functions/` directories for each function

4. Set environment variables for Edge Functions:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `SUPABASE_URL`: https://kysiymdpsvluylpnjtab.supabase.co
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key

## Step 5: Authentication Setup

1. Go to **Authentication** > **Settings**
2. Enable **Email** provider
3. Set **Site URL** to your domain (for production) or `http://localhost:5173` (for development)
4. Add **Redirect URLs** if needed

## Step 6: Test the Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173
4. Try creating a demo user account
5. Submit a test report to verify the complete flow

## Step 7: Create Demo Admin User

Run this SQL in the **SQL Editor** to create an admin user:

```sql
-- Insert demo admin user (you'll need to sign up through the app first)
-- Then update their role
UPDATE profiles 
SET role = 'ADMIN' 
WHERE user_id = (
  SELECT id FROM auth.users 
  WHERE email = 'admin@safaricom.co.ke'
);
```

## Verification Checklist

- [ ] Database tables created successfully
- [ ] RLS policies applied
- [ ] Seed data inserted
- [ ] Storage bucket created with policies
- [ ] Edge functions deployed
- [ ] Authentication working
- [ ] Can create reports as user
- [ ] AI analysis triggers properly
- [ ] Admin dashboard shows real data
- [ ] Real-time updates work

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check `.env.local` file exists and has correct values
   - Restart development server after adding environment variables

2. **"Failed to create report"**
   - Check Edge Functions are deployed and working
   - Verify OpenAI API key is set correctly
   - Check browser console for errors

3. **"RLS policy violation"**
   - Ensure user is authenticated
   - Check RLS policies are correctly applied

4. **"No data in dashboard"**
   - Run the seed data migration
   - Verify the database views were created

## Production Deployment

For production deployment to Vercel:

1. Add environment variables to Vercel dashboard
2. Update CORS settings in Edge Functions
3. Set proper Site URL and Redirect URLs in Supabase Auth settings
4. Test the complete flow end-to-end

## Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Review browser console for errors
3. Verify environment variables are set correctly
4. Ensure all migrations ran successfully