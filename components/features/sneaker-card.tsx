'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, TrendingUp, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

interface SneakerCardProps {
  sneaker: {
    id: string
    name: string
    brand: string
    imageUrl?: string | null
    conditionScore: number
    currentValue?: number | null
    lastWorn?: Date | null
    authenticationStatus: string
    totalWears: number
  }
  onClick?: () => void
}

export function SneakerCard({ sneaker, onClick }: SneakerCardProps) {
  const getConditionColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card
      className="cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 bg-gray-800/50">
        {sneaker.imageUrl ? (
          <Image
            src={sneaker.imageUrl}
            alt={sneaker.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            👟
          </div>
        )}
        {sneaker.authenticationStatus === 'authenticated' && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{sneaker.name}</h3>
            <p className="text-sm text-gray-400">{sneaker.brand}</p>
          </div>
          {sneaker.currentValue && (
            <div className="text-right">
              <div className="text-sm text-gray-400">Value</div>
              <div className="font-bold text-cyan-500">
                ${sneaker.currentValue}
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Condition</span>
          <span className={`font-semibold ${getConditionColor(sneaker.conditionScore)}`}>
            {sneaker.conditionScore}/100
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Last Worn
          </span>
          <span className="font-medium">
            {sneaker.lastWorn
              ? format(new Date(sneaker.lastWorn), 'MMM d')
              : 'Never'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Total Wears
          </span>
          <span className="font-medium">{sneaker.totalWears}</span>
        </div>
      </CardContent>
    </Card>
  )
}
