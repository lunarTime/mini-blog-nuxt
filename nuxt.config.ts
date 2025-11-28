export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: '2025-11-26',
    modules: ['@nuxt/hints', '@nuxt/ui'],
    app: {
        head: {
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    charset: 'utf-8'
                }
            ]
        }
    },
    nitro: {
        prerender: {
            routes: ['/', '/blog']
        }
    },
    runtimeConfig: {
        public: {
            siteUrl: 'http://localhost:3000',
            apiBase: 'http://localhost:3001'
        }
    },
    css: ['~/assets/css/main.css', '@mdi/font/css/materialdesignicons.css']
})
