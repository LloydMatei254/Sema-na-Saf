# URGENT: Fix Vercel Environment Variables

## 🚨 **Current Error**
```
Uncaught Error: Missing Supabase environment variables. Please check your .env.local file.
```

## ✅ **Quick Fix Steps**

### **Step 1: Go to Vercel Dashboard**
1. Visit: https://vercel.com/dashboard
2. Click on your project: `sema-na-saf`
3. Go to **Settings** tab
4. Click **Environment Variables** in the sidebar

### **Step 2: Add These Variables**

Click "Add New" for each:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://kysiymdpsvluylpnjtab.supabase.co`
- Environment: Production, Preview, Development (check all)

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5c2l5bWRwc3ZsdXlscG5qdGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzM0NDAsImV4cCI6MjEwNjY0OTQ0MH0.3mly_bx7lEwfftgpsV_Ztc3yMhjWA6JuTjr0MVDDUWE`
- Environment: Production, Preview, Development (check all)

**Variable 3:**
- Name: `VITE_APP_NAME`
- Value: `Sema Voice`
- Environment: Production, Preview, Development (check all)

### **Step 3: Redeploy**
1. After adding variables, go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment  
3. Click **"Redeploy"**
4. Wait for deployment to complete

## 🛡️ **Fallback Added**

I've also added fallback handling in the code so even if environment variables are missing, the app will:
- Show a working landing page
- Display helpful error messages
- Work in demo mode
- Not show blank pages

## ⚡ **Expected Result**

After adding the environment variables and redeploying:
- ✅ No more "Missing Supabase environment variables" error
- ✅ App loads normally
- ✅ Full functionality with Supabase
- ✅ No blank pages

## 🔄 **Alternative: Demo Mode**

If you don't want to set up environment variables right now, the app will work in demo mode with the fallback system I just added.

The fix will take effect after the next deployment with the updated code and environment variables.