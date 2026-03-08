<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Application } from '@splinetool/runtime'

const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

// ── Canvas refs ───────────────────────────────────────────────────────────────
const heroCanvas   = ref<HTMLCanvasElement | null>(null)
const footerCanvas = ref<HTMLCanvasElement | null>(null)
const mobileCanvas = ref<HTMLCanvasElement | null>(null)

// ── App instances (one per zone — independent state) ─────────────────────────
let heroApp:   Application | null = null
let footerApp: Application | null = null
let mobileApp: Application | null = null

// ── Loaded flags ──────────────────────────────────────────────────────────────
const isHeroLoaded   = ref(false)
const isFooterLoaded = ref(false)
const isMobileLoaded = ref(false)
const mobileExpanded = ref(false)

// ── Per-zone opacity (animated independently) ─────────────────────────────────
const heroOpacity   = ref(1)
const footerOpacity = ref(0)

// ── Relay cleanups ────────────────────────────────────────────────────────────
let cleanupHeroRelay:   (() => void) | null = null
let cleanupFooterRelay: (() => void) | null = null

// ── Scroll handler — computes each zone's opacity independently ───────────────
const handleScroll = () => {
  const p = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)

  // Hero:   fully visible 0–20 %, fade out 20–32 %, invisible after that
  heroOpacity.value =
    p < 0.20 ? 1 :
    p < 0.32 ? 1 - (p - 0.20) / 0.12 :
    0

  // Footer: invisible until 70 %, fade in 70–83 %, fully visible after that
  footerOpacity.value =
    p < 0.70 ? 0 :
    p < 0.83 ? (p - 0.70) / 0.13 :
    1

  // Lazy-load the footer instance when it first becomes relevant
  if (p > 0.65 && !footerApp) loadFooter()
}

// ── Force WebGL clear-color to transparent ────────────────────────────────────
const forceTransparentBg = (canvas: HTMLCanvasElement) => {
  const gl =
    canvas.getContext('webgl2', { alpha: true }) ??
    canvas.getContext('webgl',  { alpha: true })
  if (!gl) return
  let frame: number
  const tick = () => { gl.clearColor(0, 0, 0, 0); frame = requestAnimationFrame(tick) }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}

// ── Build a mouse relay for a single canvas ───────────────────────────────────
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
    canvas.dispatchEvent(new PointerEvent('pointermove', {
      bubbles: true, cancelable: true,
      clientX: mappedX, clientY: mappedY,
      pointerType: 'mouse', isPrimary: true,
    }))
  }

  const onMove = (e: MouseEvent) => fire(e.clientX)

  document.addEventListener('mousemove', onMove, { passive: true })

  return {
    fire,
    cleanup: () => document.removeEventListener('mousemove', onMove),
  }
}

// ── Block Spline's window-level wheel handler (once, shared) ─────────────────
// Spline registers window.addEventListener('wheel', ...) which orbits the 3D
// camera on page scroll. Stopping propagation in bubble phase on document
// intercepts it before it reaches window — native page scroll is unaffected.
const blockSplineWheel = (e: WheelEvent) => e.stopPropagation()

// ── Load hero instance (eager) ────────────────────────────────────────────────
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

// ── Load footer instance (lazy — only when scroll reaches footer zone) ────────
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

// ── Load mobile (lazy on widget expand) ──────────────────────────────────────
const loadMobile = async () => {
  if (!mobileCanvas.value || mobileApp) return
  mobileApp = new Application(mobileCanvas.value)
  await mobileApp.load(SCENE)
  isMobileLoaded.value = true
}

watch(mobileExpanded, async (val) => { if (val && !mobileApp) await loadMobile() })

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
  window.removeEventListener  ('scroll', handleScroll)
  document.removeEventListener('wheel',  blockSplineWheel)
})
</script>

<template>
  <!-- ── Desktop: fixed right panel with TWO independent instances ─────────── -->
  <div class="robot-desktop" aria-hidden="true">

    <!-- Hero instance — visible in the hero section -->
    <div class="robot-desktop__zone" :style="{ opacity: heroOpacity, transition: 'opacity 0.6s ease' }">
      <Transition name="robot-fade">
        <div v-if="!isHeroLoaded" class="robot-desktop__loader">
          <div class="loader" />
          <span>Loading...</span>
        </div>
      </Transition>
      <canvas ref="heroCanvas" class="robot-desktop__canvas" />
    </div>

    <!-- Footer instance — visible near the footer, fresh tracking state -->
    <div class="robot-desktop__zone" :style="{ opacity: footerOpacity, transition: 'opacity 0.6s ease' }">
      <Transition name="robot-fade">
        <div v-if="footerOpacity > 0 && !isFooterLoaded" class="robot-desktop__loader">
          <div class="loader" />
        </div>
      </Transition>
      <canvas ref="footerCanvas" class="robot-desktop__canvas" />
    </div>

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

// ── Desktop panel ────────────────────────────────────────────────────────────
.robot-desktop {
  display: none;

  @media (min-width: $breakpoint-lg) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 50vw;
    max-width: 820px;
    height: 100dvh;
    z-index: 40;
    pointer-events: none;

    // Fade left edge so robot emerges from the right
    mask-image: linear-gradient(to right, transparent 0%, transparent 20%, black 38%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 20%, black 38%);
  }

  // Each zone stacks on top of the other — opacity handles which is visible
  &__zone {
    position: absolute;
    inset: 0;
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

  &__canvas {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    background: transparent !important;
  }
}

// ── Mobile widget ────────────────────────────────────────────────────────────
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
