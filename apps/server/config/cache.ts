import { defineConfig, drivers, store } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: 'memoryOnly',

  stores: {
    memoryOnly: store().useL1Layer(drivers.memory()),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
