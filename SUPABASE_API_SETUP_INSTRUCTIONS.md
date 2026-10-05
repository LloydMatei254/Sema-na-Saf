# Supabase API Setup Instructions

## Overview
Your SEMA application is now connected to Supabase APIs with real-time functionality. Follow these steps to complete the setup.

## 1. Database Setup

### Option A: Use Existing Schema (Recommended)
Run the existing `DEPLOY_TO_SUPABASE.sql` file in your Supabase SQL Editor:

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy the contents of `DEPLOY_TO_SUPABASE.sql`
4. Run the query

### Option B: Use New Schema
Run the `SUPABASE_SCHEMA_SETUP.sql` file for a cleaner, updated schema:

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy the contents of `SUPABASE_SCHEMA_SETUP.sql`
4. Run the query

## 2. Environment Variables
Your environment variables are already configured in `.env.local`:

```env
VITE_SUPABASE_URL=https://kysiymdpsvluylpnjtab.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Authentication Setup

### Create Admin User
1. Sign up through your app with `admin@sema.co.ke`
2. In Supabase Dashboard → Authentication → Users
3. Find the user and copy their User ID
4. In SQL Editor, run:
```sql
UPDATE profiles 
SET role = 'ADMIN' 
WHERE user_id = 'your-user-id-here';
```

### Test Credentials
- **Admin**: `admin@sema.co.ke` / `admin123`
- **User**: `user@sema.co.ke` / `user123`

## 4. Features Now Available

### ✅ Real Authentication
- Supabase Auth with email/password
- Role-based access (ADMIN, CUSTOMER)
- Profile management

### ✅ Live Ticket System
- Create tickets through the landing page
- Real-time updates via subscriptions
- Admin can manage ticket status
- Location-based filtering

### ✅ API Endpoints
- `ticketsService.createTicket()` - Submit new tickets
- `ticketsService.getAllTickets()` - Admin view all
- `ticketsService.getUserTickets()` - User's own tickets
- `ticketsService.updateTicketStatus()` - Status updates
- `ticketsService.subscribeToTickets()` - Real-time updates

### ✅ Real-time Features
- Live ticket updates
- Status change notifications
- New ticket alerts for admins

## 5. Application Flow

### Public Users
1. Visit landing page
2. Click "Submit Your Report" or "Report Issue"
3. Fill out ticket submission form
4. Sign in if needed or create account
5. Ticket submitted to database

### Admin Users
1. Sign in with admin credentials
2. Access LiveTicketManagement dashboard
3. View all tickets with filtering
4. Update ticket status (Open → In Progress → Resolved → Closed)
5. Real-time updates when new tickets arrive

### Customer Users
1. Sign in with customer credentials
2. View their own submitted tickets
3. Track status updates
4. Submit new tickets

## 6. Database Tables Created

- **profiles** - User profiles with roles
- **tickets** - Service tickets/complaints
- **analytics** - Metrics data (optional)

## 7. Next Steps

1. **Deploy Database Schema**: Run one of the SQL files in Supabase
2. **Create Admin User**: Sign up and promote to admin role
3. **Test Flow**: Submit tickets and manage them
4. **Redeploy Application**: Push changes are already live
5. **Configure RLS**: Row Level Security is pre-configured

## 8. Security Features

- Row Level Security (RLS) enabled
- Users can only see their own tickets
- Admins can see all tickets
- Automatic profile creation on signup
- JWT-based authentication

## 9. Troubleshooting

### If tickets don't load:
- Check browser console for errors
- Verify environment variables
- Ensure database schema is deployed
- Check user role in profiles table

### If authentication fails:
- Verify Supabase URL and keys
- Check user exists in auth.users table
- Ensure profile created automatically

### If real-time doesn't work:
- Verify realtime is enabled in Supabase project
- Check subscription in browser console
- Ensure RLS policies allow access

The application now has full API integration with Supabase and is ready for production use!