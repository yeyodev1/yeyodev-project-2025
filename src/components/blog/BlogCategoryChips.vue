<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import type { BlogCategory } from '@/composables/useBlog'

interface Props {
  categories: BlogCategory[]
  selectedCategory: string
  hasActiveFilters: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  categoryChange: [category: string]
  clearFilters: []
}>()

const { t } = useLanguage()

// Computed properties
const allCategories = computed(() => [
  { id: 'all', name: t('blog.filters.allCategories'), slug: 'all', description: '', count: 0 },
  ...(props.categories || []),
])

// Métodos
const handleCategoryClick = (categorySlug: string) => {
  const category = categorySlug === 'all' ? '' : categorySlug
  emit('categoryChange', category)
}
</script>

<template>
  <div class="blog-filters__categories">
    <div class="categories-container">
      <button
        v-for="category in allCategories"
        :key="category.id"
        type="button"
        class="category-button"
        :class="{
          'category-button--active':
            (category.slug === 'all' && selectedCategory === '') ||
            category.slug === selectedCategory,
        }"
        @click="handleCategoryClick(category.slug)"
      >
        <span class="category-name">{{ category.name }}</span>
        <span v-if="category.count > 0" class="category-count">
          {{ category.count }}
        </span>
      </button>
    </div>

    <!-- Limpiar filtros -->
    <button v-if="hasActiveFilters" type="button" class="clear-filters" @click="emit('clearFilters')">
      <svg class="clear-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ t('blog.filters.clearAll') }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.blog-filters__categories {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.categories-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.category-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;

  .category-name {
    text-transform: capitalize;
  }

  .category-count {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.125rem 0.375rem;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-1px);
  }

  &--active {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border-color: transparent;
    color: white;

    .category-count {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.clear-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 2px solid rgba(255, 107, 107, 0.2);
  border-radius: 8px;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;

  .clear-icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: rgba(255, 107, 107, 0.4);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .blog-filters__categories {
    padding: 0 1rem;

    .categories-container {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }

  .category-button {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
}

@media (max-width: 480px) {
  .blog-filters__categories {
    .categories-container {
      gap: 0.375rem;
    }
  }

  .category-button {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;

    .category-count {
      font-size: 0.65rem;
      padding: 0.125rem 0.25rem;
    }
  }
}
</style>
