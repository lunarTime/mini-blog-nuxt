<script setup lang="ts">
    useSeoMeta({
        title: 'Main | Nuxt 4 mini-blog',
        description: 'SEO-friendly blog built with Nuxt 4 + Nuxt UI'
    })
</script>

<template>
    <section class="flex flex-col text-center space-y-6 pt-40 pb-20">
        <h1 class="text-4xl font-bold"> Nuxt 4 mini-blog </h1>

        <p class="max-w-xl mx-auto"> SEO-friendly blog built with Nuxt 4 + Nuxt UI </p>

        <UButton
            to="/blog"
            size="xl"
            class="w-fit mx-auto font-semibold text-lg"
        >
            Browse articles
        </UButton>
    </section>
</template>
