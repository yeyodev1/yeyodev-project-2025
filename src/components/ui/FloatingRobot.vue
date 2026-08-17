<script setup lang="ts">
import { useSplineRobot } from '@/composables/useSplineRobot'

const {
  heroCanvas,
  footerCanvas,
  mobileCanvas,
  isHeroLoaded,
  isFooterLoaded,
  isMobileLoaded,
  mobileExpanded,
  heroOpacity,
  footerOpacity,
} = useSplineRobot()
</script>

<template>
  <!-- ── Desktop: fixed right panel with TWO independent instances ─────────── -->
  <div class="robot-desktop" aria-hidden="true">
    <!-- Hero instance — visible in the hero section -->
    <div
      class="robot-desktop__zone"
      :style="{ opacity: heroOpacity, transition: 'opacity 0.6s ease' }"
    >
      <Transition name="robot-fade">
        <div v-if="!isHeroLoaded" class="robot-desktop__loader">
          <div class="loader" />
          <span>Loading...</span>
        </div>
      </Transition>
      <canvas ref="heroCanvas" class="robot-desktop__canvas" />
    </div>

    <!-- Footer instance — visible near the footer, fresh tracking state -->
    <div
      class="robot-desktop__zone"
      :style="{ opacity: footerOpacity, transition: 'opacity 0.6s ease' }"
    >
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
        <button
          class="robot-mobile__close"
          @click="mobileExpanded = false"
          aria-label="Close robot assistant"
        >
          ✕
        </button>
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
      :aria-expanded="mobileExpanded"
    >
      <span class="robot-mobile__toggle-icon">{{ mobileExpanded ? '✕' : '🤖' }}</span>
      <span v-if="!mobileExpanded" class="robot-mobile__pulse" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use './robot/robot';
</style>
