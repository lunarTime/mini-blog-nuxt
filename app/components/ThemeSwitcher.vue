<script setup lang="ts">
    const colorMode = useColorMode()

    const toggleTheme = () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
</script>

<template>
    <div class="inline-block ml-2">
        <UButton
            size="md"
            variant="soft"
            color="primary"
            @click.prevent.stop="toggleTheme"
            type="button"
            to="#"
            :icon="colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        />
    </div>
</template>
