export const usePosts = () => {
    const route = useRoute()
    const router = useRouter()

    const page = computed({
        get: () => Number(route.query.page) || 1,
        set: (value: number) => {
            const query = { ...route.query }

            if (value === 1) {
                delete query.page
            } else {
                query.page = value
            }

            router.replace({ query })
        }
    })

    const { data, pending, refresh } = useAsyncData(
        () => `posts-page-${page.value}`,
        () =>
            $fetch('/api/posts', {
                query: {
                    page: page.value
                }
            }),
        {
            watch: [page]
        }
    )

    const selectedPostId = ref<string | null>(null)
    const deleteModalOpen = ref(false)
    const loading = ref(false)
    const posts = computed(() => data.value?.items)
    const totalPages = computed(() => data.value?.totalPages || 1)
    const totalPosts = computed(() => data.value?.totalPosts || 0)

    const openDeleteModal = (id: string) => {
        selectedPostId.value = id
        deleteModalOpen.value = true
    }

    const deletePostHandler = async toast => {
        if (!selectedPostId.value) {
            return
        }

        try {
            loading.value = true

            await $fetch(`/api/posts/${selectedPostId.value}`, {
                method: 'DELETE'
            })

            toast.add({
                title: 'Success',
                description: 'Post deleted',
                color: 'success'
            })

            selectedPostId.value = null
            deleteModalOpen.value = false

            await refresh()
        } finally {
            loading.value = false
        }
    }

    return {
        posts,
        page,
        totalPages,
        totalPosts,
        loading: pending,
        deleteModalOpen,
        selectedPostId,
        openDeleteModal,
        deletePostHandler,
        refresh
    }
}
