export function useOceanMotion() {
  const preference = useState('ocean-reduced-motion', () => false)
  const override = useState<boolean | null>('ocean-motion-override', () => null)
  const paused = computed(() => override.value ?? preference.value)
  let media: MediaQueryList | undefined
  const change = () => {
    preference.value = media?.matches ?? false
    override.value = null
  }

  onMounted(() => {
    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference.value = media.matches
    media.addEventListener('change', change)
  })
  onBeforeUnmount(() => media?.removeEventListener('change', change))

  return {
    paused,
    toggle: () => {
      override.value = !paused.value
    },
  }
}
