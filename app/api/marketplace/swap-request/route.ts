import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEMO_USER_ID = 'demo-user-123'

// POST /api/marketplace/swap-request - Initiate swap
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { listingId, message } = body

    // Get the listing to find the receiver
    const listing = await prisma.marketplaceListing.findUnique({
      where: { id: listingId },
      include: { seller: true },
    })

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      )
    }

    const swapRequest = await prisma.swapRequest.create({
      data: {
        listingId,
        requesterId: DEMO_USER_ID,
        receiverId: listing.sellerId,
        message,
        status: 'pending',
      },
    })

    return NextResponse.json({ swapRequest }, { status: 201 })
  } catch (error) {
    console.error('Error creating swap request:', error)
    return NextResponse.json(
      { error: 'Failed to create swap request' },
      { status: 500 }
    )
  }
}
