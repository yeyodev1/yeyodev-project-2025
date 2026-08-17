<script setup lang="ts">
import photo1 from '@/assets/fotos/DSC06674.jpg'
import photo2 from '@/assets/fotos/DSC06685.jpg'
import photo3 from '@/assets/fotos/DSC07008.jpg'

const photos = [
  { src: photo1, alt: 'Diego Reyes — foto de galería 1' },
  { src: photo2, alt: 'Diego Reyes — foto de galería 2' },
  { src: photo3, alt: 'Diego Reyes — foto de galería 3' },
]
</script>

<template>
  <div class="about__gallery">
    <div class="about__gallery-track">
      <div v-for="photo in photos" :key="photo.src" class="about__gallery-item">
        <img :src="photo.src" :alt="photo.alt" class="about__gallery-img" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about__gallery {
  margin-top: 4rem;
  opacity: 0;

  .about.is-visible & {
    animation: slide-in-up 1s ease-out 1.6s forwards;
  }
}

.about__gallery-track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.about__gallery-item {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid $border-subtle;
  transition: all 0.4s ease;
  aspect-ratio: 3 / 4;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: $border-violet;
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.4),
      0 0 20px $accent-glow;
  }
}

.about__gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;

  .about__gallery-item:hover & {
    transform: scale(1.05);
  }
}
</style>
