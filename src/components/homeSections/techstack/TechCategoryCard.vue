<script setup lang="ts">
import TechSkillItem from './TechSkillItem.vue'
import type { TechCategory } from './techStackData'

defineProps<{
  category: TechCategory
  categoryIndex: number
}>()
</script>

<template>
  <div
    class="stack__category"
    :style="{
      '--category-color': category.color,
      '--category-delay': categoryIndex,
    }"
  >
    <div class="stack__category-header">
      <span class="stack__category-icon">{{ category.icon }}</span>
      <h3 class="stack__category-title">{{ category.name }}</h3>
    </div>

    <div class="stack__skills-grid">
      <TechSkillItem
        v-for="(skill, skillIndex) in category.skills"
        :key="skill.name"
        :skill="skill"
        :skill-index="skillIndex"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes category-fade-in {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.stack__category {
  opacity: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    background: linear-gradient(135deg, var(--category-color), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

    &::before {
      opacity: 0.1;
    }
  }

  .stack.is-visible & {
    animation: category-fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: calc(var(--category-delay) * 200ms);
  }
}

.stack__category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(79, 172, 254, 0.3);
}

.stack__category-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.stack__category-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.stack__skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .stack__category {
    padding: 2rem;
  }
}
</style>
