# Business Dashboard

A modern business dashboard built with Next.js 14 (App Router) and Tailwind CSS, designed to streamline small business operations with quick ordering, spend insights, and marketing tools.

## Features

### ✅ Quick Order Module

- **Product List**: View frequently ordered products with details (name, SKU, price, last ordered date)
- **Quantity Management**: Easy quantity input with increment/decrement buttons
- **Order Summary**: Real-time order summary with item management and total calculation
- **Add to Cart**: Quick "Add to Order" functionality for each product
- **Order Placement**: Place orders with visual confirmation via toast notifications
- **Toast Notifications**: Success notifications with order details and automatic dismissal

### 🚧 Coming Soon

- **Order History**: View and manage past orders
- **Spend Insights**: Business spending analytics and cost optimization
- **Marketing Toolkit**: Promotional materials and campaign management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **Architecture**: Clean component-based architecture with TypeScript interfaces

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── DashboardLayout.tsx
│   │   ├── ProductList.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── Toast.tsx
│   │   └── ToastContainer.tsx
│   ├── dashboard/           # Dashboard pages
│   │   ├── quick-order/     # Quick Order module
│   │   ├── orders/          # Order History (placeholder)
│   │   ├── insights/        # Spend Insights (placeholder)
│   │   ├── marketing/       # Marketing Toolkit (placeholder)
│   │   └── layout.tsx       # Dashboard layout wrapper
│   ├── lib/                 # Utilities and data
│   │   └── mock-data.ts     # Mock product data
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page (redirects to dashboard)
├── types/
│   └── index.ts             # TypeScript type definitions
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Components

### DashboardLayout

- Responsive sidebar navigation
- Top bar with user info
- Clean, modern design with Tailwind CSS

### ProductList

- Displays frequently ordered products
- Quantity input controls
- Product details (SKU, price, category, last ordered date)
- Add to order functionality

### OrderSummary

- Real-time order summary
- Item quantity management
- Remove items functionality
- Order total calculation
- Order placement with toast notifications
- Sticky positioning for better UX

### Toast System

- Success, error, and info notification types
- Automatic dismissal with customizable duration
- Smooth slide-in/slide-out animations
- Manual close functionality
- Context-based toast management

## Data Management

The application uses mock data stored in `src/app/lib/mock-data.ts` with realistic business supply products. The data structure includes:

- Product information (name, SKU, price, category)
- Order management (items, quantities, totals)
- TypeScript interfaces for type safety

## Design Principles

- **Clean Architecture**: Separation of concerns with clear component boundaries
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **User Experience**: Intuitive navigation and clear visual hierarchy
- **Scalability**: Modular structure ready for additional features

## Future Enhancements

- Order persistence and backend integration
- User authentication and role management
- Advanced analytics and reporting
- Inventory management
- Supplier integration
- Mobile app development

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Contributing

This project follows clean code principles and uses TypeScript for type safety. When contributing:

1. Maintain the existing component structure
2. Use TypeScript interfaces for all data types
3. Follow Tailwind CSS conventions for styling
4. Ensure responsive design compatibility
5. Add proper error handling and loading states

## License

This project is built for educational and demonstration purposes.
