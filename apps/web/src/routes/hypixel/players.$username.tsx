import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'

import { MinecraftColor } from '@/features/core/components/minecraft_color'
import { Button } from '@/features/core/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/features/core/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/features/core/components/ui/tooltip'
import { useLuxon } from '@/features/core/hooks/use_luxon'
import { showHypixelPlayerQueryOptions } from '@/features/hypixel/queries'
import { useTranslation } from '@/lib/i18n'
import { getBustUrl } from '@/lib/minecraft/skin'

export const Route = createFileRoute('/hypixel/players/$username')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(showHypixelPlayerQueryOptions(params.username))
  },
})

function RouteComponent() {
  const { t, i18n } = useTranslation()
  const { DateTime } = useLuxon()
  const { username } = Route.useParams()
  const { data: player } = useSuspenseQuery(showHypixelPlayerQueryOptions(username))

  return (
    <>
      <div
        data-has-guild={Boolean(player.guild)}
        className="group flex-1 grid lg:data-[has-guild=true]:grid-cols-3 gap-4"
      >
        <Card className="py-4 pb-0 gap-4 col-span-1 lg:group-data-[has-guild=true]:col-span-2">
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
                      <InfoIcon />
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
              {player.achievementPoints && (
                <p>
                  {t('server.hypixel.labels.achievementPoints')} :{' '}
                  <MinecraftColor>
                    {player.achievementPoints.toLocaleString(i18n.resolvedLanguage)}
                  </MinecraftColor>
                </p>
              )}
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
        {player.guild && (
          <Card className="py-4 gap-4">
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
              <p>
                {t('server.hypixel.labels.tag')} :{' '}
                <MinecraftColor>{player.guild.tagColor + `[${player.guild.tag}]`}</MinecraftColor>
              </p>
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
        )}
      </div>
    </>
  )
}
