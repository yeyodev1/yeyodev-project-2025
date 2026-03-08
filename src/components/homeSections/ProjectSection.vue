<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const { t } = useI18n()

type FilterKey = 'all' | 'web' | 'saas' | 'ai'
const activeFilter = ref<FilterKey>('all')

const filters = computed(() => [
  { key: 'all' as FilterKey, label: t('projects.filters.all') },
  { key: 'web' as FilterKey, label: t('projects.filters.web') },
  { key: 'saas' as FilterKey, label: t('projects.filters.saas') },
  { key: 'ai' as FilterKey, label: t('projects.filters.ai') },
])

interface ProjectItem {
  id: string
  category: FilterKey
  title: string
  content: string
  tags: string[]
  badge?: string
  link?: string
  linkLabel?: string
}

const allProjects = computed<ProjectItem[]>(() => [
  {
    id: 'finestra',
    category: 'saas',
    title: t('projects.items.finestra.title'),
    content: t('projects.items.finestra.content'),
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Contifico API', 'Real-time', 'Warehouse'],
    badge: t('projects.items.finestra.badge'),
    link: 'https://nicole-sells-bills.netlify.app/',
    linkLabel: t('projects.items.finestra.linkLabel'),
  },
  {
    id: 'bakano',
    category: 'web',
    title: t('projects.items.bakano.title'),
    content: t('projects.items.bakano.content'),
    tags: ['Vue.js', 'SCSS', 'Node.js', 'Data Strategy', 'Tech Leadership'],
    badge: t('projects.items.bakano.badge'),
    link: 'https://bakano.ec/',
    linkLabel: t('projects.items.bakano.linkLabel'),
  },
  {
    id: 'opus',
    category: 'web',
    title: t('projects.items.opus.title'),
    content: t('projects.items.opus.content'),
    tags: ['Vue.js', 'Vite', 'SCSS', 'SEO', 'Netlify'],
    badge: t('projects.items.opus.badge'),
    link: 'https://opusdentallab.info/',
    linkLabel: t('projects.items.opus.linkLabel'),
  },
  {
    id: 'scaleai',
    category: 'ai',
    title: t('projects.items.scaleai.title'),
    content: t('projects.items.scaleai.content'),
    tags: ['Python', 'TypeScript', 'AI Training', 'RLHF', 'Data Pipelines', 'Scale AI'],
    badge: t('projects.items.scaleai.badge'),
  },
])

const displayed = computed(() =>
  activeFilter.value === 'all'
    ? allProjects.value
    : allProjects.value.filter(p => p.category === activeFilter.value)
)

const setFilter = (key: FilterKey) => { activeFilter.value = key }
</script>

<template>
  <section id="projects" class="projects">
    <div class="projects__container">
      <div class="projects__header">
        <span class="projects__eyebrow">{{ t('projects.eyebrow') }}</span>
        <h2 class="projects__title">
          {{ t('projects.title') }} <span class="projects__title--accent">{{ t('projects.titleAccent') }}</span>
        </h2>
        <p class="projects__subtitle">{{ t('projects.subtitle') }}</p>
      </div>

      <div class="projects__filters">
        <button
          v-for="f in filters"
          :key="f.key"
          class="projects__filter"
          :class="{ 'projects__filter--active': activeFilter === f.key }"
          @click="setFilter(f.key)"
        >{{ f.label }}</button>
      </div>

      <div class="projects__grid">
        <transition-group name="project-fade">
          <div 
            v-for="p in displayed" 
            :key="p.id"
            class="projects__grid-item"
          >
            <ProjectCard v-bind="p" />
          </div>
        </transition-group>
      </div>

      <div class="projects__cta">
        <p>{{ t('projects.cta.text') }}</p>
        <a href="https://wa.me/17633524852" target="_blank" rel="noopener noreferrer" class="projects__cta-btn">
          {{ t('projects.cta.btn') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.projects {
  background: $bg-primary;
  padding: 6rem 0 8rem;

  &__container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: $breakpoint-md) {
      padding: 0 2rem;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 3.5rem;
    animation: fade-up 0.8s ease-out both;
  }

  &__eyebrow {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $accent-cyan;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: clamp(2.5rem, 6vw, 3.75rem);
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;

    &--accent {
      background: linear-gradient(135deg, $accent-primary, $accent-cyan);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__subtitle {
    font-size: 1.1rem;
    color: $text-secondary;
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  &__filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 4rem;
  }

  &__filter {
    padding: 0.6rem 1.5rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: $border-violet;
      color: $text-primary;
      transform: translateY(-2px);
    }

    &--active {
      background: $accent-primary;
      border-color: $accent-primary;
      color: $text-primary;
      box-shadow: 0 8px 20px $accent-glow;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 4rem;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    // Animación de la cuadrícula
    >span {
      display: contents; // Para que el transition-group no rompa el grid
    }
  }

  &__cta {
    margin-top: 6rem;
    text-align: center;
    padding: 4rem 2rem;
    border: 1px solid $border-subtle;
    border-radius: 24px;
    background: linear-gradient(135deg, $bg-secondary, rgba(12, 12, 34, 0.5));
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 60%);
      pointer-events: none;
    }

    p {
      font-size: 1.25rem;
      font-weight: 500;
      color: $text-primary;
      margin-bottom: 2rem;
      position: relative;
    }
  }

  &__cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    border-radius: 999px;
    background: linear-gradient(135deg, $accent-primary, #6366f1);
    color: $text-primary;
    font-weight: 700;
    font-size: 1.05rem;
    box-shadow: 0 10px 25px $accent-glow;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 35px $accent-glow;
    }
  }
}

// Transitions
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.5s ease;
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.project-fade-move {
  transition: transform 0.5s ease;
}
</style>
