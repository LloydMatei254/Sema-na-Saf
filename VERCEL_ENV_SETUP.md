# Vercel Environment Variables Setup

## Required Environment Variables

Make sure these environment variables are set in your Vercel project:

### Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `sema-na-saf`
3. Go to **Settings** → **Environment Variables**

### Add These Variables:

```env
VITE_SUPABASE_URL=https://kysiymdpsvluylpnjtab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5c2l5bWRwc3ZsdXlscG5qdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzM0NDAsImV4cCI6MjEwNjY0OTQ0MH0.3mly_bx7lEwfftgpsV_Ztc3yMhjWA6JuTjr0MVDDUWE
VITE_APP_NAME=Sema Voice
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_REAL_TIME=true
```

### Set Environment for:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

## After Adding Variables

1. **Redeploy** your application from Vercel dashboard
2. The app should now work without blank pages
3. Database setup is optional - app has fallback mode

## Testing

The app now works in two modes:

### Mode 1: Without Database (Fallback)
- ✅ Landing page works
- ✅ Ticket submission works (temporary storage)  
- ✅ Authentication works
- ✅ No blank pages
- ⚠️ Data not persisted (resets on refresh)

### Mode 2: With Database (Full Features)
- ✅ All features from Mode 1
- ✅ Data persistence
- ✅ Real-time updates
- ✅ Admin ticket management
- ✅ Analytics and reporting

## Current Status

The blank page issue is now fixed with the fallback system. The app will work immediately after deployment with these environment variables.