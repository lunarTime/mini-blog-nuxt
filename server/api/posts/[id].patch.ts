import { transliterate } from '@/utils/transliterate'
import { formatDate } from '@/utils/formatDate'

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
        const body = await readBody<{ title: string; description: string }>(event)

        if (!body.title || !body.description) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Title and description are required'
            })
        }

        const existingPost = await $fetch(`${config.public.apiBase}/posts/${id}`).catch(() => null)

        if (!existingPost) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Post not found'
            })
        }

        const newSlug = transliterate(body.title)

        const conflict = await $fetch(`${config.public.apiBase}/posts?slug=${newSlug}`).catch(() => [])

        if (conflict.length > 0 && conflict[0].id !== existingPost.id) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Post with this title already exists'
            })
        }

        const edited = await $fetch(`${config.public.apiBase}/posts/${id}`, {
            method: 'PATCH',
            body: {
                ...existingPost,
                ...body,
                slug: newSlug,
                date: formatDate()
            }
        })

        return edited
    } catch (error: any) {
        throw createError({
            statusCode: error?.statusCode ?? 500,
            statusMessage: error?.statusMessage ?? 'Failed to update post'
        })
    }
})
