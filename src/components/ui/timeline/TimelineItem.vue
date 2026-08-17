<script setup lang="ts">
import type { TimelineEntry } from '../Timeline.vue'

interface Props {
  item: TimelineEntry
  index: number
  visible: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="tl__item" :class="{ 'tl__item--visible': visible }" :data-index="index">
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
        <img
          :src="item.image"
          :alt="item.imageAlt ?? item.title"
          class="tl__image"
          loading="lazy"
        />
        <div class="tl__image-overlay" />
      </div>

      <!-- No image: accent gradient block -->
      <div v-else class="tl__image-placeholder">
        <i class="fa-solid fa-code tl__placeholder-icon" />
      </div>

      <!-- Body -->
      <div class="tl__body">
        <span v-if="item.badge" class="tl__badge tl__badge--desktop">{{ item.badge }}</span>
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
</template>

<style lang="scss" scoped>
@use './item';
</style>
