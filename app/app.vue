<script setup lang="ts">
    import type { NavigationMenuItem } from '@nuxt/ui'

    const route = useRoute()

    const items = computed<NavigationMenuItem[]>(() => [
        {
            label: 'Home',
            to: '/',
            icon: 'i-gravity-ui:house-fill',
            active: route.name === 'index'
        },
        {
            label: 'Blog',
            to: '/blog',
            icon: 'i-material-symbols-post-rounded',
            active: route.name === 'blog' || route.name === 'blog-slug'
        },
        {
            label: 'Create post',
            to: '/blog/create',
            icon: 'i-ion-create',
            active: route.name === 'blog-create'
        }
    ])
</script>

<template>
    <UApp>
        <UHeader
            class="mb-10"
            mode="slideover"
        >
            <UNavigationMenu :items="items" />

            <template #title>
                <div class="flex items-center justify-between gap-2 w-full">
                    <i class="mdi mdi-post text-2xl"></i>
                    <span>Nuxt 4 blog</span>
                </div>
            </template>

            <template #right>
                <HeaderIcons class="sm:flex sm:items-center hidden" />
            </template>

            <template #body>
                <UNavigationMenu
                    :items="items"
                    orientation="vertical"
                    class="mb-4"
                />
                <HeaderIcons class="sm:hidden flex items-center justify-end flex-row-reverse gap-1" />
            </template>
        </UHeader>

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
