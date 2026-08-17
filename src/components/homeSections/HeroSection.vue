<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SplineScene from '@/components/ui/SplineScene.vue'
import HeroContent from './hero/HeroContent.vue'
import { useGithub } from '@/composables/useGithub'
import { useAppReady } from '@/composables/useAppReady'

const isLoaded = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const heroRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)
const glowX = ref(50)
const glowY = ref(50)

const { totalCommits, load: loadGithub } = useGithub()
const { markHeroSplineReady } = useAppReady()

const handleMouseMove = (e: MouseEvent) => {
  const rect = heroRef.value?.getBoundingClientRect()
  if (!rect) return
  mouseX.value = (e.clientX - rect.left) / rect.width - 0.5
  mouseY.value = (e.clientY - rect.top) / rect.height - 0.5
}

const handleGlobalMouse = (e: MouseEvent) => {
  const rect = visualRef.value?.getBoundingClientRect()
  if (!rect) return
  glowX.value = ((e.clientX - rect.left) / rect.width) * 100
  glowY.value = ((e.clientY - rect.top) / rect.height) * 100
}

onMounted(() => {
  setTimeout(() => (isLoaded.value = true), 100)
  heroRef.value?.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousemove', handleGlobalMouse, { passive: true })
  loadGithub()
})

onUnmounted(() => {
  heroRef.value?.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousemove', handleGlobalMouse)
})
</script>

<template>
  <section ref="heroRef" class="hero" :class="{ 'hero--loaded': isLoaded }">
    <div class="hero__grid" />
    <div
      class="hero__glow hero__glow--violet"
      :style="{ transform: `translate(${mouseX * 40}px, ${mouseY * 40}px)` }"
    />
    <div
      class="hero__glow hero__glow--cyan"
      :style="{ transform: `translate(${mouseX * -25}px, ${mouseY * -25}px)` }"
    />
    <div ref="visualRef" class="hero__visual">
      <div class="hero__robot-glow" :style="{ '--gx': glowX + '%', '--gy': glowY + '%' }" />
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        class="hero__spline"
        relay
        @load="markHeroSplineReady"
        @error="markHeroSplineReady"
      />
    </div>
    <div class="hero__container">
      <HeroContent :total-commits="totalCommits" />
    </div>
    <div class="hero__scroll">
      <span>Scroll</span>
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
// ── Animations ──────────────────────────────────────────────────────────────
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}
@keyframes scroll-bounce {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 0.4;
  }
  50% {
    transform: scaleY(1.6);
    opacity: 1;
  }
}

// ── Section ─────────────────────────────────────────────────────────────────
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: $bg-deep;
  opacity: 0;
  transition: opacity 0.6s ease;

  &--loaded {
    opacity: 1;
  }

  // Grid background
  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient($border-subtle 1px, transparent 1px),
      linear-gradient(90deg, $border-subtle 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  }

  // Radial glows
  &__glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transition: transform 0.15s ease-out;

    &--violet {
      width: clamp(400px, 50vw, 700px);
      height: clamp(400px, 50vw, 700px);
      top: -10%;
      right: -5%;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%);
      animation: pulse-glow 6s ease-in-out infinite;
    }

    &--cyan {
      width: clamp(300px, 40vw, 500px);
      height: clamp(300px, 40vw, 500px);
      bottom: 10%;
      left: 5%;
      background: radial-gradient(circle, rgba(6, 214, 160, 0.1) 0%, transparent 70%);
      animation: pulse-glow 8s ease-in-out infinite 2s;
    }
  }

  // ── Container — only holds text content, floats above robot ─────────────
  &__container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 720px; // constrain text to left half
    padding: 6rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;

    @media (min-width: $breakpoint-md) {
      padding: 0 2rem 0 3rem;
      justify-content: center;
      min-height: 100svh;
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 2rem 0 4rem;
    }
  }

  // ── Robot visual — covers the entire hero section ────────────────────────
  &__visual {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;

    @media (max-width: #{$breakpoint-md - 1px}) {
      opacity: 0.35; // subtle on mobile so text stays readable
    }
  }

  // Mouse-following glow that follows the cursor anywhere in the hero
  &__robot-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(
      circle 480px at var(--gx, 60%) var(--gy, 50%),
      rgba(124, 58, 237, 0.3) 0%,
      rgba(6, 214, 160, 0.1) 45%,
      transparent 70%
    );
  }

  &__spline {
    position: absolute;
    inset: 0;
    z-index: 1;
    // head tracking now comes from the document-level relay (see SplineScene),
    // so the canvas never needs (or steals) real pointer events
    pointer-events: none;
  }

  // ── Scroll indicator ──────────────────────────────────────────────────────
  &__scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 5;
    animation: fade-up 1s ease-out 1.5s both;

    span {
      font-size: 0.7rem;
      color: $text-muted;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  &__scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient($accent-primary, transparent);
    animation: scroll-bounce 1.8s ease-in-out infinite;
    transform-origin: top;
  }
}
</style>
