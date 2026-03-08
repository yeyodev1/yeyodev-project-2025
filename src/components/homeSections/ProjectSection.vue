<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Timeline from '@/components/ui/Timeline.vue'
import type { TimelineEntry } from '@/components/ui/Timeline.vue'

const { t } = useI18n()

type FilterKey = 'all' | 'web' | 'saas' | 'ai'
const activeFilter = ref<FilterKey>('all')

const filters = computed(() => [
  { key: 'all' as FilterKey,  label: t('projects.filters.all') },
  { key: 'web' as FilterKey,  label: t('projects.filters.web') },
  { key: 'saas' as FilterKey, label: t('projects.filters.saas') },
  { key: 'ai' as FilterKey,   label: t('projects.filters.ai') },
])

type ProjectItem = TimelineEntry & { category: FilterKey }

const allProjects = computed<ProjectItem[]>(() => [
  {
    category: 'saas',
    title: t('projects.items.finestra.title'),
    content: t('projects.items.finestra.content'),
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Contifico API', 'Real-time', 'Warehouse'],
    badge: t('projects.items.finestra.badge'),
    link: 'https://nicole-sells-bills.netlify.app/',
    linkLabel: t('projects.items.finestra.linkLabel'),
  },
  {
    category: 'web',
    title: t('projects.items.bakano.title'),
    content: t('projects.items.bakano.content'),
    tags: ['Vue.js', 'SCSS', 'Node.js', 'Data Strategy', 'Tech Leadership'],
    badge: t('projects.items.bakano.badge'),
    link: 'https://bakano.ec/',
    linkLabel: t('projects.items.bakano.linkLabel'),
  },
  {
    category: 'web',
    title: t('projects.items.opus.title'),
    content: t('projects.items.opus.content'),
    tags: ['Vue.js', 'Vite', 'SCSS', 'SEO', 'Netlify'],
    badge: t('projects.items.opus.badge'),
    link: 'https://opusdentallab.info/',
    linkLabel: t('projects.items.opus.linkLabel'),
  },
  {
    category: 'ai',
    title: t('projects.items.scaleai.title'),
    content: t('projects.items.scaleai.content'),
    tags: ['Python', 'TypeScript', 'AI Training', 'RLHF', 'Data Pipelines', 'Scale AI'],
    badge: t('projects.items.scaleai.badge'),
  },
])

const displayed = computed<ProjectItem[]>(() =>
  activeFilter.value === 'all'
    ? allProjects.value
    : allProjects.value.filter(p => p.category === activeFilter.value)
)

const setFilter = (key: FilterKey) => { activeFilter.value = key }

const timelineData = computed<TimelineEntry[]>(() =>
  displayed.value.map(p => ({
    title: p.title,
    content: p.content,
    tags: p.tags,
    badge: p.badge,
    link: p.link,
    linkLabel: p.linkLabel,
  }))
)
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
      <Timeline :data="timelineData" />
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
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.projects {
  background: $bg-primary;
  padding: 6rem 0 8rem;

  &__container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: $breakpoint-md) {
      padding: 0 2rem;
    }
  }

  &__header {
    text-align: center;
    margin-bottom: 3rem;
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
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 1rem;

    &--accent {
      background: linear-gradient(135deg, $accent-primary, $accent-cyan);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__subtitle {
    font-size: 1.05rem;
    color: $text-secondary;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }

  &__filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 3rem;
  }

  &__filter {
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      border-color: $border-violet;
      color: $text-primary;
    }

    &--active {
      background: $accent-primary;
      border-color: $accent-primary;
      color: $text-primary;
      box-shadow: 0 0 16px $accent-glow;
    }
  }

  &__cta {
    margin-top: 5rem;
    text-align: center;
    padding: 3rem 2rem;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    background: $bg-secondary;

    p {
      font-size: 1.1rem;
      color: $text-secondary;
      margin-bottom: 1.5rem;
    }
  }

  &__cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    border-radius: 999px;
    background: linear-gradient(135deg, $accent-primary, rgba(124, 58, 237, 0.7));
    color: $text-primary;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 0 24px $accent-glow;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 40px $accent-glow;
    }
  }
}
</style>
