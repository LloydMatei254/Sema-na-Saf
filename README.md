# Sema Dashboard

A customer feedback management dashboard for Safaricom, built for tracking and managing Sema feedback requests across Kenya's administrative divisions.

## Features

- 📊 **Real-time Metrics**: Track tickets, resolution rates, and user engagement
- 🗺️ **Interactive Kenya Map**: Visualize performance data across all 47 counties
- 🏛️ **Complete Administrative Structure**: Filter by all counties, districts, and divisions in Kenya
- 🎨 **Safaricom Branding**: White/green theme matching Safaricom brand guidelines
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎫 **Ticket Management**: Track and manage customer feedback submissions
- 📈 **Analytics Dashboard**: Comprehensive charts and performance metrics

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LloydMatei254/Sema-na-Saf.git
cd Sema-na-Saf
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` directory to your hosting service

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── KenyaMap.tsx    # Interactive Kenya counties map
│   ├── FilterBar.tsx   # Administrative filtering controls
│   ├── MetricsCard.tsx # Dashboard metrics display
│   └── ...
├── data/               # Data and configuration files
│   ├── kenyaAdministrative.ts  # Complete Kenya admin structure
│   ├── kenyaCountiesData.ts    # Counties performance data
│   └── ...
├── pages/              # Main page components
│   └── Dashboard.tsx   # Main dashboard page
└── ...
```

## Data Sources

- **Administrative Data**: Complete structure of Kenya's 47 counties, districts, and divisions
- **Performance Metrics**: Simulated data for demonstration purposes
- **Geographic Data**: County positioning and population data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please contact the development team or create an issue in the GitHub repository.