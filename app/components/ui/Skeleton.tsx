export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-neutral-200 dark:bg-border-dark animate-pulse ${className}`} aria-hidden="true" />
}
