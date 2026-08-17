<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socials = computed(() => [
  {
    label: t('contact.socials.whatsapp'),
    href: 'https://wa.me/593963681303',
    icon: 'fa-brands fa-whatsapp',
  },
  {
    label: t('contact.socials.instagram'),
    href: 'https://instagram.com/yeyo.dev',
    icon: 'fa-brands fa-instagram',
  },
  {
    label: t('contact.socials.twitter'),
    href: 'https://x.com/yeyodev',
    icon: 'fa-brands fa-x-twitter',
  },
  {
    label: t('contact.socials.email'),
    href: 'mailto:diegorele13@gmail.com',
    icon: 'fa-solid fa-envelope',
  },
])
</script>

<template>
  <div class="contact__info">
    <div class="contact__info-card">
      <img src="@/assets/fotos/diego.jpg" alt="Diego Reyes" class="contact__avatar" />
      <div>
        <strong class="contact__info-name">Diego Reyes</strong>
        <span class="contact__info-role">{{ t('contact.info.role') }}</span>
      </div>
    </div>
    <p class="contact__info-text">{{ t('contact.info.based') }}</p>
    <div class="contact__socials">
      <a
        v-for="s in socials"
        :key="s.label"
        :href="s.href"
        target="_blank"
        rel="noopener noreferrer"
        class="contact__social"
      >
        <i :class="s.icon" class="contact__social-icon" aria-hidden="true" />
        {{ s.label }}
      </a>
    </div>
    <div class="contact__availability">
      <span class="contact__dot" />
      {{ t('contact.info.availability') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes pulse-dot {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.5);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(6, 214, 160, 0);
  }
}

.contact {
  &__info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: $breakpoint-lg) {
      width: 280px;
      flex-shrink: 0;
    }
  }

  &__info-card {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 2px solid $border-violet;
    flex-shrink: 0;
  }

  &__info-name {
    display: block;
    font-size: 1rem;
    font-weight: 700;
    color: $text-primary;
  }

  &__info-role {
    font-size: 0.8rem;
    color: $text-secondary;
  }

  &__info-text {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.6;
  }

  &__socials {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: $text-secondary;
    padding: 0.6rem 1rem;
    border-radius: 10px;
    border: 1px solid $border-subtle;
    background: $bg-secondary;
    transition: all 0.25s ease;

    &:hover {
      border-color: $border-violet;
      color: $text-primary;
      transform: translateX(4px);
    }
  }

  &__social-icon {
    width: 1rem;
    text-align: center;
    font-size: 1rem;
    color: $accent-light;
    flex-shrink: 0;
  }

  &__availability {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: $accent-cyan;
    font-weight: 500;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $accent-cyan;
    animation: pulse-dot 2s ease-in-out infinite;
    flex-shrink: 0;
  }
}
</style>
