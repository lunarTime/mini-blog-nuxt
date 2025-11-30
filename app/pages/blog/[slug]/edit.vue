<script setup lang="ts">
    const router = useRouter()
    const route = useRoute()
    const toast = useToast()

    const loading = ref(false)
    const errorMessage = ref('')

    const { data: post, pending: isLoading } = await useAsyncData(`post-${route.params.slug}`, () =>
        $fetch(`/api/posts/slug/${route.params.slug}`)
    )

    const postForm = reactive({
        title: '',
        description: ''
    })

    watchEffect(() => {
        if (!post.value) {
            return
        }

        postForm.title = post.value.title
        postForm.description = post.value.description
    })

    const clearFields = () => {
        postForm.title = ''
        postForm.description = ''
    }

    const editPostHandler = async () => {
        if (!postForm.title.trim() || !postForm.description.trim()) {
            errorMessage.value = 'Please fill all fields.'

            toast.add({
                title: 'Validation error',
                description: errorMessage.value,
                color: 'error'
            })

            return
        }

        try {
            loading.value = true
            errorMessage.value = ''

            const updatedPost = await $fetch(`/api/posts/${post.value.id}`, {
                method: 'PATCH',
                body: {
                    title: postForm.title,
                    description: postForm.description
                }
            })

            toast.add({
                title: 'Success!',
                description: 'Post edited successfully',
                color: 'success'
            })

            router.push(`/blog/${updatedPost.slug}`)
        } catch (error) {
            toast.add({
                title: 'Failed!',
                description: error?.statusMessage ?? 'Failed to edit the post. Please try again.',
                color: 'error'
            })
        } finally {
            loading.value = false
        }
    }

    useSeoMeta({
        title: 'Edit post | Nuxt 4 mini-blog',
        description: 'Edit current blog post'
    })
</script>

<template>
    <section v-if="!isLoading && post">
        <div class="flex items-center justify-between gap-4 w-full mb-8">
            <h1 class="text-3xl font-bold">Edit post</h1>
            <UButton
                :to="{ name: 'blog' }"
                size="xl"
                class="w-fit font-semibold text-lg"
            >
                Back to posts
            </UButton>
        </div>

        <div>
            <UCard class="flex flex-col">
                <template #header>
                    <div class="flex flex-col gap-2">
                        <div class="text-xl font-bold">Post title</div>
                        <UInput
                            class="w-full"
                            v-model="postForm.title"
                            required
                            placeholder="type title..."
                        />
                    </div>
                </template>

                <div class="flex flex-col gap-2">
                    <div class="text-xl font-bold">Post description</div>
                    <UTextarea
                        class="w-full"
                        v-model="postForm.description"
                        required
                        placeholder="type description..."
                    />
                </div>

                <template #footer>
                    <div class="flex gap-2">
                        <UButton
                            :loading="loading"
                            size="xl"
                            class="w-fit font-semibold text-lg"
                            icon="i-mynaui-edit-solid"
                            @click="editPostHandler"
                        >
                            Submit post
                        </UButton>
                        <UButton
                            size="xl"
                            class="w-fit font-semibold text-lg text-gray-100"
                            color="error"
                            type="button"
                            @click="clearFields"
                        >
                            Clear fields
                        </UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </section>
    <section v-else>
        <USkeleton class="h-32 w-full" />
    </section>
</template>
