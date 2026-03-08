<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Application } from '@splinetool/runtime'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const desktopCanvas = ref<HTMLCanvasElement | null>(null)
const mobileCanvas  = ref<HTMLCanvasElement | null>(null)

const isDesktopLoaded = ref(false)
const isMobileLoaded  = ref(false)
const mobileExpanded  = ref(false)

let desktopApp: Application | null = null
let mobileApp:  Application | null = null

// ── Scroll opacity ───────────────────────────────────────────────────────────
const opacity = ref(1)
const handleScroll = () => {
  const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
  opacity.value = Math.max(0.5, 1 - progress * 0.4)
}

// ── Force WebGL background to transparent ────────────────────────────────────
// CSS can't clear the WebGL clear-color, so we do it through the context directly.
const forceTransparentBg = (canvas: HTMLCanvasElement) => {
  // Try WebGL2 first, then WebGL1
  const gl =
    canvas.getContext('webgl2', { alpha: true }) ??
    canvas.getContext('webgl',  { alpha: true })
  if (!gl) return

  // Schedule a one-time clear-color override after every Spline render tick
  let frame: number
  const clear = () => {
    gl.clearColor(0, 0, 0, 0)
    frame = requestAnimationFrame(clear)
  }
  frame = requestAnimationFrame(clear)

  // Return cleanup
  return () => cancelAnimationFrame(frame)
}

// ── Global mouse → dispatch to canvas so robot head follows anywhere ─────────
let cleanupMouseRelay: (() => void) | null = null

const attachMouseRelay = (canvas: HTMLCanvasElement) => {
  // Last known viewport cursor position — initialised to screen center so the
  // robot looks straight ahead before the user moves the mouse.
  let lastX = window.innerWidth  / 2
  let lastY = window.innerHeight / 2

  const fire = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect()

    // Invert the X-axis tracking: mouse-left → robot-left, mouse-right → robot-right.
    // We use (1 - clientX/innerWidth) because Spline's internal coordinate 
    // system for this scene is already flipped relative to standard DOM mouse events. 
    // We use a 0.0 offset to calibrate the "straight" gaze to the viewport center.
    const normX   = (1 - clientX / window.innerWidth)
    const mappedX = rect.left + normX * rect.width

    // Y: clamp to the MIDDLE 40% of the canvas (30 %–70 %).
    //    Raw mapping [0, innerHeight] → [0, canvasHeight] causes the robot to
    //    stare at the ceiling whenever the cursor is near the header (~clientY 50).
    //    Clamped mapping keeps the head roughly forward at all times:
    //      cursor at top    → 30 % canvas → looks slightly up
    //      cursor at center → 50 % canvas → looks straight ahead
    //      cursor at bottom → 70 % canvas → looks slightly down
    const normY   = clientY / window.innerHeight        // 0 → 1
    const mappedY = rect.top + (0.30 + normY * 0.40) * rect.height

    canvas.dispatchEvent(new PointerEvent('pointermove', {
      bubbles: true, cancelable: true,
      clientX: mappedX, clientY: mappedY,
      pointerType: 'mouse', isPrimary: true,
    }))
  }

  const onMouseMove = (e: MouseEvent) => {
    lastX = e.clientX
    lastY = e.clientY
    fire(e.clientX, e.clientY)
  }

  // On scroll: re-fire with the last cursor position so Spline doesn't get
  // "stuck" at a stale Y from before the scroll started.
  const onScroll = () => fire(lastX, lastY)

  // Block Spline's window-level wheel handler (it orbits the 3D camera on
  // scroll, making the robot tilt/look up as you scroll down the page).
  // stopPropagation in bubble phase on document stops it before it reaches
  // window — the browser's native scroll still works because that's handled
  // natively before JS for passive events.
  const blockSplineWheel = (e: WheelEvent) => e.stopPropagation()

  document.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('scroll', onScroll,         { passive: true })
  document.addEventListener('wheel', blockSplineWheel, { passive: true })

  cleanupMouseRelay = () => {
    document.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('wheel', blockSplineWheel)
  }
}

// ── Load desktop ─────────────────────────────────────────────────────────────
const loadDesktop = async () => {
  if (!desktopCanvas.value || desktopApp) return
  desktopApp = new Application(desktopCanvas.value)
  await desktopApp.load(SCENE)

  // Override WebGL clear color so canvas background is transparent
  forceTransparentBg(desktopCanvas.value)

  // Relay all page mouse events to the canvas for full-page head tracking
  attachMouseRelay(desktopCanvas.value)

  isDesktopLoaded.value = true
}

// ── Load mobile (lazy) ───────────────────────────────────────────────────────
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
  if (isDesktopViewport()) await loadDesktop()
})

onUnmounted(() => {
  desktopApp?.dispose()
  mobileApp?.dispose()
  cleanupMouseRelay?.()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- ── Desktop: fixed right panel ──────────────────────────────────────── -->
  <div class="robot-desktop" :style="{ opacity }" aria-hidden="true">
    <Transition name="robot-fade">
      <div v-if="!isDesktopLoaded" class="robot-desktop__loader">
        <div class="loader" />
        <span>Loading...</span>
      </div>
    </Transition>
    <canvas ref="desktopCanvas" class="robot-desktop__canvas" />
  </div>

  <!-- ── Mobile: floating widget ─────────────────────────────────────────── -->
  <div
    class="robot-mobile"
    :class="{ 'robot-mobile--open': mobileExpanded }"
    aria-label="Interactive robot assistant"
  >
    <div class="robot-mobile__card">
      <div class="robot-mobile__header">
        <span class="robot-mobile__title">👋 Hey, it's me!</span>
        <button class="robot-mobile__close" @click="mobileExpanded = false">✕</button>
      </div>
      <div class="robot-mobile__scene">
        <Transition name="robot-fade">
          <div v-if="mobileExpanded && !isMobileLoaded" class="robot-mobile__loading">
            <div class="loader" />
          </div>
        </Transition>
        <canvas ref="mobileCanvas" class="robot-mobile__canvas" />
      </div>
      <a href="#contact" class="robot-mobile__cta" @click="mobileExpanded = false">
        Let's build something →
      </a>
    </div>

    <button
      class="robot-mobile__toggle"
      :class="{ 'robot-mobile__toggle--active': mobileExpanded }"
      @click="mobileExpanded = !mobileExpanded"
      aria-label="Toggle robot assistant"
    >
      <span class="robot-mobile__toggle-icon">{{ mobileExpanded ? '✕' : '🤖' }}</span>
      <span v-if="!mobileExpanded" class="robot-mobile__pulse" />
    </button>
  </div>
</template>

<style lang="scss" scoped>

// ── Desktop panel ───────────────────────────────────────────────────────────
.robot-desktop {
  display: none;

  @media (min-width: $breakpoint-lg) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    // Wider panel so Spline has more horizontal space → robot renders fully (no bottom crop).
    // The left ~35% is masked transparent so it never overlaps left-side content.
    width: 50vw;
    max-width: 820px;
    height: 100dvh;
    z-index: 40;
    pointer-events: none;
    transition: opacity 0.5s ease;

    // Aggressive left-fade: first 35% is transparent → robot visually emerges from right,
    // and any dark WebGL bg in that zone is invisible.
    mask-image: linear-gradient(to right, transparent 0%, transparent 20%, black 38%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 20%, black 38%);
  }

  &__loader {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    pointer-events: none;

    span {
      font-size: 0.7rem;
      color: $text-muted;
      letter-spacing: 0.06em;
    }
  }

  // Canvas: pointer-events ON so Spline fires its own events for internal animations,
  // but global relay (in script) forwards all document mousemoves here.
  &__canvas {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    background: transparent !important;
  }
}

// ── Mobile widget ───────────────────────────────────────────────────────────
.robot-mobile {
  display: block;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 90;

  @media (min-width: $breakpoint-lg) {
    display: none;
  }

  &__card {
    position: absolute;
    bottom: 3.75rem;
    right: 0;
    width: 280px;
    background: $bg-secondary;
    border: 1px solid $border-violet;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 48px rgba(124, 58, 237, 0.25);
    opacity: 0;
    transform: scale(0.85) translateY(10px);
    transform-origin: bottom right;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &--open &__card {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid $border-subtle;
  }

  &__title {
    font-size: 0.85rem;
    font-weight: 600;
    color: $text-primary;
  }

  &__close {
    background: none;
    border: none;
    color: $text-muted;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
    transition: color 0.2s;
    &:hover { color: $text-primary; }
  }

  &__scene {
    position: relative;
    height: 260px;
    background: $bg-deep;
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__cta {
    display: block;
    text-align: center;
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: $accent-light;
    border-top: 1px solid $border-subtle;
    transition: background 0.2s ease;
    &:hover { background: rgba(124, 58, 237, 0.08); }
  }

  &__toggle {
    position: relative;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: $accent-primary;
    border: 2px solid $accent-light;
    color: $text-primary;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 24px $accent-glow;
    transition: transform 0.2s ease, background 0.2s ease;
    z-index: 1;

    &:active { transform: scale(0.9); }

    &--active {
      background: $bg-elevated;
      border-color: $border-violet;
    }
  }

  &__toggle-icon {
    font-size: 1.4rem;
    line-height: 1;
  }

  &__pulse {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid $accent-light;
    animation: pulse-ring 2s ease-out infinite;
  }
}

@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.7; }
  70%  { transform: scale(1.4); opacity: 0; }
  100% { transform: scale(1.4); opacity: 0; }
}

.robot-fade-enter-active,
.robot-fade-leave-active { transition: opacity 0.5s ease; }
.robot-fade-enter-from,
.robot-fade-leave-to     { opacity: 0; }
</style>
