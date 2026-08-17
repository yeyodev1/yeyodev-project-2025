<script setup lang="ts">
import BaseSelect from '@/components/base/BaseSelect.vue'
import { useI18n } from 'vue-i18n'
import { useContactForm } from '@/composables/useContactForm'
import ContactSuccess from './ContactSuccess.vue'

const { t } = useI18n()
const {
  form,
  submitted,
  isSubmitting,
  submitError,
  projectTypes,
  budgets,
  timelines,
  referralSources,
  whatsappUrl,
  handleSubmit,
} = useContactForm()
</script>

<template>
  <Transition name="slide-fade" mode="out-in">
    <form v-if="!submitted" class="contact__form" @submit.prevent="handleSubmit">
      <div class="contact__row">
        <div class="contact__field">
          <label for="contact-first-name" class="contact__label">
            {{ t('contact.form.firstName') }}
          </label>
          <input
            id="contact-first-name"
            v-model="form.firstName"
            type="text"
            required
            :placeholder="t('contact.form.firstNamePlaceholder')"
            class="contact__input"
          />
        </div>
        <div class="contact__field">
          <label for="contact-last-name" class="contact__label">
            {{ t('contact.form.lastName') }}
          </label>
          <input
            id="contact-last-name"
            v-model="form.lastName"
            type="text"
            required
            :placeholder="t('contact.form.lastNamePlaceholder')"
            class="contact__input"
          />
        </div>
      </div>
      <div class="contact__row">
        <div class="contact__field">
          <label for="contact-email" class="contact__label">{{ t('contact.form.email') }}</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            :placeholder="t('contact.form.emailPlaceholder')"
            class="contact__input"
          />
        </div>
        <div class="contact__field">
          <label for="contact-phone" class="contact__label">{{ t('contact.form.phone') }}</label>
          <input
            id="contact-phone"
            v-model="form.phone"
            type="tel"
            required
            :placeholder="t('contact.form.phonePlaceholder')"
            class="contact__input"
          />
        </div>
      </div>
      <div class="contact__field">
        <label for="contact-company" class="contact__label">{{ t('contact.form.company') }}</label>
        <input
          id="contact-company"
          v-model="form.company"
          type="text"
          :placeholder="t('contact.form.companyPlaceholder')"
          class="contact__input"
        />
      </div>
      <div class="contact__row">
        <div class="contact__field">
          <label class="contact__label">{{ t('contact.form.projectType') }}</label>
          <BaseSelect
            v-model="form.projectType"
            :options="projectTypes"
            :placeholder="t('contact.form.projectTypePlaceholder')"
            required
          />
        </div>
        <div class="contact__field">
          <label class="contact__label">{{ t('contact.form.budget') }}</label>
          <BaseSelect
            v-model="form.budget"
            :options="budgets"
            :placeholder="t('contact.form.budgetPlaceholder')"
          />
        </div>
      </div>
      <div class="contact__row">
        <div class="contact__field">
          <label class="contact__label">{{ t('contact.form.timeline') }}</label>
          <BaseSelect
            v-model="form.timeline"
            :options="timelines"
            :placeholder="t('contact.form.timelinePlaceholder')"
            required
          />
        </div>
        <div class="contact__field">
          <label class="contact__label">{{ t('contact.form.referralSource') }}</label>
          <BaseSelect
            v-model="form.referralSource"
            :options="referralSources"
            :placeholder="t('contact.form.referralSourcePlaceholder')"
          />
        </div>
      </div>
      <div class="contact__field">
        <label for="contact-message" class="contact__label">{{ t('contact.form.message') }}</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          required
          rows="4"
          :placeholder="t('contact.form.messagePlaceholder')"
          class="contact__input contact__textarea"
        />
      </div>
      <p v-if="submitError" class="contact__error" role="alert">{{ submitError }}</p>
      <button type="submit" class="contact__submit" :disabled="isSubmitting" :aria-busy="isSubmitting">
        <span v-if="isSubmitting" class="contact__spinner" aria-hidden="true" />
        <span v-else>{{ t('contact.form.submit') }}</span>
      </button>
    </form>
    <ContactSuccess v-else :whatsapp-url="whatsappUrl" />
  </Transition>
</template>

<style lang="scss" scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.contact {
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
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease;
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    appearance: none;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      border-color: $accent-primary;
      box-shadow: 0 0 0 3px $accent-glow;
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

  &__error {
    font-size: 0.85rem;
    color: #ef4444;
    text-align: center;
    margin-top: -0.5rem;
  }

  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

// Transitions
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
