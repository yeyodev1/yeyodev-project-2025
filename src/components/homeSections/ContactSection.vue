<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

interface FormData {
  name: string
  email: string
  company: string
  budget: string
  projectType: string
  message: string
}

const form = ref<FormData>({ name: '', email: '', company: '', budget: '', projectType: '', message: '' })
const submitted = ref(false)
const isSubmitting = ref(false)

const projectTypes = computed(() => tm('contact.form.projectTypes') as string[])
const budgets = computed(() => tm('contact.form.budgets') as string[])

const socials = computed(() => [
  { label: t('contact.socials.whatsapp'), href: 'https://wa.me/17633524852',       icon: 'fa-brands fa-whatsapp' },
  { label: t('contact.socials.instagram'), href: 'https://instagram.com/yeyo.dev', icon: 'fa-brands fa-instagram' },
  { label: t('contact.socials.twitter'),  href: 'https://x.com/yeyodev',           icon: 'fa-brands fa-x-twitter' },
  { label: t('contact.socials.email'),    href: 'mailto:diegorele13@gmail.com',    icon: 'fa-solid fa-envelope' },
])

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  submitted.value = true
  isSubmitting.value = false
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__container">
      <div class="contact__header">
        <span class="contact__eyebrow">{{ t('contact.eyebrow') }}</span>
        <h2 class="contact__title">
          {{ t('contact.title') }} <span class="contact__title--accent">{{ t('contact.titleAccent') }}</span>
        </h2>
        <p class="contact__subtitle">{{ t('contact.subtitle') }}</p>
      </div>
      <div class="contact__layout">
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
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer" class="contact__social">
              <i :class="s.icon" class="contact__social-icon" />
              {{ s.label }}
            </a>
          </div>
          <div class="contact__availability">
            <span class="contact__dot" />
            {{ t('contact.info.availability') }}
          </div>
        </div>
        <div class="contact__form-wrap">
          <Transition name="slide-fade" mode="out-in">
            <form v-if="!submitted" class="contact__form" @submit.prevent="handleSubmit">
              <div class="contact__row">
                <div class="contact__field">
                  <label class="contact__label">{{ t('contact.form.name') }}</label>
                  <input v-model="form.name" type="text" required :placeholder="t('contact.form.namePlaceholder')" class="contact__input" />
                </div>
                <div class="contact__field">
                  <label class="contact__label">{{ t('contact.form.email') }}</label>
                  <input v-model="form.email" type="email" required :placeholder="t('contact.form.emailPlaceholder')" class="contact__input" />
                </div>
              </div>
              <div class="contact__field">
                <label class="contact__label">{{ t('contact.form.company') }}</label>
                <input v-model="form.company" type="text" :placeholder="t('contact.form.companyPlaceholder')" class="contact__input" />
              </div>
              <div class="contact__row">
                <div class="contact__field">
                  <label class="contact__label">{{ t('contact.form.projectType') }}</label>
                  <select v-model="form.projectType" required class="contact__input contact__select">
                    <option value="" disabled>{{ t('contact.form.projectTypePlaceholder') }}</option>
                    <option v-for="pt in projectTypes" :key="pt" :value="pt">{{ pt }}</option>
                  </select>
                </div>
                <div class="contact__field">
                  <label class="contact__label">{{ t('contact.form.budget') }}</label>
                  <select v-model="form.budget" class="contact__input contact__select">
                    <option value="" disabled>{{ t('contact.form.budgetPlaceholder') }}</option>
                    <option v-for="b in budgets" :key="b" :value="b">{{ b }}</option>
                  </select>
                </div>
              </div>
              <div class="contact__field">
                <label class="contact__label">{{ t('contact.form.message') }}</label>
                <textarea v-model="form.message" required rows="4" :placeholder="t('contact.form.messagePlaceholder')" class="contact__input contact__textarea" />
              </div>
              <button type="submit" class="contact__submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="contact__spinner" />
                <span v-else>{{ t('contact.form.submit') }}</span>
              </button>
            </form>
            <div v-else class="contact__success">
              <div class="contact__success-icon">✓</div>
              <h3>{{ t('contact.success.title') }}</h3>
              <p>{{ t('contact.success.text') }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>


@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(6, 214, 160, 0); }
}

.contact {
  background: $bg-primary;
  padding: 6rem 0 8rem;

  &__container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: $breakpoint-md) { padding: 0 2rem; }
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

  // ── Info ─────────────────────────────────────────────────────────────────
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

  // ── Form ─────────────────────────────────────────────────────────────────
  &__form-wrap {
    flex: 1;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  &__label {
    font-size: 0.8rem;
    font-weight: 600;
    color: $text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__input {
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 10px;
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    color: $text-primary;
    font-family: 'Roboto', sans-serif;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    appearance: none;

    &::placeholder { color: $text-muted; }

    &:focus {
      border-color: $accent-primary;
      box-shadow: 0 0 0 3px $accent-glow;
    }
  }

  &__select {
    cursor: pointer;

    option {
      background: $bg-secondary;
      color: $text-primary;
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  &__submit {
    padding: 1rem 2rem;
    border-radius: 999px;
    background: $accent-primary;
    color: $text-primary;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 24px $accent-glow;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 52px;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 0 40px $accent-glow;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  // ── Success ───────────────────────────────────────────────────────────────
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

// Transitions
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from { opacity: 0; transform: translateY(20px); }
.slide-fade-leave-to   { opacity: 0; transform: translateY(-10px); }
</style>
