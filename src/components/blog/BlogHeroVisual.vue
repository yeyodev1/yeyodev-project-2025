<template>
  <div class="blog-hero__visual" aria-hidden="true">
    <div class="visual-element visual-element--1"></div>
    <div class="visual-element visual-element--2"></div>
    <div class="visual-element visual-element--3"></div>
  </div>
</template>

<style lang="scss" scoped>
.blog-hero__visual {
  position: relative;
  height: 400px;

  .visual-element {
    position: absolute;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &--1 {
      width: 200px;
      height: 250px;
      top: 0;
      right: 0;
      animation: float 6s ease-in-out infinite;
    }

    &--2 {
      width: 150px;
      height: 180px;
      bottom: 50px;
      right: 100px;
      animation: float 6s ease-in-out infinite 2s;
    }

    &--3 {
      width: 100px;
      height: 120px;
      top: 100px;
      left: 50px;
      animation: float 6s ease-in-out infinite 4s;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@media (max-width: 1024px) {
  .blog-hero__visual {
    order: -1;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .blog-hero__visual {
    height: 250px;

    .visual-element {
      &--1 {
        width: 150px;
        height: 180px;
      }

      &--2 {
        width: 120px;
        height: 140px;
      }

      &--3 {
        width: 80px;
        height: 100px;
      }
    }
  }
}
</style>
