<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
// Type-only import: the ~2 MB runtime is pulled in lazily on mount instead of
// being bundled into the HomeView chunk.
import type { Application } from '@splinetool/runtime'

interface Props {
  scene: string
  class?: string
  // When true the canvas ignores real pointer events (so overlapping UI keeps
  // working) and instead receives synthetic pointermove events relayed from
  // document-level mouse/touch listeners — head tracking works across the
  // whole page, including over text that covers the canvas, and on touch.
  relay?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'load'): void; (e: 'error'): void }>()
const canvas = ref<HTMLCanvasElement | null>(null)
const isLoaded = ref(false)
let app: Application | null = null
let rafFrame: number | null = null

// Force WebGL clear-color to transparent on every frame.
// CSS `background: transparent` can't affect the WebGL clear-color —
// the only way is through the GL context itself.
const forceTransparentBg = (c: HTMLCanvasElement) => {
  const gl = c.getContext('webgl2', { alpha: true }) ?? c.getContext('webgl', { alpha: true })
  if (!gl) return
  const tick = () => {
    gl.clearColor(0, 0, 0, 0)
    rafFrame = requestAnimationFrame(tick)
  }
  rafFrame = requestAnimationFrame(tick)
}

const dispatchMove = (clientX: number, clientY: number) => {
  canvas.value?.dispatchEvent(
    new PointerEvent('pointermove', {
      bubbles: true,
      cancelable: true,
      clientX,
      clientY,
      pointerType: 'mouse',
      isPrimary: true,
    }),
  )
}

const onRelayMouse = (e: MouseEvent) => dispatchMove(e.clientX, e.clientY)
const onRelayTouch = (e: TouchEvent) => {
  const t = e.touches[0]
  if (t) dispatchMove(t.clientX, t.clientY)
}

onMounted(async () => {
  if (!canvas.value) return
  try {
    const { Application } = await import('@splinetool/runtime')
    app = new Application(canvas.value)
    await app.load(props.scene)
    forceTransparentBg(canvas.value)
    if (props.relay) {
      document.addEventListener('mousemove', onRelayMouse, { passive: true })
      document.addEventListener('touchstart', onRelayTouch, { passive: true })
      document.addEventListener('touchmove', onRelayTouch, { passive: true })
    }
    isLoaded.value = true
    emit('load')
  } catch (e) {
    console.error('[SplineScene] failed to load scene', e)
    emit('error')
  }
})

onUnmounted(() => {
  if (rafFrame !== null) cancelAnimationFrame(rafFrame)
  document.removeEventListener('mousemove', onRelayMouse)
  document.removeEventListener('touchstart', onRelayTouch)
  document.removeEventListener('touchmove', onRelayTouch)
  app?.dispose()
})
</script>

<template>
  <div class="spline-wrapper" :class="props.class">
    <Transition name="fade">
      <div v-if="!isLoaded" class="spline-loader">
        <div class="loader" />
      </div>
    </Transition>
    <canvas ref="canvas" class="spline-canvas" :class="{ 'spline-canvas--relay': props.relay }" />
  </div>
</template>

<style lang="scss" scoped>
.spline-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.spline-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.spline-canvas {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent !important;

  // Relay mode: synthetic events only — real pointer/touch pass through so
  // overlapping text/buttons work and mobile scrolling is never hijacked.
  &--relay {
    pointer-events: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
