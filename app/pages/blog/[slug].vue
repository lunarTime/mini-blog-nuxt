<script setup lang="ts">
    const route = useRoute()

    const { data: postData } = await useFetch(`/api/posts/${route.params.slug}`, {
        key: `post-${route.params.slug}`,
        server: true,
        lazy: false,
        watch: false
    })

    const seoTitle = computed(() => postData.value?.title || 'Article meta-title | Nuxt 4 mini-blog')
    const seoDescription = computed(() => postData.value?.description || 'Article meta-description')

    useSeoMeta({
        title: seoTitle,
        description: seoDescription
    })
</script>

<template>
    <article v-if="postData">
        <div class="flex flex-col mb-8">
            <h1 class="lg:text-4xl text-2xl font-bold mb-2">
                {{ postData.title }}
            </h1>

            <template v-if="postData?.date">
                <time :datetime="postData.date">
                    <UBadge
                        color="primary"
                        variant="soft"
                    >
                        {{ postData.date }}
                    </UBadge>
                </time>
            </template>
        </div>

        <div
            v-if="postData.description"
            class="lg:text-xl text-base"
        >
            {{ postData.description }}
        </div>

        <UButton
            :to="{ name: 'blog' }"
            class="mt-10"
            color="primary"
            variant="soft"
        >
            <span class="mdi mdi-arrow-left-bold"></span> Back
        </UButton>
    </article>

    <div
        v-else
        class="py-10 text-center"
    >
        Loading...
    </div>
</template>
