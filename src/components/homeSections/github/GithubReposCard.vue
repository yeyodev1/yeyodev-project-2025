<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGithub } from '@/composables/useGithub'

const { t } = useI18n()
const { user, topRepos } = useGithub()
</script>

<template>
  <div class="ghs__card">
    <h3 class="ghs__card-title">
      <i class="fa-solid fa-star" aria-hidden="true" /> {{ t('github.topRepos') }}
    </h3>
    <ul class="ghs__repo-list">
      <li v-for="r in topRepos" :key="r.id" class="ghs__repo">
        <div class="ghs__repo-main">
          <a :href="r.html_url" target="_blank" rel="noopener noreferrer" class="ghs__repo-name">
            <i class="fa-regular fa-folder-open" aria-hidden="true" />
            {{ r.name }}
          </a>
          <p v-if="r.description" class="ghs__repo-desc">{{ r.description }}</p>
        </div>
        <div class="ghs__repo-meta">
          <span v-if="r.language" class="ghs__repo-lang">{{ r.language }}</span>
          <span class="ghs__repo-stars"
            ><i class="fa-solid fa-star" aria-hidden="true" /> {{ r.stargazers_count }}</span
          >
          <span class="ghs__repo-forks"
            ><i class="fa-solid fa-code-fork" aria-hidden="true" /> {{ r.forks_count }}</span
          >
        </div>
      </li>
    </ul>

    <a
      v-if="user"
      :href="user.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="ghs__gh-link"
    >
      <i class="fa-brands fa-github" aria-hidden="true" /> {{ t('github.viewAll') }}
    </a>
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

  &__repo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    flex: 1;
  }

  &__repo {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding-bottom: 0.9rem;
    border-bottom: 1px solid $border-subtle;

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  &__repo-name {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: $text-primary;
    transition: color 0.2s ease;

    i {
      color: $accent-primary;
      font-size: 0.8rem;
    }
    &:hover {
      color: $accent-light;
    }
  }

  &__repo-desc {
    font-size: 0.78rem;
    color: $text-muted;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__repo-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.15rem;
  }

  &__repo-lang {
    font-size: 0.72rem;
    color: $accent-cyan;
    font-weight: 500;
  }

  &__repo-stars,
  &__repo-forks {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.72rem;
    color: $text-muted;

    i {
      font-size: 0.65rem;
    }
  }

  &__repo-stars i {
    color: $accent-gold;
  }

  &__gh-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: $accent-light;
    margin-top: 0.5rem;
    transition: color 0.2s ease;

    &:hover {
      color: $text-primary;
    }
  }
}
</style>
