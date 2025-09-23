import { getNetworkLevel, getPlayerRank, MinecraftFormatting } from '@zikeji/hypixel'

import type { HypixelApiService } from '#hypixel/services/hypixel_api_service'

type Player = NonNullable<Awaited<ReturnType<HypixelApiService['getPlayerByUUID']>>>

export class PlayerViewModel {
  constructor(private player: Player) {}

  static fromDomain(player: Player) {
    return new this(player)
  }

  serialize() {
    const networkLevel = getNetworkLevel(this.player)
    const rank = getPlayerRank(this.player)

    const guildMember = this.player.guild?.members.find((m) => m.uuid === this.player.uuid) || null

    return {
      uuid: this.player.uuid,
      displayName: this.player.displayname,
      networkLevel: {
        level: networkLevel.level,
        currentExp: networkLevel.currentExp,
        remainingExpToNextLevel: networkLevel.remainingExpToNextLevel,
      },
      rank: {
        name: rank.name,
        cleanName: rank.cleanName,
        prefix: rank.prefix,
        colorCode: rank.colorCode,
        customRankColor: rank.customRankColor,
      },
      karma: this.player.karma,
      achievementPoints: this.player.achievementPoints || 0,
      questCompleted: this.player.quests
        ? Object.entries(this.player.quests).reduce(
            (acc, [, quest]) => acc + (quest?.completions ? quest.completions.length : 0),
            0
          )
        : 0,
      firstLogin: this.player.firstLogin,
      guild: this.player.guild
        ? {
            _id: this.player.guild._id,
            name: this.player.guild.name,
            tag: this.player.guild.tag,
            tagColor:
              MinecraftFormatting[this.player.guild.tagColor as keyof typeof MinecraftFormatting] ||
              '§f',
            members: this.player.guild.members.length,
            member: guildMember
              ? {
                  rank: guildMember.rank,
                  joined: guildMember.joined,
                }
              : null,
          }
        : null,
    }
  }
}
