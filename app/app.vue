<template>
    <UApp>
        <NuxtLayout>
            <UHeader class="mb-10">
                <template #title>
                    <div class="flex items-center gap-2">
                        <i class="mdi mdi-post text-2xl"></i>
                        <span>Nuxt 4 blog</span>
                    </div>
                </template>
            </UHeader>

            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
