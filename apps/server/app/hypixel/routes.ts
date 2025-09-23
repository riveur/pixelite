import router from '@adonisjs/core/services/router'

const ShowPlayerController = () => import('./controllers/show_player_controller.js')

router
  .group(() => {
    router.get('/players/:username', [ShowPlayerController])
  })
  .prefix('/api/hypixel')
