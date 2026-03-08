<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  duration?: number
  spread?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2,
  spread: 2,
})

const spreadPx = computed(() => `${props.text.length * props.spread}px`)
const animDuration = computed(() => `${props.duration}s`)
</script>

<template>
  <span class="text-shimmer" :class="props.class" :style="{ '--spread': spreadPx, '--duration': animDuration }">
    {{ props.text }}
  </span>
</template>

<style lang="scss" scoped>
.text-shimmer {
  --base-color: #4b5563;
  --highlight-color: #ffffff;
  --spread: 60px;
  --duration: 2s;

  display: inline-block;
  background: linear-gradient(
    90deg,
    transparent calc(50% - var(--spread)),
    var(--highlight-color),
    transparent calc(50% + var(--spread))
  ),
  linear-gradient(var(--base-color), var(--base-color));
  background-size: 250% 100%, auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat, padding-box;
  background-position: 100% center;
  animation: shimmer var(--duration) linear infinite;
}

@keyframes shimmer {
  from { background-position: 100% center; }
  to   { background-position: 0% center; }
}
</style>
