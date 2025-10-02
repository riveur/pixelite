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

export function showHypixelGuildQueryOptions({ name, type }: { name: string; type: string }) {
  return queryOptions({
    queryKey: ['hypixel', `guilds:${type}`, name],
    queryFn: async () => {
      const { data, error } = await client.api.hypixel
        .guilds({ name: name })
        .$get({ query: { type: type }, timeout: false })

      if (error) {
        throw error
      }

      return data
    },
  })
}
