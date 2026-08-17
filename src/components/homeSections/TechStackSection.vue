<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TechCategoryCard from './techstack/TechCategoryCard.vue'
import { techCategories } from './techstack/techStackData'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="stack" :class="{ 'is-visible': isVisible }">
    <div class="stack__bg-elements">
      <div class="stack__bg-circle stack__bg-circle--1"></div>
      <div class="stack__bg-circle stack__bg-circle--2"></div>
      <div class="stack__bg-circle stack__bg-circle--3"></div>
    </div>

    <div class="stack__container">
      <header class="stack__header">
        <h2 class="stack__title">Stack</h2>
        <p class="stack__subtitle">
          Tecnologías y herramientas que uso para construir productos digitales completos
        </p>
      </header>

      <div class="stack__categories">
        <TechCategoryCard
          v-for="(category, categoryIndex) in techCategories"
          :key="category.name"
          :category="category"
          :category-index="categoryIndex"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
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

.stack {
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
}

.stack__container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.stack__header {
  text-align: center;
  margin-bottom: 5rem;
}

.stack__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.stack__subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.stack__categories {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
}

.stack__bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.stack__bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.05));
  animation: float 6s ease-in-out infinite;

  &--1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }

  &--2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }

  &--3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 15%;
    animation-delay: 4s;
  }
}

@media (max-width: 640px) {
  .stack {
    padding: 4rem 1rem;
  }
}
</style>
