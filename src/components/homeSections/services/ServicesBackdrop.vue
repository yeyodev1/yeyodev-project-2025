<template>
  <div class="services__bg">
    <div class="services__orb services__orb--1" />
    <div class="services__orb services__orb--2" />
    <div class="services__orb services__orb--3" />
    <div class="services__grid-overlay" />
  </div>
</template>

<style lang="scss" scoped>
.services {
  // ── Background ────────────────────────────────────────────────────────
  &__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  &__grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  @keyframes orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  &__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: orb-float 12s ease-in-out infinite;

    &--1 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent);
      top: -10%;
      right: -5%;
      animation-delay: 0s;
    }

    &--2 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(6, 214, 160, 0.15), transparent);
      bottom: 10%;
      left: -5%;
      animation-delay: -4s;
    }

    &--3 {
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent);
      top: 40%;
      left: 50%;
      animation-delay: -8s;
    }
  }
}
</style>
