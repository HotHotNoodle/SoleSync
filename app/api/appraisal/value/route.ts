import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEMO_USER_ID = 'demo-user-123'

// GET /api/appraisal/value - Get collection valuation
export async function GET() {
  try {
    const sneakers = await prisma.sneaker.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { currentValue: 'desc' },
    })

    const totalValue = sneakers.reduce(
      (sum, sneaker) => sum + (sneaker.currentValue || 0),
      0
    )

    const totalPaid = sneakers.reduce(
      (sum, sneaker) => sum + (sneaker.purchasePrice || 0),
      0
    )

    const profitLoss = totalValue - totalPaid
    const profitLossPercentage = totalPaid > 0 ? (profitLoss / totalPaid) * 100 : 0

    // Generate value history (mock data for last 6 months)
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const valueHistory = months.map((month, index) => ({
      month,
      value: Math.round(totalValue * (0.85 + index * 0.03)),
    }))

    // Top 5 most valuable sneakers
    const topSneakers = sneakers.slice(0, 5).map((sneaker) => ({
      id: sneaker.id,
      name: sneaker.name,
      brand: sneaker.brand,
      currentValue: sneaker.currentValue,
      purchasePrice: sneaker.purchasePrice,
      appreciation:
        sneaker.purchasePrice && sneaker.currentValue
          ? ((sneaker.currentValue - sneaker.purchasePrice) / sneaker.purchasePrice) * 100
          : 0,
      imageUrl: sneaker.imageUrl,
    }))

    // Market trends by brand (mock data)
    const brandTrends = [
      { brand: 'Nike', trend: '+12%', value: 1250 },
      { brand: 'Adidas', trend: '+8%', value: 680 },
      { brand: 'New Balance', trend: '+15%', value: 420 },
      { brand: 'Vans', trend: '+3%', value: 180 },
      { brand: 'Converse', trend: '+5%', value: 150 },
    ]

    return NextResponse.json({
      totalValue,
      totalPaid,
      profitLoss,
      profitLossPercentage: parseFloat(profitLossPercentage.toFixed(2)),
      totalSneakers: sneakers.length,
      averageValue: sneakers.length > 0 ? totalValue / sneakers.length : 0,
      valueHistory,
      topSneakers,
      brandTrends,
    })
  } catch (error) {
    console.error('Error fetching collection valuation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch valuation' },
      { status: 500 }
    )
  }
}
