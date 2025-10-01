import {
  getBedwarsLevelInfo,
  getNetworkLevel,
  getPlayerRank,
  MinecraftFormatting,
} from '@zikeji/hypixel'

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
      stats: {
        bedwars: this.getBedwarsStats(),
        skywars: this.getSkyWarsStats(),
      },
    }
  }

  private getBedwarsStatsForMode(prefix: string) {
    return {
      gamesPlayed: Number(this.player.stats?.Bedwars?.[`${prefix}games_played_bedwars`] || 0),
      wins: Number(this.player.stats?.Bedwars?.[`${prefix}wins_bedwars`] || 0),
      losses: Number(this.player.stats?.Bedwars?.[`${prefix}losses_bedwars`] || 0),
      bedsBroken: Number(this.player.stats?.Bedwars?.[`${prefix}beds_broken_bedwars`] || 0),
      bedsLost: Number(this.player.stats?.Bedwars?.[`${prefix}beds_lost_bedwars`] || 0),
      kills: Number(this.player.stats?.Bedwars?.[`${prefix}kills_bedwars`] || 0),
      deaths: Number(this.player.stats?.Bedwars?.[`${prefix}deaths_bedwars`] || 0),
      finalKills: Number(this.player.stats?.Bedwars?.[`${prefix}final_kills_bedwars`] || 0),
      finalDeaths: Number(this.player.stats?.Bedwars?.[`${prefix}final_deaths_bedwars`] || 0),
      winstreak: Number(this.player.stats?.Bedwars?.[`${prefix}winstreak`] || 0),
    }
  }

  private getBedwarsStats() {
    if (!this.player.stats?.Bedwars) {
      return null
    }

    const levelInfo = getBedwarsLevelInfo(this.player)

    return {
      level: levelInfo.level,
      prestigeName: levelInfo.prestigeName,
      prestigeColor: levelInfo.prestigeColor,
      coins: Number(this.player.stats.Bedwars.coins || 0),
      // @ts-ignore
      slumberTickets: Number(this.player.stats.Bedwars.slumber?.tickets || 0),
      normal: {
        'overall': this.getBedwarsStatsForMode(''),
        'solo': this.getBedwarsStatsForMode('eight_one_'),
        'doubles': this.getBedwarsStatsForMode('eight_two_'),
        '3v3v3v3': this.getBedwarsStatsForMode('four_three_'),
        '4v4v4v4': this.getBedwarsStatsForMode('four_four_'),
        '4v4': this.getBedwarsStatsForMode('two_four_'),
      },
      dreams: {
        rush_doubles: this.getBedwarsStatsForMode('eight_two_rush_'),
        rush_4v4v4v4: this.getBedwarsStatsForMode('four_four_rush_'),
        ultimate_doubles: this.getBedwarsStatsForMode('eight_two_ultimate_'),
        ultimate_4v4v4v4: this.getBedwarsStatsForMode('four_four_ultimate_'),
        lucky_v2_doubles: this.getBedwarsStatsForMode('eight_two_lucky_'),
        lucky_v2_4v4v4v4: this.getBedwarsStatsForMode('four_four_lucky_'),
        voidless_doubles: this.getBedwarsStatsForMode('eight_two_voidless_'),
        voidless_4v4v4v4: this.getBedwarsStatsForMode('four_four_voidless_'),
        armed_doubles: this.getBedwarsStatsForMode('eight_two_armed_'),
        armed_4v4v4v4: this.getBedwarsStatsForMode('four_four_armed_'),
        swappage_doubles: this.getBedwarsStatsForMode('eight_two_swappage_'),
        swappage_4v4v4v4: this.getBedwarsStatsForMode('four_four_swappage_'),
        castle: this.getBedwarsStatsForMode('castle_'),
        oneblock: this.getBedwarsStatsForMode('eight_one_oneblock_'),
      },
    }
  }

  private getSkywarsStatsForMode(suffix: string) {
    return {
      wins: Number(this.player.stats?.SkyWars?.[`wins${suffix}`] || 0),
      losses: Number(this.player.stats?.SkyWars?.[`losses${suffix}`] || 0),
      kills: Number(this.player.stats?.SkyWars?.[`kills${suffix}`] || 0),
      assists: Number(this.player.stats?.SkyWars?.[`assists${suffix}`] || 0),
      deaths: Number(this.player.stats?.SkyWars?.[`deaths${suffix}`] || 0),
      meleeKills: Number(this.player.stats?.SkyWars?.[`melee_kills${suffix}`] || 0),
      bowKills: Number(this.player.stats?.SkyWars?.[`bow_kills${suffix}`] || 0),
      voidKills: Number(this.player.stats?.SkyWars?.[`void_kills${suffix}`] || 0),
      arrowsShot: Number(this.player.stats?.SkyWars?.[`arrows_shot${suffix}`] || 0),
      arrowsHit: Number(this.player.stats?.SkyWars?.[`arrows_hit${suffix}`] || 0),
      chestsOpened: Number(this.player.stats?.SkyWars?.[`chests_opened${suffix}`] || 0),
    }
  }

  private getSkyWarsStats() {
    if (!this.player.stats?.SkyWars) {
      return null
    }

    return {
      formattedLevel: String(this.player.stats.SkyWars.levelFormattedWithBrackets).trim(),
      heads: Number(this.player.stats.SkyWars.heads || 0),
      coins: Number(this.player.stats.SkyWars.coins || 0),
      souls: Number(this.player.stats.SkyWars.souls || 0),
      tokens: Number(this.player.stats.SkyWars.cosmetic_tokens || 0),
      overall: this.getSkywarsStatsForMode(''),
      solo: this.getSkywarsStatsForMode('_solo'),
      doubles: this.getSkywarsStatsForMode('_team'),
      mega: this.getSkywarsStatsForMode('_mega'),
      ranked: this.getSkywarsStatsForMode('_ranked'),
      mini: this.getSkywarsStatsForMode('_mini'),
    }
  }
}
