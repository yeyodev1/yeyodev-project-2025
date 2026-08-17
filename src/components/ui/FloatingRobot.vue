<script setup lang="ts">
import { useSplineRobot } from '@/composables/useSplineRobot'

const { companionEl, companionCanvas, isCompanionLoaded, companionOpacity, companionTx } =
  useSplineRobot()
</script>

<template>
  <!-- Companion robot — leaves the hero with you and travels left ↔ right
       between sections as you scroll. Same experience on mobile: it follows
       your finger. Never a popup, never abandons you. -->
  <div
    ref="companionEl"
    class="robot-companion"
    :class="{ 'robot-companion--visible': companionOpacity > 0 && isCompanionLoaded }"
    :style="{ opacity: companionOpacity, transform: `translateX(${companionTx}px)` }"
    aria-hidden="true"
  >
    <div class="robot-companion__stage">
      <canvas ref="companionCanvas" class="robot-companion__canvas" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './robot/robot';
</style>
