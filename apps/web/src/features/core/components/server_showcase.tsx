import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { PixelImageIcon } from './icons'

interface ServerShowcaseProps extends React.ComponentProps<'div'> {
  name: string
  description: string
  backgroundUrl?: string
  href?: {
    to: string
    external?: boolean
  }
}

export function ServerShowcase({
  name,
  description,
  backgroundUrl,
  href,
  className,
  ...props
}: ServerShowcaseProps) {
  return (
    <div className={cn('group/ss relative flex flex-col gap-4', className)} {...props}>
      <div className="border relative h-64 aspect-video flex">
        {backgroundUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center group-hover/ss:grayscale-0 group-hover/ss:opacity-100 grayscale opacity-50 transition-all"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-secondary/20">
            <PixelImageIcon className="size-32 text-muted-foreground/20 opacity-40" />
          </div>
        )}
      </div>
      <div className="relative space-y-1">
        <div className="flex flex-row items-center gap-2">
          <h3 className="font-bold">{name}</h3>
          <ChevronRightIcon className="size-4 opacity-0 transition-all duration-200 group-hover/ss:translate-x-1 group-hover/ss:opacity-100" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {href &&
        (href.external ? (
          <a href={href.to} target="_blank" className="absolute inset-0" />
        ) : (
          <Link to={href.to} className="absolute inset-0" />
        ))}
    </div>
  )
}
