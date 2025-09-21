import { queryOptions } from '@tanstack/react-query'

import { client } from '@/lib/client'

export function showHypixelPlayerQueryOptions(username: string) {
  return queryOptions({
    queryKey: ['hypixel', 'players', username],
    queryFn: async () => {
      const { data, error } = await client.api.hypixel.players({ username }).$get()

      if (error) {
        throw error
      }

      return data
    },
  })
}
