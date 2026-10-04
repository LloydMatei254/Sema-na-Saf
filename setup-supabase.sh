#!/bin/bash

echo "🚀 SEMA Supabase Setup Script"
echo "================================"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
fi

echo "✅ Supabase CLI found"

# Check for access token
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo ""
    echo "🔑 Access Token Required"
    echo "========================"
    echo "1. Go to: https://supabase.com/dashboard/account/tokens"
    echo "2. Generate a new token named 'VS Code CLI'"
    echo "3. Set it as environment variable:"
    echo "   export SUPABASE_ACCESS_TOKEN=your_token_here"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Access token found"

# Link project
echo ""
echo "🔗 Linking project kysiymdpsvluylpnjtab..."
supabase link --project-ref kysiymdpsvluylpnjtab

if [ $? -eq 0 ]; then
    echo "✅ Project linked successfully!"
    
    # Check status
    echo ""
    echo "📊 Supabase Status:"
    supabase status
    
    echo ""
    echo "🎯 Next Steps:"
    echo "=============="
    echo "1. Get your project keys from: https://supabase.com/dashboard/project/kysiymdpsvluylpnjtab/settings/api"
    echo "2. Update .env.local with:"
    echo "   - VITE_SUPABASE_ANON_KEY=your_anon_key"
    echo "   - SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
    echo "   - OPENAI_API_KEY=your_openai_key"
    echo "3. Push database schema: supabase db push"
    echo "4. Start development: npm run dev"
else
    echo "❌ Failed to link project. Check your access token."
    exit 1
fi