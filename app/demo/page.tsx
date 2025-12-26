import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, PlayCircle } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            SoleSync Demo
          </h1>
          <Link href="/dashboard">
            <Button>Try Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Experience SoleSync
            </h2>
            <p className="text-xl text-gray-400">
              Explore all features in our interactive demo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Quick Demo Tour</CardTitle>
                <CardDescription>
                  See all features in action with our pre-loaded demo data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard">
                  <Button className="w-full" size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Launch Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demo Features</CardTitle>
                <CardDescription>
                  What you&apos;ll explore in the demo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">✓</span>
                    10 Pre-loaded sneakers in collection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">✓</span>
                    AI Authentication with confidence scores
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">✓</span>
                    Gamification with badges & leaderboard
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">✓</span>
                    Maintenance alerts & recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-500">✓</span>
                    Collection appraisal & value tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/50">
            <CardHeader>
              <CardTitle>Demo Data Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-500 mb-1">10</div>
                  <div className="text-sm text-gray-400">Sneakers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-500 mb-1">4</div>
                  <div className="text-sm text-gray-400">Achievements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-500 mb-1">3</div>
                  <div className="text-sm text-gray-400">Alerts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-1">$3.1K</div>
                  <div className="text-sm text-gray-400">Total Value</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Ready to manage your own collection?
            </p>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
