<script setup lang="ts">
export type PostFontSize = 'small' | 'medium' | 'large'

interface Props {
  fontSize: PostFontSize
  isDarkMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  fontSizeChange: [size: PostFontSize]
  themeToggle: []
}>()

const fontSizes: PostFontSize[] = ['small', 'medium', 'large']
</script>

<template>
  <div class="post-controls">
    <div class="font-controls" role="group" aria-label="Font size">
      <button
        v-for="size in fontSizes"
        :key="size"
        type="button"
        class="font-btn"
        :class="{ active: fontSize === size }"
        :aria-label="`Font size: ${size}`"
        :aria-pressed="fontSize === size"
        @click="emit('fontSizeChange', size)"
      >
        A
      </button>
    </div>

    <button
      type="button"
      class="theme-toggle"
      aria-label="Toggle dark mode"
      @click="emit('themeToggle')"
    >
      {{ isDarkMode ? '☀️' : '🌙' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
// Controles de personalización
.post-controls {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 100;

  .font-controls {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .font-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &.active {
      background: rgba(79, 172, 254, 0.3);
      color: #4facfe;
    }

    &:nth-child(1) {
      font-size: 0.8rem;
    }
    &:nth-child(2) {
      font-size: 1rem;
    }
    &:nth-child(3) {
      font-size: 1.2rem;
    }
  }

  .theme-toggle {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    font-size: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }
  }
}

@media (max-width: 768px) {
  .post-controls {
    top: 1rem;
    right: 1rem;

    .font-controls {
      padding: 0.3rem;
    }

    .font-btn {
      width: 35px;
      height: 35px;
    }

    .theme-toggle {
      width: 45px;
      height: 45px;
    }
  }
}
</style>
