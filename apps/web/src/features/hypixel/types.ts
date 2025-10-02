import type { InferResponseType } from '@repo/rpc/types'

import type { client } from '@/lib/client'

export type Player = InferResponseType<ReturnType<typeof client.api.hypixel.players>['$get']>
export type Guild = InferResponseType<ReturnType<typeof client.api.hypixel.guilds>['$get']>
