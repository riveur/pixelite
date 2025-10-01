export function translateSkywarsMode(mode: string) {
  const translations: Record<string, string> = {
    overall: 'Overall',
    solo: 'Solo',
    doubles: 'Doubles',
    mega: 'Mega',
    ranked: 'Ranked',
    mini: 'Mini',
  }

  return translations[mode] || mode
}
