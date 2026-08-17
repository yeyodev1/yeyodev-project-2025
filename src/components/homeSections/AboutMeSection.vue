<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import AboutBackdrop from './about/AboutBackdrop.vue'
import AboutHeader from './about/AboutHeader.vue'
import AboutPortrait from './about/AboutPortrait.vue'
import AboutAchievements from './about/AboutAchievements.vue'
import AboutGallery from './about/AboutGallery.vue'

const { t } = useLanguage()

// Lógica del Intersection Observer para la animación al hacer scroll
const sectionContainer = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Datos de habilidades y logros
const achievements = computed(() => [
  { number: '50+', label: t('about.achievements.projects'), icon: '🚀' },
  { number: '3+', label: t('about.achievements.experience'), icon: '⏰' },
  { number: '15+', label: t('about.achievements.technologies'), icon: '💻' },
  { number: '100%', label: t('about.achievements.dedication'), icon: '❤️' },
])

const skills = computed(() => [
  t('about.skills.architecture'),
  t('about.skills.cleanCode'),
  t('about.skills.agile'),
  t('about.skills.leadership'),
  t('about.skills.performance'),
  t('about.skills.testing'),
])

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(sectionContainer.value as Element)
      }
    },
    { threshold: 0.2 },
  )

  if (sectionContainer.value) {
    observer.observe(sectionContainer.value)
  }
})
</script>

<template>
  <section ref="sectionContainer" id="about" class="about" :class="{ 'is-visible': isVisible }">
    <!-- Elementos decorativos de fondo -->
    <AboutBackdrop />

    <div class="about__container">
      <!-- Header con efectos de texto -->
      <AboutHeader />

      <!-- Grid principal -->
      <div class="about__main-grid">
        <!-- Contenido de texto mejorado -->
        <div class="about__content-section">
          <div class="about__text-content">
            <div class="about__intro">
              <p class="about__intro-text" v-html="t('about.intro.paragraph1')"></p>
              <p class="about__intro-text" v-html="t('about.intro.paragraph2')"></p>
              <p class="about__intro-text" v-html="t('about.intro.paragraph3')"></p>
            </div>

            <!-- Lista de habilidades -->
            <div class="about__skills">
              <h3 class="about__skills-title">Especialidades</h3>
              <div class="about__skills-grid">
                <div
                  v-for="(skill, index) in skills"
                  :key="skill"
                  class="about__skill-tag"
                  :style="{ '--skill-delay': index }"
                >
                  {{ skill }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección de imagen mejorada -->
        <AboutPortrait />
      </div>

      <!-- Sección de logros -->
      <AboutAchievements :achievements="achievements" />

      <!-- Galería de fotos -->
      <AboutGallery />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
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

// Estilos principales
.about {
  padding: 8rem 1.5rem;
  background: linear-gradient(
    135deg,
    $YEYO-VIOLET 0%,
    rgba(26, 26, 46, 0.95) 20%,
    rgba(22, 33, 62, 0.9) 40%,
    rgba(15, 52, 96, 0.85) 60%,
    rgba(34, 34, 59, 0.8) 80%,
    rgba(34, 34, 59, 0.8) 100%
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    padding: 6rem 1rem;
  }
}

// Container principal
.about__container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

// Grid principal
.about__main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
  }
}

// Sección de contenido
.about__content-section {
  opacity: 0;

  .about.is-visible & {
    animation: slide-in-left 1s ease-out 0.6s forwards;
  }
}

.about__text-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(79, 172, 254, 0.1), transparent);
    animation: shimmer 3s infinite;
  }

  @media (max-width: 640px) {
    padding: 2rem;
  }
}

.about__intro-text {
  font-family: $font-secondary;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #4facfe;
    font-weight: 700;
  }
}

.about__highlight {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

// Habilidades
.about__skills {
  margin-top: 3rem;
}

.about__skills-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
  text-align: center;
}

.about__skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.about__skill-tag {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  opacity: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
  }

  .about.is-visible & {
    animation: scale-in 0.6s ease-out forwards;
    animation-delay: calc(1.2s + var(--skill-delay) * 0.1s);
  }
}
</style>
