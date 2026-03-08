<script setup lang="ts">
import { onMounted } from 'vue'
import Footer from './components/global/Footer.vue'
import Header from './components/global/Header.vue'
import ToastNotification from './components/global/ToastNotification.vue'
import DevTerminal from './components/base/DevTerminal.vue'
import { useLanguage } from '@/composables/useLanguage'

const { init } = useLanguage()
onMounted(init)
</script>

<template>
  <Header />
  <main class="main-content">
    <RouterView />
  </main>
  <ToastNotification />
  <Footer />
  <DevTerminal />
</template>

<style lang="scss">
.main-content {
  min-height: 100vh;
}
</style>
