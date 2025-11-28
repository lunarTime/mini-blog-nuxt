<template>
    <UApp>
        <UHeader
            class="mb-10"
            mode="slideover"
        >
            <template #title>
                <div class="flex items-center justify-between gap-2 w-full">
                    <i class="mdi mdi-post text-2xl"></i>
                    <span>Nuxt 4 blog</span>
                </div>
            </template>
            <template #right>
                <ThemeSwitcher />
            </template>
        </UHeader>

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
