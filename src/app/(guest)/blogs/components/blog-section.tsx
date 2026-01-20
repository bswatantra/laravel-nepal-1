"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogSectionSkeleton } from "./blog-section-skeleton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import { Button } from "@/components/ui/button";

async function fetchBlogs({
  page,
  limit,
}: {
  page: number;
  limit?: number;
}) {
  const params = new URLSearchParams({ page: String(page) });
  if (limit !== undefined) params.set('limit', String(limit));
  const res = await fetch(`/api/blogs?${params}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.blogs;
}

export function BlogSection({
  showHeader = true,
  showPagination = true,
  limit,
}: {
  showHeader?: boolean;
  showPagination?: boolean;
  limit?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs", currentPage, limit],
    queryFn: () => fetchBlogs({ page: currentPage, limit }),
  });

  const handlePrevious = () => {
    const newPage = Math.max(1, currentPage - 1);
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
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
              Stay updated with the latest trends, best practices, and insights
              from our team of experts.
            </p>
          </div>
        )}

        {isLoading && <BlogSectionSkeleton />}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blogs?.map((blog: any, index: number) => (
            <Card key={index} className="overflow-hidden py-0">
              <CardContent className="px-0">
                <div className="aspect-video">
                  <Image
                    src={blog.image}
                    alt={blog?.imageAlt}
                    width={450}
                    height={225}
                    className="size-full dark:invert dark:brightness-[0.95]"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <p className="text-muted-foreground text-xs tracking-widest uppercase">
                    <Badge variant="destructive">{blog.source}</Badge>
                  </p>
                  <a href={blog.link} className="cursor-pointer">
                    <h3 className="text-xl font-bold hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </a>
                  <p className="text-muted-foreground">{blog.description}</p>
                  <div className="flex justify-between">
                    <Link
                      href={blog.link}
                      className="inline-flex items-center gap-2 text-primary hover:underline cursor-pointer"
                    >
                      Learn More
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Pagination */}
        {showPagination && blogs?.length > 0 && (
          <div className="flex justify-center items-center mt-12 space-x-4">
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <span className="text-lg font-medium">{currentPage}</span>
            <Button
              onClick={handleNext}
              disabled={!blogs || blogs.length < 15}
              variant="outline"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
