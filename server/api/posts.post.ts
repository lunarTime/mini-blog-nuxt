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
