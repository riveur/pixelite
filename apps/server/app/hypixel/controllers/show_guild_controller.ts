import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import { HypixelApiService } from '#hypixel/services/hypixel_api_service'
import { GuildViewModel } from '#hypixel/view_models/guild_view_model'
import { MojangApiService } from '#mojang/services/mojang_api_service'

@inject()
export default class ShowGuildController {
  constructor(
    private mojangService: MojangApiService,
    private hypixelService: HypixelApiService
  ) {}

  static validator = vine.compile(
    vine.object({
      type: vine.string().parse((value) => value || 'name'),
    })
  )

  async handle({ params, request, response }: HttpContext) {
    const qs = await ShowGuildController.validator.validate(request.qs())

    let guild

    if (qs.type === 'name') {
      guild = await this.hypixelService.getGuildByName(decodeURIComponent(params.name))
    }

    if (qs.type === 'player') {
      const uuid = await this.mojangService.getUUIDByUsername(params.name)
      guild = await this.hypixelService.getGuildByPlayerUUID(uuid)
    }

    if (!guild) {
      return response.notFound({
        message: `Guild for type: ${qs.type} and value: ${params.name} not found`,
      })
    }

    return response.ok(GuildViewModel.fromDomain(guild).serialize())
  }
}
