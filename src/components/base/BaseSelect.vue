<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: string
  options: string[]
  placeholder?: string
  required?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (!props.modelValue) return ''
  return props.modelValue
})

function toggle() {
  open.value = !open.value
}

function select(value: string) {
  emit('update:modelValue', value)
  open.value = false
}

function onClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="wrapperRef" class="base-select" :class="{ 'base-select--open': open }">
    <button
      type="button"
      class="base-select__trigger"
      :class="{ 'base-select__trigger--placeholder': !modelValue }"
      @click="toggle"
      :required="required"
    >
      <span>{{ selectedLabel || placeholder || 'Selecciona…' }}</span>
      <svg class="base-select__arrow" :class="{ 'base-select__arrow--up': open }" width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <Transition name="base-select-drop">
      <div v-if="open" class="base-select__dropdown">
        <button
          v-for="opt in options"
          :key="opt"
          type="button"
          class="base-select__option"
          :class="{ 'base-select__option--selected': modelValue === opt }"
          @click="select(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.base-select {
  position: relative;
  width: 100%;

  &__trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 10px;
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    color: $text-primary;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &--placeholder {
      color: $text-muted;
    }

    &:focus,
    &:focus-visible {
      border-color: $accent-primary;
      box-shadow: 0 0 0 3px $accent-glow;
    }

    &:hover {
      border-color: $border-violet;
    }
  }

  &__arrow {
    color: $accent-light;
    flex-shrink: 0;
    transition: transform 0.25s ease;

    &--up {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: $bg-secondary;
    border: 1px solid $border-violet;
    border-radius: 10px;
    overflow: hidden;
    z-index: 50;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px $accent-glow;
    max-height: 280px;
    overflow-y: auto;
  }

  &__option {
    width: 100%;
    display: block;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: $text-secondary;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(124, 58, 237, 0.12);
      color: $text-primary;
    }

    &--selected {
      color: $accent-light;
      background: rgba(124, 58, 237, 0.08);
    }

    & + & {
      border-top: 1px solid $border-subtle;
    }
  }
}

.base-select-drop-enter-active {
  transition: all 0.2s ease-out;
}
.base-select-drop-leave-active {
  transition: all 0.15s ease-in;
}
.base-select-drop-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.base-select-drop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
