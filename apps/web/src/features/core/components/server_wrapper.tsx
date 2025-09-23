import { Link, useMatches } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'

function ServerWrapper({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-row gap-6', className)} {...props} />
}

function ServerWrapperInset({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex-1', className)} {...props} />
}

type ServerWrapperNavigationLink = {
  label: string
  url: string
  icon?: React.ReactNode
  external?: boolean
  children?: string[]
}

interface ServerWrapperNavigationProps extends React.ComponentProps<'nav'> {
  links: ServerWrapperNavigationLink[]
}

function ServerWrapperNavigation({ links, className, ...props }: ServerWrapperNavigationProps) {
  const matches = useMatches()

  return (
    <nav className={cn('grow flex w-full max-w-64', className)} {...props}>
      <ul className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <li key={link.url}>
            <Button
              className="font-minecraft text-base justify-baseline w-full data-[active=true]:bg-accent"
              variant="outline"
              data-active={
                matches.at(-1)!.fullPath.startsWith(link.url) &&
                (link.children || []).includes(matches.at(-1)!.routeId)
              }
              asChild
            >
              {link.external ? (
                <a href={link.url} target="_blank">
                  {link.icon}
                  {link.label}
                  <ExternalLinkIcon className="ml-auto" />
                </a>
              ) : (
                <Link to={link.url}>
                  {link.icon}
                  {link.label}
                </Link>
              )}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { ServerWrapper, ServerWrapperInset, ServerWrapperNavigation }
export type { ServerWrapperNavigationLink }
