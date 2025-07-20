<script setup lang="ts">
import Footer from './components/global/Footer.vue';
import Header from './components/global/Header.vue';
import ToastNotification from './components/global/ToastNotification.vue';


</script>

<template>
  <Header />
  <main class="main-content">
    <RouterView />
  </main>
  <ToastNotification/>
  <Footer />
</template>

<style lang="scss">
@use '@/styles/index.scss' as *;

.main-content {
  min-height: 100vh;
}
</style>

