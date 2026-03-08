import { ref, onUnmounted } from 'vue'

/** Easing: ease-out cubic */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Animates a number from 0 → target over `duration` ms.
 * Returns a reactive `display` ref and a `run(target, delay?)` function.
 */
export function useCountUp(duration = 2000) {
  const display = ref(0)
  let frame: number | null = null

  function run(target: number, delay = 0) {
    if (target <= 0) return
    const start = () => {
      if (frame) cancelAnimationFrame(frame)
      display.value = 0
      const startTime = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        display.value = Math.round(target * easeOutCubic(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    if (delay > 0) setTimeout(start, delay); else start()
  }

  onUnmounted(() => { if (frame) cancelAnimationFrame(frame) })

  return { display, run }
}

/**
 * Formats a raw number for display: 3400 → "3,400", 3450 → "3,450"
 */
export function fmtNum(n: number): string {
  return n.toLocaleString('en-US')
}
