<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="footer__copy">
        &copy; {{ currentYear }} Yeyodev. Todos los derechos reservados.
      </p>
      <div class="footer__socials">
        <a href="https://github.com/yeyodev1" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/yeyodev1" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;

.footer {
  background: linear-gradient(135deg, 
    rgba(244, 194, 161, 0.95) 0%, 
    rgba(232, 180, 160, 0.9) 20%,
    rgba(74, 78, 105, 0.95) 60%,
    $YEYO-BLUE 100%
  );
  color: $YEYO-ORANGE;
  padding: 3rem 1rem;
  text-align: center;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  &__copy {
    font-size: 0.9rem;
    color: $YEYO-ROSE;
  }

  &__socials {
    display: flex;
    gap: 1.5rem;

    a {
      color: $white;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: $green;
      }
    }
  }

  @media (min-width: 768px) {
    .footer__container {
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>