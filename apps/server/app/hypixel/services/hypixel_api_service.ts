import cache from '@adonisjs/cache/services/main'
import { Exception } from '@adonisjs/core/exceptions'
import { Client } from '@zikeji/hypixel'
import type { GuildResponse } from '@zikeji/hypixel/dist/types/AugmentedTypes.js'
import type { ResultObject } from '@zikeji/hypixel/dist/util/ResultObject.js'

import env from '#start/env'

type Guild = ResultObject<GuildResponse, ['guild']>

export class HypixelApiService {
  protected client = new Client(env.get('HYPIXEL_API_KEY'))

  async getPlayerByUUID(uuid: string) {
    const result = await cache.getOrSet({
      key: `hypixel:player:${uuid}`,
      ttl: '30min',
      factory: async () => {
        return await this.client.player.uuid(uuid)
      },
    })

    return result
  }

  async getGuildByPlayerUUID(uuid: string, options: { withMembers?: boolean } = {}) {
    const { withMembers = true } = options

    try {
      const result = await cache.getOrSet({
        key: `hypixel:guild:player:${uuid}:${withMembers ? 'w/members' : 'wo/members'}`,
        ttl: '1h',
        factory: async () => {
          const guild = await this.client.guild.player(uuid)

          if (Object.keys(guild).length === 0) {
            throw new Error()
          }

          if (!withMembers) {
            return {
              ...guild,
              members: guild.members.map((member) => ({ ...member, profile: null })),
            }
          }

          const members = await this.populateGuildMembers(guild)

          return { ...guild, members }
        },
      })

      return result
    } catch {
      throw new Exception(`Player ${uuid} has no guild`, {
        status: 404,
        code: 'E_GUILD_NOT_FOUND',
      })
    }
  }

  async getGuildByName(name: string, options: { withMembers?: boolean } = {}) {
    const { withMembers = true } = options

    try {
      const result = await cache.getOrSet({
        key: `hypixel:guild:name:${name}:${withMembers ? 'w/members' : 'wo/members'}`,
        ttl: '1h',
        factory: async () => {
          const guild = await this.client.guild.name(name)

          if (Object.keys(guild).length === 0) {
            throw new Error()
          }

          if (!withMembers) {
            return {
              ...guild,
              members: guild.members.map((member) => ({ ...member, profile: null })),
            }
          }

          const members = await this.populateGuildMembers(guild)

          return { ...guild, members }
        },
      })

      return result
    } catch {
      throw new Exception(`Guild with name ${name} not found`, {
        status: 404,
        code: 'E_GUILD_NOT_FOUND',
      })
    }
  }

  protected async populateGuildMembers(guild: Guild) {
    const members = []

    for (const member of guild.members) {
      try {
        const player = await this.getPlayerByUUID(member.uuid)
        members.push({ ...member, profile: player })
      } catch {
        members.push({ ...member, profile: null })
      }
    }

    return members
  }
}
