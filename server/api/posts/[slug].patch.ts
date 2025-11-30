import { transliterate } from '@/utils/transliterate'
import { formatDate } from '@/utils/formatDate'

export default defineEventHandler(async event => {
    const { slug } = event.context.params
    const config = useRuntimeConfig()

    try {
        const body = await readBody<{
            title: string
            description: string
        }>(event)

        const posts = await $fetch(`${config.public.apiBase}/posts?slug=${slug}`).catch(() => [])
        const post = posts[0]

        if (!post) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Post not found'
            })
        }

        const newSlug = transliterate(body.title)
        const existingSlug = await $fetch(`${config.public.apiBase}/posts?slug=${newSlug}`)

        if (existingSlug.length > 0 && existingSlug[0].id !== post.id) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Post with this title already exists'
            })
        }

        const newDate = formatDate()

        const edited = await $fetch(`${config.public.apiBase}/posts/${post.id}`, {
            method: 'PATCH',
            body: {
                ...post,
                ...body,
                slug: newSlug,
                date: newDate
            }
        })

        return edited
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error?.message ?? 'Server error'
        })
    }
})
