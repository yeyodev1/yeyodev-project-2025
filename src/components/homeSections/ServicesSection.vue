<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const services = computed(
  () =>
    tm('services.items') as Array<{
      icon: string
      title: string
      desc: string
      tags: string[]
      highlight: boolean
    }>,
)

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
    <div class="services__bg">
      <div class="services__orb services__orb--1" />
      <div class="services__orb services__orb--2" />
      <div class="services__orb services__orb--3" />
      <div class="services__grid-overlay" />
    </div>

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
        <div
          v-for="(svc, i) in services"
          :key="svc.title"
          :data-index="i"
          class="services__card"
          :class="{
            'services__card--highlight': svc.highlight,
            'services__card--visible': visibleCards.has(i),
          }"
        >
          <div class="services__card-glow" />
          <div class="services__card-border" />
          <div class="services__icon-wrap">
            <div class="services__icon"><i :class="svc.icon" /></div>
          </div>
          <h3 class="services__card-title">{{ svc.title }}</h3>
          <p class="services__card-desc">{{ svc.desc }}</p>
          <div class="services__tags">
            <span v-for="tag in svc.tags" :key="tag" class="services__tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="services__ai-badge">
        <div class="services__ai-shine" />
        <div class="services__ai-badge-inner">
          <div class="services__ai-icon-wrap">
            <i class="fa-solid fa-handshake services__ai-icon" />
          </div>
          <div>
            <strong>{{ t('services.scaleai.title') }}</strong>
            <p>{{ t('services.scaleai.desc') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services {
  position: relative;
  background: $bg-deep;
  padding: 8rem 0;
  overflow: hidden;

  // ── Background ────────────────────────────────────────────────────────
  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  @keyframes orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: orb-float 12s ease-in-out infinite;

    &--1 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent);
      top: -10%;
      right: -5%;
      animation-delay: 0s;
    }

    &--2 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(6, 214, 160, 0.15), transparent);
      bottom: 10%;
      left: -5%;
      animation-delay: -4s;
    }

    &--3 {
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent);
      top: 40%;
      left: 50%;
      animation-delay: -8s;
    }
  }

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

  // ── Card ──────────────────────────────────────────────────────────────
  @keyframes card-in {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

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
