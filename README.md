# Sema Dashboard - Voice of Customer Management System

A comprehensive web dashboard for managing Sema customer feedback requests, built for Safaricom's hackathon project. Sema (Swahili for "Speak") enables customers to report issues and provide feedback through simple app interactions (shake/tap gestures), with AI-powered triage and automatic routing to appropriate teams.

![Dashboard Screenshot](./public/sema-dashboard-preview.png)

## 🌟 Features

### 📊 **Real-time Analytics Dashboard**
- Live metrics and KPIs for customer feedback tracking
- Interactive charts showing ticket trends, resolution rates, and satisfaction scores
- Regional performance visualization with Kenya map integration
- Cost savings and churn prevention analytics

### 🗺️ **Kenya Regional Data Visualization**
- Interactive SVG map showing county-wise performance data
- Population-based coloring and activity-level indicators
- Hover tooltips with detailed statistics
- Regional performance breakdown table

### 🎫 **Comprehensive Ticket Management**
- Advanced search, filtering, and sorting capabilities
- Detailed ticket views with customer and device information
- Inline editing for status updates and assignments
- Support for attachments (screenshots, voice notes)
- Real-time status tracking and timeline

### 📱 **Responsive Design**
- Mobile-first design approach
- Collapsible navigation for smaller screens
- Optimized layouts for tablets and mobile devices
- Touch-friendly interface elements

### ⚡ **Performance & UX**
- Smooth animations and transitions
- Loading states and error handling
- Accessible design with proper focus management
- Optimized for fast loading and smooth interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sema-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Technology Stack
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and building
- **Styling:** Tailwind CSS with custom design system
- **Charts:** Recharts for data visualization
- **Icons:** Lucide React for consistent iconography
- **State Management:** React hooks (useState, useEffect)

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── charts/         # Chart components (Hourly, Weekly, Category trends)
│   ├── maps/           # Kenya map visualization
│   ├── tickets/        # Ticket management components
│   └── ui/             # Basic UI components (cards, buttons, etc.)
├── data/               # Sample data and type definitions
├── pages/              # Main page components
├── styles/             # Global styles and Tailwind config
└── utils/              # Utility functions
```

## 📊 Data Integration

### Sample Data Included
- **Kenya Counties Data:** 14 major counties with realistic population and performance metrics
- **Ticket Data:** 6 sample tickets representing common Sema use cases
- **Analytics Data:** Hourly, daily, and weekly trend data for demonstrations
- **Metrics Data:** KPIs and performance indicators

### Integration Points
The dashboard is designed to integrate with:
- **Sema Mobile App:** Receiving feedback from shake/tap gestures
- **Safaricom APIs:** Network data, M-PESA transactions, customer info
- **AI Triage System:** Automated categorization and routing
- **CRM Systems:** Customer history and resolution tracking

## 🎨 Design System

### Color Palette
- **Primary Green:** `#00A651` (Safaricom brand color)
- **Dark Theme:** Gray scale from `#0f172a` to `#f9fafb`
- **Accent Colors:** Blue, Orange, Red for different categories
- **Status Colors:** Green (success), Orange (warning), Red (error)

### Typography
- **Font Family:** Inter (system fallback to sans-serif)
- **Scale:** Responsive sizing from 12px to 32px
- **Weight:** 300 (light) to 700 (bold)

### Components
- **Cards:** Consistent padding, rounded corners, subtle shadows
- **Buttons:** Hover states, active feedback, focus indicators
- **Forms:** Consistent styling, validation states
- **Navigation:** Active states, smooth transitions

## 🔧 Customization

### Adding New Counties
Update `src/data/kenyaCountiesData.ts` with additional county information:

```typescript
{
  id: 'county-id',
  county: 'County Name',
  totalCitizens: 1000000,
  registered: 50000,
  // ... other fields
}
```

### Adding New Ticket Categories
Extend `src/data/ticketsData.ts`:

```typescript
export const ticketCategories = [
  // ... existing categories
  { value: 'new-category', label: 'New Category', color: 'purple' }
]
```

### Customizing Charts
Charts use Recharts library. Modify components in `src/components/` to:
- Change chart types (Line, Bar, Area, Pie)
- Update colors and styling
- Add new data dimensions
- Customize tooltips and legends

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile Features
- Collapsible navigation menu
- Touch-optimized interactions
- Responsive grid layouts
- Optimized chart sizes
- Simplified metric cards

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel:** Connect GitHub repo for automatic deployments
- **Netlify:** Drag and drop `dist` folder or connect repo
- **AWS S3 + CloudFront:** For enterprise deployment
- **Docker:** Containerized deployment (Dockerfile included)

### Environment Configuration
Create `.env` file for environment-specific settings:
```bash
VITE_API_URL=your-api-endpoint
VITE_MAPBOX_TOKEN=your-mapbox-token
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling (avoid custom CSS when possible)
3. Implement proper error boundaries
4. Write descriptive commit messages
5. Test on multiple screen sizes

### Code Style
- Use functional components with hooks
- Implement proper TypeScript types
- Follow React best practices for state management
- Use semantic HTML elements for accessibility

## 📄 License

This project is developed for Safaricom's hackathon and is intended for demonstration purposes.

## 🆘 Support

For questions or issues:
1. Check the existing documentation
2. Review the sample data structure
3. Test responsive behavior on different devices
4. Verify all dependencies are properly installed

## 🔮 Future Enhancements

### Planned Features
- **Real-time notifications** for urgent tickets
- **Advanced filtering** with date ranges and custom criteria
- **Export functionality** for reports and analytics
- **User management** with role-based access control
- **Integration APIs** for third-party systems
- **Advanced analytics** with predictive insights
- **Multi-language support** (English, Swahili)

### Technical Improvements
- **PWA support** for offline functionality
- **WebSocket integration** for real-time updates
- **Advanced caching** strategies
- **Performance monitoring** and analytics
- **Automated testing** suite
- **CI/CD pipeline** setup

---

**Built with ❤️ for Safaricom's innovation in customer experience management.**