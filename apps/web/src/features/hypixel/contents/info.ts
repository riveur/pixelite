import type { ServerInfo } from '@/features/core/types'
import iconUrl from '../contents/icon.png'
import backgroundUrl from '../contents/background.png'

export const info: ServerInfo = {
  id: 'hypixel',
  name: 'Hypixel',
  description: 'Play the best Minecraft minigames for free!',
  website: 'https://hypixel.net',
  wiki: 'https://wiki.hypixel.net',
  iconUrl: iconUrl,
  backgroundUrl: backgroundUrl,
  address: 'mc.hypixel.net',
  type: 'vanilla',
  minecraftVersions: ['1.8', '1.12', '1.16', '1.17', '1.18', '1.19', '1.20', '1.21'],
  primaryMinecraftVersion: '1.8.9',
  language: 'en',
  gameTypes: ['Minigames', 'PvP', 'Skyblock'],
}
