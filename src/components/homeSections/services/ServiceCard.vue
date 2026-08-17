<script setup lang="ts">
import type { ServiceItem } from './serviceTypes'

defineProps<{
  service: ServiceItem
  index: number
  visible: boolean
}>()
</script>

<template>
  <div
    :data-index="index"
    class="services__card"
    :class="{
      'services__card--highlight': service.highlight,
      'services__card--visible': visible,
    }"
  >
    <div class="services__card-glow" />
    <div class="services__card-border" />
    <div class="services__icon-wrap">
      <div class="services__icon"><i :class="service.icon" /></div>
    </div>
    <h3 class="services__card-title">{{ service.title }}</h3>
    <p class="services__card-desc">{{ service.desc }}</p>
    <div class="services__tags">
      <span v-for="tag in service.tags" :key="tag" class="services__tag">{{ tag }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.services {
  // ── Card ──────────────────────────────────────────────────────────────
  &__card {
    position: relative;
    background: rgba(13, 13, 34, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 24px;
    padding: 2.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    opacity: 0;
    transform: translateY(40px) scale(0.97);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    isolation: isolate;

    &--visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    @for $i from 0 through 10 {
      &:nth-child(#{$i + 1}) {
        transition-delay: #{$i * 0.08}s;
      }
    }

    &:hover {
      transform: translateY(-8px) scale(1.01);

      .services__card-glow {
        opacity: 1;
      }

      .services__card-border {
        opacity: 1;
      }
    }

    &--highlight {
      .services__card-glow {
        background: radial-gradient(600px circle at 50% 100%, rgba(124, 58, 237, 0.15), transparent);
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, $accent-primary, $accent-cyan, transparent);
        opacity: 0;
        transition: opacity 0.4s ease;
      }

      &:hover::after {
        opacity: 1;
      }
    }
  }

  &__card-border {
    position: absolute;
    inset: -1px;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(6, 214, 160, 0.1), rgba(124, 58, 237, 0.05));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    padding: 1px;
  }

  &__card-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background: radial-gradient(600px circle at 50% 100%, rgba(124, 58, 237, 0.08), transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  // ── Icon ──────────────────────────────────────────────────────────────
  &__icon-wrap {
    margin-bottom: 0.5rem;
  }

  &__icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(124, 58, 237, 0.1);
    border-radius: 14px;
    color: $accent-light;
    font-size: 1.2rem;
    border: 1px solid rgba(124, 58, 237, 0.15);
    transition: all 0.3s ease;

    .services__card:hover & {
      background: rgba(124, 58, 237, 0.18);
      border-color: rgba(124, 58, 237, 0.3);
      box-shadow: 0 0 20px rgba(124, 58, 237, 0.15);
    }

    .services__card--highlight & {
      background: rgba(124, 58, 237, 0.18);
      border-color: rgba(124, 58, 237, 0.25);
    }
  }

  // ── Content ───────────────────────────────────────────────────────────
  &__card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: $text-primary;
    font-family: 'Bitcount', sans-serif;
    position: relative;
    z-index: 1;
  }

  &__card-desc {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.65;
    flex: 1;
    position: relative;
    z-index: 1;
  }

  // ── Tags ──────────────────────────────────────────────────────────────
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
    position: relative;
    z-index: 1;
  }

  &__tag {
    padding: 0.25rem 0.7rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 999px;
    font-size: 0.7rem;
    color: $text-muted;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;

    .services__card:hover & {
      border-color: rgba(124, 58, 237, 0.2);
      color: $text-secondary;
    }
  }
}
</style>
