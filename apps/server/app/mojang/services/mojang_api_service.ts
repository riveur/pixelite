import { Exception } from '@adonisjs/core/exceptions'
import vine from '@vinejs/vine'
import ky from 'ky'

import { minecraftUserProfileValidator } from '#mojang/validators'
import env from '#start/env'

export class MojangApiService {
  protected client = ky.create({
    prefixUrl: env.get('MOJANG_API_URL'),
    timeout: false,
  })

  async getUUIDByUsername(username: string) {
    try {
      const response = await this.client.get(`users/profiles/minecraft/${username}`)
      const data = await response.json()

      const result = await vine.compile(minecraftUserProfileValidator).validate(data)
      return result.id
    } catch (error: unknown) {
      throw new Exception(`Player ${username} not found.`, {
        status: 404,
        code: 'E_MOJANG_PLAYER_NOT_FOUND',
      })
    }
  }
}
