<script setup lang="ts">
    const { data: postsData } = await useFetch('/api/posts', {
        key: 'posts',
        server: true,
        lazy: false,
        watch: false
    })

    useSeoMeta({
        title: 'Blog | Nuxt 4 mini-blog',
        description: 'Browse all articles'
    })
</script>

<template>
    <section>
        <h1 class="text-3xl font-bold mb-8">Blog items</h1>

        <div
            v-if="!postsData"
            class="text-center"
        >
            Loading...
        </div>

        <div
            v-else-if="!postsData.length"
            class="text-center"
        >
            No posts yet.
        </div>

        <div
            v-else
            class="grid gap-6 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        >
            <article
                v-for="post in postsData"
                :key="post.slug"
                class="flex"
            >
                <UCard class="flex flex-col">
                    <template #header>
                        <NuxtLink
                            :to="{ name: 'blog-slug', params: { slug: post.slug } }"
                            class="font-semibold lg:text-xl text-lg"
                        >
                            {{ post.title }}
                        </NuxtLink>
                    </template>

                    <p
                        v-if="post.description"
                        class="truncate-line-3 lg:text-lg text-sm"
                    >
                        {{ post.description }}
                    </p>

                    <template
                        v-if="post.date"
                        #footer
                    >
                        <time :datetime="post.date">
                            <UBadge
                                color="primary"
                                variant="soft"
                            >
                                {{ post.date }}
                            </UBadge>
                        </time>
                    </template>
                </UCard>
            </article>
        </div>
    </section>
</template>
