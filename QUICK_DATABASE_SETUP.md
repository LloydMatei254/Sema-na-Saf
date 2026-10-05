# Quick Database Setup - Run This First!

**IMPORTANT**: The app is now using real APIs but needs the database to be set up first.

## Step 1: Set Up Database Schema

1. Go to https://supabase.com/dashboard/projects
2. Select your project: `kysiymdpsvluylpnjtab`
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire contents of `SIMPLE_SCHEMA.sql`
6. Click **Run** to execute the schema

## Step 2: Create Admin User

1. After the schema is set up, sign up in your app with any email
2. Go to **Authentication > Users** in Supabase dashboard
3. Copy the User ID of the user you just created
4. In SQL Editor, run:
```sql
UPDATE profiles 
SET role = 'ADMIN' 
WHERE user_id = 'paste-your-user-id-here';
```

## Step 3: Test the App

1. Sign in with your admin account
2. Try creating tickets through the landing page
3. View tickets in the admin dashboard

That's it! The app will now work with real APIs and database storage.

## Troubleshooting

If you get a blank page:
- Check browser console for errors
- Verify the database schema was created successfully
- Make sure environment variables are correct in Vercel