<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGithub } from '@/composables/useGithub'

const { t } = useI18n()
const { recentCommits } = useGithub()
</script>

<template>
  <div class="ghs__card">
    <h3 class="ghs__card-title">
      <i class="fa-solid fa-clock-rotate-left" aria-hidden="true" /> {{ t('github.recentCommits') }}
    </h3>
    <ul class="ghs__commit-list">
      <li v-for="c in recentCommits" :key="c.sha" class="ghs__commit">
        <span class="ghs__commit-sha">{{ c.sha }}</span>
        <div class="ghs__commit-body">
          <span class="ghs__commit-repo">{{ c.repo }}</span>
          <span class="ghs__commit-msg">{{ c.message }}</span>
        </div>
      </li>
      <li v-if="!recentCommits.length" class="ghs__empty">No recent commits found.</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.ghs {
  &__card {
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: $border-violet;
    }
  }

  &__card-title {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: $accent-primary;
    }
  }

  &__commit-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__commit {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
  }

  &__commit-sha {
    font-family: 'Roboto', monospace;
    font-size: 0.7rem;
    color: $accent-cyan;
    flex-shrink: 0;
    padding-top: 0.1rem;
    min-width: 46px;
  }

  &__commit-body {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: hidden;
  }

  &__commit-repo {
    font-size: 0.7rem;
    color: $accent-light;
    font-weight: 600;
  }

  &__commit-msg {
    font-size: 0.82rem;
    color: $text-secondary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__empty {
    font-size: 0.85rem;
    color: $text-muted;
  }
}
</style>
