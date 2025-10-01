import {
  PixelCloseIcon,
  PixelMinusIcon,
  PixelPercentIcon,
  PixelTradingDownIcon,
  PixelTradingUpIcon,
  PixelTrophyIcon,
  PixelUserMinusIcon,
  PixelUserPlusIcon,
  PixelUserXIcon,
} from '@/features/core/components/icons'
import { StatCard, StatCardContent, StatCardIcon } from '@/features/core/components/stat_card'
import { useTranslation } from '@/lib/i18n'
import type { Player } from '../types'

interface SkywarsModeStatsProps {
  stats: NonNullable<Player['stats']['skywars']>['overall']
}

export function SkywarsModeStats({ stats }: SkywarsModeStatsProps) {
  const { t, i18n } = useTranslation()

  const data = [
    { key: 'wins', value: stats.wins, icon: PixelTrophyIcon },
    { key: 'losses', value: stats.losses, icon: PixelCloseIcon },
    { key: 'kills', value: stats.kills, icon: PixelUserPlusIcon },
    { key: 'assists', value: stats.assists, icon: PixelUserXIcon },
    { key: 'deaths', value: stats.deaths, icon: PixelUserMinusIcon },
    { key: 'meleeKills', value: stats.meleeKills, icon: PixelMinusIcon },
    { key: 'bowKills', value: stats.bowKills, icon: PixelMinusIcon },
    { key: 'voidKills', value: stats.voidKills, icon: PixelMinusIcon },
    { key: 'arrowsShot', value: stats.arrowsShot, icon: PixelTradingUpIcon },
    { key: 'arrowsHit', value: stats.arrowsHit, icon: PixelTradingDownIcon },
    { key: 'chestsOpened', value: stats.chestsOpened, icon: PixelMinusIcon },
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
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:[&>*:nth-child(3n+1):nth-last-child(1)]:col-span-2 lg:[&>*:nth-child(3n+1):nth-last-child(1)]:col-span-3">
      {data.map((stat) => (
        <StatCard key={stat.key}>
          <StatCardIcon>
            <stat.icon />
          </StatCardIcon>
          <StatCardContent>
            <div>
              <p className="font-minecraft">
                {t(`server.hypixel.games.skywars.labels.${stat.key}`, { defaultValue: stat.key })}
              </p>
              <p className="font-minecraft">
                {stat.value.toLocaleString(i18n.resolvedLanguage, { maximumFractionDigits: 2 })}
              </p>
            </div>
          </StatCardContent>
        </StatCard>
      ))}
    </div>
  )
}
