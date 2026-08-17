<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import type { BlogPost } from '@/composables/useBlog'
import BlogCardImage from '@/components/blog/BlogCardImage.vue'
import BlogCardMeta from '@/components/blog/BlogCardMeta.vue'
import BlogCardFooter from '@/components/blog/BlogCardFooter.vue'

interface Props {
  post: BlogPost
  viewMode: 'grid' | 'list'
}

const props = defineProps<Props>()

const router = useRouter()
const { t } = useLanguage()

// Métodos
const navigateToPost = () => {
  router.push(`/blog/${props.post.slug}`)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    navigateToPost()
  }
}
</script>

<template>
  <article
    class="blog-card"
    :class="{
      'blog-card--grid': viewMode === 'grid',
      'blog-card--list': viewMode === 'list',
      'blog-card--featured': post.featured,
    }"
    tabindex="0"
    role="button"
    :aria-label="t('blog.card.readPost', { title: post.title })"
    @click="navigateToPost"
    @keydown="handleKeydown"
  >
    <BlogCardImage :post="post" />

    <!-- Contenido -->
    <div class="blog-card__content">
      <BlogCardMeta :post="post" />

      <!-- Título -->
      <h2 class="blog-card__title">
        {{ post.title }}
      </h2>

      <!-- Excerpt -->
      <p class="blog-card__excerpt">
        {{ post.excerpt }}
      </p>

      <!-- Tags -->
      <div class="blog-card__tags">
        <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag"> #{{ tag }} </span>
        <span v-if="post.tags.length > 3" class="tag tag--more"> +{{ post.tags.length - 3 }} </span>
      </div>

      <BlogCardFooter :post="post" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.blog-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  animation: cardFadeIn 0.6s ease forwards;
  animation-delay: var(--animation-delay, 0s);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(79, 172, 254, 0.3);

    :deep(.cover-image) {
      transform: scale(1.05);
    }

    :deep(.image-overlay) {
      opacity: 1;
    }

    .blog-card__title {
      color: #4facfe;
    }

    :deep(.read-more-btn) {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;

      .arrow-icon {
        transform: translate(2px, -2px);
      }
    }
  }

  &:focus {
    outline: 2px solid #4facfe;
    outline-offset: 2px;
  }

  // Vista Grid
  &--grid {
    display: flex;
    flex-direction: column;
    height: 100%;

    .blog-card__image {
      height: 240px;
    }

    .blog-card__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
    }

    .blog-card__footer {
      margin-top: auto;
    }
  }

  // Vista List
  &--list {
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;

    .blog-card__image {
      height: 200px;
    }

    .blog-card__content {
      padding: 2rem;
    }

    .blog-card__title {
      font-size: 1.5rem;
    }

    .blog-card__excerpt {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  // Featured post
  &--featured {
    border: 2px solid rgba(79, 172, 254, 0.3);
    background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.05) 100%);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
  }
}

// Contenido
.blog-card__content {
  color: white;
}

.blog-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 0.75rem;
  color: white;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__excerpt {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  .tag {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 500;

    &--more {
      background: rgba(79, 172, 254, 0.2);
      color: #4facfe;
      font-weight: 600;
    }
  }
}

@keyframes cardFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .blog-card {
    &--list {
      grid-template-columns: 250px 1fr;

      .blog-card__image {
        height: 180px;
      }

      .blog-card__content {
        padding: 1.5rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .blog-card {
    &--list {
      grid-template-columns: 1fr;

      .blog-card__image {
        height: 200px;
      }

      .blog-card__content {
        padding: 1.5rem;
      }
    }

    &--grid {
      .blog-card__image {
        height: 200px;
      }

      .blog-card__content {
        padding: 1.25rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .blog-card {
    &--grid {
      .blog-card__content {
        padding: 1rem;
      }
    }
  }

  .blog-card__tags {
    .tag {
      font-size: 0.7rem;
    }
  }
}
</style>
