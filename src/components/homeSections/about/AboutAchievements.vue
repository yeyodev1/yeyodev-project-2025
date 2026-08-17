<script setup lang="ts">
export interface Achievement {
  number: string
  label: string
  icon: string
}

defineProps<{ achievements: Achievement[] }>()
</script>

<template>
  <div class="about__achievements">
    <div class="about__achievements-grid">
      <div
        v-for="(achievement, index) in achievements"
        :key="achievement.label"
        class="about__achievement-card"
        :style="{ '--achievement-delay': index }"
      >
        <div class="about__achievement-icon">{{ achievement.icon }}</div>
        <div class="about__achievement-number">{{ achievement.number }}</div>
        <div class="about__achievement-label">{{ achievement.label }}</div>
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

.about__achievements {
  opacity: 0;

  .about.is-visible & {
    animation: slide-in-up 1s ease-out 1.2s forwards;
  }
}

.about__achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

.about__achievement-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  opacity: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4facfe, #00f2fe);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  }

  .about.is-visible & {
    animation: scale-in 0.8s ease-out forwards;
    animation-delay: calc(1.4s + var(--achievement-delay) * 0.2s);
  }

  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
  }
}

.about__achievement-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.about__achievement-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  line-height: 1;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
}

.about__achievement-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  opacity: 0.9;
  line-height: 1.4;
}
</style>
