<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  projectUrl: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a :href="projectUrl" target="_blank" rel="noopener noreferrer" class="card">
    <div class="card__image-container">
      <img :src="imageUrl" :alt="`Imagen del proyecto ${title}`" class="card__image" />
    </div>
    <div class="card__content">
      <span class="card__category">{{ category }}</span>
      <h3 class="card__title">{{ title }}</h3>
      <div class="card__footer">
        <span>Ver proyecto</span>
        <span class="card__arrow">&rarr;</span>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.card {
  display: block;
  background-color: $white;
  text-decoration: none;
  color: $YEYO-BLUE;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  // Sutil sombra para dar profundidad
  box-shadow: 0 2px 10px rgba($YEYO-VIOLET, 0.05);

  &:hover {
    // Efecto de elevación al pasar el mouse
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba($YEYO-VIOLET, 0.1);

    .card__arrow {
      // La flecha se mueve para indicar acción
      transform: translateX(5px);
    }
  }
}

.card__image-container {
  aspect-ratio: 16 / 10; // Proporción de la imagen
  background-color: $YEYO-ORANGE;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__content {
  padding: 1.5rem;
}

.card__category {
  font-family: $font-secondary;
  font-size: 0.875rem;
  color: $YEYO-VIOLET;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card__title {
  margin: 0.25rem 0 0;
  font-size: 1.75rem;
  line-height: 1.2;
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  font-family: $font-principal;
  font-weight: 700;
  color: $green;
}

.card__arrow {
  transition: transform 0.3s ease;
}
</style>