import { Spinner } from '@/features/core/components/ui/spinner'
import { cn } from '@/lib/utils'

export function Loading({ children, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col items-center gap-4 [&_svg]:size-16', className)} {...props}>
      <Spinner variant="bars" />
      {children}
    </div>
  )
}
