<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="robot-hint" aria-hidden="true">
    <i class="fa-solid fa-arrow-pointer robot-hint__eye" aria-hidden="true"></i>
    <span>{{ t('hero.robotHint') }}</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes hint-in {
  from {
    opacity: 0;
    translate: 0 12px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}
@keyframes hint-float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -5px;
  }
}
@keyframes hint-out {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes hint-peek {
  0%,
  70%,
  100% {
    rotate: 0deg;
  }
  80% {
    rotate: -14deg;
  }
  90% {
    rotate: 12deg;
  }
}

.robot-hint {
  position: absolute;
  bottom: 5.5rem;
  right: 1.5rem;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: rgba(13, 13, 34, 0.75);
  border: 1px solid $border-violet;
  backdrop-filter: blur(10px);
  font-family: 'Roboto', monospace;
  font-size: 0.78rem;
  color: $text-secondary;
  pointer-events: none;
  opacity: 0;
  // appears once the preloader is gone, floats, then politely fades away
  animation:
    hint-in 0.7s ease-out 2.8s both,
    hint-float 3s ease-in-out 3.5s infinite,
    hint-out 1s ease 11s forwards;

  @media (max-width: #{$breakpoint-md - 1px}) {
    right: 50%;
    transform: translateX(50%);
    bottom: 6.5rem;
    white-space: nowrap;
    font-size: 0.7rem;
  }
}

.robot-hint__eye {
  color: $accent-light;
  font-size: 0.85rem;
  animation: hint-peek 2.4s ease-in-out infinite;
}
</style>
