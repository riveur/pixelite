import router from '@adonisjs/core/services/router'

const ShowPlayerController = () => import('#hypixel/controllers/show_player_controller')
const ShowGuildController = () => import('#hypixel/controllers/show_guild_controller')

router
  .group(() => {
    router.get('/players/:username', [ShowPlayerController])
    router.get('/guilds/:name', [ShowGuildController])
  })
  .prefix('/api/hypixel')
