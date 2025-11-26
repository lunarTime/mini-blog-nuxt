export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/content', '@nuxt/hints', '@nuxt/ui'],
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
    css: ['~/assets/css/main.css', '@mdi/font/css/materialdesignicons.css']
})
