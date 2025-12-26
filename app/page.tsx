'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sparkles, 
  View, 
  MapPin, 
  Trophy, 
  Shield, 
  ArrowRight,
  Scan,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Authentication",
    description: "Advanced machine learning algorithms verify authenticity with 98%+ accuracy, analyzing stitching, materials, and construction details.",
    color: "text-cyan-500",
  },
  {
    icon: View,
    title: "AR Virtual Try-On",
    description: "See how sneakers look on your feet before buying. Match them with your wardrobe using augmented reality technology.",
    color: "text-purple-500",
  },
  {
    icon: MapPin,
    title: "Location-Based Marketplace",
    description: "Buy, sell, or swap sneakers with collectors near you. Filter by distance to find the best local deals.",
    color: "text-green-500",
  },
  {
    icon: Trophy,
    title: "Wear Tracking & Gamification",
    description: "Track every wear, optimize rotation, earn badges, and compete on leaderboards. Make sneaker care fun!",
    color: "text-yellow-500",
  },
  {
    icon: Shield,
    title: "Insurance & Appraisal",
    description: "Real-time valuation tracking and comprehensive insurance coverage. Protect your investment with confidence.",
    color: "text-red-500",
  },
]

const stats = [
  { icon: Scan, value: "98%", label: "Authentication Accuracy" },
  { icon: Users, value: "50K+", label: "Active Collectors" },
  { icon: TrendingUp, value: "$2M+", label: "Collection Value Tracked" },
  { icon: Calendar, value: "1M+", label: "Wears Logged" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
          >
            SoleSync
          </motion.div>
          
          <div className="flex items-center gap-4">
            <Link href="/demo">
              <Button variant="ghost">Try Demo</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-glow">
              The Future of
              <br />
              Sneaker Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              AI-powered authentication, predictive maintenance, and a vibrant marketplace—all in one ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Start Your Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Animated Sneaker Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="relative h-64 md:h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 text-8xl md:text-9xl animate-float">
                👟
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                <div className="text-3xl md:text-4xl font-bold mb-1 text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400">
              Five powerful features to revolutionize your sneaker collection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <CardHeader>
                    <feature.icon className={`h-12 w-12 mb-4 ${feature.color}`} />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-cyan-500/10 to-transparent">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Elevate Your Collection?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of sneakerheads managing their collections with SoleSync
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-12">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 SoleSync. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-cyan-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cyan-500 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-cyan-500 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

