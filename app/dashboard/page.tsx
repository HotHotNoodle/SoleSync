'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SneakerCard } from '@/components/features/sneaker-card'
import { Badge } from '@/components/ui/badge'
import { 
  Package,
  Scan,
  Trophy,
  ShoppingBag,
  Wrench,
  DollarSign,
  ArrowLeft,
  Grid3x3,
  List,
  Plus,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type TabType = 'collection' | 'authenticate' | 'gamification' | 'marketplace' | 'maintenance' | 'appraisal'

interface Sneaker {
  id: string
  name: string
  brand: string
  model: string
  size: string
  imageUrl?: string | null
  conditionScore: number
  currentValue?: number | null
  lastWorn?: Date | null
  authenticationStatus: string
  totalWears: number
}

interface Stats {
  rotationScore: number
  wearsLast30Days: number
  sneakersWornLast30Days: number
  totalSneakers: number
  achievements: Achievement[]
  leaderboard: LeaderboardUser[]
}

interface Achievement {
  id: string
  title: string
  description: string
  badgeIcon: string
}

interface LeaderboardUser {
  rank: number
  username: string
  rotationScore: number
  totalWears: number
  isCurrentUser?: boolean
}

interface MaintenanceAlert {
  id: string
  alertType: string
  severity: string
  message: string
  sneaker: {
    name: string
    brand: string
  }
}

interface Valuation {
  totalValue: number
  totalPaid: number
  profitLoss: number
  profitLossPercentage: number
  totalSneakers: number
  averageValue: number
  valueHistory: { month: string; value: number }[]
  topSneakers: TopSneaker[]
}

interface TopSneaker {
  id: string
  name: string
  brand: string
  currentValue: number
  appreciation: number
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('collection')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sneakers, setSneakers] = useState<Sneaker[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([])
  const [valuation, setValuation] = useState<Valuation | null>(null)

  useEffect(() => {
    fetchSneakers()
    fetchStats()
    fetchAlerts()
    fetchValuation()
  }, [])

  const fetchSneakers = async () => {
    try {
      const res = await fetch('/api/sneakers')
      const data = await res.json()
      setSneakers(data.sneakers)
    } catch (error) {
      console.error('Error fetching sneakers:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/gamification/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/maintenance/alerts')
      const data = await res.json()
      setAlerts(data.alerts)
    } catch (error) {
      console.error('Error fetching alerts:', error)
    }
  }

  const fetchValuation = async () => {
    try {
      const res = await fetch('/api/appraisal/value')
      const data = await res.json()
      setValuation(data)
    } catch (error) {
      console.error('Error fetching valuation:', error)
    }
  }

  const tabs = [
    { id: 'collection' as TabType, label: 'Collection', icon: Package },
    { id: 'authenticate' as TabType, label: 'Authenticate', icon: Scan },
    { id: 'gamification' as TabType, label: 'Stats & Badges', icon: Trophy },
    { id: 'marketplace' as TabType, label: 'Marketplace', icon: ShoppingBag },
    { id: 'maintenance' as TabType, label: 'Maintenance', icon: Wrench },
    { id: 'appraisal' as TabType, label: 'Appraisal', icon: DollarSign },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/20'
      case 'low': return 'text-blue-500 bg-blue-500/20'
      default: return 'text-gray-500 bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-gray-400">Manage your sneaker collection</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost">Demo User</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Tab */}
        {activeTab === 'collection' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">My Collection</h2>
                <p className="text-gray-400">{sneakers.length} sneakers</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sneaker
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading collection...</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {sneakers.map((sneaker) => (
                  <SneakerCard key={sneaker.id} sneaker={sneaker} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Authenticate Tab */}
        {activeTab === 'authenticate' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>AI Authentication</CardTitle>
                <CardDescription>
                  Upload a photo of your sneaker to verify its authenticity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                  <Scan className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Recent Authentications</h3>
                  <div className="space-y-3">
                    {sneakers.filter(s => s.authenticationStatus === 'authenticated').slice(0, 3).map((sneaker) => (
                      <div key={sneaker.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div>
                          <div className="font-medium">{sneaker.name}</div>
                          <div className="text-sm text-gray-400">{sneaker.brand}</div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-500">98% Match</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Gamification Tab */}
        {activeTab === 'gamification' && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rotation Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-cyan-500 mb-2">
                    {stats.rotationScore}
                  </div>
                  <p className="text-sm text-gray-400">
                    {stats.sneakersWornLast30Days} of {stats.totalSneakers} worn this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Wears</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-500 mb-2">
                    {stats.wearsLast30Days}
                  </div>
                  <p className="text-sm text-gray-400">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {stats.achievements.length}
                  </div>
                  <p className="text-sm text-gray-400">Badges unlocked</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.leaderboard.map((user: LeaderboardUser) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        user.isCurrentUser ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-gray-800/50'
                      }`}
                    >
                      <div className="font-bold text-xl w-8">{user.rank}</div>
                      <div className="flex-1">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-gray-400">{user.totalWears} wears</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyan-500">{user.rotationScore}</div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {stats.achievements.map((achievement: Achievement) => (
                    <div key={achievement.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-3xl mb-2">{achievement.badgeIcon}</div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-gray-400">{achievement.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>
                  Buy, sell, or swap sneakers with collectors near you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">Marketplace feature coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Connect with local sneakerheads and expand your collection
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Maintenance Alerts
                </CardTitle>
                <CardDescription>
                  {alerts.length} items need attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-semibold">{alert.sneaker.name}</div>
                          <div className="text-sm text-gray-400">{alert.sneaker.brand}</div>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{alert.message}</p>
                      <div className="text-xs text-gray-500">
                        Alert Type: {alert.alertType.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Appraisal Tab */}
        {activeTab === 'appraisal' && valuation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-cyan-500 mb-2">
                    ${valuation.totalValue.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-400">
                    Across {valuation.totalSneakers} sneakers
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profit/Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-4xl font-bold mb-2 ${valuation.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {valuation.profitLoss >= 0 ? '+' : ''}${valuation.profitLoss.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-400">
                    {valuation.profitLossPercentage >= 0 ? '+' : ''}{valuation.profitLossPercentage.toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-500 mb-2">
                    ${valuation.averageValue.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-400">Per sneaker</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Collection Value History</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={valuation.valueHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top 5 Most Valuable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {valuation.topSneakers.map((sneaker: TopSneaker, index: number) => (
                    <div key={sneaker.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-gray-500">#{index + 1}</div>
                        <div>
                          <div className="font-medium">{sneaker.name}</div>
                          <div className="text-sm text-gray-400">{sneaker.brand}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyan-500">${sneaker.currentValue}</div>
                        {sneaker.appreciation !== 0 && (
                          <div className={`text-xs ${sneaker.appreciation > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {sneaker.appreciation > 0 ? '+' : ''}{sneaker.appreciation.toFixed(1)}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
