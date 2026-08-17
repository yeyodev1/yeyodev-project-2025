<template>
  <div class="about__bg-elements">
    <div class="about__bg-circle about__bg-circle--1"></div>
    <div class="about__bg-circle about__bg-circle--2"></div>
    <div class="about__bg-circle about__bg-circle--3"></div>
    <div class="about__floating-shapes">
      <div class="about__shape about__shape--triangle"></div>
      <div class="about__shape about__shape--square"></div>
      <div class="about__shape about__shape--circle"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes float-gentle {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes bounce-gentle {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-30px) scale(1.1);
  }
  60% {
    transform: translateY(-15px) scale(1.05);
  }
}

@keyframes bounce-rotate {
  0%,
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-25px) rotate(90deg) scale(1.2);
  }
  50% {
    transform: translateY(-40px) rotate(180deg) scale(1.1);
  }
  75% {
    transform: translateY(-15px) rotate(270deg) scale(1.05);
  }
}

@keyframes bounce-elastic {
  0% {
    transform: translateY(0) scale(1);
  }
  20% {
    transform: translateY(-45px) scale(1.25);
  }
  40% {
    transform: translateY(-20px) scale(0.95);
  }
  60% {
    transform: translateY(-35px) scale(1.15);
  }
  80% {
    transform: translateY(-10px) scale(1.02);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.about__bg-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.about__bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.05));
  animation: float-gentle 8s ease-in-out infinite;

  &--1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: -10%;
    animation-delay: 0s;
  }

  &--2 {
    width: 200px;
    height: 200px;
    top: 60%;
    right: -5%;
    animation-delay: 2s;
  }

  &--3 {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
}

.about__floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.about__shape {
  position: absolute;
  cursor: pointer;
  transition: all 0.3s ease;

  &--triangle {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 25px solid rgba(79, 172, 254, 0.3);
    top: 30%;
    right: 20%;
    animation: bounce-gentle 4s ease-in-out infinite;
    animation-delay: 1s;

    &:hover {
      border-bottom-color: rgba(79, 172, 254, 0.6);
      animation-play-state: paused;
      transform: translateY(-10px) scale(1.3);
    }
  }

  &--square {
    width: 20px;
    height: 20px;
    background: rgba(79, 172, 254, 0.4);
    top: 70%;
    left: 10%;
    animation: bounce-rotate 6s ease-in-out infinite;
    animation-delay: 3s;
    border-radius: 2px;

    &:hover {
      background: rgba(79, 172, 254, 0.7);
      animation-play-state: paused;
      transform: translateY(-15px) rotate(45deg) scale(1.5);
    }
  }

  &--circle {
    width: 12px;
    height: 12px;
    background: rgba(0, 242, 254, 0.5);
    border-radius: 50%;
    top: 20%;
    left: 70%;
    animation: bounce-elastic 5s ease-in-out infinite;
    animation-delay: 5s;

    &:hover {
      background: rgba(0, 242, 254, 0.8);
      animation-play-state: paused;
      transform: translateY(-20px) scale(2);
      box-shadow: 0 0 20px rgba(0, 242, 254, 0.6);
    }
  }
}
</style>
