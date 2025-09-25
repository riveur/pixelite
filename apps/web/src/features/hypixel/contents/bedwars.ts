export function translateBedwarsMode(mode: string) {
  const translations: Record<string, string> = {
    'overall': 'Overall',
    'solo': 'Solo',
    'doubles': 'Doubles',
    '3v3v3v3': '3v3v3v3',
    '4v4v4v4': '4v4v4v4',
    '4v4': '4v4',
    'rush_doubles': 'Rush Doubles',
    'rush_4v4v4v4': 'Rush 4v4v4v4',
    'ultimate_doubles': 'Ultimate Doubles',
    'ultimate_4v4v4v4': 'Ultimate 4v4v4v4',
    'lucky_v2_doubles': 'Lucky V2 Doubles',
    'lucky_v2_4v4v4v4': 'Lucky V2 4v4v4v4',
    'voidless_doubles': 'Voidless Doubles',
    'voidless_4v4v4v4': 'Voidless 4v4v4v4',
    'armed_doubles': 'Armed Doubles',
    'armed_4v4v4v4': 'Armed 4v4v4v4',
    'swappage_doubles': 'Swappage Doubles',
    'swappage_4v4v4v4': 'Swappage 4v4v4v4',
    'castle': 'Castle',
    'oneblock': 'Oneblock',
  }

  return translations[mode] || mode
}
