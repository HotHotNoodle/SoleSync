import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/marketplace/listings - Get marketplace listings with location filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const brand = searchParams.get('brand')
    const size = searchParams.get('size')
    const listingType = searchParams.get('listingType')
    const maxPrice = searchParams.get('maxPrice')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      status: 'active',
    }

    if (brand) {
      where.sneaker = { brand }
    }

    if (size) {
      where.sneaker = { ...where.sneaker, size }
    }

    if (listingType && listingType !== 'all') {
      where.listingType = listingType
    }

    if (maxPrice) {
      where.price = { lte: parseFloat(maxPrice) }
    }

    const listings = await prisma.marketplaceListing.findMany({
      where,
      include: {
        sneaker: true,
        seller: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    // Add mock distance data
    const listingsWithDistance = listings.map((listing) => ({
      ...listing,
      distance: listing.locationLat
        ? Math.round(Math.random() * 50 + 5) // 5-55 miles
        : null,
    }))

    return NextResponse.json({ listings: listingsWithDistance })
  } catch (error) {
    console.error('Error fetching marketplace listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}
