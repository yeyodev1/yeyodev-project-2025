import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Application } from '@splinetool/runtime'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function useSplineRobot() {
  // ── Canvas refs ─────────────────────────────────────────────────────────────
  const heroCanvas = ref<HTMLCanvasElement | null>(null)
  const footerCanvas = ref<HTMLCanvasElement | null>(null)
  const mobileCanvas = ref<HTMLCanvasElement | null>(null)

  // ── App instances (one per zone — independent state) ───────────────────────
  let heroApp: Application | null = null
  let footerApp: Application | null = null
  let mobileApp: Application | null = null

  // ── Loaded flags ────────────────────────────────────────────────────────────
  const isHeroLoaded = ref(false)
  const isFooterLoaded = ref(false)
  const isMobileLoaded = ref(false)
  const mobileExpanded = ref(false)

  // ── Per-zone opacity (animated independently) ───────────────────────────────
  const heroOpacity = ref(1)
  const footerOpacity = ref(0)

  // ── Cleanups ────────────────────────────────────────────────────────────────
  let cleanupHeroRelay: (() => void) | null = null
  let cleanupFooterRelay: (() => void) | null = null
  const bgCleanups: (() => void)[] = []

  // ── Scroll handler — computes each zone's opacity independently ─────────────
  const handleScroll = () => {
    const p = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)

    // Hero:   fully visible 0–20 %, fade out 20–32 %, invisible after that
    heroOpacity.value = p < 0.2 ? 1 : p < 0.32 ? 1 - (p - 0.2) / 0.12 : 0

    // Footer: invisible until 70 %, fade in 70–83 %, fully visible after that
    footerOpacity.value = p < 0.7 ? 0 : p < 0.83 ? (p - 0.7) / 0.13 : 1

    // Lazy-load the footer instance when it first becomes relevant
    if (p > 0.65 && !footerApp) loadFooter()
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

  // ── Build a mouse relay for a single canvas ─────────────────────────────────
  // Returns { fire, cleanup }. Each instance is fully independent.
  const buildRelay = (canvas: HTMLCanvasElement) => {
    const fire = (clientX: number) => {
      const rect = canvas.getBoundingClientRect()
      // X: map full-screen [0, innerWidth] → [rect.left, rect.right]
      const mappedX = rect.left + (clientX / window.innerWidth) * rect.width
      // Y: always the vertical center of the canvas — robot only tracks
      // left/right (horizontal), never tilts up/down. This permanently
      // eliminates the "staring at ceiling/floor" issue regardless of
      // where the cursor is or what Spline's default pose is.
      const mappedY = rect.top + rect.height * 0.5
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

    const onMove = (e: MouseEvent) => fire(e.clientX)

    document.addEventListener('mousemove', onMove, { passive: true })

    return {
      fire,
      cleanup: () => document.removeEventListener('mousemove', onMove),
    }
  }

  // ── Block Spline's window-level wheel handler (once, shared) ───────────────
  // Spline registers window.addEventListener('wheel', ...) which orbits the 3D
  // camera on page scroll. Stopping propagation in bubble phase on document
  // intercepts it before it reaches window — native page scroll is unaffected.
  const blockSplineWheel = (e: WheelEvent) => e.stopPropagation()

  // ── Load hero instance (eager) ──────────────────────────────────────────────
  const loadHero = async () => {
    if (!heroCanvas.value || heroApp) return
    heroApp = new Application(heroCanvas.value)
    await heroApp.load(SCENE)
    forceTransparentBg(heroCanvas.value)
    const relay = buildRelay(heroCanvas.value)
    cleanupHeroRelay = relay.cleanup
    // Fire a centered event so robot looks straight ahead from frame one
    setTimeout(() => relay.fire(window.innerWidth / 2), 120)
    isHeroLoaded.value = true
  }

  // ── Load footer instance (lazy — only when scroll reaches footer zone) ──────
  const loadFooter = async () => {
    if (!footerCanvas.value || footerApp) return
    footerApp = new Application(footerCanvas.value)
    await footerApp.load(SCENE)
    forceTransparentBg(footerCanvas.value)
    const relay = buildRelay(footerCanvas.value)
    cleanupFooterRelay = relay.cleanup
    // Fire a centered event so the footer robot starts neutral (not in idle pose)
    setTimeout(() => relay.fire(window.innerWidth / 2), 120)
    isFooterLoaded.value = true
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

  const isDesktopViewport = () => window.innerWidth >= 1024

  onMounted(async () => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('wheel', blockSplineWheel, { passive: true })
    if (isDesktopViewport()) await loadHero()
  })

  onUnmounted(() => {
    heroApp?.dispose()
    footerApp?.dispose()
    mobileApp?.dispose()
    cleanupHeroRelay?.()
    cleanupFooterRelay?.()
    bgCleanups.forEach((fn) => fn())
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('wheel', blockSplineWheel)
  })

  return {
    heroCanvas,
    footerCanvas,
    mobileCanvas,
    isHeroLoaded,
    isFooterLoaded,
    isMobileLoaded,
    mobileExpanded,
    heroOpacity,
    footerOpacity,
  }
}
