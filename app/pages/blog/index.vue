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
        <div class="flex items-center justify-between gap-4 w-full mb-8">
            <h1 class="text-3xl font-bold">Blog items</h1>
            <UButton
                :to="{ name: 'blog-create' }"
                size="xl"
                class="w-fit font-semibold text-lg"
            >
                Create post
            </UButton>
        </div>

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
                class="post-item flex"
            >
                <UCard>
                    <template #header>
                        <NuxtLink
                            :to="{ name: 'blog-slug', params: { slug: post.slug } }"
                            class="block font-semibold lg:text-xl text-lg"
                            :title="post.slug"
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
                        <div class="flex items-center gap-2">
                            <time
                                class="post-date"
                                :datetime="post.date"
                            >
                                <UBadge
                                    color="primary"
                                    variant="soft"
                                >
                                    {{ post.date }}
                                </UBadge>
                            </time>
                            <UButton
                                size="sm"
                                variant="ghost"
                                color="primary"
                                :to="{ name: 'blog-slug-edit', params: { slug: post.slug } }"
                                icon="i-mynaui-edit-solid"
                            />
                        </div>
                    </template>
                </UCard>
            </article>
        </div>
    </section>
</template>

<style scoped>
    .post-item :deep([data-slot='root']) {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .post-item :deep([data-slot='header'] a) {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .post-item :deep([data-slot='body']) {
        flex: 1;
    }
    .post-item .post-date > span {
        display: block;
    }

    @media (width > 639px) {
        .post-item :deep([data-slot='header'] a) {
            min-height: 56px;
        }
    }
</style>
