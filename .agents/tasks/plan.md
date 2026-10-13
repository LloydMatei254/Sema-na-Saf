# Implementation Plan: DHA-Style Government Dashboard for SEMA

## Overview
Replace the existing SEMADashboardComplete.tsx with a production-ready DHA-style government dashboard featuring white/green theme, proper navigation, all 47 Kenyan counties filtering, live Supabase data visualization, and professional data presentation.

## Architecture Decisions

### Single File Approach
**Decision**: Keep entire dashboard as a single 800-1200 line TSX file  
**Rationale**: Current codebase pattern (SEMADashboardComplete.tsx is already ~900 lines), reduces component fragmentation, simplifies state management for dashboard-specific components, acceptable for self-contained views

### Data Strategy  
**Decision**: Derive CHU metrics from Supabase tickets with graceful fallback to calculated demo data  
**Rationale**: useTickets() hook provides tickets[] from live database. When empty, calculate estimates using kenyaCountiesData performance metrics. Map ticket statuses to CHU equivalents: 'open'/'pending' → Functional, 'in-progress' → Semi-Functional, 'closed'/'resolved' → records

### Map Implementation
**Decision**: Simplified approach - skip SVG choropleth map, use enhanced table as primary county view  
**Rationale**: No GeoJSON path data found in kenyaCountiesData.ts. Interactive table with search/filter/export provides better functionality. Can add map in future iteration with proper county boundary data

### State Management
**Decision**: React hooks (useState, useMemo, useCallback) with props drilling  
**Rationale**: No Redux/Zustand in project. Dashboard state is local. Filtering state: selectedCounty, selectedStatus, showCountyDropdown, showStatusDropdown, searchTerm, currentPage

### Color Scheme
**Decision**: Green (#10b981, green-600/green-700) as primary, white backgrounds  
**Rationale**: User requested "white and green as the landing page". Landing page uses green-600 for branding. Government portal aesthetic: white cards, green accents, subtle shadows

## Component Structure (Inline in Single File)

```typescript
SEMADashboardComplete (main component)
├── Navigation Header (lines ~50-90)
├── Hero Section (lines ~92-130)
├── Filter Card (lines ~132-200)
│   ├── County Dropdown (inline)
│   └── Status Dropdown (inline)
├── Stats Cards Row 1 (lines ~202-260)
│   ├── Total CHUs Card
│   ├── Functional CHUs Card
│   └── Semi-Functional CHUs Card
├── Stats Cards Row 2 (lines ~262-320)
│   ├── Non-Functional CHUs Card
│   ├── Community Health Promoters Card
│   └── Households Covered Card
├── Charts Section (lines ~322-480)
│   ├── Donut Chart (Recharts PieChart)
│   └── Horizontal Bar Chart (Recharts BarChart)
├── County Functionality Stacked Bars (lines ~482-580)
├── County Comparison Table (lines ~582-720)
│   ├── Search Bar
│   ├── Export CSV Button
│   └── Pagination Controls
└── Footer (lines ~722-760)
```

## Implementation Plan

- [ ] 1. **Header Navigation and Theme (FEAT-001)**
      Replace navigation header to show only SEMA logo, Dashboard tab, and Logout button.
      Implement click handlers: logo → scrollToTop(), Dashboard → scrollToTop(), Logout → logout() + navigate to '/'.
      Apply white/green color scheme throughout: green-600 primary, white backgrounds, green-100 icon backgrounds.
      Update hero section to "National CHU Overview" with proper breadcrumb.
      Files: src/pages/SEMADashboardComplete.tsx (lines ~1-170)
      Verify: `npm run build:check` passes. Start dev server, login, click logo/dashboard/logout buttons work. All colors are white/green.

- [ ] 2. **County Filter Card with All 47 Counties (FEAT-002)**
      Import allCounties from '../data/kenyaAdministrative'.
      Build county dropdown with all 47 counties + 'All counties' option.
      Build status dropdown: 'All functional statuses', 'Functional', 'Semi-Functional', 'Non-Functional', 'Closed'.
      Implement filtering logic: tickets.filter by county match and status match.
      Add Apply Filters button (calls refetch()) and Clear Filters link (resets to 'All').
      Display active view indicator and "Reporting: Latest available" text.
      Files: src/pages/SEMADashboardComplete.tsx (filter card section, ~lines 172-240)
      Verify: `npm run build:check` passes. County dropdown shows all 47 counties. Select county + status, click Apply Filters, verify stats update. Click Clear Filters, verify reset.

- [ ] 3. **Complete Dashboard Data Visualization (FEAT-003)**
      Build 6 stats cards: Total CHUs, Functional, Semi-Functional, Non-Functional, Health Promoters, Households Covered.
      Implement donut chart using Recharts: PieChart with 4 segments (Functional green, Semi yellow, Non red, Closed gray), center total, legend.
      Implement horizontal bar chart: BarChart showing top 6 counties by ticket count.
      Build stacked county functionality bars: Show top 8-10 counties with horizontal 4-color percentage bars.
      Build interactive county comparison table: 47 counties, columns (County, Total CHUs, Functional Rate with progress bar, Workforce, Households).
      Implement search with debounced filter, CSV export button, pagination (8 per page).
      Use useMemo for data calculations. Derive CHU metrics from tickets with fallback to kenyaCountiesData estimates.
      Files: src/pages/SEMADashboardComplete.tsx (stats, charts, table sections, ~lines 242-720)
      Verify: `npm run build:check` passes. All 6 stats cards display. Donut chart renders with 4 segments. Bar chart shows top 6 counties. County table shows all 47 counties. Search filters in real-time. CSV export downloads file. Pagination shows 8 rows per page and updates correctly.

## Data Calculation Strategy

### CHU Metrics Derivation
1. **From Live Tickets**:
   - Total CHUs = filteredTickets.length
   - Functional = tickets where status is 'open' or 'pending'
   - Semi-Functional = tickets where status is 'in-progress'
   - Non-Functional = tickets where status is 'non-functional'
   - Closed = tickets where status is 'closed' or 'resolved'

2. **Fallback When No Tickets**:
   - Use kenyaCountiesData performance metrics
   - Calculate: county.registered as CHU count baseline
   - Apply rates: functional (80-95%), semi (5-12%), non (2-8%)

3. **County Aggregation**:
   ```typescript
   const countyStats = tickets.reduce((acc, ticket) => {
     const county = ticket.county || 'Unknown'
     if (!acc[county]) acc[county] = { total: 0, functional: 0, ... }
     acc[county].total++
     if (ticket.status === 'open' || ticket.status === 'pending') acc[county].functional++
     return acc
   }, {})
   ```

## State Management Plan

### useState Hooks
- `selectedCounty: string` - Current county filter ('All counties' default)
- `selectedStatus: string` - Current status filter ('All functional statuses' default)
- `showCountyDropdown: boolean` - County dropdown open state
- `showStatusDropdown: boolean` - Status dropdown open state
- `searchTerm: string` - County table search input
- `currentPage: number` - County table pagination (1-based)

### Computed State (useMemo)
- `filteredTickets` - Tickets after applying county/status filters
- `statsData` - Aggregated metrics from filtered tickets
- `topCounties` - Top 6 counties by ticket count for bar chart
- `chartData` - Donut chart data with 4 status segments
- `countyTableData` - All 47 counties with calculated metrics
- `searchedCounties` - Filtered counties after search
- `paginatedCounties` - Current page rows (8 per page)

### Event Handlers (useCallback)
- `scrollToTop` - Smooth scroll to top
- `handleLogout` - Call logout() + navigate
- `applyFilters` - Trigger refetch()
- `clearFilters` - Reset filters + refetch()
- `handleSearch` - Debounced search filter
- `exportCSV` - Generate and download CSV
- `handlePageChange` - Update currentPage

## File Sections in Order

1. **Imports** (lines 1-30)
   - React hooks, Lucide icons (all needed icons)
   - useTickets, useAuth hooks
   - allCounties from kenyaAdministrative
   - Recharts components (PieChart, BarChart, etc.)

2. **Type Definitions** (lines 32-48)
   - CountyStats interface
   - ChartDataPoint interface

3. **Main Component** (lines 50+)
   - Hook declarations (useAuth, useTickets)
   - State declarations (all useState)
   - Computed state (all useMemo)
   - Event handlers (all useCallback)

4. **JSX Return** (lines ~100+)
   - Loading/error overlays
   - Navigation header
   - Hero section
   - Filter card
   - Stats cards (2 rows of 3)
   - Charts section (2 column grid)
   - Stacked bars section
   - County comparison table
   - Footer

## Verification Steps

### Build Verification
```bash
npm run build:check
```
Expected: TypeScript compilation succeeds with 0 errors

### Runtime Verification
```bash
npm run dev
```
1. Navigate to http://localhost:5173
2. Login: admin@safaricom.co.ke / admin123
3. Dashboard loads with all sections visible
4. Click logo → scrolls to top
5. Click Dashboard → scrolls to top
6. Click Logout → returns to landing page
7. Select county filter → stats update
8. Select status filter → charts update
9. Type in table search → filters counties
10. Click Export CSV → downloads file
11. Click pagination buttons → changes displayed rows

### Data Verification
- Stats cards show numbers (0 if no tickets, fallback if data unavailable)
- Donut chart renders with 4 colored segments
- Bar chart shows up to 6 counties
- Stacked bars show percentage breakdown
- County table shows all 47 counties
- Search filters work in real-time
- CSV export includes all visible data
- Pagination shows 8 rows per page

## Key Design Decisions

### Why Single File?
Existing pattern in codebase. Dashboard is self-contained. Reduces context switching. State is local. Simpler than multi-file component tree for this use case.

### Why Skip Map?
No GeoJSON county boundary data in kenyaCountiesData.ts. Would require adding geospatial data. Table with search/filter provides better UX for 47 counties. Map can be future enhancement.

### Why Recharts?
Already in package.json (^2.7.2). Established in project. Good TypeScript support. Handles responsive layouts. Donut chart and bar chart match DHA reference.

### Why Debounced Search?
47 counties is small dataset but sets pattern for scalability. Prevents excessive re-renders during typing. Professional UX pattern. 300ms delay balances responsiveness and performance.

### Why CSV Export?
User explicitly requested professional dashboard. Government portals typically include data export. Simple implementation using Blob API. No new dependencies needed.

## Risk Mitigation

### Empty Tickets Data
- All calculations check for empty array
- Provide fallback using kenyaCountiesData estimates
- Display "No data available" states where appropriate
- Never crash on missing data

### TypeScript Errors
- Explicitly type all interfaces
- Use proper Recharts types
- Handle optional fields (ticket.county?)
- Run build:check after each feature

### Performance
- Use useMemo for expensive calculations
- Debounce search input
- Paginate large tables
- Limit charts to top N items (6 counties, 10 bars)

### Browser Compatibility
- TailwindCSS handles prefixing
- Standard React patterns
- No cutting-edge APIs
- CSV download uses widely-supported Blob API

## Success Criteria

1. Header shows only logo, Dashboard, Logout
2. All colors are white/green theme
3. All 47 counties in filter dropdown
4. Live data flows from Supabase tickets
5. 6 stats cards display correctly
6. Donut chart and bar chart render
7. County table shows all 47 counties
8. Search, export, pagination all work
9. No TypeScript errors
10. No runtime errors in console
