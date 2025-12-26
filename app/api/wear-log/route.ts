import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/wear-log - Log a wear event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sneakerId, wornDate, location, notes } = body

    // Create wear log
    const wearLog = await prisma.wearLog.create({
      data: {
        sneakerId,
        wornDate: wornDate ? new Date(wornDate) : new Date(),
        location,
        notes,
      },
    })

    // Update sneaker's total wears and last worn
    await prisma.sneaker.update({
      where: { id: sneakerId },
      data: {
        totalWears: { increment: 1 },
        lastWorn: new Date(),
        // Decrease condition score slightly with each wear
        conditionScore: { decrement: 0.5 },
      },
    })

    return NextResponse.json({ wearLog }, { status: 201 })
  } catch (error) {
    console.error('Error logging wear:', error)
    return NextResponse.json(
      { error: 'Failed to log wear event' },
      { status: 500 }
    )
  }
}
