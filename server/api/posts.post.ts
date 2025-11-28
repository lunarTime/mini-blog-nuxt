import { transliterate } from '@/utils/transliterate'
import { formatDate } from '@/utils/formatDate'

export default defineEventHandler(async event => {
    const config = useRuntimeConfig()

    const body = await readBody<{
        title: string
        description: string
    }>(event)

    if (!body.title || !body.description) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title and description are required'
        })
    }

    const slug = transliterate(body.title)
    const existingSlug = await $fetch(`${config.public.apiBase}/posts?slug=${slug}`)

    if (existingSlug.length > 0) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Post with this title already exists'
        })
    }

    const formattedDate = formatDate()

    const newPost = {
        ...body,
        slug,
        published: true,
        date: formattedDate
    }

    const created = await $fetch(`${config.public.apiBase}/posts`, {
        method: 'POST',
        body: newPost
    })

    return created
})
