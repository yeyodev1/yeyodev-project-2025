<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGithub } from '@/composables/useGithub'
import { fmtNum } from '@/composables/useCountUp'

defineProps<{
  displayTotal: number
  displayRepos: number
  displayStars: number
}>()

const { t } = useI18n()
const { user, totalCommits } = useGithub()
</script>

<template>
  <div v-if="user" class="ghs__hero-stats">
    <div class="ghs__hero-stat ghs__hero-stat--main">
      <div class="ghs__hero-glow" />
      <i class="fa-solid fa-code-commit ghs__hero-icon" aria-hidden="true" />
      <span class="ghs__hero-value">{{ fmtNum(displayTotal) }}</span>
      <span class="ghs__hero-label">{{ t('github.stats.commits') }}</span>
      <span v-if="totalCommits === 0" class="ghs__loading-dots">
        <span /><span /><span />
      </span>
    </div>

    <div class="ghs__hero-stat">
      <i class="fa-solid fa-code-branch ghs__hero-icon ghs__hero-icon--violet" aria-hidden="true" />
      <span class="ghs__hero-value">{{ fmtNum(displayRepos) }}</span>
      <span class="ghs__hero-label">{{ t('github.stats.repos') }}</span>
    </div>

    <div class="ghs__hero-stat">
      <i class="fa-solid fa-star ghs__hero-icon ghs__hero-icon--gold" aria-hidden="true" />
      <span class="ghs__hero-value">{{ fmtNum(displayStars) }}</span>
      <span class="ghs__hero-label">{{ t('github.stats.stars') }}</span>
    </div>

    <div class="ghs__hero-stat">
      <i class="fa-solid fa-users ghs__hero-icon ghs__hero-icon--cyan" aria-hidden="true" />
      <span class="ghs__hero-value">{{ user.followers }}</span>
      <span class="ghs__hero-label">{{ t('github.stats.followers') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}
@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.ghs {
  &__hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
  }

  &__hero-stat {
    position: relative;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    overflow: hidden;
    transition:
      border-color 0.3s ease,
      transform 0.3s ease;

    &:hover {
      border-color: $border-violet;
      transform: translateY(-3px);
    }

    &--main {
      border-color: rgba(124, 58, 237, 0.4);
      background: linear-gradient(135deg, $bg-secondary, rgba(124, 58, 237, 0.08));

      @media (min-width: $breakpoint-md) {
        grid-column: 1;
        grid-row: 1;
      }
    }
  }

  &__hero-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle 80px at 50% 50%, rgba(124, 58, 237, 0.2), transparent);
    pointer-events: none;
    animation: pulse-glow 3s ease-in-out infinite;
  }

  &__hero-icon {
    font-size: 1.4rem;
    color: $accent-light;
    margin-bottom: 0.25rem;
    position: relative;

    &--violet {
      color: $accent-primary;
    }
    &--gold {
      color: $accent-gold;
    }
    &--cyan {
      color: $accent-cyan;
    }
  }

  &__hero-value {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: $text-primary;
    font-family: 'Bitcount', sans-serif;
    line-height: 1;
    position: relative;

    .ghs__hero-stat--main & {
      background: linear-gradient(135deg, $text-primary 0%, $accent-light 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__hero-label {
    font-size: 0.75rem;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__loading-dots {
    display: flex;
    gap: 4px;
    margin-top: 0.25rem;

    span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $accent-primary;
      animation: dot-bounce 1.4s ease-in-out infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}
</style>
