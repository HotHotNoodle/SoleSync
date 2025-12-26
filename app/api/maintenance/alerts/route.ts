import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEMO_USER_ID = 'demo-user-123'

// GET /api/maintenance/alerts - Get predictive maintenance alerts
export async function GET() {
  try {
    const alerts = await prisma.maintenanceAlert.findMany({
      where: {
        sneaker: {
          userId: DEMO_USER_ID,
        },
        resolved: false,
      },
      include: {
        sneaker: true,
      },
      orderBy: [
        { severity: 'desc' },
        { predictedDate: 'asc' },
      ],
    })

    // Add recommendations for each alert
    const alertsWithRecommendations = alerts.map((alert) => ({
      ...alert,
      recommendations: getMaintenanceRecommendations(alert.alertType),
      nearbyRestorers: [
        {
          name: 'Premium Sneaker Care',
          distance: '2.3 miles',
          rating: 4.8,
          specialties: ['Sole Repair', 'Deep Cleaning'],
        },
        {
          name: 'The Sneaker Clinic',
          distance: '5.7 miles',
          rating: 4.9,
          specialties: ['Restoration', 'Custom Work'],
        },
        {
          name: 'Fresh Kicks Restoration',
          distance: '8.1 miles',
          rating: 4.7,
          specialties: ['Cleaning', 'Painting'],
        },
      ],
    }))

    return NextResponse.json({ alerts: alertsWithRecommendations })
  } catch (error) {
    console.error('Error fetching maintenance alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}

function getMaintenanceRecommendations(alertType: string): string[] {
  const recommendations: Record<string, string[]> = {
    cleaning: [
      'Use sneaker-specific cleaning solution',
      'Avoid washing machine',
      'Air dry away from direct heat',
    ],
    sole_separation: [
      'Visit a professional restorer immediately',
      'Avoid wearing until repaired',
      'Consider glue adhesive as temporary fix',
    ],
    color_fading: [
      'Apply protective spray regularly',
      'Store away from sunlight',
      'Consider professional color restoration',
    ],
    material_degradation: [
      'Condition leather regularly',
      'Use sneaker trees to maintain shape',
      'Rotate wear to reduce stress',
    ],
  }

  return recommendations[alertType] || ['Consult a professional restorer']
}
