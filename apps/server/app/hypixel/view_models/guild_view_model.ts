import { getGuildLevel, MinecraftFormatting } from '@zikeji/hypixel'

import type { HypixelApiService } from '#hypixel/services/hypixel_api_service'
import { PlayerViewModel } from '#hypixel/view_models/player_view_model'

type Guild =
  | NonNullable<Awaited<ReturnType<HypixelApiService['getGuildByName']>>>
  | NonNullable<Awaited<ReturnType<HypixelApiService['getGuildByPlayerUUID']>>>

export class GuildViewModel {
  constructor(private guild: Guild) {}

  static fromDomain(guild: Guild) {
    return new this(guild)
  }

  serialize() {
    const levelInfo = getGuildLevel(this.guild)

    return {
      name: this.guild.name,
      // @ts-ignore
      description: String(this.guild.description),
      level: {
        value: levelInfo.level,
        currentExp: levelInfo.currentExp,
        remainingExpToNextLevel: levelInfo.remainingExpToNextLevel,
      },
      tag: this.guild.tag,
      tagColor:
        MinecraftFormatting[this.guild.tagColor as keyof typeof MinecraftFormatting] || '§f',
      members: this.guild.members.map((member) => {
        if (!member.profile) {
          return member
        }

        const serialized = PlayerViewModel.fromDomain({
          ...member.profile,
          guild: null,
        }).serialize()

        return {
          ...member,
          profile: {
            displayName: serialized.displayName,
            rank: serialized.rank,
          },
        }
      }),
      ranks: this.guild.ranks,
      preferredGames: this.guild.preferredGames,
      created: this.guild.created,
    }
  }
}
