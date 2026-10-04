# SEMA - Voice of the Customer

A modern customer feedback platform for Safaricom Kenya, built with React, TypeScript, and Supabase. This application demonstrates an AI-powered customer support system with real-time analytics and intelligent report routing.

## 🚀 Features

### Customer Features
- **Multi-modal Report Submission**: Text and voice-based complaint submission
- **Real-time Location Detection**: Automatic location capture for better context
- **AI-Powered Categorization**: Intelligent classification and routing of reports
- **Real-time Updates**: Live status updates and notifications
- **Mobile-Friendly Interface**: Responsive design for all devices

### Admin Features  
- **Comprehensive Dashboard**: Real-time analytics and metrics
- **Interactive Maps**: Geographic distribution of reports
- **AI Analysis Integration**: Automated report categorization and severity assessment
- **Team Management**: Intelligent routing to appropriate support teams
- **Performance Analytics**: Resolution time tracking and team performance metrics

### Technical Features
- **Real-time Database**: Supabase PostgreSQL with real-time subscriptions
- **AI Integration**: OpenAI GPT-4 for intelligent report analysis
- **Row Level Security**: Comprehensive data protection policies
- **Edge Functions**: Server-side processing for secure operations
- **Audit Logging**: Complete activity tracking for compliance

## 🏗️ Architecture

```
Frontend (React/TypeScript)
↓
Supabase Auth
↓
Supabase Database (PostgreSQL)
↓
Edge Functions (Deno)
↓
AI Analysis (OpenAI GPT-4)
↓
Real-time Updates
↓
Admin Dashboard
```

## 🔧 Technology Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI**: OpenAI GPT-4 Turbo
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- OpenAI API key
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/LloydMatei254/Sema-na-Saf.git
cd Sema-na-Saf
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local` and configure:
```env
VITE_SUPABASE_URL=https://kysiymdpsvluylpnjtab.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Database Setup
See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed Supabase configuration.

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🎭 Demo Accounts

### Admin Access
- Email: `admin@safaricom.co.ke`
- Password: `admin123`

### Customer Access  
- Email: `user@example.com`
- Password: `user123`

## 📊 Demo Flow

### Customer Journey
1. **Access Platform**: Visit the public landing page
2. **Authentication**: Sign up or log in as a customer
3. **Submit Report**: Choose text or voice input
4. **AI Processing**: System analyzes and categorizes the report
5. **Team Routing**: Report automatically assigned to relevant team
6. **Track Progress**: Real-time updates on resolution status

### Admin Journey
1. **Admin Login**: Access with admin credentials
2. **Dashboard Overview**: View real-time metrics and analytics  
3. **Report Management**: Review and manage customer reports
4. **AI Insights**: View AI analysis and recommendations
5. **Team Performance**: Monitor resolution times and team efficiency
6. **Geographic Analysis**: Identify issue clusters on interactive maps

## 🚀 Deployment

### Vercel (Current)
The app is deployed at: **[sema-na-saf.vercel.app](https://sema-na-saf.vercel.app)**

### Local Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔐 Getting Started

1. **Visit**: [sema-na-saf.vercel.app](https://sema-na-saf.vercel.app)
2. **Experience Sema**: Click to access the customer interface
3. **Try Admin Dashboard**: Login with admin credentials
4. **Submit a Report**: Test the complete AI-powered workflow

For full backend setup with Supabase, see [BACKEND_SETUP.md](./BACKEND_SETUP.md)

---

**Built with ❤️ for the Safaricom Hackathon**

Demonstrating the power of AI-driven customer support and real-time analytics for better service delivery across Kenya.