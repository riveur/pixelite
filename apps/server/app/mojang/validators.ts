import vine from '@vinejs/vine'

export const minecraftUserProfileValidator = vine.object({
  name: vine.string(),
  id: vine.string(),
})
