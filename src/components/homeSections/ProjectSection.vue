<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProjectCard from '../card/ProjectCard.vue';

// --- Estado y Lógica del Componente ---

// 1. Creamos una ref para el contenedor de la grilla, para poder observarlo.
const gridContainer = ref<HTMLDivElement | null>(null);

// 2. Creamos un estado para saber si la sección está visible.
const isVisible = ref(false);

const projects = ref([
  {
    id: 'proj-1',
    title: 'Plataforma de E-commerce',
    category: 'Desarrollo Web',
    imageUrl: 'https://placehold.co/600x400/22223b/f2e9e4?text=Proyecto+1',
    projectUrl: '#',
  },
  {
    id: 'proj-2',
    title: 'Dashboard Analítico',
    category: 'Aplicación Web',
    imageUrl: 'https://placehold.co/600x400/4a4e69/f2e9e4?text=Proyecto+2',
    projectUrl: '#',
  },
  {
    id: 'proj-3',
    title: 'Landing Page Corporativa',
    category: 'Diseño y Desarrollo',
    imageUrl: 'https://placehold.co/600x400/c9ada7/22223b?text=Proyecto+3',
    projectUrl: '#',
  },
  {
    id: 'proj-4',
    title: 'API RESTful Segura',
    category: 'Backend',
    imageUrl: 'https://placehold.co/600x400/69ad69/22223b?text=Proyecto+4',
    projectUrl: '#',
  },
]);

// 3. Configuramos el IntersectionObserver cuando el componente se monta.
onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Si el elemento está intersectando (visible en pantalla)...
      if (entry && entry.isIntersecting) {
        // ...actualizamos nuestro estado.
        isVisible.value = true;
        // (Opcional pero recomendado) Dejamos de observar una vez que es visible.
        observer.unobserve(gridContainer.value as Element);
      }
    },
    {
      // La animación se dispara cuando el 20% del elemento es visible.
      threshold: 0.2,
    }
  );

  // Le decimos al observer que vigile nuestro contenedor de la grilla.
  if (gridContainer.value) {
    observer.observe(gridContainer.value);
  }
});
</script>

<template>
  <section id="projects" class="projects">
    <div class="projects__container">
      <h2 class="projects__title">Mis Proyectos</h2>
      <div
        ref="gridContainer"
        class="projects__grid"
        :class="{ 'is-visible': isVisible }"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :title="project.title"
          :category="project.category"
          :image-url="project.imageUrl"
          :project-url="project.projectUrl"
          class="project-card"
          :style="{ '--stagger-index': index }"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.projects {
  padding: 6rem 1.5rem;
  background-color: $YEYO-ORANGE;
}

.projects__container {
  max-width: 1200px;
  margin: 0 auto;
}

.projects__title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
}

.projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

// --- Lógica de la animación en cascada ---

// 6. Por defecto, las tarjetas están ocultas.
.project-card {
  opacity: 0;
}

// 7. Cuando el contenedor se hace visible...
.projects__grid.is-visible {
  .project-card {
    // ...aplicamos la animación a cada tarjeta.
    animation: fade-in-up 0.6s ease-out forwards;
    // 8. (LA MAGIA) Usamos la variable para calcular el retraso de cada tarjeta.
    animation-delay: calc(var(--stagger-index) * 120ms);
  }
}

// --- Media Queries ---
@media (min-width: $breakpoint-md) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: $breakpoint-lg) {
  .projects__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>