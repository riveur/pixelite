import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { LangSwitcher } from './lang_switcher'
import { Logo } from './logo'
import { ThemeToggler } from './theme_toggler'

interface DefaultLayoutProps extends React.ComponentProps<'main'> {}

export function DefaultLayout({ className, ...props }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main
        className={cn('mx-auto w-full max-w-7xl flex-1 p-6 flex flex-col gap-6', className)}
        {...props}
      />
    </div>
  )
}

function Header() {
  return (
    <header className="w-full h-16 border-b flex items-center">
      <div className="px-6 w-full mx-auto max-w-7xl flex flex-row items-center justify-between">
        <Link to="/" className="hover:underline">
          <Logo />
        </Link>
        <div className="flex flex-row gap-1 items-center">
          <LangSwitcher className="h-7" />
          <ThemeToggler size="icon" variant="outline" className="size-7" />
        </div>
      </div>
    </header>
  )
}
