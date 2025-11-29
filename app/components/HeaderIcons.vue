<template>
    <div>
        <UTooltip text="Open this project on GitHub">
            <UButton
                color="neutral"
                variant="ghost"
                to="https://github.com/lunarTime/mini-blog-nuxt"
                target="_blank"
                icon="i-simple-icons-github"
                aria-label="GitHub"
            />
        </UTooltip>
        <UTooltip text="My LinkedIn">
            <UButton
                color="neutral"
                variant="ghost"
                to="https://www.linkedin.com/in/nikita-eremeev-556238283/"
                target="_blank"
                icon="i-simple-icons-logmein"
                aria-label="LinkedIn"
            />
        </UTooltip>
        <UColorModeButton />
    </div>
</template>
