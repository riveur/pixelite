import { cn } from '@/lib/utils'

function StatCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="stat-card" className={cn('flex flex-row items-center', className)} {...props} />
  )
}

function StatCardIcon({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stat-card-icon"
      className={cn(
        "p-4 flex items-center justify-center border border-r-0 h-full aspect-square [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function StatCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stat-card-content"
      className={cn('grow py-2 px-4 flex flex-row gap-4 items-center border', className)}
      {...props}
    />
  )
}

export { StatCard, StatCardIcon, StatCardContent }
