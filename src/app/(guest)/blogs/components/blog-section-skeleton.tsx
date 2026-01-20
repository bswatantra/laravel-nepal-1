import { BlogCardSkeleton } from './blog-card-skeleton'

export function BlogSectionSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
            ))}
        </div>
    )
}