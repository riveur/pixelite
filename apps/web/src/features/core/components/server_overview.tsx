import { CopyIcon } from 'lucide-react'

import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '../hooks/use_copy_clipboard'
import type { ServerInfo } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Details, DetailsContent, DetailsTitle } from './ui/details'
import { Separator } from './ui/separator'

interface ServerOverviewProps extends React.ComponentProps<'div'> {
  info: ServerInfo
}

export function ServerOverview({ info, className, ...props }: ServerOverviewProps) {
  const { t, i18n } = useTranslation()
  const [, copy] = useCopyToClipboard()

  return (
    <div className={cn('flex flex-col gap-4 [&_[data-mc]]:font-minecraft', className)} {...props}>
      <div className="flex flex-row gap-4">
        <Avatar className="size-24 rounded-none">
          <AvatarImage src={info.iconUrl} />
          <AvatarFallback className="size-24 rounded-none text-2xl">
            {info.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1.5">
          <Details>
            <DetailsTitle data-mc>{t('server.labels.name')}</DetailsTitle>
            <DetailsContent className="text-foreground">{info.name}</DetailsContent>
          </Details>
          <Details>
            <DetailsTitle data-mc>{t('server.labels.description')}</DetailsTitle>
            <DetailsContent className="text-foreground">{info.description}</DetailsContent>
          </Details>
        </div>
      </div>
      <Separator />
      {info.address && (
        <Details>
          <DetailsTitle data-mc>{t('server.labels.address')}</DetailsTitle>
          <DetailsContent className="text-foreground flex items-center gap-1">
            <span>{info.address}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copy(info.address!)}
              className="size-7 rounded-none"
            >
              <CopyIcon />
            </Button>
          </DetailsContent>
        </Details>
      )}
      <Details>
        <DetailsTitle data-mc>{t('server.labels.version')}</DetailsTitle>
        <DetailsContent className="text-foreground flex flex-row flex-wrap items-center gap-1">
          <Badge>{info.primaryMinecraftVersion}</Badge>
          {info.minecraftVersions.map((version) => (
            <Badge key={version} variant="secondary" children={version} />
          ))}
        </DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>{t('server.labels.gameType')}</DetailsTitle>
        <DetailsContent className="text-foreground">
          {new Intl.ListFormat(i18n.resolvedLanguage).format(info.gameTypes)}
        </DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>{t('server.labels.type')}</DetailsTitle>
        <DetailsContent className="text-foreground">
          {t(`server.type.${info.type}`, { defaultValue: info.type })}
        </DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>{t('server.labels.language')}</DetailsTitle>
        <DetailsContent className="text-foreground">{info.language.toUpperCase()}</DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>{t('server.labels.website')}</DetailsTitle>
        <DetailsContent className="text-foreground">
          <a href={info.website} target="_blank" className="underline">
            {info.website}
          </a>
        </DetailsContent>
      </Details>
      {info.wiki && (
        <Details>
          <DetailsTitle data-mc>{t('server.labels.wiki')}</DetailsTitle>
          <DetailsContent className="text-foreground">
            <a href={info.wiki} target="_blank" className="underline">
              {info.wiki}
            </a>
          </DetailsContent>
        </Details>
      )}
    </div>
  )
}
