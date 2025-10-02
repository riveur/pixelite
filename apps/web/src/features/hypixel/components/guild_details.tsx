import { PixelAlertIcon, PixelCardTextIcon, PixelUsersIcon } from '@/features/core/components/icons'
import { MinecraftColor } from '@/features/core/components/minecraft_color'
import { Button } from '@/features/core/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/features/core/components/ui/card'
import { Skeleton } from '@/features/core/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/core/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/core/components/ui/tooltip'
import { useLuxon } from '@/features/core/hooks/use_luxon'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Guild } from '../types'
import { GuildMembersTable } from './guild_members_table'
import { GuildRanksTable } from './guild_ranks_table'

interface GuildDetailsProps {
  guild: Guild
}

export function GuildDetails({ guild }: GuildDetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="group flex-1 grid gap-4">
        <GuildInformations guild={guild} />
      </div>
      <GuildStats guild={guild} />
    </div>
  )
}

interface GuildInformationsProps extends React.ComponentProps<typeof Card> {
  guild: Guild
}

function GuildInformations({ guild, className, ...props }: GuildInformationsProps) {
  const { DateTime } = useLuxon()
  const { t, i18n } = useTranslation()

  return (
    <Card className={cn('py-4 gap-4', className)} {...props}>
      <CardHeader className="px-4">
        <CardTitle>{t('server.hypixel.labels.guildInfo')}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 space-y-1.5">
        <p>
          {t('server.labels.name')} : <span className="font-minecraft">{guild.name}</span>
        </p>
        <p>
          {t('server.labels.description')} :<br />
          <span className="font-minecraft">{guild.description}</span>
        </p>
        <div className="flex flex-row gap-1 items-center">
          <span>
            {t('server.hypixel.labels.level')} :{' '}
            <span className="font-minecraft">{guild.level.value}</span>
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
                  {guild.level.currentExp.toLocaleString(i18n.resolvedLanguage)}
                </MinecraftColor>
              </p>
              <p>
                {t('server.hypixel.labels.remainingExperienceToLevelUp')} :{' '}
                <MinecraftColor>
                  {guild.level.remainingExpToNextLevel.toLocaleString(i18n.resolvedLanguage)}
                </MinecraftColor>
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        {guild.tag && (
          <p>
            {t('server.hypixel.labels.tag')} :{' '}
            <MinecraftColor>{guild.tagColor + `[${guild.tag}]`}</MinecraftColor>
          </p>
        )}
        <p>
          {t('server.hypixel.labels.members')} :{' '}
          <span className="font-minecraft">{guild.members.length}</span>
        </p>
        <p>
          {t('server.hypixel.labels.created')} :{' '}
          <span className="font-minecraft">
            {DateTime.fromMillis(guild.created).toLocaleString(DateTime.DATETIME_SHORT)}
          </span>
        </p>
        <p>
          {t('server.hypixel.labels.preferredGame', { count: guild.preferredGames.length })} :{' '}
          <span className="font-minecraft">
            {new Intl.ListFormat(i18n.resolvedLanguage).format(
              guild.preferredGames.map((g) =>
                t(`server.hypixel.games.name.${g.toLowerCase()}`, { defaultValue: g.toLowerCase() })
              )
            )}
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

interface GuildStatsProps {
  guild: Guild
}

function GuildStats({ guild }: GuildStatsProps) {
  const { t } = useTranslation()

  const tabs = [
    {
      id: 'members',
      name: t('server.hypixel.guild.labels.members'),
      icon: PixelUsersIcon,
    },
    {
      id: 'ranks',
      name: t('server.hypixel.guild.labels.ranks'),
      icon: PixelCardTextIcon,
    },
  ]

  return (
    <Tabs defaultValue="members" className="gap-4">
      <TabsList className="h-12">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="py-2">
            <tab.icon />
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <GuildStatsMembersTab guild={guild} />
      <GuildStatsRanksTab guild={guild} />
    </Tabs>
  )
}

interface GuildStatsMembersTabProps {
  guild: Guild
}

function GuildStatsMembersTab({ guild }: GuildStatsMembersTabProps) {
  return (
    <TabsContent value="members">
      <div className="flex flex-col gap-4">
        <GuildMembersTable data={guild.members} />
      </div>
    </TabsContent>
  )
}

interface GuildStatsRanksTabProps {
  guild: Guild
}

function GuildStatsRanksTab({ guild }: GuildStatsRanksTabProps) {
  return (
    <TabsContent value="ranks">
      <div className="flex flex-col gap-4">
        <GuildRanksTable data={guild.ranks} />
      </div>
    </TabsContent>
  )
}

export function GuildDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="group flex-1 grid gap-4">
        <Skeleton className="h-[290px]" />
      </div>
      <Skeleton className="h-12 w-[30%]" />
      <Skeleton className="h-9 w-60" />
      <Skeleton className="h-[200px]" />
    </div>
  )
}
