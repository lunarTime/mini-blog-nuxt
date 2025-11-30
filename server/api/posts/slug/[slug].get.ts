export default defineEventHandler(async event => {
    const config = useRuntimeConfig()

    const { slug } = event.context.params

    console.log(slug)

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid slug ' + slug
        })
    }

    try {
        const posts = await $fetch(`${config.public.apiBase}/posts`, {
            query: { slug }
        })

        if (!Array.isArray(posts)) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Invalid API response format'
            })
        }

        if (posts.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Post not found'
            })
        }

        return posts[0]
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error?.message ?? 'Failed to fetch post'
        })
    }
})
