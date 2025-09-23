import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { HypixelApiService } from '#hypixel/services/hypixel_api_service'
import { PlayerViewModel } from '#hypixel/view_models/player_view_model'
import { MojangApiService } from '#mojang/services/mojang_api_service'

@inject()
export default class ShowPlayerController {
  constructor(
    private mojangService: MojangApiService,
    private hypixelService: HypixelApiService
  ) {}

  async handle({ params, response }: HttpContext) {
    const uuid = await this.mojangService.getUUIDByUsername(params.username)

    const player = await this.hypixelService.getPlayerByUUID(uuid)

    if (!player) {
      return response.notFound({ message: `Player ${params.username} not found` })
    }

    return response.ok(PlayerViewModel.fromDomain(player).serialize())
  }
}
