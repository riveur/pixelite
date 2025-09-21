import { CopyIcon } from 'lucide-react'

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
            <DetailsTitle data-mc>Name</DetailsTitle>
            <DetailsContent className="text-foreground">{info.name}</DetailsContent>
          </Details>
          <Details>
            <DetailsTitle data-mc>Description</DetailsTitle>
            <DetailsContent className="text-foreground">{info.description}</DetailsContent>
          </Details>
        </div>
      </div>
      <Separator />
      {info.address && (
        <Details>
          <DetailsTitle data-mc>Address</DetailsTitle>
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
        <DetailsTitle data-mc>Version</DetailsTitle>
        <DetailsContent className="text-foreground flex flex-row flex-wrap items-center gap-1">
          <Badge>{info.primaryMinecraftVersion}</Badge>
          {info.minecraftVersions.map((version) => (
            <Badge key={version} variant="secondary" children={version} />
          ))}
        </DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>Game Type</DetailsTitle>
        <DetailsContent className="text-foreground">
          {new Intl.ListFormat().format(info.gameTypes)}
        </DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>Server Type</DetailsTitle>
        <DetailsContent className="text-foreground">{info.type}</DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>Language</DetailsTitle>
        <DetailsContent className="text-foreground">{info.language}</DetailsContent>
      </Details>
      <Details>
        <DetailsTitle data-mc>Website</DetailsTitle>
        <DetailsContent className="text-foreground">
          <a href={info.website} target="_blank" className="underline">
            {info.website}
          </a>
        </DetailsContent>
      </Details>
      {info.wiki && (
        <Details>
          <DetailsTitle data-mc>Wiki</DetailsTitle>
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
