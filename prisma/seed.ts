import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DEMO_USER_ID = 'demo-user-123'

const popularSneakers = [
  {
    name: 'Air Jordan 1 Retro High',
    brand: 'Nike',
    model: 'Air Jordan 1',
    size: '10',
    colorway: 'Chicago',
    purchaseDate: new Date('2023-03-15'),
    purchasePrice: 180,
    currentValue: 650,
    conditionScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500',
    totalWears: 15,
    lastWorn: new Date('2024-12-20'),
    authenticationStatus: 'authenticated',
    authenticationScore: 98.5,
  },
  {
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    model: 'Yeezy 350',
    size: '10.5',
    colorway: 'Zebra',
    purchaseDate: new Date('2023-06-20'),
    purchasePrice: 220,
    currentValue: 320,
    conditionScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500',
    totalWears: 25,
    lastWorn: new Date('2024-12-18'),
    authenticationStatus: 'authenticated',
    authenticationScore: 96.2,
  },
  {
    name: 'Nike Dunk Low',
    brand: 'Nike',
    model: 'Dunk Low',
    size: '10',
    colorway: 'Panda',
    purchaseDate: new Date('2023-08-10'),
    purchasePrice: 110,
    currentValue: 185,
    conditionScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500',
    totalWears: 8,
    lastWorn: new Date('2024-12-15'),
    authenticationStatus: 'authenticated',
    authenticationScore: 99.1,
  },
  {
    name: 'Air Force 1 Low',
    brand: 'Nike',
    model: 'Air Force 1',
    size: '10',
    colorway: 'White',
    purchaseDate: new Date('2022-12-05'),
    purchasePrice: 90,
    currentValue: 115,
    conditionScore: 78,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    totalWears: 45,
    lastWorn: new Date('2024-12-22'),
    authenticationStatus: 'authenticated',
    authenticationScore: 97.8,
  },
  {
    name: 'New Balance 550',
    brand: 'New Balance',
    model: '550',
    size: '10.5',
    colorway: 'White Green',
    purchaseDate: new Date('2023-11-12'),
    purchasePrice: 130,
    currentValue: 160,
    conditionScore: 90,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500',
    totalWears: 12,
    lastWorn: new Date('2024-12-10'),
    authenticationStatus: 'authenticated',
    authenticationScore: 98.0,
  },
  {
    name: 'Travis Scott x Air Jordan 1 Low',
    brand: 'Nike',
    model: 'Air Jordan 1 Low',
    size: '10',
    colorway: 'Reverse Mocha',
    purchaseDate: new Date('2023-04-25'),
    purchasePrice: 950,
    currentValue: 1250,
    conditionScore: 96,
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500',
    totalWears: 5,
    lastWorn: new Date('2024-12-05'),
    authenticationStatus: 'authenticated',
    authenticationScore: 99.5,
  },
  {
    name: 'Vans Old Skool',
    brand: 'Vans',
    model: 'Old Skool',
    size: '10',
    colorway: 'Black White',
    purchaseDate: new Date('2022-07-18'),
    purchasePrice: 65,
    currentValue: 75,
    conditionScore: 75,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
    totalWears: 60,
    lastWorn: new Date('2024-12-23'),
    authenticationStatus: 'authenticated',
    authenticationScore: 95.0,
  },
  {
    name: 'Converse Chuck Taylor All Star',
    brand: 'Converse',
    model: 'Chuck Taylor',
    size: '10',
    colorway: 'Optical White',
    purchaseDate: new Date('2023-01-30'),
    purchasePrice: 55,
    currentValue: 60,
    conditionScore: 82,
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500',
    totalWears: 35,
    lastWorn: new Date('2024-12-19'),
    authenticationStatus: 'authenticated',
    authenticationScore: 94.5,
  },
  {
    name: 'Air Max 90',
    brand: 'Nike',
    model: 'Air Max 90',
    size: '10.5',
    colorway: 'Infrared',
    purchaseDate: new Date('2023-09-08'),
    purchasePrice: 140,
    currentValue: 175,
    conditionScore: 89,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    totalWears: 18,
    lastWorn: new Date('2024-12-12'),
    authenticationStatus: 'authenticated',
    authenticationScore: 97.2,
  },
  {
    name: 'Adidas Samba',
    brand: 'Adidas',
    model: 'Samba',
    size: '10',
    colorway: 'Black White',
    purchaseDate: new Date('2023-10-20'),
    purchasePrice: 100,
    currentValue: 120,
    conditionScore: 93,
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
    totalWears: 10,
    lastWorn: new Date('2024-12-08'),
    authenticationStatus: 'authenticated',
    authenticationScore: 98.8,
  },
]

const achievements = [
  {
    achievementType: 'rotation_master',
    title: 'Rotation Master',
    description: 'Wore 10 different sneakers in 10 days',
    badgeIcon: '🔄',
  },
  {
    achievementType: 'vintage_collector',
    title: 'Vintage Collector',
    description: 'Own a sneaker over 2 years old',
    badgeIcon: '🏆',
  },
  {
    achievementType: 'authentication_pro',
    title: 'Authentication Pro',
    description: 'Authenticated 5 sneakers',
    badgeIcon: '✅',
  },
  {
    achievementType: 'value_keeper',
    title: 'Value Keeper',
    description: 'Maintained condition score above 90',
    badgeIcon: '💎',
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // Create demo user
  const user = await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: {
      id: DEMO_USER_ID,
      email: 'demo@solesync.com',
      username: 'sneakerhead_demo',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  })

  console.log('✅ Created demo user:', user.username)

  // Create sneakers
  const createdSneakers = []
  for (const sneaker of popularSneakers) {
    const created = await prisma.sneaker.create({
      data: {
        ...sneaker,
        userId: user.id,
      },
    })
    createdSneakers.push(created)
    console.log(`✅ Created sneaker: ${sneaker.name}`)
  }

  // Create wear logs for sneakers
  const wearLogDates = [
    new Date('2024-12-01'),
    new Date('2024-12-05'),
    new Date('2024-12-10'),
    new Date('2024-12-15'),
    new Date('2024-12-20'),
  ]

  for (const sneaker of createdSneakers.slice(0, 5)) {
    for (const date of wearLogDates) {
      await prisma.wearLog.create({
        data: {
          sneakerId: sneaker.id,
          wornDate: date,
          location: 'Downtown',
        },
      })
    }
  }

  console.log('✅ Created wear logs')

  // Create marketplace listings
  const listingsData = [
    {
      sneakerId: createdSneakers[4].id,
      listingType: 'swap',
      locationLat: 40.7128,
      locationLng: -74.0060,
      locationName: 'New York, NY',
    },
    {
      sneakerId: createdSneakers[6].id,
      listingType: 'sell',
      price: 75,
      locationLat: 34.0522,
      locationLng: -118.2437,
      locationName: 'Los Angeles, CA',
    },
    {
      sneakerId: createdSneakers[7].id,
      listingType: 'both',
      price: 60,
      locationLat: 41.8781,
      locationLng: -87.6298,
      locationName: 'Chicago, IL',
    },
  ]

  for (const listing of listingsData) {
    await prisma.marketplaceListing.create({
      data: {
        ...listing,
        sellerId: user.id,
      },
    })
  }

  console.log('✅ Created marketplace listings')

  // Create achievements
  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: {
        ...achievement,
        userId: user.id,
      },
    })
  }

  console.log('✅ Created achievements')

  // Create maintenance alerts
  const alerts = [
    {
      sneakerId: createdSneakers[1].id,
      alertType: 'cleaning',
      severity: 'medium',
      message: 'Due for deep cleaning based on wear frequency',
      predictedDate: new Date('2025-01-15'),
    },
    {
      sneakerId: createdSneakers[3].id,
      alertType: 'sole_separation',
      severity: 'high',
      message: 'Sole showing early signs of separation. Visit restorer soon.',
      predictedDate: new Date('2025-02-01'),
    },
    {
      sneakerId: createdSneakers[6].id,
      alertType: 'color_fading',
      severity: 'low',
      message: 'Canvas showing slight color fading. Consider protective spray.',
      predictedDate: new Date('2025-03-01'),
    },
  ]

  for (const alert of alerts) {
    await prisma.maintenanceAlert.create({
      data: alert,
    })
  }

  console.log('✅ Created maintenance alerts')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
