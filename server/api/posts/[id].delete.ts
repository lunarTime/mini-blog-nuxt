export default defineEventHandler(async event => {
    const { id } = event.context.params
    const config = useRuntimeConfig()

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid post ID'
        })
    }

    try {
        const existingPost = await $fetch(`${config.public.apiBase}/posts/${id}`).catch(() => null)

        if (!existingPost) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Post not found'
            })
        }

        const deleted = await $fetch(`${config.public.apiBase}/posts/${id}`, {
            method: 'DELETE'
        })

        return deleted
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error?.statusMessage ?? 'Failed to delete post'
        })
    }
})
