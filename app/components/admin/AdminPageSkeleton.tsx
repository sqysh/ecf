import Skeleton from '../ui/Skeleton'

export default function AdminPageSkeleton() {
  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-accent-dark border-b border-neutral-200 dark:border-border-dark px-8 h-15.75 flex items-center justify-between sticky top-0 z-10">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </header>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-accent-dark border border-neutral-200 dark:border-border-dark p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>

        {/* Horizontal content rows */}
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </>
  )
}
