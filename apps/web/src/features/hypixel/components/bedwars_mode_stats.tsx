import {
  PixelBedIcon,
  PixelCloseIcon,
  PixelFrameDeleteIcon,
  PixelMinusIcon,
  PixelPercentIcon,
  PixelPlayIcon,
  PixelTrophyIcon,
  PixelUserMinusIcon,
  PixelUserPlusIcon,
  PixelZapIcon,
} from '@/features/core/components/icons'
import { useTranslation } from '@/lib/i18n'
import type { Player } from '../types'

interface BedwarsModeStatsProps {
  stats: NonNullable<Player['stats']['bedwars']>['normal']['overall']
}

export function BedwarsModeStats({ stats }: BedwarsModeStatsProps) {
  const { t, i18n } = useTranslation()

  const data = [
    { key: 'gamesPlayed', value: stats.gamesPlayed, icon: PixelPlayIcon },
    { key: 'winstreak', value: stats.winstreak, icon: PixelZapIcon },
    { key: 'wins', value: stats.wins, icon: PixelTrophyIcon },
    { key: 'losses', value: stats.losses, icon: PixelCloseIcon },
    { key: 'bedsBroken', value: stats.bedsBroken, icon: PixelBedIcon },
    { key: 'bedsLost', value: stats.bedsLost, icon: PixelFrameDeleteIcon },
    { key: 'kills', value: stats.kills, icon: PixelUserPlusIcon },
    { key: 'deaths', value: stats.deaths, icon: PixelUserMinusIcon },
    { key: 'finalKills', value: stats.finalKills, icon: PixelMinusIcon },
    { key: 'finalDeaths', value: stats.finalDeaths, icon: PixelMinusIcon },
    {
      key: 'wlr',
      value: stats.losses > 0 ? stats.wins / stats.losses : stats.wins,
      icon: PixelPercentIcon,
    },
    {
      key: 'kdr',
      value: stats.deaths > 0 ? stats.kills / stats.deaths : stats.kills,
      icon: PixelPercentIcon,
    },
    {
      key: 'fkdr',
      value: stats.finalDeaths > 0 ? stats.finalKills / stats.finalDeaths : stats.finalKills,
      icon: PixelPercentIcon,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:[&>*:nth-child(3n+1):nth-last-child(1)]:col-span-2 lg:[&>*:nth-child(3n+1):nth-last-child(1)]:col-span-3">
      {data.map((stat) => (
        <div key={stat.key} className="flex flex-row items-center">
          <div className="p-4 flex items-center justify-center border h-full aspect-square">
            <stat.icon className="size-6" />
          </div>
          <div className="grow py-2 px-4 flex flex-row gap-4 items-center border border-l-0">
            <div>
              <p className="font-minecraft">
                {t(`server.hypixel.games.bedwars.labels.${stat.key}`, { defaultValue: stat.key })}
              </p>
              <p className="font-minecraft">
                {stat.value.toLocaleString(i18n.resolvedLanguage, { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
