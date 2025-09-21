import { cn } from '@/lib/utils'

interface LogoProps extends Omit<React.ComponentProps<'div'>, 'children'> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={cn('font-minecraft tracking-tight text-xl', className)} {...props}>
      pixelite
    </div>
  )
}
