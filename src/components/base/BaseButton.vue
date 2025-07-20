<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  href: {
    type: String,
    default: null
  },
});

const componentTag = computed(() => (props.href ? 'a' : 'button'));
</script>

<template>
  <component :is="componentTag" :class="['button', `button--${variant}`]" :href="href">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.button {
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-family: $font-principal;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &--primary {
    background-color: $YEYO-BLUE;
    color: $white;

    &:hover {
      background-color: $YEYO-VIOLET;
    }
  }

  &--secondary {
    background-color: transparent;
    color: $YEYO-BLUE;
    border-color: $YEYO-BLUE;

    &:hover {
      background-color: $YEYO-BLUE;
      color: $white;
    }
  }
}
</style>