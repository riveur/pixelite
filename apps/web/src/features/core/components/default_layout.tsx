import { Link } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { LangSwitcher } from './lang_switcher'
import { Logo } from './logo'
import { ServerWrapperNavigationMobile, type ServerWrapperNavigationLink } from './server_wrapper'
import { ThemeToggler } from './theme_toggler'
import { Button } from './ui/button'

interface DefaultLayoutProps extends React.ComponentProps<'main'> {
  serverLinks?: Array<ServerWrapperNavigationLink>
}

export function DefaultLayout({ serverLinks, className, ...props }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header serverLinks={serverLinks} />
      <main
        className={cn('mx-auto w-full max-w-7xl flex-1 p-6 flex flex-col gap-6', className)}
        {...props}
      />
    </div>
  )
}

interface HeaderProps extends React.ComponentProps<'header'> {
  serverLinks?: Array<ServerWrapperNavigationLink>
}

function Header({ serverLinks, className, ...props }: HeaderProps) {
  return (
    <header className={cn('w-full h-16 border-b flex items-center', className)} {...props}>
      <div className="px-6 w-full mx-auto max-w-7xl flex flex-row items-center justify-between">
        <Link to="/" className="hover:underline">
          <Logo />
        </Link>
        <div className="flex flex-row gap-1 items-center">
          <LangSwitcher className="h-7" />
          {serverLinks && (
            <ServerWrapperNavigationMobile links={serverLinks}>
              <Button size="icon" variant="outline" className="size-7 lg:hidden">
                <MenuIcon />
              </Button>
            </ServerWrapperNavigationMobile>
          )}
          <ThemeToggler size="icon" variant="outline" className="size-7" />
        </div>
      </div>
    </header>
  )
}
