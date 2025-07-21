<script setup lang="ts">
import { ref, onMounted } from 'vue';

const sectionContainer = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const techCategories = ref([
  {
    name: 'Frontend',
    skills: ['Vue 3', 'TypeScript', 'React', 'Nuxt.js', 'SCSS', 'Pinia', 'Vitest'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'],
  },
  {
    name: 'Herramientas y DevOps',
    skills: ['Git', 'Docker', 'CI/CD', 'Vite', 'Figma', 'Playwright', 'AWS'],
  },
]);

// Lógica del Intersection Observer
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
  <section ref="sectionContainer" id="tech-stack" class="stack" :class="{ 'is-visible': isVisible }">
    <div class="stack__container">
      <h2 class="stack__title">Mi Stack Tecnológico</h2>
      <div class="stack__categories">
        <div
          v-for="(category, catIndex) in techCategories"
          :key="category.name"
          class="stack__category"
          :style="{ '--category-delay': catIndex }"
        >
          <h3 class="stack__category-title">{{ category.name }}</h3>
          <ul class="stack__skill-list">
            <li v-for="skill in category.skills" :key="skill" class="stack__skill">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

@keyframes category-fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stack {
  padding: 6rem 1.5rem;
  background-color: $YEYO-ORANGE; // Alternamos color de fondo
}

.stack__container {
  max-width: 1200px;
  margin: 0 auto;
}

.stack__title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  hyphens: auto;
}

.stack__categories {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stack__category {
  opacity: 0; // Oculto por defecto para la animación

  // Cuando la sección es visible, animamos las categorías en cascada
  .stack.is-visible & {
    animation: category-fade-in 0.7s ease-out forwards;
    // El retraso se calcula basado en el índice de la categoría
    animation-delay: calc(var(--category-delay) * 200ms);
  }
}

.stack__category-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid $YEYO-ROSE;
}

.stack__skill-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stack__skill {
  font-family: $font-secondary;
  font-size: 1.125rem;
  color: $YEYO-VIOLET;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: $green;
    font-weight: 700;
  }
}
</style>