<template>
  <div class="about__visual-section">
    <div class="about__image-container">
      <div class="about__image-frame">
        <img src="@/assets/fotos/yo.jpg" alt="Retrato de Diego Reyes" class="about__image" />
        <div class="about__image-overlay"></div>
      </div>
      <div class="about__image-decoration">
        <div class="about__decoration-dot"></div>
        <div class="about__decoration-line"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(79, 172, 254, 0.6);
  }
}

.about__visual-section {
  opacity: 0;
  position: relative;

  .about.is-visible & {
    animation: slide-in-right 1s ease-out 0.8s forwards;
  }

  @media (max-width: 1023px) {
    order: -1;
  }
}

.about__image-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.about__image-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  padding: 4px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  }
}

.about__image {
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  border-radius: 20px;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.about__image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 20px;

  .about__image-frame:hover & {
    opacity: 1;
  }
}

.about__image-decoration {
  position: absolute;
  top: -20px;
  right: -20px;
  z-index: -1;
}

.about__decoration-dot {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.about__decoration-line {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, #4facfe, transparent);
  transform: rotate(45deg);
}
</style>
