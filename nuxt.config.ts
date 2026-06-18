export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    adminPassword: '',
    weatherApiKey: '',
    session: {
      password: '',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          innerHTML: `(function(){var t=localStorage.getItem('theme-preference');if(!t){var h=new Date().getHours();t=h>=6&&h<18?'light':'dark'}if(t==='dark')document.documentElement.classList.add('dark')})()`,
          type: 'text/javascript',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/weather.css'],
})
