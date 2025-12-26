import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEMO_USER_ID = 'demo-user-123'

// GET /api/sneakers - Get user's collection
export async function GET() {
  try {
    const sneakers = await prisma.sneaker.findMany({
      where: { userId: DEMO_USER_ID },
      orderBy: { createdAt: 'desc' },
      include: {
        wearLogs: {
          orderBy: { wornDate: 'desc' },
          take: 5,
        },
        maintenanceAlerts: {
          where: { resolved: false },
          orderBy: { severity: 'desc' },
        },
      },
    })

    return NextResponse.json({ sneakers })
  } catch (error) {
    console.error('Error fetching sneakers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sneakers' },
      { status: 500 }
    )
  }
}

// POST /api/sneakers - Add sneaker to collection
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      brand,
      model,
      size,
      colorway,
      purchaseDate,
      purchasePrice,
      currentValue,
      imageUrl,
    } = body

    const sneaker = await prisma.sneaker.create({
      data: {
        userId: DEMO_USER_ID,
        name,
        brand,
        model,
        size,
        colorway,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        purchasePrice: purchasePrice ? parseFloat(purchasePrice) : null,
        currentValue: currentValue ? parseFloat(currentValue) : null,
        imageUrl,
        conditionScore: 100,
        totalWears: 0,
        authenticationStatus: 'pending',
      },
    })

    return NextResponse.json({ sneaker }, { status: 201 })
  } catch (error) {
    console.error('Error creating sneaker:', error)
    return NextResponse.json(
      { error: 'Failed to create sneaker' },
      { status: 500 }
    )
  }
}
