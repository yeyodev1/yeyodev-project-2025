<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
// En un futuro, podrías usar ref y un watcher para manejar el estado del menú móvil
</script>

<template>
  <header class="header">
    <div class="header__container">
      <a href="/" class="header__logo">
        yeyodev<span class="header__logo--dot">.</span>
      </a>
      <nav class="header__nav">
        <a href="#projects">Proyectos</a>
        <a href="#about">Sobre Mí</a>
        <a href="#contact">Contacto</a>
      </nav>
      <BaseButton href="mailto:tu.email@example.com" variant="primary">
        ¡Hablemos!
      </BaseButton>
      </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.header {
  background-color: $YEYO-ORANGE;
  padding: 1.5rem 1rem; // Padding mobile
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid $YEYO-ROSE;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-family: $font-principal;
    font-size: 1.75rem;
    font-weight: 700;
    color: $YEYO-BLUE;
    text-decoration: none;

    &--dot {
      color: $green;
    }
  }

  &__nav {
    display: none; // Oculto en mobile-first

    a {
      margin: 0 1rem;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: $green;
      }
    }
  }
}

// --- Estilos para pantallas más grandes ---
@media (min-width: 768px) {
  .header {
    padding: 1.5rem 2rem;
  }

  .header__nav {
    display: flex;
  }

  // Aquí ocultaríamos el botón de hamburguesa y el BaseButton que está fuera de la nav
}
</style>