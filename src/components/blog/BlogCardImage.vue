<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import type { BlogPost } from '@/composables/useBlog'

interface Props {
  post: BlogPost
}

defineProps<Props>()

const { t } = useLanguage()
</script>

<template>
  <div class="blog-card__image">
    <img
      :src="post.coverImage.url"
      :alt="post.coverImage.alt"
      loading="lazy"
      class="cover-image"
    />

    <!-- Badge de featured -->
    <div v-if="post.featured" class="featured-badge">
      <svg class="featured-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
          fill="currentColor"
        />
      </svg>
      <span>{{ t('blog.card.featured') }}</span>
    </div>

    <!-- Overlay de hover -->
    <div class="image-overlay">
      <div class="overlay-content">
        <svg class="read-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ t('blog.card.readMore') }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-card__image {
  position: relative;
  overflow: hidden;

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .featured-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-radius: 20px;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 2;

    .featured-icon {
      width: 14px;
      height: 14px;
    }
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(79, 172, 254, 0.8) 0%, rgba(0, 242, 254, 0.6) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    .overlay-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-weight: 600;
      font-size: 1rem;

      .read-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
