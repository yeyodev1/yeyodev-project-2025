<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits<{ (e: 'done'): void }>()

const progress = ref(0)
const leaving = ref(false)
const letters = 'YEYO.DEV'.split('')

let raf = 0
let pageLoaded = document.readyState === 'complete'
const start = performance.now()
const MIN_DURATION = 1600

const onLoad = () => {
  pageLoaded = true
}

const tick = (now: number) => {
  const elapsed = now - start
  // ease toward 90% while loading, snap to 100% when page + min time ready
  const target = pageLoaded ? 100 : Math.min(90, (elapsed / 2500) * 100)
  progress.value += (target - progress.value) * 0.08
  if (progress.value > 99.2 && pageLoaded && elapsed >= MIN_DURATION) {
    progress.value = 100
    leaving.value = true
    window.setTimeout(() => emit('done'), 900)
    return
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener('load', onLoad, { once: true })
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('load', onLoad)
})
</script>

<template>
  <div class="preloader" :class="{ 'preloader--leaving': leaving }" aria-hidden="true">
    <div class="preloader__panel preloader__panel--top"></div>
    <div class="preloader__panel preloader__panel--bottom"></div>

    <div class="preloader__content">
      <div class="preloader__ring">
        <div class="preloader__ring-spin"></div>
        <div class="preloader__ring-core">
          <span class="preloader__pct">{{ Math.round(progress) }}<i>%</i></span>
        </div>
      </div>

      <h1 class="preloader__wordmark">
        <span
          v-for="(letter, i) in letters"
          :key="i"
          class="preloader__letter"
          :class="{ 'preloader__letter--dot': letter === '.' }"
          :style="{ animationDelay: `${i * 70 + 200}ms` }"
          >{{ letter }}</span
        >
      </h1>

      <div class="preloader__bar">
        <div class="preloader__bar-fill" :style="{ transform: `scaleX(${progress / 100})` }"></div>
      </div>

      <p class="preloader__tagline">building digital experiences</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  overflow: hidden;

  &__panel {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50.5%;
    background: #04040c;
    transition: transform 0.85s cubic-bezier(0.76, 0, 0.24, 1);

    &--top {
      top: 0;
    }
    &--bottom {
      bottom: 0;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(60% 80% at 50% 120%, rgba(124, 58, 237, 0.18), transparent 70%),
        radial-gradient(40% 60% at 80% -20%, rgba(6, 214, 160, 0.08), transparent 70%);
    }
    &--top::after {
      transform: scaleY(-1);
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }

  &__ring {
    position: relative;
    width: 108px;
    height: 108px;
    display: grid;
    place-items: center;
  }

  &__ring-spin {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0%, #7c3aed 35%, #06d6a0 70%, transparent 100%);
    animation: pre-spin 1.1s linear infinite;
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
  }

  &__ring-core {
    display: grid;
    place-items: center;
  }

  &__pct {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 1.35rem;
    font-weight: 700;
    color: #f1f5f9;
    font-variant-numeric: tabular-nums;

    i {
      font-style: normal;
      font-size: 0.7em;
      color: #94a3b8;
      margin-left: 1px;
    }
  }

  &__wordmark {
    display: flex;
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #f1f5f9;
    margin: 0;
  }

  &__letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(24px) rotateX(60deg);
    animation: pre-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    &--dot {
      background: linear-gradient(135deg, #7c3aed, #06d6a0);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }

  &__bar {
    width: min(260px, 60vw);
    height: 2px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  &__bar-fill {
    height: 100%;
    transform-origin: left;
    background: linear-gradient(90deg, #7c3aed, #a78bfa, #06d6a0);
    transition: transform 0.15s linear;
  }

  &__tagline {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #94a3b8;
    margin: 0;
    animation: pre-blink 2.2s ease-in-out infinite;
  }

  &--leaving {
    pointer-events: none;

    .preloader__panel--top {
      transform: translateY(-101%);
      transition-delay: 0.25s;
    }
    .preloader__panel--bottom {
      transform: translateY(101%);
      transition-delay: 0.25s;
    }
    .preloader__content {
      opacity: 0;
      transform: scale(0.96);
    }
  }
}

@keyframes pre-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pre-rise {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes pre-blink {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
}
</style>
