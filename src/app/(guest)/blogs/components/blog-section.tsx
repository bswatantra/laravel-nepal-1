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
import { fetchPostsWithMixedSources } from "@/app/actions/blogs";
import { Suspense, useMemo } from "react";

interface Blog {
  image: string;
  imageAlt?: string;
  source: string;
  link: string;
  title: string;
  description: string;
  [key: string]: any;
}

interface BlogSectionProps {
  showHeader?: boolean;
  showPagination?: boolean;
  limit?: number;
}

function BlogSectionContent({
  showHeader = true,
  showPagination = true,
  limit = 15,
}: BlogSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs", currentPage, limit],
    queryFn: () =>
      fetchPostsWithMixedSources({ page: currentPage, limit: limit + 1 }),
    staleTime: 5 * 60 * 1000,
  });

  const visibleBlogs = blogs.slice(0, limit);

  const handlePrevious = useMemo(
    () => () => {
      const newPage = Math.max(1, currentPage - 1);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`${pathname}?${params.toString()}`);
    },
    [currentPage, searchParams, pathname, router],
  );

  const handleNext = useMemo(
    () => () => {
      const newPage = currentPage + 1;
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`${pathname}?${params.toString()}`);
    },
    [currentPage, searchParams, pathname, router],
  );

  if (isError) {
    return (
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-destructive">
              Error loading blogs:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        {isLoading ? (
          <BlogSectionSkeleton />
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {visibleBlogs?.map((blog: any, index: number) => (
                <Card key={`${blog.link}-${index}`} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video ">
                      <Image
                        src={blog.image}
                        alt={blog.imageAlt || blog.title}
                        width={450}
                        height={225}
                        className="size-full object-cover"
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index < 3}
                      />
                    </div>
                    <div className="space-y-3 p-6">
                      <div>
                        <Badge variant="destructive">{blog.source}</Badge>
                      </div>
                      <Link
                        href={blog.link}
                        className="block group"
                        prefetch={false}
                      >
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground line-clamp-3">
                        {blog.description}
                      </p>
                      <div className="flex justify-between">
                        <Link
                          href={blog.link}
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                          prefetch={false}
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
              <div className="flex justify-center items-center mt-12 gap-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  variant="outline"
                  aria-label="Previous page"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span className="text-lg font-medium" aria-current="page">
                  Page {currentPage}
                </span>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  aria-label="Next page"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export function BlogSection(props: BlogSectionProps) {
  return (
    <Suspense fallback={<BlogSectionSkeleton />}>
      <BlogSectionContent {...props} />
    </Suspense>
  );
}