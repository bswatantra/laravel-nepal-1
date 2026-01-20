import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BlogCardSkeleton() {
    return (
        <Card className="overflow-hidden py-0">
            <CardContent className="px-0">
                {/* Image skeleton */}
                <Skeleton className="aspect-video w-full" />

                <div className="space-y-3 p-6">
                    {/* Title */}
                    <Skeleton className="h-6 w-3/4" />

                    {/* Description */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />

                    {/* CTA */}
                    <Skeleton className="h-4 w-24" />
                </div>
            </CardContent>
        </Card>
    )
}
