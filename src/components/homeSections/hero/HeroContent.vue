<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GooeyText from '@/components/ui/GooeyText.vue'
import TextShimmer from '@/components/ui/TextShimmer.vue'

const props = defineProps<{
  totalCommits: number
}>()

const { t, locale } = useI18n()

const roles = computed(() =>
  locale.value === 'es'
    ? ['Full Stack Dev', 'CTO @ Bakano', 'Experto Vue.js', 'Entrenador IA', 'Arquitecto Tech']
    : ['Full Stack Dev', 'CTO @ Bakano', 'Vue.js Expert', 'AI Trainer', 'Tech Architect'],
)

const stats = computed(() => [
  { value: '6+', label: t('hero.stats.years') },
  {
    value:
      props.totalCommits > 0
        ? props.totalCommits >= 1000
          ? `${(props.totalCommits / 1000).toFixed(1)}K`
          : String(props.totalCommits)
        : '3.4K',
    label: t('hero.stats.commits'),
  },
  { value: '4', label: t('hero.stats.countries') },
  { value: '15+', label: t('hero.stats.projects') },
])
</script>

<template>
  <div class="hero__content">
    <div class="hero__shimmer-wrap">
      <TextShimmer :text="t('hero.available')" :duration="2.5" class="hero__shimmer" />
    </div>
    <p class="hero__greeting">{{ t('hero.greeting') }}</p>
    <h1 class="hero__name">Diego Reyes</h1>
    <p class="hero__alias">{{ t('hero.alias') }} <span>Yeyo</span></p>
    <div class="hero__role-wrap">
      <GooeyText
        :texts="roles"
        :morph-time="1.2"
        :cooldown-time="2"
        class="hero__gooey"
        text-class="hero__gooey-text"
      />
    </div>
    <p class="hero__desc" v-html="t('hero.desc')" />
    <div class="hero__actions">
      <a href="#projects" class="hero__btn hero__btn--primary">
        {{ t('hero.seeWork') }}
        <span class="hero__btn-arrow">→</span>
      </a>
      <a href="#contact" class="hero__btn hero__btn--secondary">
        {{ t('hero.letsTalk') }}
      </a>
    </div>
    <div class="hero__stats">
      <div v-for="stat in stats" :key="stat.label" class="hero__stat">
        <span class="hero__stat-value">{{ stat.value }}</span>
        <span class="hero__stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </div>
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
@keyframes fade-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    @media (min-width: $breakpoint-md) {
      animation: fade-left 0.9s ease-out 0.2s both;
    }
  }

  &__shimmer-wrap {
    animation: fade-up 0.8s ease-out 0.1s both;
  }

  &__shimmer {
    font-size: 0.85rem;
    font-family: 'Roboto', monospace;
    letter-spacing: 0.04em;
  }

  &__greeting {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: $text-secondary;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    animation: fade-up 0.8s ease-out 0.25s both;
  }

  &__name {
    font-size: clamp(2.8rem, 8vw, 5.5rem);
    font-weight: 800;
    line-height: 1;
    background: linear-gradient(135deg, $text-primary 0%, $accent-light 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fade-up 0.9s ease-out 0.35s both;
  }

  &__alias {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    color: $text-muted;
    font-family: 'Roboto', monospace;
    animation: fade-up 0.8s ease-out 0.4s both;

    span {
      color: $accent-cyan;
      font-weight: 600;
    }
  }

  // Gooey role
  &__role-wrap {
    height: 3.5rem;
    animation: fade-up 0.8s ease-out 0.5s both;
  }

  &__gooey {
    height: 3.5rem;
  }

  :deep(.hero__gooey-text) {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 700;
    color: $accent-primary;
    background: linear-gradient(135deg, $accent-primary, $accent-cyan);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: 'Bitcount', sans-serif;
  }

  &__desc {
    max-width: 540px;
    font-size: clamp(0.95rem, 2vw, 1.05rem);
    color: $text-secondary;
    line-height: 1.75;
    animation: fade-up 0.8s ease-out 0.6s both;

    strong {
      color: $text-primary;
      font-weight: 600;
    }
  }

  // CTAs
  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: fade-up 0.8s ease-out 0.7s both;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.75rem;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;

    &--primary {
      background: $accent-primary;
      color: $text-primary;
      box-shadow: 0 0 24px $accent-glow;

      &:hover {
        background: $accent-light;
        box-shadow: 0 0 40px $accent-glow;
        transform: translateY(-2px);

        .hero__btn-arrow {
          transform: translateX(4px);
        }
      }
    }

    &--secondary {
      background: transparent;
      color: $text-primary;
      border: 1px solid $border-white;
      backdrop-filter: blur(10px);

      &:hover {
        border-color: $accent-light;
        color: $accent-light;
        transform: translateY(-2px);
      }
    }
  }

  &__btn-arrow {
    transition: transform 0.3s ease;
  }

  // Stats
  &__stats {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    animation: fade-up 0.8s ease-out 0.85s both;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: $text-primary;
    font-family: 'Bitcount', sans-serif;
    line-height: 1;
  }

  &__stat-label {
    font-size: 0.75rem;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
}
</style>
