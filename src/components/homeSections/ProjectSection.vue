<script setup lang="ts">
import { ref } from 'vue'
import Timeline from '@/components/ui/Timeline.vue'
import type { TimelineEntry } from '@/components/ui/Timeline.vue'

type FilterKey = 'all' | 'web' | 'saas' | 'ai'

const activeFilter = ref<FilterKey>('all')

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web & Marketing' },
  { key: 'saas', label: 'SaaS / Systems' },
  { key: 'ai', label: 'AI & Data' },
]

const allProjects: (TimelineEntry & { category: FilterKey; duration?: string; url?: string })[] = [
  {
    category: 'saas',
    title: 'Finestra — Nicole Pastry Arts',
    duration: 'Custom SaaS · Ongoing',
    badge: 'Live · Production',
    content:
      'End-to-end order management system built for Finestra, a company operating three restaurants: Casa Mía, Delacrem & Nicole Pastry Arts. Built by observing the team\'s real workflow — from the moment an order is placed, through production, dispatch, delivery, and warehouse inventory in real time. Integrated with Contifico billing system. Fork-ready for other F&B businesses.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Contifico API', 'Real-time', 'Warehouse'],
    link: 'https://nicole-sells-bills.netlify.app/',
    linkLabel: 'View system',
  },
  {
    category: 'web',
    title: 'Bakano — Digital Agency',
    duration: '3 days · CTO build',
    badge: 'CTO · Full Stack',
    content:
      'As CTO and founding developer of Bakano, led the architecture and development of the agency\'s own website and internal tooling. Bakano powers growth marketing, data strategy, Meta Ads performance, and tech consulting for 150+ businesses across Ecuador.',
    tags: ['Vue.js', 'SCSS', 'Node.js', 'Data Strategy', 'Tech Leadership'],
    link: 'https://bakano.ec/',
    linkLabel: 'Visit bakano.ec',
  },
  {
    category: 'web',
    title: 'Opus Dental Lab',
    duration: '5 days · full delivery',
    badge: 'Completed',
    content:
      'Full website for Opus Dental Lab LLC, a dental laboratory based in Orlando, FL. Delivered in 5 days — from design to deployment. Clean, professional, SEO-ready.',
    tags: ['Vue.js', 'Vite', 'SCSS', 'SEO', 'Netlify'],
    link: 'https://opusdentallab.info/',
    linkLabel: 'Visit site',
  },
  {
    category: 'ai',
    title: 'Scale AI — GPT-3 & GPT-3.5 Training',
    duration: 'Mar 2024 – Jan 2025',
    badge: 'Early Team · AI',
    content:
      'Part of one of the earliest AI trainer teams at Scale AI, contributing to the datasets and code samples that helped shape GPT-3 and GPT-3.5. Wrote original Python, JavaScript and TypeScript code to feed the models — no copy-pasted snippets, all crafted logic. Also built evaluation tools, curated datasets and optimized data pipelines.',
    tags: ['Python', 'TypeScript', 'AI Training', 'RLHF', 'Data Pipelines', 'Scale AI'],
  },
]

const displayed = ref(allProjects.filter(p => p.category === 'all' || true))

const setFilter = (key: FilterKey) => {
  activeFilter.value = key
  displayed.value = key === 'all' ? allProjects : allProjects.filter(p => p.category === key)
}

// Map to TimelineEntry
const timelineData = (): TimelineEntry[] =>
  displayed.value.map(p => ({
    title: p.duration ?? p.title,
    content: p.content,
    tags: p.tags,
    badge: p.badge,
    link: p.link,
    linkLabel: p.linkLabel,
  }))
</script>

<template>
  <section id="projects" class="projects">

    <div class="projects__container">

      <!-- Header -->
      <div class="projects__header">
        <span class="projects__eyebrow">Portfolio</span>
        <h2 class="projects__title">
          Selected <span class="projects__title--accent">Work</span>
        </h2>
        <p class="projects__subtitle">
          Systems built from scratch — understanding the problem first,
          then writing every line.
        </p>
      </div>

      <!-- Filters -->
      <div class="projects__filters">
        <button
          v-for="f in filters"
          :key="f.key"
          class="projects__filter"
          :class="{ 'projects__filter--active': activeFilter === f.key }"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Timeline -->
      <Timeline :data="timelineData()" />

      <!-- CTA -->
      <div class="projects__cta">
        <p>Have a system to build? I'll understand your business first.</p>
        <a
          href="https://wa.me/17633524852"
          target="_blank"
          rel="noopener noreferrer"
          class="projects__cta-btn"
        >
          Start a conversation →
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
