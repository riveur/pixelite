import { Link } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { DiscordIcon } from './icons'
import { LangSwitcher } from './lang_switcher'
import { Logo } from './logo'
import { ServerWrapperNavigationMobile, type ServerWrapperNavigationLink } from './server_wrapper'
import { ThemeToggler } from './theme_toggler'
import { Button, buttonVariants } from './ui/button'

const HEADER_HEIGHT = 'calc(var(--spacing) * 16)'

interface DefaultLayoutProps extends React.ComponentProps<'main'> {
  serverLinks?: Array<ServerWrapperNavigationLink>
}

export function DefaultLayout({ serverLinks, className, ...props }: DefaultLayoutProps) {
  return (
    <div
      style={{ '--header-height': HEADER_HEIGHT } as React.CSSProperties}
      className="flex flex-col w-full"
    >
      <Header serverLinks={serverLinks} className="h-(--header-height)" />
      <main
        className={cn(
          'mx-auto w-full max-w-7xl flex-1 p-6 flex flex-col gap-6 min-h-[calc(100dvh_-_var(--header-height))]',
          className
        )}
        {...props}
      />
      <Footer />
    </div>
  )
}

interface HeaderProps extends React.ComponentProps<'header'> {
  serverLinks?: Array<ServerWrapperNavigationLink>
}

function Header({ serverLinks, className, ...props }: HeaderProps) {
  return (
    <header className={cn('w-full border-b flex items-center', className)} {...props}>
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

function Footer({ className, ...props }: React.ComponentProps<'footer'>) {
  const { t } = useTranslation()

  return (
    <footer className={cn('w-full border-t', className)} {...props}>
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center py-6 px-4 gap-4">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggler variant="outline" />
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'outline',
                size: 'icon',
              })}
            >
              <span className="sr-only">Discord</span>
              <DiscordIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full text-muted-foreground">
          <p className="text-sm">{t('copyright', { year: new Date().getFullYear() })}</p>
          <nav>
            <ul className="flex items-center gap-4 [&_a]:text-sm [&_a]:text-muted-foreground [&_a]:hover:text-foreground/80 transition-colors">
              <li>
                <Link to="/">{t('terms')}</Link>
              </li>
              <li>
                <Link to="/">{t('privacy')}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
