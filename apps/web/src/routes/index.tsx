import { createFileRoute, Link } from '@tanstack/react-router'

import { DefaultLayout } from '@/features/core/components/default_layout'
import {
  PixelChartIcon,
  PixelPlayIcon,
  PixelServerIcon,
  PixelUsersIcon,
} from '@/features/core/components/icons'
import { ServerShowcase } from '@/features/core/components/server_showcase'
import { Button } from '@/features/core/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/core/components/ui/card'
import { Marquee } from '@/features/core/components/ui/marquee'
import { info as hypixel } from '@/features/hypixel/contents/info'
import { useTranslation } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t, i18n } = useTranslation()

  const features = [
    {
      icon: PixelServerIcon,
      title: t('home.features.feature1.title'),
      description: t('home.features.feature1.description'),
    },
    {
      icon: PixelUsersIcon,
      title: t('home.features.feature2.title'),
      description: t('home.features.feature2.description'),
    },
    {
      icon: PixelChartIcon,
      title: t('home.features.feature3.title'),
      description: t('home.features.feature3.description'),
    },
  ]

  const servers = [hypixel]

  return (
    <DefaultLayout className="max-w-none gap-0 p-0">
      <section
        id="hero"
        className="mx-auto max-w-7xl border-x-2 border-dashed h-[calc(100dvh_-_var(--header-height))] w-full relative flex overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
        radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.12) 0%,
          rgba(59, 130, 246, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
          }}
        />
        <div className="relative flex-1 flex flex-col items-center justify-center gap-6">
          <h1 className="text-6xl font-minecraft">{t('home.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8 text-center">{t('home.description')}</p>
          <Button size="xl" asChild>
            <Link to="/" hash="servers">
              {t('home.callToAction')}
              <PixelPlayIcon />
            </Link>
          </Button>
        </div>
      </section>
      <section
        id="features"
        className="border-t-2 border-dashed w-full bg-foreground/5 flex px-6 py-16"
      >
        <div className="flex-1 flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl text-center">{t('home.features.section.title')}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl text-center">
            {t('home.features.section.description')}
          </p>
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:scale-98 transition-transform">
                <CardHeader>
                  <div className="group-hover:bg-secondary/60 bg-secondary transition-colors flex items-center justify-center size-12 border-2 border-foreground border-dashed">
                    <feature.icon className="size-6" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section id="servers" className="border-t-2 border-dashed w-full flex py-16">
        <div className="flex-1 flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl text-center">{t('home.servers.section.title')}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl text-center">
            {t('home.servers.section.description')}
          </p>
          <div className="relative flex flex-col w-full max-w-7xl overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s] max-w-screen">
              {servers.map((server) => (
                <ServerShowcase
                  key={server.id}
                  name={server.name}
                  description={new Intl.ListFormat(i18n.resolvedLanguage).format(server.gameTypes)}
                  backgroundUrl={server.backgroundUrl}
                  href={{ to: `/${server.id}` }}
                />
              ))}
              <ServerShowcase
                name={t('home.servers.submit.title')}
                description={t('home.servers.submit.description')}
              />
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}
