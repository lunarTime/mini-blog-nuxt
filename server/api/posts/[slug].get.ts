export default defineEventHandler(async event => {
    const { slug } = event.context.params
    const config = useRuntimeConfig()
    const posts = await $fetch(`${config.public.apiBase}/posts?slug=${slug}`)

    return posts[0] ?? null
})
