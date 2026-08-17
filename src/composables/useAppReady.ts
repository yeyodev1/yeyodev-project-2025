import { ref } from 'vue'

// Module-level shared state: the hero Spline robot has finished loading
// (or failed — either way the preloader must not keep waiting).
const heroSplineReady = ref(false)

export function useAppReady() {
  const markHeroSplineReady = () => {
    heroSplineReady.value = true
  }

  return { heroSplineReady, markHeroSplineReady }
}
