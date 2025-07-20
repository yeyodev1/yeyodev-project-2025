<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <div class="hero__title-mask">
        <h1 class="hero__title">
          Hola, soy&nbsp;<span class="hero__name-container">
            <span class="hero__name-flipper">
              <span class="hero__name-line">Diego</span>
            </span>
          </span>
        </h1>
      </div>
      <p class="hero__subtitle">
        Desarrollador Full-Stack apasionado por crear aplicaciones web robustas,
        escalables y con una gran experiencia de usuario.
      </p>
      <div class="hero__actions">
        <BaseButton href="#projects" variant="primary">Mis Proyectos</BaseButton>
        <BaseButton href="/cv.pdf" variant="secondary">Descargar CV</BaseButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0%);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  text-align: center;
  background-color: $YEYO-ORANGE;
  overflow: hidden;

  &__content {
    max-width: 800px;
  }

  &__title-mask {
    display: inline-block;
    overflow: hidden;
  }

  &__title {
    margin: 0;
    font-size: 2.5rem;
    color: $YEYO-BLUE;
    line-height: 1.3;
    // Aplicamos la animación de revelado al título
    animation: slide-up 1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }

  &__subtitle,
  &__actions {
    opacity: 0;
    animation: fade-in-up 0.8s ease-out forwards;
    display: flex;
    gap: 16px;
  }

  &__subtitle {
    animation-delay: 0.8s; // Empieza después de que el título casi ha terminado
    margin-bottom: 24px;
  }

  &__actions {
    animation-delay: 1.1s; // Empieza un poco después del subtítulo
  }
}

// Media Queries (sin cambios en la lógica, solo se aplican los nuevos estilos)
@media (min-width: $breakpoint-md) {
  .hero {
    text-align: left;

    &__title {
      font-size: 4.5rem;
    }
  }
}
</style>