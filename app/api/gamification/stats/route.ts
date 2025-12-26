import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEMO_USER_ID = 'demo-user-123'

// GET /api/gamification/stats - Get user rotation stats and achievements
export async function GET() {
  try {
    // Get user's sneakers
    const sneakers = await prisma.sneaker.findMany({
      where: { userId: DEMO_USER_ID },
      include: {
        wearLogs: {
          where: {
            wornDate: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        },
      },
    })

    // Calculate rotation score (0-100)
    const totalSneakers = sneakers.length
    const wearsLast30Days = sneakers.reduce(
      (sum, sneaker) => sum + sneaker.wearLogs.length,
      0
    )
    const sneakersWornLast30Days = sneakers.filter(
      (sneaker) => sneaker.wearLogs.length > 0
    ).length

    const rotationPercentage =
      totalSneakers > 0 ? (sneakersWornLast30Days / totalSneakers) * 100 : 0
    const rotationScore = Math.min(
      100,
      Math.round(rotationPercentage * 0.7 + (wearsLast30Days / totalSneakers) * 30)
    )

    // Get achievements
    const achievements = await prisma.achievement.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { unlockedAt: 'desc' },
    })

    // Generate leaderboard (mock data)
    const leaderboard = [
      {
        rank: 1,
        username: 'sneaker_king',
        rotationScore: 98,
        totalWears: 245,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=felix',
      },
      {
        rank: 2,
        username: 'sole_collector',
        rotationScore: 95,
        totalWears: 230,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aneka',
      },
      {
        rank: 3,
        username: 'sneakerhead_demo',
        rotationScore,
        totalWears: wearsLast30Days,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        isCurrentUser: true,
      },
      {
        rank: 4,
        username: 'kickz_master',
        rotationScore: 89,
        totalWears: 198,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sam',
      },
      {
        rank: 5,
        username: 'fresh_prince',
        rotationScore: 85,
        totalWears: 175,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=will',
      },
    ]

    return NextResponse.json({
      rotationScore,
      wearsLast30Days,
      sneakersWornLast30Days,
      totalSneakers,
      achievements,
      leaderboard,
    })
  } catch (error) {
    console.error('Error fetching gamification stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
