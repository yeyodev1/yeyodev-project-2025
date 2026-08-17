<script setup lang="ts">
import type { BlogPost } from '@/composables/useBlog'

interface Props {
  post: BlogPost
}

defineProps<Props>()

const formatPostDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <header class="post-header">
    <h1 class="post-title">{{ post.title }}</h1>
    <div class="post-meta">
      <span class="post-date">{{ formatPostDate(post.publishedAt) }}</span>
      <span class="post-reading-time">{{ post.readingTime }} min de lectura</span>
      <span class="post-category">{{ post.category }}</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.post-header {
  margin-bottom: 3rem;
  text-align: center;

  .post-title {
    margin-bottom: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  .post-meta {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    opacity: 0.8;
    font-size: 0.9rem;

    span {
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;

      .post-view--light & {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

@media (max-width: 768px) {
  .post-header .post-meta {
    gap: 1rem;

    span {
      padding: 0.3rem 0.8rem;
      font-size: 0.8rem;
    }
  }
}

@media (max-width: 480px) {
  .post-header .post-meta {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
