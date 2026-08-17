<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

interface Props {
  searchQuery: string
}

defineProps<Props>()

const emit = defineEmits<{
  searchChange: [query: string]
}>()

const { t } = useLanguage()

// Estados locales
const isSearchFocused = ref(false)

// Métodos
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('searchChange', target.value)
}

const clearSearch = () => {
  emit('searchChange', '')
}
</script>

<template>
  <div class="search-container" :class="{ 'search-container--focused': isSearchFocused }">
    <div class="search-input-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input
        type="text"
        :value="searchQuery"
        :placeholder="t('blog.filters.searchPlaceholder')"
        class="search-input"
        @input="handleSearchInput"
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="search-clear"
        :aria-label="t('blog.filters.clearSearch')"
        @click="clearSearch"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  flex: 1;
  max-width: 400px;

  &--focused {
    .search-input-wrapper {
      border-color: #4facfe;
      box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
    }
  }
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.search-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 1rem 0;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
}

.search-clear {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 768px) {
  .search-container {
    max-width: none;
  }
}
</style>
