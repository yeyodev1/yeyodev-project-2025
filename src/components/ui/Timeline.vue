<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

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
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          visibleItems.value = new Set([...visibleItems.value, idx])
        }
      })
    },
    { threshold: 0.12 },
  )

  document.querySelectorAll('.tl__item').forEach(el => observer?.observe(el))
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
    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="tl__item"
      :class="{ 'tl__item--visible': visibleItems.has(index) }"
      :data-index="index"
    >
      <!-- ── Left: sticky label (desktop) ───────────────────────── -->
      <div class="tl__left">
        <div class="tl__dot">
          <div class="tl__dot-ring" />
          <div class="tl__dot-core" />
        </div>
        <h3 class="tl__label">{{ item.title }}</h3>
        <span v-if="item.badge" class="tl__badge-left">{{ item.badge }}</span>
      </div>

      <!-- ── Right: content card ────────────────────────────────── -->
      <div class="tl__card">

        <!-- Mobile title -->
        <div class="tl__mobile-header">
          <h3 class="tl__mobile-title">{{ item.title }}</h3>
          <span v-if="item.badge" class="tl__badge">{{ item.badge }}</span>
        </div>

        <!-- Screenshot -->
        <div v-if="item.image" class="tl__image-wrap">
          <img :src="item.image" :alt="item.imageAlt ?? item.title" class="tl__image" loading="lazy" />
          <div class="tl__image-overlay" />
        </div>

        <!-- No image: accent gradient block -->
        <div v-else class="tl__image-placeholder">
          <i class="fa-solid fa-code tl__placeholder-icon" />
        </div>

        <!-- Body -->
        <div class="tl__body">
          <span class="tl__badge tl__badge--desktop" v-if="item.badge">{{ item.badge }}</span>
          <p class="tl__text">{{ item.content }}</p>

          <div v-if="item.tags?.length" class="tl__tags">
            <span v-for="tag in item.tags" :key="tag" class="tl__tag">{{ tag }}</span>
          </div>

          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="tl__link"
          >
            <i class="fa-solid fa-arrow-up-right-from-square" />
            {{ item.linkLabel || 'Ver proyecto' }}
          </a>
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

@keyframes item-in {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0); }
}

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
      rgba(255,255,255,0.06) 8%,
      rgba(255,255,255,0.06) 92%,
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

  // ── Item ─────────────────────────────────────────────────────────────────────
  &__item {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2.5rem 0 2.5rem 2.5rem;
    opacity: 0;
    transform: translateY(40px);
    transition: none;

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      align-items: flex-start;
      gap: 3rem;
      padding: 3rem 0 3rem 0;
    }

    &--visible {
      animation: item-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;

      @for $i from 0 through 5 {
        &:nth-child(#{$i + 2}) {
          animation-delay: #{$i * 0.05}s;
        }
      }
    }
  }

  // ── Left sticky column ────────────────────────────────────────────────────
  &__left {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    position: sticky;
    top: 40%;
    align-self: flex-start;
    width: 200px;
    flex-shrink: 0;
    padding-left: 3.5rem;

    @media (min-width: $breakpoint-md) {
      display: flex;
    }
  }

  &__dot {
    position: absolute;
    left: -2.25rem;
    top: 0.15rem;
    width: 1.125rem;
    height: 1.125rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $breakpoint-md) {
      left: 0.65rem;
    }
  }

  &__dot-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: $bg-elevated;
    border: 2px solid $border-violet;
    animation: dot-pulse 3s ease-in-out infinite;
  }

  &__dot-core {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $accent-light;
    position: relative;
  }

  &__label {
    font-size: 1.5rem;
    font-weight: 800;
    color: $text-muted;
    line-height: 1.2;
    font-family: 'Bitcount', sans-serif;
    margin-top: 0.5rem;
  }

  &__badge-left {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: $accent-gold;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  // ── Card ─────────────────────────────────────────────────────────────────────
  &__card {
    flex: 1;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    overflow: hidden;
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: $border-violet;
      transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px $border-violet;
    }
  }

  // Mobile header
  &__mobile-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    padding: 1.25rem 1.25rem 0;

    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }

  &__mobile-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: $accent-light;
  }

  // Image
  &__image-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 8;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
    transition: transform 0.6s ease;

    .tl__card:hover & {
      transform: scale(1.02);
    }
  }

  &__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(13, 13, 34, 0.85) 100%
    );
    pointer-events: none;
  }

  &__image-placeholder {
    width: 100%;
    aspect-ratio: 16 / 6;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 214, 160, 0.08) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $border-subtle;
  }

  &__placeholder-icon {
    font-size: 3rem;
    color: $border-violet;
  }

  // Body
  &__body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__badge {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: $accent-gold;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;

    &--desktop {
      display: none;

      @media (min-width: $breakpoint-md) {
        display: inline-block;
      }
    }
  }

  &__text {
    font-size: 0.95rem;
    color: $text-secondary;
    line-height: 1.75;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  &__tag {
    padding: 0.2rem 0.65rem;
    background: $bg-elevated;
    border: 1px solid $border-subtle;
    border-radius: 999px;
    font-size: 0.75rem;
    color: $text-muted;
    font-family: 'Roboto', monospace;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: $accent-light;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    border: 1px solid $border-violet;
    background: rgba(124, 58, 237, 0.08);
    width: fit-content;
    transition: all 0.25s ease;

    i { font-size: 0.75rem; }

    &:hover {
      background: $accent-primary;
      border-color: $accent-primary;
      color: $text-primary;
      transform: translateX(3px);
    }
  }
}
</style>
