import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { PixelAlertIcon } from '@/features/core/components/icons'
import { MinecraftColor } from '@/features/core/components/minecraft_color'
import { Button } from '@/features/core/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/core/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/features/core/components/ui/select'
import { Skeleton } from '@/features/core/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/core/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/core/components/ui/tooltip'
import { useLuxon } from '@/features/core/hooks/use_luxon'
import { useTranslation } from '@/lib/i18n'
import { getBustUrl } from '@/lib/minecraft/skin'
import { cn } from '@/lib/utils'
import { translateBedwarsMode } from '../contents/bedwars'
import type { Player } from '../types'
import { BedwarsModeStats } from './bedwars_mode_stats'

interface PlayerDetailsProps {
  player: Player
}

export function PlayerDetails({ player }: PlayerDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        data-has-guild={Boolean(player.guild)}
        className="group flex-1 grid lg:data-[has-guild=true]:grid-cols-3 gap-4"
      >
        <PlayerInformations
          player={player}
          className="col-span-1 lg:group-data-[has-guild=true]:col-span-2"
        />
        {player.guild && <PlayerGuildInformations player={{ ...player, guild: player.guild! }} />}
      </div>
      <PlayerStats player={player} />
    </div>
  )
}

interface PlayerInformationsProps extends React.ComponentProps<typeof Card> {
  player: Player
}

function PlayerInformations({ player, className, ...props }: PlayerInformationsProps) {
  const { DateTime } = useLuxon()
  const { t, i18n } = useTranslation()

  return (
    <Card className={cn('py-4 pb-0 gap-4', className)} {...props}>
      <CardHeader className="px-4">
        <CardTitle>{t('server.hypixel.labels.playerInfo')}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-4 flex flex-col gap-4 lg:flex-row lg:items-end">
        <img
          src={getBustUrl(player.uuid!)}
          className="h-full w-auto border-b self-center lg:self-auto lg:border-none"
          alt="Player bust"
        />
        <div className="space-y-1.5 pb-4 grow">
          <p className="text-2xl">
            <MinecraftColor>
              {(player.rank.name === 'SUPERSTAR' && player.rank.customRankColor
                ? player.rank.customRankColor
                : player.rank.colorCode) + player.displayName}
            </MinecraftColor>
          </p>
          <p>
            {t('server.hypixel.labels.rank')} :{' '}
            <MinecraftColor>
              {player.rank.prefix !== player.rank.colorCode
                ? player.rank.prefix
                : player.rank.colorCode + player.rank.cleanName}
            </MinecraftColor>
          </p>
          <div className="flex flex-row gap-1 items-center">
            <span>
              {t('server.hypixel.labels.level')} :{' '}
              <span className="font-minecraft">{player.networkLevel.level}</span>
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="size-6">
                  <PixelAlertIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-sm">
                <p>
                  {t('server.hypixel.labels.experience')} :{' '}
                  <MinecraftColor>
                    {player.networkLevel.currentExp.toLocaleString(i18n.resolvedLanguage)}
                  </MinecraftColor>
                </p>
                <p>
                  {t('server.hypixel.labels.remainingExperienceToLevelUp')} :{' '}
                  <MinecraftColor>
                    {player.networkLevel.remainingExpToNextLevel.toLocaleString(
                      i18n.resolvedLanguage
                    )}
                  </MinecraftColor>
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          {player.karma && (
            <p>
              {t('server.hypixel.labels.karma')} :{' '}
              <MinecraftColor>
                {'§d' + player.karma.toLocaleString(i18n.resolvedLanguage)}
              </MinecraftColor>
            </p>
          )}
          <p>
            {t('server.hypixel.labels.achievementPoints')} :{' '}
            <MinecraftColor>
              {player.achievementPoints.toLocaleString(i18n.resolvedLanguage)}
            </MinecraftColor>
          </p>
          <p>
            {t('server.hypixel.labels.questCompleted')} :{' '}
            <MinecraftColor>
              {player.questCompleted.toLocaleString(i18n.resolvedLanguage)}
            </MinecraftColor>
          </p>
          {player.firstLogin && (
            <p>
              {t('server.hypixel.labels.firstLogin')} :{' '}
              <MinecraftColor>
                {DateTime.fromMillis(player.firstLogin).toLocaleString(DateTime.DATETIME_SHORT)}
              </MinecraftColor>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface PlayerGuildInformationsProps extends React.ComponentProps<typeof Card> {
  player: Omit<Player, 'guild'> & { guild: NonNullable<Player['guild']> }
}

function PlayerGuildInformations({ player, className, ...props }: PlayerGuildInformationsProps) {
  const { DateTime } = useLuxon()
  const { t } = useTranslation()

  return (
    <Card className={cn('py-4 gap-4', className)} {...props}>
      <CardHeader className="px-4">
        <CardTitle>{t('server.hypixel.labels.guildInfo')}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 space-y-1.5">
        <p>
          {t('server.labels.name')} :{' '}
          <Link className="hover:underline font-minecraft" to={`/hypixel`}>
            {player.guild.name}
          </Link>
        </p>
        {player.guild.tag && (
          <p>
            {t('server.hypixel.labels.tag')} :{' '}
            <MinecraftColor>{player.guild.tagColor + `[${player.guild.tag}]`}</MinecraftColor>
          </p>
        )}
        <p>
          {t('server.hypixel.labels.members')} :{' '}
          <span className="font-minecraft">{player.guild.members}</span>
        </p>
        <p>
          {t('server.hypixel.labels.rank')} :{' '}
          <span className="font-minecraft">{player.guild.member!.rank}</span>
        </p>
        <p>
          {t('server.hypixel.labels.joined')} :{' '}
          <span className="font-minecraft">
            {DateTime.fromMillis(player.guild.member!.joined).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

interface PlayerStatsProps {
  player: Player
}

function PlayerStats({ player }: PlayerStatsProps) {
  const games = [
    {
      id: 'bedwars',
      name: 'Bed Wars',
    },
    {
      id: 'skywars',
      name: 'Sky Wars',
    },
    {
      id: 'duels',
      name: 'Duels',
    },
    {
      id: 'build-battle',
      name: 'Build Battle',
    },
  ]

  return (
    <div>
      <Tabs defaultValue="bedwars">
        <TabsList>
          {games.map((game) => (
            <TabsTrigger key={game.id} value={game.id}>
              {game.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <PlayerStatsBedWarsTab player={player} />
      </Tabs>
    </div>
  )
}

interface PlayerStatsBedWarsTabProps {
  player: Player
}

function PlayerStatsBedWarsTab({ player }: PlayerStatsBedWarsTabProps) {
  const { t } = useTranslation()
  const [selectedMode, setSelectedMode] = useState('normal-overall')

  const group = selectedMode.split('-')[0]
  const mode = selectedMode.split('-')[1]

  return (
    <TabsContent value="bedwars">
      {player.stats.bedwars ? (
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <p>
              {t('server.hypixel.labels.level')} :{' '}
              <MinecraftColor>
                {player.stats.bedwars.prestigeColor + player.stats.bedwars.level}
              </MinecraftColor>
            </p>
            <p>
              {t('server.hypixel.labels.prestige')} :{' '}
              <span>{player.stats.bedwars.prestigeName}</span>
            </p>
          </div>
          <Card className="py-4 gap-4">
            <CardHeader className="px-4">
              <CardTitle>{t('server.labels.statistics')}</CardTitle>
              <CardAction>
                <Select value={selectedMode} onValueChange={setSelectedMode}>
                  <SelectTrigger className="w-[192px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end" className="w-(--radix-select-trigger-width)">
                    {['normal', 'dreams'].map((g) => (
                      <SelectGroup key={g}>
                        <SelectLabel className="uppercase">{g}</SelectLabel>
                        {Object.keys(player.stats!.bedwars![g as 'normal' | 'dreams']).map((m) => {
                          const key = `${g}-${m}`

                          return (
                            <SelectItem key={key} value={key}>
                              {t(`server.hypixel.games.bedwars.modes.${m}`, {
                                defaultValue: translateBedwarsMode(m),
                              })}
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </CardAction>
            </CardHeader>
            <CardContent className="px-4">
              {/* @ts-ignore */}
              <BedwarsModeStats stats={player.stats.bedwars[group][mode]} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="p-4">{t('server.hypixel.messages.noStats')}</div>
      )}
    </TabsContent>
  )
}

export function PlayerDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="group flex-1 grid lg:grid-cols-3 gap-4">
        <Skeleton className="col-span-1 lg:col-span-2 h-[290px]" />
        <Skeleton className="h-[290px]" />
      </div>
      <Skeleton className="h-[36px] w-[30%]" />
      <Skeleton className="h-[12px] w-[10%]" />
      <Skeleton className="h-[12px] w-[25%]" />
      <Skeleton className="h-[200px]" />
    </div>
  )
}
