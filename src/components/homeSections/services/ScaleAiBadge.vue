<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="services__ai-badge">
    <div class="services__ai-shine" />
    <div class="services__ai-badge-inner">
      <div class="services__ai-icon-wrap">
        <i class="fa-solid fa-handshake services__ai-icon" aria-hidden="true" />
      </div>
      <div>
        <strong>{{ t('services.scaleai.title') }}</strong>
        <p>{{ t('services.scaleai.desc') }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.services {
  // ── Scale AI Badge ────────────────────────────────────────────────────
  &__ai-badge {
    position: relative;
    margin-top: 5rem;
    padding: 2.5rem;
    border-radius: 24px;
    border: 1px solid rgba(245, 158, 11, 0.15);
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(124, 58, 237, 0.03));
    overflow: hidden;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: rgba(245, 158, 11, 0.3);
    }
  }

  &__ai-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.04), transparent 60%);
    animation: ai-shine 6s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes ai-shine {
    0%, 100% { transform: translate(-10%, -10%); }
    50% { transform: translate(10%, 10%); }
  }

  &__ai-badge-inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;

    strong {
      display: block;
      font-size: 1rem;
      color: $accent-gold;
      margin-bottom: 0.4rem;
    }

    p {
      font-size: 0.9rem;
      color: $text-secondary;
      line-height: 1.6;
      margin: 0;
    }
  }

  &__ai-icon-wrap {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 158, 11, 0.1);
    border-radius: 14px;
    border: 1px solid rgba(245, 158, 11, 0.15);
    flex-shrink: 0;
  }

  &__ai-icon {
    font-size: 1.3rem;
    color: $accent-gold;
  }
}
</style>
