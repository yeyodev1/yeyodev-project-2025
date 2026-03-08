<script setup lang="ts">
import Footer from './components/global/Footer.vue'
import Header from './components/global/Header.vue'
import ToastNotification from './components/global/ToastNotification.vue'
import DevTerminal from './components/base/DevTerminal.vue'
import FloatingRobot from './components/ui/FloatingRobot.vue'
</script>

<template>
  <Header />
  <main class="main-content">
    <RouterView />
  </main>
  <ToastNotification />
  <Footer />
  <DevTerminal />
  <!-- Global floating robot — follows scroll & mouse on desktop, widget on mobile -->
  <FloatingRobot />
</template>

<style lang="scss">


.main-content {
  min-height: 100vh;
}

</style>

