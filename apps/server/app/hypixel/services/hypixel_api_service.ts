import { Client } from '@zikeji/hypixel'

import env from '#start/env'

export class HypixelApiService {
  protected client = new Client(env.get('HYPIXEL_API_KEY'))

  async getPlayerByUUID(uuid: string) {
    try {
      const player = await this.client.player.uuid(uuid)
      const guild = await this.getGuildByPlayerUUID(uuid)

      return { ...player, guild }
    } catch {
      return null
    }
  }

  async getGuildByPlayerUUID(uuid: string) {
    let guild

    try {
      guild = await this.client.guild.player(uuid)
    } catch {
      return null
    }

    return Object.keys(guild).length === 0 ? null : guild
  }
}
