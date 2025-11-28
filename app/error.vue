<script setup lang="ts">
    import type { NuxtError } from '#app'

    defineProps<{
        error: NuxtError
    }>()

    useSeoMeta({
        title: '404 - Page not found | Nuxt 4 mini-blog',
        description: 'The page you are looking for does not exist.'
    })
</script>

<template>
    <UError
        redirect="/blog"
        :clear="{
            size: 'xl',
            icon: 'i-lucide-arrow-left',
            variant: 'soft',
            label: 'Back to blog'
        }"
        :error="error"
    />
</template>
