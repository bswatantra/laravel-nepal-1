"use client"
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { BlogSectionSkeleton } from './blog-section-skeleton';

export function BlogSection({ showHeader = true }: { showHeader?: boolean }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`/api/blogs`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data.blogPosts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="blog" className="py-24 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {showHeader && (
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Latest Insights
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              From our blog
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest trends, best practices, and insights from our team of experts.
            </p>
          </div>
        )}

        {loading && <BlogSectionSkeleton />}
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blogs.map((blog: any, index: number) => (
            <Card key={index} className="overflow-hidden py-0">
              <CardContent className="px-0">
                <div className="aspect-video">
                  <Image
                    src={blog.image}
                    alt={blog?.imageAlt}
                    width={400}
                    height={225}
                    className="size-full object-cover dark:invert dark:brightness-[0.95]"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 p-6">
                  {/* Category is not available in the API response */}
                  {/* <p className="text-muted-foreground text-xs tracking-widest uppercase">
                    {blog?.category}
                  </p> */}
                  <a href={blog.link} className="cursor-pointer">
                    <h3 className="text-xl font-bold hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </a>
                  <p className="text-muted-foreground">{blog.description}</p>
                  <a
                    href={blog.link}
                    className="inline-flex items-center gap-2 text-primary hover:underline cursor-pointer"
                  >
                    Learn More
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
