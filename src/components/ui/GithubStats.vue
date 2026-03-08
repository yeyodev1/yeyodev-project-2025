<script setup lang="ts">
import { onMounted } from 'vue'
import { useGithub } from '@/composables/useGithub'

const { user, topRepos, recentCommits, totalStars, languages, loading, error, load } = useGithub()

onMounted(load)
</script>

<template>
  <div class="gh">

    <!-- Loading skeleton -->
    <div v-if="loading" class="gh__loading">
      <i class="fa-brands fa-github gh__loading-icon" />
      <span>Loading GitHub data…</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="gh__error">
      <i class="fa-solid fa-triangle-exclamation" />
      <span>{{ error }}</span>
    </div>

    <template v-else-if="user">

      <!-- Header -->
      <div class="gh__header">
        <i class="fa-brands fa-github gh__brand-icon" />
        <div>
          <strong class="gh__username">{{ user.login }}</strong>
          <span class="gh__meta">{{ user.public_repos }} repos · {{ totalStars }} stars</span>
        </div>
      </div>

      <!-- Language pills -->
      <div v-if="languages.length" class="gh__langs">
        <span
          v-for="l in languages.slice(0, 6)"
          :key="l.lang"
          class="gh__lang"
        >{{ l.lang }}</span>
      </div>

      <!-- Recent commits -->
      <div v-if="recentCommits.length" class="gh__commits">
        <p class="gh__section-label">
          <i class="fa-solid fa-code-commit" /> Recent commits
        </p>
        <ul class="gh__commit-list">
          <li
            v-for="c in recentCommits.slice(0, 5)"
            :key="c.sha"
            class="gh__commit"
          >
            <span class="gh__commit-sha">{{ c.sha }}</span>
            <span class="gh__commit-repo">{{ c.repo }}</span>
            <span class="gh__commit-msg">{{ c.message }}</span>
          </li>
        </ul>
      </div>

      <!-- Top repos -->
      <div v-if="topRepos.length" class="gh__repos">
        <p class="gh__section-label">
          <i class="fa-solid fa-star" /> Top repos
        </p>
        <ul class="gh__repo-list">
          <li v-for="r in topRepos.slice(0, 4)" :key="r.id" class="gh__repo">
            <a :href="r.html_url" target="_blank" rel="noopener noreferrer" class="gh__repo-name">
              {{ r.name }}
            </a>
            <span v-if="r.language" class="gh__repo-lang">{{ r.language }}</span>
            <span class="gh__repo-stars">
              <i class="fa-solid fa-star" /> {{ r.stargazers_count }}
            </span>
          </li>
        </ul>
      </div>

    </template>
  </div>
</template>

<style lang="scss" scoped>
.gh {
  background: $bg-secondary;
  border: 1px solid $border-subtle;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 0.875rem;

  &__loading,
  &__error {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: $text-muted;
    font-size: 0.85rem;
  }

  &__loading-icon {
    font-size: 1.25rem;
    color: $text-muted;
  }

  &__error { color: #f87171; }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__brand-icon {
    font-size: 1.5rem;
    color: $text-primary;
    flex-shrink: 0;
  }

  &__username {
    display: block;
    font-size: 0.95rem;
    color: $text-primary;
    font-weight: 700;
  }

  &__meta {
    font-size: 0.78rem;
    color: $text-muted;
  }

  &__langs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  &__lang {
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    background: $bg-elevated;
    border: 1px solid $border-subtle;
    font-size: 0.75rem;
    color: $accent-light;
  }

  &__section-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-muted;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    i { color: $accent-primary; }
  }

  &__commit-list,
  &__repo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__commit {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    overflow: hidden;
  }

  &__commit-sha {
    font-family: 'Roboto', monospace;
    font-size: 0.72rem;
    color: $accent-cyan;
    flex-shrink: 0;
  }

  &__commit-repo {
    font-size: 0.72rem;
    color: $accent-light;
    flex-shrink: 0;
  }

  &__commit-msg {
    color: $text-secondary;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__repo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__repo-name {
    color: $text-primary;
    font-weight: 600;
    font-size: 0.85rem;
    transition: color 0.2s ease;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover { color: $accent-light; }
  }

  &__repo-lang {
    font-size: 0.72rem;
    color: $text-muted;
    flex-shrink: 0;
  }

  &__repo-stars {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: $accent-gold;
    flex-shrink: 0;

    i { font-size: 0.65rem; }
  }
}
</style>
