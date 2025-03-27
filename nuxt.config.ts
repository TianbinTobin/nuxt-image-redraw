// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },

  compatibilityDate: '2024-08-07',
});
