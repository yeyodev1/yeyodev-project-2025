<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import BlogHeroParticles from '@/components/blog/BlogHeroParticles.vue'
import BlogHeroStats from '@/components/blog/BlogHeroStats.vue'
import BlogHeroCta from '@/components/blog/BlogHeroCta.vue'
import BlogHeroVisual from '@/components/blog/BlogHeroVisual.vue'

const { t } = useLanguage()

// Estados para animaciones
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="blog-hero">
    <!-- Fondo animado con partículas -->
    <BlogHeroParticles />

    <!-- Contenido principal -->
    <div class="blog-hero__container">
      <div class="blog-hero__content" :class="{ 'blog-hero__content--visible': isVisible }">
        <!-- Badge -->
        <div class="blog-hero__badge">
          <span class="badge-icon">✨</span>
          <span>{{ t('blog.hero.badge') }}</span>
        </div>

        <!-- Título principal -->
        <h1 class="blog-hero__title">
          <span class="title-main">{{ t('blog.hero.title') }}</span>
          <span class="title-accent">{{ t('blog.hero.titleAccent') }}</span>
        </h1>

        <!-- Subtítulo -->
        <p class="blog-hero__subtitle">
          {{ t('blog.hero.subtitle') }}
        </p>

        <!-- Estadísticas -->
        <BlogHeroStats />

        <!-- Call to action -->
        <BlogHeroCta />
      </div>

      <!-- Elemento visual decorativo -->
      <BlogHeroVisual />
    </div>

    <!-- Indicador de scroll -->
    <div class="blog-hero__scroll-indicator">
      <div class="scroll-line"></div>
      <div class="scroll-text">{{ t('blog.hero.scrollDown') }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.blog-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    $YEYO-VIOLET 0%,
    rgba(26, 26, 46, 0.95) 30%,
    rgba(22, 33, 62, 0.9) 100%
  );

  &__container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  &__content {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &--visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(79, 172, 254, 0.3);
    border-radius: 50px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    font-weight: 500;
    backdrop-filter: blur(10px);
    margin-bottom: 1.5rem;

    .badge-icon {
      font-size: 1rem;
      animation: sparkle 2s ease-in-out infinite;
    }
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;

    .title-main {
      display: block;
      color: white;
      margin-bottom: 0.5rem;
    }

    .title-accent {
      display: block;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60%;
        height: 4px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        border-radius: 2px;
        animation: underlineGrow 1s ease-out 0.5s both;
      }
    }
  }

  &__subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 500px;
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;

    .scroll-line {
      width: 1px;
      height: 30px;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(255, 255, 255, 0.6) 50%,
        transparent 100%
      );
      animation: scrollPulse 2s ease-in-out infinite;
    }

    .scroll-text {
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 500;
    }
  }
}

// Animaciones
@keyframes sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(180deg);
  }
}

@keyframes underlineGrow {
  0% {
    width: 0;
  }
  100% {
    width: 60%;
  }
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .blog-hero {
    &__container {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
  }
}

@media (max-width: 768px) {
  .blog-hero {
    &__container {
      padding: 0 1.5rem;
      gap: 2rem;
    }
  }
}

@media (max-width: 480px) {
  .blog-hero {
    &__container {
      padding: 0 1rem;
    }
  }
}
</style>
