<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import type { BlogCategory } from '@/composables/useBlog'
import BlogSearchBar from '@/components/blog/BlogSearchBar.vue'
import BlogCategoryChips from '@/components/blog/BlogCategoryChips.vue'

interface Props {
  categories: BlogCategory[]
  selectedCategory: string
  searchQuery: string
  viewMode: 'grid' | 'list'
}

interface Emits {
  categoryChange: [category: string]
  searchChange: [query: string]
  viewModeChange: [mode: 'grid' | 'list']
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useLanguage()

// Computed properties
const hasActiveFilters = computed(() => {
  return props.selectedCategory !== '' || props.searchQuery.trim() !== ''
})

// Métodos
const handleViewModeToggle = () => {
  const newMode = props.viewMode === 'grid' ? 'list' : 'grid'
  emit('viewModeChange', newMode)
}

const clearAllFilters = () => {
  emit('categoryChange', '')
  emit('searchChange', '')
}
</script>

<template>
  <div class="blog-filters">
    <!-- Barra principal de filtros -->
    <div class="blog-filters__main">
      <!-- Búsqueda -->
      <BlogSearchBar :search-query="searchQuery" @search-change="emit('searchChange', $event)" />

      <!-- Controles de vista (desktop) -->
      <div class="view-controls">
        <!-- Botón de vista -->
        <button
          type="button"
          class="view-toggle"
          :aria-label="t('blog.filters.toggleView')"
          @click="handleViewModeToggle"
        >
          <svg
            v-if="viewMode === 'grid'"
            class="view-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg v-else class="view-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM14 14H21V21H14V14ZM3 14H10V21H3V14Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Categorías (desktop) -->
    <BlogCategoryChips
      :categories="categories"
      :selected-category="selectedCategory"
      :has-active-filters="hasActiveFilters"
      @category-change="emit('categoryChange', $event)"
      @clear-filters="clearAllFilters"
    />
  </div>
</template>

<style lang="scss" scoped>
.blog-filters {
  position: sticky;
  top: 80px;
  z-index: 10;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  margin-bottom: 2rem;

  &__main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
}

// Controles de vista
.view-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.view-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;

  .view-icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .blog-filters {
    &__main {
      padding: 0 1rem;
    }
  }
}
</style>
