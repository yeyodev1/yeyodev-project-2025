<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="blog-hero__stats">
    <div class="stat-item">
      <span class="stat-number">{{ t('blog.hero.stats.posts') }}</span>
      <span class="stat-label">{{ t('blog.hero.stats.postsLabel') }}</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <span class="stat-number">{{ t('blog.hero.stats.categories') }}</span>
      <span class="stat-label">{{ t('blog.hero.stats.categoriesLabel') }}</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <span class="stat-number">{{ t('blog.hero.stats.readers') }}</span>
      <span class="stat-label">{{ t('blog.hero.stats.readersLabel') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-hero__stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #4facfe;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
  }
}

@media (max-width: 768px) {
  .blog-hero__stats {
    gap: 1rem;

    .stat-number {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .blog-hero__stats {
    flex-direction: column;
    gap: 1rem;

    .stat-divider {
      width: 40px;
      height: 1px;
    }
  }
}
</style>
