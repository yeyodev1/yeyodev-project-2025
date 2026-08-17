<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TimelineItem from './timeline/TimelineItem.vue'

export interface TimelineEntry {
  title: string
  content: string
  tags?: string[]
  link?: string
  linkLabel?: string
  badge?: string
  image?: string
  imageAlt?: string
}

interface Props {
  data: TimelineEntry[]
}

const props = defineProps<Props>()

// ── Scroll-driven line ────────────────────────────────────────────────────────
const containerRef = ref<HTMLElement | null>(null)
const lineTrackRef = ref<HTMLElement | null>(null)
const progressHeight = ref(0)

const updateProgress = () => {
  if (!containerRef.value || !lineTrackRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const trackH = lineTrackRef.value.offsetHeight
  const windowH = window.innerHeight
  const scrolled = Math.max(0, windowH * 0.1 - rect.top)
  const max = rect.height - windowH * 0.5
  const ratio = Math.min(Math.max(scrolled / max, 0), 1)
  progressHeight.value = trackH * ratio
}

// ── Entrance animations via IntersectionObserver ──────────────────────────────
const visibleItems = ref<Set<number>>(new Set())
let observer: IntersectionObserver | null = null

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          visibleItems.value = new Set([...visibleItems.value, idx])
        }
      })
    },
    { threshold: 0.12 },
  )

  document.querySelectorAll('.tl__item').forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
  observer?.disconnect()
})
</script>

<template>
  <div ref="containerRef" class="tl">
    <!-- Animated vertical line -->
    <div ref="lineTrackRef" class="tl__line-track">
      <div class="tl__line-fill" :style="{ height: progressHeight + 'px' }" />
    </div>

    <!-- Items -->
    <TimelineItem
      v-for="(item, index) in props.data"
      :key="index"
      :item="item"
      :index="index"
      :visible="visibleItems.has(index)"
    />
  </div>
</template>

<style lang="scss" scoped>
.tl {
  position: relative;

  // ── Scroll line ─────────────────────────────────────────────────────────────
  &__line-track {
    position: absolute;
    left: 0.5rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(255, 255, 255, 0.06) 8%,
      rgba(255, 255, 255, 0.06) 92%,
      transparent 100%
    );

    @media (min-width: $breakpoint-md) {
      left: 2rem;
    }
  }

  &__line-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 1px;
    background: linear-gradient(to bottom, $accent-primary, $accent-cyan);
    transition: height 0.08s linear;
    filter: drop-shadow(0 0 4px rgba(124, 58, 237, 0.6));
  }
}
</style>
