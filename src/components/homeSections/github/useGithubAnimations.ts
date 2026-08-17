import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useGithub } from '@/composables/useGithub'
import { useCountUp } from '@/composables/useCountUp'

/**
 * Orchestrates the GithubSection entrance animations:
 * count-ups for the hero stats, per-year bar count-ups and the
 * IntersectionObserver that triggers everything on first visibility.
 */
export function useGithubAnimations() {
  const { user, totalCommits, totalStars, yearsData, load, loadCommitsByYear } = useGithub()

  // ── Count-up instances ──────────────────────────────────────────────────────
  const { display: displayTotal, run: runTotal } = useCountUp(2200)
  const { display: displayStars, run: runStars } = useCountUp(1800)
  const { display: displayRepos, run: runRepos } = useCountUp(1600)

  // Per-year display map (animated independently)
  const yearDisplays = ref<Record<number, number>>({})
  const yearFrames: Record<number, number> = {}

  function animateYear(year: number, target: number, delay: number) {
    if (target <= 0) {
      yearDisplays.value[year] = 0
      return
    }
    setTimeout(() => {
      const duration = 1800
      const startTime = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        yearDisplays.value[year] = Math.round(target * eased)
        if (t < 1) yearFrames[year] = requestAnimationFrame(tick)
      }
      yearFrames[year] = requestAnimationFrame(tick)
    }, delay)
  }

  // ── Intersection Observer ───────────────────────────────────────────────────
  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    load()
    loadCommitsByYear()

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.value) observer.observe(sectionRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    Object.values(yearFrames).forEach((f) => cancelAnimationFrame(f))
  })

  // ── Trigger animations when visible + data ready ────────────────────────────
  let totalTriggered = false
  let yearsTriggered = false

  watch([isVisible, totalCommits, totalStars, () => user.value?.public_repos], ([vis]) => {
    if (!vis || totalTriggered) return
    if (totalCommits.value > 0) {
      totalTriggered = true
      runTotal(totalCommits.value, 0)
      runStars(totalStars.value, 200)
      runRepos(user.value?.public_repos ?? 0, 400)
    }
  })

  watch([isVisible, yearsData], ([vis]) => {
    if (!vis || yearsTriggered) return
    const loaded = yearsData.value.filter((y) => y.count !== null)
    if (loaded.length === 0) return
    yearsTriggered = true
    yearsData.value.forEach((y, i) => {
      animateYear(y.year, y.count ?? 0, i * 120)
    })
  })

  // Re-animate total when commits update (years finish loading)
  watch(totalCommits, (val) => {
    if (isVisible.value && val > 0) runTotal(val, 0)
  })

  // Animate new year data as it arrives
  watch(
    yearsData,
    (newVal) => {
      if (!isVisible.value) return
      newVal.forEach((y, i) => {
        if (y.count !== null && !yearDisplays.value[y.year]) {
          animateYear(y.year, y.count, i * 80)
        }
      })
    },
    { deep: true },
  )

  return { sectionRef, displayTotal, displayStars, displayRepos, yearDisplays }
}
