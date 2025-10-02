import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from './input'

interface SearchInputProps extends React.ComponentProps<typeof Input> {}

export function SearchInput({ type = 'search', disabled, className, ...props }: SearchInputProps) {
  return (
    <div data-slot="search-input" className="flex shadow-xs">
      <Input
        type={type}
        disabled={disabled}
        className={cn('-me-px flex-1 shadow-none focus-visible:z-10', className)}
        {...props}
      />
      <button
        disabled={disabled}
        className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-9 items-center justify-center border text-sm transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Subscribe"
      >
        <SearchIcon size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
