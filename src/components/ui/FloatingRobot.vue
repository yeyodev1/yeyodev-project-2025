<script setup lang="ts">
import { useSplineRobot } from '@/composables/useSplineRobot'

const {
  companionCanvas,
  mobileCanvas,
  isCompanionLoaded,
  isMobileLoaded,
  mobileExpanded,
  companionOpacity,
} = useSplineRobot()
</script>

<template>
  <!-- ── Desktop: mini companion — appears after the hero and never leaves ── -->
  <div
    class="robot-companion"
    :class="{ 'robot-companion--visible': companionOpacity > 0 && isCompanionLoaded }"
    :style="{ opacity: companionOpacity }"
    aria-hidden="true"
  >
    <canvas ref="companionCanvas" class="robot-companion__canvas" />
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
