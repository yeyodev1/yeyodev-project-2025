<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Estados para animaciones
const particles = ref<Array<{ id: number; x: number; y: number; delay: number }>>([])

// Generar partículas para el fondo animado
const generateParticles = () => {
  const particleCount = 20
  particles.value = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }))
}

onMounted(() => {
  generateParticles()
})
</script>

<template>
  <div class="blog-hero__background" aria-hidden="true">
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        animationDelay: `${particle.delay}s`,
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.blog-hero__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(79, 172, 254, 0.6);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;

    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      width: 8px;
      height: 8px;
      background: rgba(79, 172, 254, 0.2);
      border-radius: 50%;
      animation: pulse 3s ease-in-out infinite;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
