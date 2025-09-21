import { BookOpenTextIcon, Globe2Icon } from 'lucide-react'

import type { ServerInfo } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface ServerBannerProps {
  info: ServerInfo
}

export function ServerBanner({ info }: ServerBannerProps) {
  return (
    <Card className="relative overflow-hidden">
      {info.backgroundUrl && (
        <>
          <div
            className="absolute inset-0 bg-center opacity-30"
            style={{ backgroundImage: `url(${info.backgroundUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background to-60%" />
        </>
      )}
      {info.type === 'modded' && (
        <Badge variant="secondary" className="absolute top-6 right-6">
          Modded
        </Badge>
      )}
      <CardContent className="relative flex flex-row gap-4">
        <Avatar className="size-24 rounded-none">
          <AvatarImage src={info.iconUrl} />
          <AvatarFallback className="size-24 rounded-none text-2xl">
            {info.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-2">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold">{info.name}</h1>
            <p className="text-muted-foreground">{info.description}</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            <div className="flex flex-row gap-4 text-muted-foreground font-minecraft">
              <div>
                <span className="font-medium">Version:</span> {info.primaryMinecraftVersion}
              </div>
              {info.address && (
                <div>
                  <span className="font-medium">Address:</span> {info.address}
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              {info.wiki && (
                <Button title="Wiki" size="icon" className="size-7" variant="secondary" asChild>
                  <a href={info.wiki} target="_blank">
                    <BookOpenTextIcon />
                  </a>
                </Button>
              )}
              <Button title="Website" size="icon" className="size-7" variant="secondary" asChild>
                <a href={info.website} target="_blank">
                  <Globe2Icon />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
