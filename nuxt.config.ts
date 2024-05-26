// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    // !Deploy use route /PWKS-UI/
    baseURL: process.env.BASE_URL
  },

  devServer: {
    host: 'localhost',
    port: 4500,
  },

  ssr: false,

  devtools: { enabled: true },

  nitro: {
    compressPublicAssets: true,
  },

  build: {
    transpile: [
      "tslib",
    ]
  },

  modules: [
    "nuxt-icon"
  ],

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/main.css",
  ],

  plugins: [
    { src: '~/plugins/createStore.js', mode: 'client' },
    { src: '~/plugins/createStructure.js' },
  ],

  runtimeConfig: {
    public:{
      baseURL: process.env.BASE_URL
    }
  }
})
