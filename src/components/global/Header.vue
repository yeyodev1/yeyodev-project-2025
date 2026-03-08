<script setup lang="ts">
// Header — no i18n needed (English-only now)
</script>

<template>
  <header class="header">
    <div class="header__container">
      <a href="/" class="header__logo">
        yeyo<span class="header__logo--dot">.</span>dev
      </a>
      <nav class="header__nav">
        <a href="#projects">Work</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="header__actions">
        <a
          href="https://wa.me/17633524852"
          target="_blank"
          rel="noopener noreferrer"
          class="header__cta"
        >
          Let's talk →
        </a>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>


.header {
  background: rgba(4, 4, 12, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid $border-subtle;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    font-family: $font-principal;
    font-size: 1.4rem;
    font-weight: 700;
    color: $text-primary;
    text-decoration: none;
    letter-spacing: -0.02em;

    &--dot {
      color: $accent-primary;
    }
  }

  &__nav {
    display: none;

    @media (min-width: $breakpoint-md) {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    a {
      font-size: 0.9rem;
      font-weight: 500;
      color: $text-secondary;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover { color: $text-primary; }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__cta {
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    background: $accent-primary;
    color: $text-primary;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    transition: all 0.25s ease;
    box-shadow: 0 0 16px $accent-glow;

    &:hover {
      background: $accent-light;
      transform: translateY(-1px);
    }
  }
}
</style>