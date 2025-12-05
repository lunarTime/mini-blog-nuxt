import { POSTS_PAGE_SIZE } from '@/constants/pagination'

export default defineEventHandler(async event => {
    try {
        const config = useRuntimeConfig()
        const query = getQuery(event)

        const page = Number(query.page) || 1

        const postsData = await $fetch(`${config.public.apiBase}/posts`)

        const totalPosts = postsData.length
        const start = (page - 1) * POSTS_PAGE_SIZE
        const items = postsData.slice(start, start + POSTS_PAGE_SIZE) ?? []

        return {
            items,
            page,
            totalPosts,
            totalPages: Math.ceil(totalPosts / POSTS_PAGE_SIZE)
        }
    } catch (error: any) {
        setResponseStatus(event, 500)

        return {
            items: [],
            page: 1,
            totalPosts: 0,
            totalPages: 1,
            error: error?.statusMessage || 'Internal Server Error'
        }
    }
})
