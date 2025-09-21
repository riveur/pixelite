import type { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'

import { Loading } from '@/features/core/components/loading'
import { routeTree } from '@/routeTree.gen'
import { queryClient } from './react_query'

type RouterContext = {
  queryClient: QueryClient
}

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingComponent: () => (
    <main className="min-h-dvh flex items-center justify-center">
      <Loading />
    </main>
  ),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }
export type { RouterContext }
