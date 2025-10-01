import { getColorFromChar, getDecorationFromChar } from '@/lib/minecraft/color'
import { cn } from '@/lib/utils'

interface MinecraftColorProps extends React.ComponentProps<'span'> {
  identifier?: '&' | '§'
}

export function MinecraftColor({
  identifier = '§',
  className,
  children,
  ...props
}: MinecraftColorProps) {
  if (typeof children !== 'string') {
    throw new Error('MinecraftColor children must be a string')
  }

  const parts = children.split(new RegExp(`(${identifier}[0-9a-fk-or])`, 'gi')).filter(Boolean)

  const result: React.ReactNode[] = []
  let currentColor: string | null = null
  let currentDecoration: React.CSSProperties = {}

  for (const [i, part] of parts.entries()) {
    // Check if this part is a color/decoration code
    if (part.length >= 2 && part[0] === identifier) {
      const char = part[1].toLowerCase()
      const color = getColorFromChar(char)
      const decoration = getDecorationFromChar(char)

      // Check if this character is actually a valid color code
      const validColorChars = '0123456789abcdef'
      const validDecorationChars = 'klmnor'

      // Update current styling
      if (validColorChars.includes(char)) {
        currentColor = color
      }
      if (validDecorationChars.includes(char) && decoration) {
        currentDecoration = { ...currentDecoration, ...decoration }
      }

      // Reset formatting codes
      if (char === 'r') {
        currentColor = null
        currentDecoration = {}
      }
    } else {
      // This is text content, render it with current styling
      if (part) {
        result.push(
          <span
            key={i}
            style={{
              color: currentColor ? `#${currentColor}` : undefined,
              ...currentDecoration,
            }}
          >
            {part}
          </span>
        )
      }
    }
  }

  return (
    <span className={cn('font-minecraft', className)} {...props}>
      {result}
    </span>
  )
}
