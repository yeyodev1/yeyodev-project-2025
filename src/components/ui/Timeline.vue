<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

export interface TimelineEntry {
  title: string
  content: string
  tags?: string[]
  link?: string
  linkLabel?: string
  badge?: string
}

interface Props {
  data: TimelineEntry[]
}

const props = defineProps<Props>()

const containerRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const lineHeight = ref(0)
const progressHeight = ref(0)

const updateProgress = () => {
  if (!containerRef.value || !lineRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const totalH = lineRef.value.offsetHeight
  lineHeight.value = totalH

  const windowH = window.innerHeight
  const scrolled = Math.max(0, windowH * 0.1 - rect.top)
  const max = rect.height - windowH * 0.5
  const ratio = Math.min(Math.max(scrolled / max, 0), 1)
  progressHeight.value = totalH * ratio
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div ref="containerRef" class="timeline">
    <div ref="lineRef" class="timeline__line-track">
      <div
        ref="progressRef"
        class="timeline__line-fill"
        :style="{ height: progressHeight + 'px' }"
      />
    </div>

    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="timeline__item"
    >
      <!-- Dot -->
      <div class="timeline__dot-col">
        <div class="timeline__dot">
          <div class="timeline__dot-inner" />
        </div>
        <h3 class="timeline__year">{{ item.title }}</h3>
      </div>

      <!-- Content -->
      <div class="timeline__content">
        <h3 class="timeline__year-mobile">{{ item.title }}</h3>

        <span v-if="item.badge" class="timeline__badge">{{ item.badge }}</span>

        <p class="timeline__text">{{ item.content }}</p>

        <div v-if="item.tags" class="timeline__tags">
          <span v-for="tag in item.tags" :key="tag" class="timeline__tag">
            {{ tag }}
          </span>
        </div>

        <a
          v-if="item.link"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          class="timeline__link"
        >
          {{ item.linkLabel || 'Ver proyecto' }} →
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>


.timeline {
  position: relative;
  padding-left: 2rem;

  @media (min-width: $breakpoint-md) {
    padding-left: 0;
  }

  // ─── Vertical line track ──────────────────────────────────────────────────
  &__line-track {
    position: absolute;
    left: 0.75rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      $border-subtle 10%,
      $border-subtle 90%,
      transparent 100%
    );
    overflow: hidden;

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
    transition: height 0.1s linear;
  }

  // ─── Item ─────────────────────────────────────────────────────────────────
  &__item {
    display: flex;
    gap: 2rem;
    padding: 2rem 0 3rem;
    position: relative;

    @media (min-width: $breakpoint-md) {
      gap: 3rem;
      padding-left: 2rem;
    }
  }

  // ─── Dot column ───────────────────────────────────────────────────────────
  &__dot-col {
    display: none;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 40%;
    align-self: flex-start;
    min-width: 120px;

    @media (min-width: $breakpoint-md) {
      display: flex;
    }
  }

  &__dot {
    position: absolute;
    left: -2.75rem;
    top: 0.25rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: $bg-elevated;
    border: 2px solid $border-violet;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      position: relative;
      left: unset;
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__dot-inner {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $accent-light;
  }

  &__year {
    display: none;
    margin-top: 0.75rem;
    font-size: 2.5rem;
    font-weight: 700;
    color: $text-muted;
    text-align: center;
    line-height: 1;
    white-space: nowrap;

    @media (min-width: $breakpoint-md) {
      display: block;
    }
  }

  // ─── Content ──────────────────────────────────────────────────────────────
  &__content {
    flex: 1;
    padding: 1.5rem;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 16px;
    transition: border-color 0.3s ease, transform 0.3s ease;

    &:hover {
      border-color: $border-violet;
      transform: translateY(-3px);
    }
  }

  &__year-mobile {
    font-size: 1.5rem;
    font-weight: 700;
    color: $accent-light;
    margin-bottom: 0.75rem;

    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }

  &__badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: $accent-gold;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 1rem;
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__tag {
    padding: 0.25rem 0.75rem;
    background: $bg-elevated;
    border: 1px solid $border-subtle;
    border-radius: 999px;
    font-size: 0.8rem;
    color: $text-secondary;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: $accent-light;
    transition: color 0.2s ease, gap 0.2s ease;

    &:hover {
      color: $accent-primary;
      gap: 0.5rem;
    }
  }
}
</style>
