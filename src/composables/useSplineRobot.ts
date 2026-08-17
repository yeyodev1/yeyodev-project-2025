import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Application } from '@splinetool/runtime'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function useSplineRobot() {
  // ── Canvas refs ─────────────────────────────────────────────────────────────
  const companionCanvas = ref<HTMLCanvasElement | null>(null)
  const mobileCanvas = ref<HTMLCanvasElement | null>(null)

  // ── App instances ───────────────────────────────────────────────────────────
  let companionApp: Application | null = null
  let mobileApp: Application | null = null

  // ── State ───────────────────────────────────────────────────────────────────
  const isCompanionLoaded = ref(false)
  const isMobileLoaded = ref(false)
  const mobileExpanded = ref(false)

  // The mini companion fades in once the user leaves the hero (the hero has its
  // own full-size robot) and stays visible all the way down — it never leaves.
  const companionOpacity = ref(0)

  let cleanupRelay: (() => void) | null = null
  const bgCleanups: (() => void)[] = []

  // ── Scroll handler ──────────────────────────────────────────────────────────
  const handleScroll = () => {
    const p = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)

    // Invisible over the hero, fades in 12–20 %, then stays with you forever
    companionOpacity.value = p < 0.12 ? 0 : p < 0.2 ? (p - 0.12) / 0.08 : 1

    // Lazy-load right before it becomes visible — desktop only: below lg the
    // canvas is display:none (zero-sized) and Spline would init broken (and
    // waste ~4 MB on phones)
    if (p > 0.08 && !companionApp && window.innerWidth >= 1024) loadCompanion()
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

  // ── Mouse/touch relay for the companion canvas ─────────────────────────────
  // Maps the full viewport onto the mini canvas so the little robot tracks the
  // cursor (or finger) anywhere on the page. Y follows the cursor too, but
  // squeezed into the 20–85 % band of the canvas — natural gaze, no
  // ceiling/floor staring at the extremes.
  const buildRelay = (canvas: HTMLCanvasElement) => {
    const fire = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const fx = clientX / window.innerWidth
      const fy = clientY / window.innerHeight
      const mappedX = rect.left + fx * rect.width
      const mappedY = rect.top + (0.2 + 0.65 * fy) * rect.height
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX: mappedX,
          clientY: mappedY,
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

  // ── Load mobile (lazy on widget expand) ────────────────────────────────────
  const loadMobile = async () => {
    if (!mobileCanvas.value || mobileApp) return
    mobileApp = new Application(mobileCanvas.value)
    await mobileApp.load(SCENE)
    isMobileLoaded.value = true
  }

  watch(mobileExpanded, async (val) => {
    if (val && !mobileApp) await loadMobile()
  })

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('wheel', blockSplineWheel, { passive: true })
  })

  onUnmounted(() => {
    companionApp?.dispose()
    mobileApp?.dispose()
    cleanupRelay?.()
    bgCleanups.forEach((fn) => fn())
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('wheel', blockSplineWheel)
  })

  return {
    companionCanvas,
    mobileCanvas,
    isCompanionLoaded,
    isMobileLoaded,
    mobileExpanded,
    companionOpacity,
  }
}
