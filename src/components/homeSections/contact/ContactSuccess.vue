<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  whatsappUrl: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="contact__success">
    <div class="contact__success-icon">
      <i class="fa-brands fa-whatsapp" aria-hidden="true" />
    </div>
    <h3>{{ t('contact.success.title') }}</h3>
    <p>{{ t('contact.success.text') }}</p>
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="contact__whatsapp-btn"
    >
      <i class="fa-brands fa-whatsapp" aria-hidden="true" />
      {{ t('contact.success.whatsappCta') }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  &__success {
    text-align: center;
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h3 {
      font-size: 1.5rem;
      color: $text-primary;
    }

    p {
      font-size: 1rem;
      color: $text-secondary;
    }
  }

  &__whatsapp-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    border-radius: 999px;
    background: #25d366;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    font-family: 'Roboto', sans-serif;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 24px rgba(37, 211, 102, 0.4);
    transition: all 0.3s ease;
    margin-top: 0.5rem;
    text-decoration: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 40px rgba(37, 211, 102, 0.6);
    }
  }

  &__success-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(6, 214, 160, 0.15);
    border: 2px solid $accent-cyan;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: $accent-cyan;
  }
}
</style>
