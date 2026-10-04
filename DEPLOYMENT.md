# Deploy Sema Dashboard to Vercel

## Quick Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from this directory**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project? **N** (for new deployment)
   - What's your project's name? **sema-dashboard**
   - In which directory is your code located? **./** (current directory)
   - Want to override the settings? **N** (use defaults)

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

## Alternative: GitHub + Vercel Integration

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/sema-dashboard.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect on Vercel Dashboard**:
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Deploy automatically

## Project Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Node.js Version**: 18.x

## Environment Variables (if needed)
```bash
vercel env add VITE_APP_VERSION production
# Add other environment variables as needed
```

## Custom Domain (Optional)
```bash
vercel domains add yourdomain.com
vercel domains add www.yourdomain.com
```

Your Sema Dashboard will be available at:
- **Preview URL**: https://sema-dashboard-[random].vercel.app
- **Production URL**: https://sema-dashboard.vercel.app (or your custom domain)