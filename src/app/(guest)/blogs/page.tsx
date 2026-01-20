import type { Metadata } from 'next'
import { BlogSection } from './components/blog-section'


export const metadata: Metadata = {
  title: 'Laravel Nepal - Latest Laravel blogs',
  description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui. Perfect for building modern web applications.',
  keywords: ['admin dashboard', 'react', 'nextjs', 'typescript', 'shadcn/ui', 'tailwind css'],
  openGraph: {
    title: 'Laravel Nepal - Modern Admin Dashboard Template',
    description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laravel Nepal - Modern Admin Dashboard Template',
    description: 'A beautiful and comprehensive admin dashboard template built with React, Next.js, TypeScript, and shadcn/ui.',
  },
}
export default function Blogs() {
  return (
    <BlogSection showHeader={false} />
  )
}
