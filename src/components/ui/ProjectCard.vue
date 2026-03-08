<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: Array as () => string[],
    required: false,
    default: () => []
  },
  badge: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  linkLabel: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  }
})

const categoryIcon = computed(() => {
  switch (props.category) {
    case 'web': return 'fa-solid fa-globe'
    case 'saas': return 'fa-solid fa-server'
    case 'ai': return 'fa-solid fa-microchip'
    default: return 'fa-solid fa-code'
  }
})
</script>

<template>
  <div class="project-card">
    <div class="project-card__header">
      <div class="project-card__meta">
        <span class="project-card__category">
          <i :class="categoryIcon" />
          {{ category }}
        </span>
        <span v-if="badge" class="project-card__badge">{{ badge }}</span>
      </div>
      <h3 class="project-card__title">{{ title }}</h3>
    </div>

    <div class="project-card__body">
      <p class="project-card__description">{{ content }}</p>
    </div>

    <div class="project-card__footer">
      <div v-if="tags.length" class="project-card__tags">
        <span v-for="tag in tags.slice(0, 4)" :key="tag" class="project-card__tag">
          {{ tag }}
        </span>
        <span v-if="tags.length > 4" class="project-card__tag-more">+{{ tags.length - 4 }}</span>
      </div>
      
      <a 
        v-if="link" 
        :href="link" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="project-card__link"
      >
        {{ linkLabel || 'View Project' }}
        <i class="fa-solid fa-arrow-up-right-from-square" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-card {
  background: $bg-secondary;
  border: 1px solid $border-subtle;
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: $border-violet;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px $accent-glow;

    &::before {
      opacity: 1;
    }

    .project-card__link {
      color: $accent-primary;
      transform: translateX(4px);
    }
  }

  &__header {
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 1;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  &__category {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: $accent-light;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      font-size: 0.8rem;
    }
  }

  &__badge {
    padding: 0.2rem 0.6rem;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.2);
    color: $accent-gold;
    font-size: 0.65rem;
    font-weight: 600;
    border-radius: 6px;
    text-transform: uppercase;
  }

  &__title {
    font-size: 1.35rem;
    font-weight: 800;
    color: $text-primary;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  &__body {
    flex: 1;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  &__description {
    font-size: 0.925rem;
    line-height: 1.6;
    color: $text-secondary;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
    z-index: 1;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tag,
  &__tag-more {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    background: $bg-deep;
    border: 1px solid $border-subtle;
    color: $text-muted;
    font-weight: 500;
  }

  &__tag-more {
    border-style: dashed;
  }

  &__link {
    font-size: 0.85rem;
    font-weight: 600;
    color: $text-primary;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    width: fit-content;

    i {
      font-size: 0.75rem;
    }
  }
}
</style>
