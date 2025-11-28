<script setup lang="ts">
    const router = useRouter()
    const toast = useToast()

    const post = reactive({
        title: '',
        description: ''
    })

    const loading = ref(false)
    const errorMessage = ref('')

    const clearFields = () => {
        post.title = ''
        post.description = ''
    }

    function showCreatePostToast() {
        toast.add({
            title: 'Created!',
            description: 'Post created successfully',
            color: 'success'
        })
    }

    const submit = async () => {
        if (!post.title.trim() || !post.description.trim()) {
            errorMessage.value = 'Please fill all fields.'

            return
        }

        try {
            loading.value = true
            errorMessage.value = ''

            await $fetch('/api/posts', {
                method: 'POST',
                body: post
            })

            showCreatePostToast()

            router.push({ name: 'blog' })
        } catch {
            errorMessage.value = 'Failed to create post.'
        } finally {
            loading.value = false
        }
    }

    useSeoMeta({
        title: 'Create post | Nuxt 4 mini-blog',
        description: 'Create new blog post'
    })
</script>

<template>
    <section>
        <div class="flex items-center justify-between gap-4 w-full mb-8">
            <h1 class="text-3xl font-bold">Create post</h1>
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
                            v-model="post.title"
                            required
                            placeholder="type title..."
                        />
                    </div>
                </template>

                <div class="flex flex-col gap-2">
                    <div class="text-xl font-bold">Post description</div>
                    <UTextarea
                        class="w-full"
                        v-model="post.description"
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
                            @click="submit"
                        >
                            Submit post
                        </UButton>
                        <UButton
                            size="xl"
                            class="w-fit font-semibold text-lg text-gray-100"
                            color="error"
                            @click="clearFields"
                        >
                            Clear fields
                        </UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </section>
</template>
