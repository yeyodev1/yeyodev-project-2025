<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="blog-hero__cta">
    <button type="button" class="cta-button cta-button--primary">
      <span>{{ t('blog.hero.cta.explore') }}</span>
      <svg class="cta-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <button type="button" class="cta-button cta-button--secondary">
      <svg class="cta-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 15V3"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ t('blog.hero.cta.newsletter') }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.blog-hero__cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    .cta-icon {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }

    &--primary {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);

        .cta-icon {
          transform: translate(2px, -2px);
        }
      }
    }

    &--secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);

        .cta-icon {
          transform: translateY(-2px);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .blog-hero__cta {
    justify-content: center;

    .cta-button {
      padding: 0.875rem 1.25rem;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 480px) {
  .blog-hero__cta {
    flex-direction: column;

    .cta-button {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
