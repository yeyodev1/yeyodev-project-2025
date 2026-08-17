<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGithub } from '@/composables/useGithub'
import GithubHeroStats from './github/GithubHeroStats.vue'
import GithubYearsChart from './github/GithubYearsChart.vue'
import GithubCommitsCard from './github/GithubCommitsCard.vue'
import GithubReposCard from './github/GithubReposCard.vue'
import { useGithubAnimations } from './github/useGithubAnimations'

const { t } = useI18n()
const { user, loading, error } = useGithub()
const { sectionRef, displayTotal, displayStars, displayRepos, yearDisplays } = useGithubAnimations()
</script>

<template>
  <section ref="sectionRef" class="ghs">
    <div class="ghs__bg-grid" />

    <div class="ghs__container">
      <!-- Header -->
      <div class="ghs__header">
        <span class="ghs__eyebrow">
          <i class="fa-brands fa-github" aria-hidden="true" /> {{ t('github.eyebrow') }}
        </span>
        <h2 class="ghs__title">
          {{ t('github.title') }}
          <span class="ghs__title--accent">{{ t('github.titleAccent') }}</span>
        </h2>
        <p class="ghs__subtitle">
          {{ t('github.subtitle') }}
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="ghs__loading">
        <div class="ghs__spinner" />
        <span>{{ t('github.loading') }}</span>
      </div>

      <div v-else-if="error" class="ghs__error" role="alert">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true" /> {{ t('github.error') }}
      </div>

      <template v-else-if="user">
        <!-- Hero counter row -->
        <GithubHeroStats
          :display-total="displayTotal"
          :display-repos="displayRepos"
          :display-stars="displayStars"
        />

        <!-- Year-by-year commit chart -->
        <GithubYearsChart :year-displays="yearDisplays" />

        <!-- Bottom grid: recent commits + top repos -->
        <div class="ghs__grid">
          <GithubCommitsCard />
          <GithubReposCard />
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.ghs {
  position: relative;
  background: $bg-primary;
  padding: 6rem 0;
  overflow: hidden;

  // Subtle grid background
  &__bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient($border-subtle 1px, transparent 1px),
      linear-gradient(90deg, $border-subtle 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 100%);
    opacity: 0.5;
  }

  &__container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    @media (min-width: $breakpoint-md) {
      padding: 0 2rem;
    }
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $accent-primary;
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
    font-size: 1rem;
    color: $text-secondary;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.7;
  }

  // ── Loading / Error ──────────────────────────────────────────────────────────
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: $text-muted;
    padding: 6rem 0;
    font-size: 0.9rem;
  }

  &__spinner {
    width: 22px;
    height: 22px;
    border: 2px solid $border-subtle;
    border-top-color: $accent-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__error {
    text-align: center;
    color: #f87171;
    padding: 4rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  // ── Bottom grid ──────────────────────────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
