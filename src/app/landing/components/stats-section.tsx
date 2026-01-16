"use client"

import {
  Users,
  BookOpen,
  Code,
  Rocket
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { DotPattern } from '@/components/dot-pattern'


const stats = [
  {
    icon: BookOpen,
    value: 'Learn & Grow',
    label: '',
    description: 'Access tutorials, blogs, and resources in Nepali and English to level up your skills.'
  },
  {
    icon: Users,
    value: 'Connect',
    label: '',
    description: 'Join a vibrant community of Nepali developers, share knowledge, and collaborate.'
  },
  {
    icon: Code,
    value: 'Build Together',
    label: '',
    description: 'Work on open-source projects and contribute to Nepal growing tech ecosystem.'
  },
  {
    icon: Rocket,
    value: 'Launch Careers',
    label: '',
    description: 'Get mentorship, job opportunities, and career guidance from experienced developers.'
  }
]

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 relative">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Why Join Our Community?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Everything you need to succeed as a developer
        </p>
      </div>
      {/* Background with transparency */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/8 via-transparent to-secondary/20" />
      <DotPattern className="opacity-75" size="md" fadeStyle="circle" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center bg-background/60 backdrop-blur-sm border-border/50 py-0"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </h3>
                  <p className="font-semibold text-foreground">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
