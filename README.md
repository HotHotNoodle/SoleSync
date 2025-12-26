# SoleSync - The AI-Powered Sneaker Ecosystem

A modern, full-stack web application for sneaker enthusiasts to manage their collection, authenticate sneakers with AI, track wear patterns, and connect with other collectors.

![SoleSync Banner](https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=400&fit=crop)

## 🚀 Features

### 1. **Collection Manager**
- Grid and list views of your sneaker collection
- Add sneakers with details (brand, model, size, purchase info)
- Track condition scores and total wears
- Last worn tracking for each pair

### 2. **AI-Powered Authentication**
- Simulated AI analysis with confidence scoring
- Verify sneaker authenticity
- Detailed analysis of stitching, materials, and construction
- Visual feedback with authentication badges

### 3. **Wear Tracking & Gamification**
- Log every wear with location and notes
- Rotation score calculation
- Achievement system with unlockable badges
- Leaderboard to compete with other collectors
- Stats dashboard showing wear patterns

### 4. **Location-Based Marketplace**
- Browse sneakers available for sale or swap
- Filter by brand, size, location, and price
- Distance-based listings
- Swap request functionality

### 5. **Predictive Maintenance**
- AI-powered maintenance alerts
- Severity-based prioritization
- Material degradation tracking
- Recommendations for professional restorers
- Nearby restorer locations

### 6. **Appraisal & Insurance**
- Real-time collection valuation
- Individual sneaker value tracking
- Profit/loss calculations
- Value history charts
- Market trend analysis by brand
- Insurance report generation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: Ready for Clerk integration
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/HotHotNoodle/SoleSync.git
   cd SoleSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed demo data**
   ```bash
   npm run db:seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Configure Environment Variables in Vercel**
   ```
   DATABASE_URL=file:./dev.db
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

### Alternative: Manual Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
SoleSync/
├── app/
│   ├── api/              # API routes
│   │   ├── sneakers/     # Sneaker management
│   │   ├── gamification/ # Stats and achievements
│   │   ├── marketplace/  # Marketplace listings
│   │   ├── maintenance/  # Maintenance alerts
│   │   └── appraisal/    # Collection valuation
│   ├── dashboard/        # Dashboard page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── features/         # Feature components
│   │   └── sneaker-card.tsx
│   └── ui/               # UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed data script
│   └── migrations/       # Database migrations
├── public/               # Static assets
├── .env.example          # Environment variables template
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment config
```

## 🗄️ Database Schema

### Users
- Profile information
- Collection ownership
- Achievements

### Sneakers
- Brand, model, size, colorway
- Purchase info and current value
- Condition score and authentication status
- Wear tracking

### Wear Logs
- Date and location of each wear
- Notes and observations

### Marketplace Listings
- Sale or swap listings
- Location and pricing
- Status tracking

### Achievements
- Badge system
- Unlock dates
- Achievement types

### Maintenance Alerts
- Alert type and severity
- Predicted dates
- Resolution status

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with demo data
- `npm run db:push` - Push schema changes to database

## 🎨 Design System

### Colors
- **Primary**: Cyan (`#06B6D4`)
- **Secondary**: Purple (`#A855F7`)
- **Background**: Black (`#000000`)
- **Cards**: Dark Gray (`#1F2937`)

### Typography
- **Font**: Geist Sans & Geist Mono
- **Headings**: Bold, gradient colors
- **Body**: Regular weight, gray tones

### Components
- Modern card-based layouts
- Smooth hover transitions
- Animated loading states
- Responsive grid systems
- Toast notifications

## 📊 API Endpoints

### Sneakers
- `GET /api/sneakers` - Get user's collection
- `POST /api/sneakers` - Add new sneaker
- `POST /api/sneakers/authenticate` - Authenticate sneaker

### Gamification
- `GET /api/gamification/stats` - Get rotation stats and achievements

### Marketplace
- `GET /api/marketplace/listings` - Get marketplace listings
- `POST /api/marketplace/swap-request` - Initiate swap request

### Maintenance
- `GET /api/maintenance/alerts` - Get maintenance alerts

### Appraisal
- `GET /api/appraisal/value` - Get collection valuation

### Wear Tracking
- `POST /api/wear-log` - Log a wear event

## 🔐 Authentication Setup (Optional)

To enable authentication with Clerk:

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Add environment variables to `.env`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
   CLERK_SECRET_KEY=your_secret_here
   ```
4. Uncomment authentication code in layout files

## 🎯 Demo Data

The seed script includes:
- 10 popular sneakers (Jordan, Yeezy, Dunk, etc.)
- 4 achievement badges
- 3 maintenance alerts
- 3 marketplace listings
- Historical wear logs

## 🐛 Known Issues & Limitations

- Authentication is not currently active (demo mode)
- Image uploads store URLs only (no actual file storage)
- Marketplace features are simulated
- AR try-on feature is not implemented
- Location services are mocked

## 🚧 Future Enhancements

- [ ] Real authentication with Clerk
- [ ] Image upload with Cloudinary
- [ ] Real-time marketplace with WebSockets
- [ ] AR try-on with Three.js
- [ ] PWA capabilities
- [ ] Dark/light mode toggle
- [ ] Mobile app (React Native)
- [ ] Social features (following, sharing)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for sneaker enthusiasts**
