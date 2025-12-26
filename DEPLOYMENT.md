# SoleSync Deployment Guide

## Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/HotHotNoodle/SoleSync.git
cd SoleSync

# Install dependencies
npm install

# Set up database
npx prisma migrate dev

# Seed demo data
npm run db:seed

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (Already done)

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `HotHotNoodle/SoleSync`
   - Configure:
     - Framework: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Environment Variables**
   Add to Vercel dashboard:
   ```
   DATABASE_URL=file:./dev.db
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Access your live site!

## Features Overview

### 1. Landing Page (/)
- Animated hero section
- Feature showcase
- Statistics display
- CTA buttons

### 2. Demo Page (/demo)
- Feature overview
- Demo data stats
- Quick start guide

### 3. Dashboard (/dashboard)
**Tabs:**
- Collection Manager
- AI Authentication
- Stats & Badges
- Marketplace
- Maintenance
- Appraisal

### 4. API Endpoints
- GET `/api/sneakers` - List collection
- POST `/api/sneakers` - Add sneaker
- POST `/api/sneakers/authenticate` - AI auth
- POST `/api/wear-log` - Log wear
- GET `/api/gamification/stats` - Stats
- GET `/api/marketplace/listings` - Listings
- POST `/api/marketplace/swap-request` - Swap
- GET `/api/maintenance/alerts` - Alerts
- GET `/api/appraisal/value` - Valuation

## Demo Data

### Sneakers (10)
1. Air Jordan 1 Retro High - Chicago ($650)
2. Yeezy Boost 350 V2 - Zebra ($320)
3. Nike Dunk Low - Panda ($185)
4. Air Force 1 Low - White ($115)
5. New Balance 550 ($160)
6. Travis Scott x Air Jordan 1 Low ($1,250)
7. Vans Old Skool ($75)
8. Converse Chuck Taylor ($60)
9. Air Max 90 - Infrared ($175)
10. Adidas Samba ($120)

### Achievements (4)
- Rotation Master
- Vintage Collector
- Authentication Pro
- Value Keeper

### Alerts (3)
- Deep cleaning needed
- Sole separation warning
- Color fading detected

## Tech Stack

- **Framework**: Next.js 14.2.35
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.1
- **Database**: Prisma 5.x + SQLite
- **Charts**: Recharts 3.6.0
- **Animations**: Framer Motion 12.x
- **Icons**: Lucide React 0.562.0
- **Date Utils**: date-fns 4.1.0

## Performance

- Build Time: ~60 seconds
- First Load JS: 87.3 kB (shared)
- Landing Page: 145 kB
- Dashboard: 264 kB
- Lighthouse Score: 90+ (expected)

## Maintenance

### Update Demo Data
```bash
# Edit prisma/seed.ts
# Then run:
npm run db:seed
```

### Database Changes
```bash
# Edit prisma/schema.prisma
# Then run:
npx prisma migrate dev --name your_change_name
npx prisma generate
```

### Add New Features
1. Create component in `components/features/`
2. Add API route in `app/api/`
3. Update dashboard tab in `app/dashboard/page.tsx`
4. Test locally
5. Deploy

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Issues
```bash
# Reset database
rm dev.db
npx prisma migrate dev
npm run db:seed
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
npm run dev
```

## Security

- ✅ CodeQL scan passed (0 vulnerabilities)
- ✅ No exposed secrets
- ✅ Environment variables properly configured
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection (React escaping)

## Future Enhancements

1. Real authentication (Clerk integration)
2. Image upload (Cloudinary)
3. Real-time features (WebSockets)
4. AR try-on (Three.js)
5. PWA capabilities
6. Dark/light mode toggle
7. Mobile app (React Native)
8. Social features

## Support

- GitHub Issues: Report bugs
- Documentation: See README.md
- Email: Create issue for contact

## License

MIT - Free to use and modify

---

**Built with ❤️ for sneaker enthusiasts**

Last Updated: December 2024
