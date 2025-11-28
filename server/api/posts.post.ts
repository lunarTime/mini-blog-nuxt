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

    const slug = body.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

    const now = new Date()
    const formattedDate = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
    ].join('-')

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
