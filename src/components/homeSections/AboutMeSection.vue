<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Lógica del Intersection Observer para la animación al hacer scroll
const sectionContainer = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(sectionContainer.value as Element);
      }
    },
    { threshold: 0.2 }
  );

  if (sectionContainer.value) {
    observer.observe(sectionContainer.value);
  }
});
</script>

<template>
  <section ref="sectionContainer" id="about" class="about" :class="{ 'is-visible': isVisible }">
    <div class="about__container">
      <h2 class="about__title">Sobre Mí</h2>
      <div class="about__grid">
        <div class="about__text-content">
          <p>
            ¡Hola! Soy Diego, un desarrollador de software con una profunda pasión por la arquitectura de sistemas y la creación de experiencias de usuario memorables. Mi enfoque se centra en escribir código limpio, escalable y bien documentado, aplicando principios sólidos para construir productos que no solo funcionen hoy, sino que sean fáciles de mantener y evolucionar mañana.
          </p>
          <p>
            Disfruto desentrañando problemas complejos y traduciendo ideas en soluciones tecnológicas robustas. Siempre estoy explorando nuevas herramientas y paradigmas para mantenerme a la vanguardia, convencido de que un buen desarrollador es un aprendiz de por vida.
          </p>
        </div>
        <div class="about__image-container">
          <img 
            src="../../assets/fotos/yo.jpg" 
            alt="Retrato de Diego Reyes" 
            class="about__image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.about {
  padding: 6rem 1.5rem;
  background-color: $YEYO-ORANGE;
}

.about__container {
  max-width: 1100px;
  margin: 0 auto;
}

.about__title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 3fr 2fr; // Columna de texto más ancha
    gap: 5rem;
  }
}

.about__text-content p {
  font-family: $font-secondary;
  font-size: 1.125rem;
  color: $YEYO-VIOLET;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.about__image-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba($YEYO-VIOLET, 0.1);

  // En móvil, la imagen va primero
  @media (max-width: ($breakpoint-md - 1px)) {
    grid-row: 1;
  }
}

.about__image {
  width: 100%;
  display: block;
}

// Lógica de animación
.about__text-content,
.about__image-container {
  opacity: 0;
}

.about.is-visible {
  .about__text-content {
    animation: slide-in-left 0.8s ease-out forwards;
  }

  .about__image-container {
    animation: slide-in-right 0.8s ease-out forwards;
  }
}
</style>