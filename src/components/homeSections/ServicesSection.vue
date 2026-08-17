<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ServicesBackdrop from './services/ServicesBackdrop.vue'
import ServiceCard from './services/ServiceCard.vue'
import type { ServiceItem } from './services/serviceTypes'
import ScaleAiBadge from './services/ScaleAiBadge.vue'

const { t, tm } = useI18n()

const services = computed(() => tm('services.items') as ServiceItem[])

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const visibleCards = ref<Set<number>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          visibleCards.value = new Set([...visibleCards.value, idx])
        }
      })
    },
    { threshold: 0.15 },
  )

  setTimeout(() => {
    document.querySelectorAll('.services__card').forEach((el) => cardObserver.observe(el))
  }, 200)
})
</script>

<template>
  <section id="services" ref="sectionRef" class="services" :class="{ 'is-visible': visible }">
    <ServicesBackdrop />

    <div class="services__container">
      <header class="services__header">
        <span class="services__eyebrow">{{ t('services.eyebrow') }}</span>
        <h2 class="services__title">
          {{ t('services.title') }}
          <span class="services__title--accent">{{ t('services.titleAccent') }}</span>
        </h2>
        <p class="services__subtitle">{{ t('services.subtitle') }}</p>
      </header>

      <div class="services__grid">
        <ServiceCard
          v-for="(svc, i) in services"
          :key="svc.title"
          :service="svc"
          :index="i"
          :visible="visibleCards.has(i)"
        />
      </div>

      <ScaleAiBadge />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services {
  position: relative;
  background: $bg-deep;
  padding: 8rem 0;
  overflow: hidden;

  &__container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: $breakpoint-md) {
      padding: 0 2rem;
    }
  }

  // ── Header ────────────────────────────────────────────────────────────
  &__header {
    text-align: center;
    margin-bottom: 5rem;
  }

  &__eyebrow {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: $accent-primary;
    margin-bottom: 1rem;
    padding: 0.35rem 1rem;
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: 999px;
    background: rgba(124, 58, 237, 0.06);
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
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  // ── Grid ──────────────────────────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
