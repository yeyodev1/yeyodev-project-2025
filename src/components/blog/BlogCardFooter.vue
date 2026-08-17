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
  <div class="blog-card__footer">
    <div class="author-info">
      <img
        :src="post.author.avatar"
        :alt="post.author.name"
        class="author-avatar"
        loading="lazy"
      />
      <div class="author-details">
        <span class="author-name">{{ post.author.name }}</span>
        <span class="author-role">{{ t('blog.card.author') }}</span>
      </div>
    </div>

    <button
      type="button"
      class="read-more-btn"
      :aria-label="t('blog.card.readPost', { title: post.title })"
    >
      <span>{{ t('blog.card.readMore') }}</span>
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.blog-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .author-details {
    display: flex;
    flex-direction: column;

    .author-name {
      font-weight: 600;
      color: white;
      font-size: 0.875rem;
    }

    .author-role {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .read-more-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.875rem;

    .arrow-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-1px);
    }
  }
}

@media (max-width: 768px) {
  .blog-card__footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;

    .read-more-btn {
      align-self: stretch;
      justify-content: center;
    }
  }
}
</style>
