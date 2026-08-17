<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useBlog } from '@/composables/useBlog'
import BlogCard from '@/components/blog/BlogCard.vue'
import BlogFilters from '@/components/blog/BlogFilters.vue'
import BlogHero from '@/components/blog/BlogHero.vue'
import BlogStates from '@/components/blog/BlogStates.vue'

const { t } = useLanguage()
const { loading, error, categories, selectedCategory, searchQuery, filteredPosts, fetchPosts } =
  useBlog()

// Estados locales para la vista
const isVisible = ref(false)
const viewMode = ref<'grid' | 'list'>('grid')

// Computed properties
const postsToShow = computed(() => {
  return filteredPosts.value
})

const hasResults = computed(() => {
  return postsToShow.value.length > 0
})

// Lifecycle
onMounted(async () => {
  await fetchPosts()
  isVisible.value = true
})

// Métodos
const handleCategoryChange = (category: string) => {
  selectedCategory.value = category
}

const handleSearchChange = (query: string) => {
  searchQuery.value = query
}

const handleViewModeChange = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}
</script>

<template>
  <div class="blog-view">
    <BlogHero />

    <main class="blog-main">
      <div class="blog-container">
        <BlogFilters
          :categories="categories"
          :selected-category="selectedCategory"
          :search-query="searchQuery"
          :view-mode="viewMode"
          @category-change="handleCategoryChange"
          @search-change="handleSearchChange"
          @view-mode-change="handleViewModeChange"
        />

        <!-- Loading / Error / No Results -->
        <BlogStates v-if="loading" state="loading" />
        <BlogStates v-else-if="error" state="error" @retry="fetchPosts" />
        <BlogStates v-else-if="!hasResults" state="empty" />

        <!-- Posts Grid/List -->
        <div
          v-else
          class="blog-posts"
          :class="{
            'blog-posts--grid': viewMode === 'grid',
            'blog-posts--list': viewMode === 'list',
            'blog-posts--visible': isVisible,
          }"
        >
          <BlogCard
            v-for="(post, index) in postsToShow"
            :key="post.id"
            :post="post"
            :view-mode="viewMode"
            :style="{ '--animation-delay': `${index * 0.1}s` }"
          />
        </div>
        <div v-if="hasResults" class="blog-load-more">
          <button class="load-more-btn" disabled>
            {{ t('blog.loadMore') }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.blog-view {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    $YEYO-VIOLET 0%,
    rgba(26, 26, 46, 0.95) 20%,
    rgba(22, 33, 62, 0.9) 100%
  );
}

.blog-main {
  padding: 2rem 0 4rem;
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

// Posts Layout
.blog-posts {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &--grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  &--list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

// Load More
.blog-load-more {
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  .load-more-btn {
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(79, 172, 254, 0.3);
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
    cursor: not-allowed;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:not(:disabled) {
      cursor: pointer;
      color: white;
      border-color: #4facfe;

      &:hover {
        background: rgba(79, 172, 254, 0.2);
        transform: translateY(-2px);
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .blog-container {
    padding: 0 1rem;
  }

  .blog-posts {
    &--grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .blog-posts {
    &--grid {
      gap: 1rem;
    }
  }
}
</style>
