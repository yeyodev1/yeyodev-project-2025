<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactInfo from './contact/ContactInfo.vue'
import ContactForm from './contact/ContactForm.vue'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__container">
      <div class="contact__header">
        <span class="contact__eyebrow">{{ t('contact.eyebrow') }}</span>
        <h2 class="contact__title">
          {{ t('contact.title') }}
          <span class="contact__title--accent">{{ t('contact.titleAccent') }}</span>
        </h2>
        <p class="contact__subtitle">{{ t('contact.subtitle') }}</p>
      </div>
      <div class="contact__layout">
        <ContactInfo />
        <div class="contact__form-wrap">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact {
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
    margin-bottom: 4rem;
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

  &__layout {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: $breakpoint-lg) {
      flex-direction: row;
      align-items: flex-start;
      gap: 4rem;
    }
  }

  &__form-wrap {
    flex: 1;
  }
}
</style>
