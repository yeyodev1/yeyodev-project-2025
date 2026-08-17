<script setup lang="ts">
import { ref } from 'vue'
import type { TechSkill } from './techStackData'

defineProps<{
  skill: TechSkill
  skillIndex: number
}>()

const isHovered = ref(false)
</script>

<template>
  <div
    class="stack__skill"
    :style="{
      '--skill-delay': skillIndex,
      '--skill-level': skill.level + '%',
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="stack__skill-content">
      <div class="stack__skill-header">
        <span class="stack__skill-name">{{ skill.name }}</span>
        <span class="stack__skill-level">{{ skill.level }}%</span>
      </div>
      <div class="stack__skill-bar">
        <div class="stack__skill-progress"></div>
      </div>
    </div>

    <div class="stack__skill-tooltip" :class="{ 'is-visible': isHovered }">
      {{ skill.description }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes skill-slide-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes progress-fill {
  from {
    width: 0;
  }

  to {
    width: var(--skill-level);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.stack__skill {
  opacity: 0;
  position: relative;

  .stack.is-visible & {
    animation: skill-slide-in 0.6s ease-out forwards;
    animation-delay: calc(var(--category-delay) * 200ms + var(--skill-delay) * 100ms + 300ms);
  }
}

.stack__skill-content {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(79, 172, 254, 0.3);
  }
}

.stack__skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stack__skill-name {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
}

.stack__skill-level {
  font-size: 0.875rem;
  font-weight: 700;
  color: #4facfe;
  background: rgba(79, 172, 254, 0.1);
  border: 1px solid rgba(79, 172, 254, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.stack__skill-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.stack__skill-progress {
  height: 100%;
  background: var(--category-color);
  border-radius: 3px;
  width: 0;
  position: relative;

  .stack.is-visible & {
    animation: progress-fill 1.5s ease-out forwards;
    animation-delay: calc(var(--category-delay) * 200ms + var(--skill-delay) * 100ms + 800ms);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }
}

.stack__skill-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: rgba(34, 34, 59, 0.95);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(34, 34, 59, 0.95);
  }

  &.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-12px);
  }
}

@media (max-width: 640px) {
  .stack__skill-content {
    padding: 1.25rem;
  }

  .stack__skill-tooltip {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    transform: none;
    white-space: normal;
    text-align: center;

    &::after {
      display: none;
    }
  }
}
</style>
