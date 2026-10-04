# Supabase VS Code Connection Instructions

## Step 1: Get Your Personal Access Token

1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Give it a name like "VS Code CLI"
4. Copy the token (it will be shown only once)

## Step 2: Set Environment Variable

### Option A: Set in your current terminal session
```bash
export SUPABASE_ACCESS_TOKEN=your_token_here
```

### Option B: Add to your .env.local file
```bash
echo "SUPABASE_ACCESS_TOKEN=your_token_here" >> .env.local
```

## Step 3: Link Your Project

Once you have the token set, run:
```bash
supabase link --project-ref kysiymdpsvluylpnjtab
```

## Step 4: Get Your Project Keys

1. Go to https://supabase.com/dashboard/project/kysiymdpsvluylpnjtab/settings/api
2. Copy these values to your .env.local:
   - Project URL: `https://kysiymdpsvluylpnjtab.supabase.co`
   - `anon` `public` key
   - `service_role` `secret` key (keep this secure!)

## Step 5: Update .env.local

Your .env.local should look like this:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://kysiymdpsvluylpnjtab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ACCESS_TOKEN=your_personal_access_token

# AI Configuration
OPENAI_API_KEY=your_openai_key_here

# Application Configuration  
VITE_APP_NAME=Sema Voice
VITE_APP_URL=http://localhost:5173
```

## Step 6: Push Database Schema

Once linked, push your database schema:
```bash
supabase db push
```

## Step 7: Deploy Edge Functions (Optional)

If you want to deploy the Edge Functions:
```bash
supabase functions deploy create-report
supabase functions deploy analyze-report
supabase functions deploy resolve-report
```

## Troubleshooting

### If linking fails:
```bash
supabase projects list  # Check if your project appears
supabase link --project-ref kysiymdpsvluylpnjtab --debug  # Get detailed error info
```

### If database push fails:
```bash
supabase db reset  # Reset local database
supabase db push   # Try pushing again
```

### Check connection:
```bash
supabase status    # See all services status
supabase db diff   # Check for schema differences
```