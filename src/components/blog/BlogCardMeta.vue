<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useBlog } from '@/composables/useBlog'
import type { BlogPost } from '@/composables/useBlog'

interface Props {
  post: BlogPost
}

const props = defineProps<Props>()

const { t } = useLanguage()
const { formatDate } = useBlog()

// Computed properties
const formattedDate = computed(() => {
  return formatDate(props.post.publishedAt)
})

const readingTimeText = computed(() => {
  return t('blog.card.readingTime', { minutes: props.post.readingTime })
})

const categoryText = computed(() => {
  return props.post.category.charAt(0).toUpperCase() + props.post.category.slice(1)
})
</script>

<template>
  <div class="blog-card__meta">
    <div class="meta-left">
      <span class="category-tag">
        {{ categoryText }}
      </span>
      <span class="meta-divider">•</span>
      <time :datetime="post.publishedAt" class="publish-date">
        {{ formattedDate }}
      </time>
    </div>
    <div class="meta-right">
      <div class="reading-time">
        <svg class="clock-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <path
            d="M12 6V12L16 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ readingTimeText }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;

  .meta-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category-tag {
    background: rgba(79, 172, 254, 0.2);
    color: #4facfe;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .meta-divider {
    color: rgba(255, 255, 255, 0.3);
  }

  .publish-date {
    color: rgba(255, 255, 255, 0.7);
  }

  .reading-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: rgba(255, 255, 255, 0.6);

    .clock-icon {
      width: 14px;
      height: 14px;
    }
  }
}

@media (max-width: 480px) {
  .blog-card__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
