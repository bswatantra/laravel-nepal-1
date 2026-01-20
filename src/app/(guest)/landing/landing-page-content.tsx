"use client"
import { HeroSection } from './components/hero-section'
import { StatsSection } from './components/stats-section'
import { BlogSection } from '../blogs/components/blog-section'
import { ContactSection } from './components/contact-section'
import { FaqSection } from './components/faq-section'

export function LandingPageContent() {

  return (
    <>
      <HeroSection />
      <StatsSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}
