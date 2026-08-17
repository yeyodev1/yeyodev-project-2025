import { onMounted, onUnmounted, ref } from 'vue'
import { Application } from '@splinetool/runtime'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

// Travel waypoints: [scroll progress, horizontal position] where 0 = docked
// right, 1 = docked left. The robot glides left ↔ right as you scroll so it
// accompanies every section instead of sitting in a corner.
const WAYPOINTS: Array<[number, number]> = [
  [0.14, 0],
  [0.32, 1],
  [0.52, 0],
  [0.72, 1],
  [0.9, 0],
]

const travelFraction = (p: number): number => {
  if (p <= WAYPOINTS[0][0]) return WAYPOINTS[0][1]
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const [p0, f0] = WAYPOINTS[i]
    const [p1, f1] = WAYPOINTS[i + 1]
    if (p <= p1) return f0 + ((p - p0) / (p1 - p0)) * (f1 - f0)
  }
  return WAYPOINTS[WAYPOINTS.length - 1][1]
}

export function useSplineRobot() {
  const companionEl = ref<HTMLElement | null>(null)
  const companionCanvas = ref<HTMLCanvasElement | null>(null)

  let companionApp: Application | null = null
  const isCompanionLoaded = ref(false)

  const companionOpacity = ref(0)
  const companionTx = ref(0)

  let cleanupRelay: (() => void) | null = null
  const bgCleanups: (() => void)[] = []

  // ── Scroll handler — opacity + horizontal travel ───────────────────────────
  const handleScroll = () => {
    const p = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)

    // Invisible over the hero (it has its own full-size robot), fades in
    // 12–20 %, then travels with you all the way down — it never leaves
    companionOpacity.value = p < 0.12 ? 0 : p < 0.2 ? (p - 0.12) / 0.08 : 1

    const w = companionEl.value?.offsetWidth ?? 230
    const range = Math.max(0, window.innerWidth - w - 24)
    companionTx.value = -travelFraction(p) * range

    if (p > 0.08 && !companionApp) loadCompanion()
  }

  // ── Force WebGL clear-color to transparent ──────────────────────────────────
  const forceTransparentBg = (canvas: HTMLCanvasElement) => {
    const gl =
      canvas.getContext('webgl2', { alpha: true }) ?? canvas.getContext('webgl', { alpha: true })
    if (!gl) return
    let frame: number
    const tick = () => {
      gl.clearColor(0, 0, 0, 0)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    bgCleanups.push(() => cancelAnimationFrame(frame))
  }

  // ── Mouse/touch relay — full viewport mapped onto the mini canvas ──────────
  // X and Y both follow the cursor/finger; Y is squeezed into the 20–85 % band
  // of the canvas so the gaze stays natural (no ceiling/floor staring).
  const buildRelay = (canvas: HTMLCanvasElement) => {
    const fire = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const fx = clientX / window.innerWidth
      const fy = clientY / window.innerHeight
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + fx * rect.width,
          clientY: rect.top + (0.2 + 0.65 * fy) * rect.height,
          pointerType: 'mouse',
          isPrimary: true,
        }),
      )
    }

    const onMove = (e: MouseEvent) => fire(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) fire(t.clientX, t.clientY)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('touchstart', onTouch, { passive: true })
    document.addEventListener('touchmove', onTouch, { passive: true })

    return {
      fire,
      cleanup: () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('touchstart', onTouch)
        document.removeEventListener('touchmove', onTouch)
      },
    }
  }

  // ── Block Spline's window-level wheel handler (page scroll must not orbit) ──
  const blockSplineWheel = (e: WheelEvent) => e.stopPropagation()

  // ── Load companion instance (lazy — first scroll past the hero) ────────────
  const loadCompanion = async () => {
    if (!companionCanvas.value || companionApp) return
    companionApp = new Application(companionCanvas.value)
    await companionApp.load(SCENE)
    forceTransparentBg(companionCanvas.value)
    const relay = buildRelay(companionCanvas.value)
    cleanupRelay = relay.cleanup
    // Fire a centered event so the robot starts looking straight ahead
    setTimeout(() => relay.fire(window.innerWidth / 2, window.innerHeight * 0.5), 120)
    isCompanionLoaded.value = true
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('wheel', blockSplineWheel, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    companionApp?.dispose()
    cleanupRelay?.()
    bgCleanups.forEach((fn) => fn())
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('wheel', blockSplineWheel)
  })

  return {
    companionEl,
    companionCanvas,
    isCompanionLoaded,
    companionOpacity,
    companionTx,
  }
}
