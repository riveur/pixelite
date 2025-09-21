/**
 * Types related to server information
 * Inspired by Lunar Client Server Mappings
 */
export type ServerInfo = {
  id: string
  name: string
  description: string
  website: string
  wiki: string | undefined
  iconUrl: string
  backgroundUrl?: string
  address: string | undefined
  type: 'vanilla' | 'modded'
  minecraftVersions: string[]
  primaryMinecraftVersion: string
  language: string
  gameTypes: string[]
}
