<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="about__header">
    <h2 class="about__title">
      <span class="about__title-line">{{ t('about.title') }}</span>
      <span class="about__title-line about__title-line--accent">{{ t('about.titleAccent') }}</span>
    </h2>
    <div class="about__title-decoration"></div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.about__header {
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
}

.about__title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
}

.about__title-line {
  display: inline-block;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  opacity: 0;

  .about.is-visible & {
    animation: slide-in-up 1s ease-out forwards;

    &:first-child {
      animation-delay: 0.2s;
    }

    &--accent {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% 200%;
      animation: gradient-shift 3s ease infinite;
      animation-delay: 0.4s;
    }
  }
}

.about__title-decoration {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  margin: 2rem auto 0;
  border-radius: 2px;
  opacity: 0;

  .about.is-visible & {
    animation: scale-in 0.8s ease-out 0.8s forwards;
  }
}
</style>
