<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

interface Props {
  state: 'loading' | 'error' | 'empty'
}

defineProps<Props>()

const emit = defineEmits<{
  retry: []
}>()

const { t } = useLanguage()
</script>

<template>
  <!-- Loading State -->
  <div v-if="state === 'loading'" class="blog-loading">
    <div class="loading-spinner"></div>
    <p>{{ t('blog.loading') }}</p>
  </div>

  <!-- Error State -->
  <div v-else-if="state === 'error'" class="blog-error">
    <div class="error-icon">⚠️</div>
    <h3>{{ t('blog.error.title') }}</h3>
    <p>{{ t('blog.error.message') }}</p>
    <button type="button" class="retry-btn" @click="emit('retry')">
      {{ t('blog.error.retry') }}
    </button>
  </div>

  <!-- No Results -->
  <div v-else class="blog-empty">
    <div class="empty-icon">📝</div>
    <h3>{{ t('blog.empty.title') }}</h3>
    <p>{{ t('blog.empty.message') }}</p>
  </div>
</template>

<style lang="scss" scoped>
// Loading State
.blog-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(79, 172, 254, 0.3);
    border-top: 3px solid #4facfe;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
}

// Error State
.blog-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #ff6b6b;
  }

  p {
    margin-bottom: 2rem;
    opacity: 0.8;
  }

  .retry-btn {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
    }
  }
}

// Empty State
.blog-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.6;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.7;
  }
}

// Animations
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .blog-loading,
  .blog-error,
  .blog-empty {
    padding: 3rem 1rem;
  }
}
</style>
