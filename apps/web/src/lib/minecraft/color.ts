export function getColorFromChar(char: string) {
  const colors = {
    '0': '000000', // BLACK
    '1': '0000AA', // DARK BLUE
    '2': '00AA00', // DARK GREEN
    '3': '00AAAA', // DARK AQUA
    '4': 'AA0000', // DARK RED
    '5': 'AA00AA', // DARK PURPLE
    '6': 'FFAA00', // GOLD
    '7': 'AAAAAA', // GRAY
    '8': '555555', // DARK GRAY
    '9': '5555FF', // BLUE
    'a': '55FF55', // GREEN
    'b': '55FFFF', // AQUA
    'c': 'FF5555', // RED
    'd': 'FF55FF', // LIGHT PURPLE
    'e': 'FFFF55', // YELLOW
    'f': 'FFFFFF', // WHITE
  }
  return colors[char as keyof typeof colors] || colors['f']
}

export function getDecorationFromChar(char: string) {
  const decorations: Record<string, React.CSSProperties> = {
    k: {
      fontWeight: 'bold', // OBFUSCATED
    },
    l: {
      fontWeight: 'bold', // BOLD
    },
    m: {
      textDecoration: 'line-through', // STRIKETHROUGH
    },
    n: {
      textDecoration: 'underline', // UNDERLINE
    },
    o: {
      fontStyle: 'italic', // ITALIC
    },
    r: {}, // RESET
  }

  return decorations[char]
}
