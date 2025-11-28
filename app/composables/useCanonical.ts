export function useCanonical() {
    const route = useRoute()
    const config = useRuntimeConfig()

    const baseUrl = config.public.siteUrl
    const canonical = computed(() => {
        return `${baseUrl}${route.path}`
    })

    useHead({
        link: [{ rel: 'canonical', href: canonical.value }]
    })

    return canonical
}
