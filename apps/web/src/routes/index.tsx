import { createFileRoute } from '@tanstack/react-router'

import { DefaultLayout } from '@/features/core/components/default_layout'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DefaultLayout className="bg-gradient-to-b from-background to-secondary flex">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <h1 className="text-6xl font-bold font-minecraft">pixelite brr brr !!!</h1>
        <p className="text-xl text-muted-foreground mb-8">Let's build something great together.</p>
      </div>
    </DefaultLayout>
  )
}
