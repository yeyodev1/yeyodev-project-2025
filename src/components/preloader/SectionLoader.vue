<template>
  <div class="section-loader" role="status" aria-label="Loading section">
    <div class="section-loader__orbit">
      <span class="section-loader__dot"></span>
      <span class="section-loader__dot"></span>
      <span class="section-loader__dot"></span>
    </div>
    <div class="section-loader__lines">
      <span class="section-loader__line" style="width: 38%"></span>
      <span class="section-loader__line" style="width: 72%"></span>
      <span class="section-loader__line" style="width: 55%"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-loader {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 1.5rem;

  &__orbit {
    display: flex;
    gap: 0.6rem;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #06d6a0);
    animation: sl-bounce 1s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.15s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }

  &__lines {
    width: min(560px, 90%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
  }

  &__line {
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 25%,
      rgba(124, 58, 237, 0.14) 50%,
      rgba(255, 255, 255, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: sl-shimmer 1.4s linear infinite;
  }
}

@keyframes sl-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

@keyframes sl-shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
