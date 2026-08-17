<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Footer from './components/global/Footer.vue'
import Header from './components/global/Header.vue'
import ToastNotification from './components/global/ToastNotification.vue'
import DevTerminal from './components/base/DevTerminal.vue'
import AppPreloader from './components/preloader/AppPreloader.vue'
import { useLanguage } from '@/composables/useLanguage'

const { init } = useLanguage()
onMounted(init)

const loading = ref(true)

watch(
  loading,
  (isLoading) => {
    document.documentElement.style.overflow = isLoading ? 'hidden' : ''
  },
  { immediate: true },
)
</script>

<template>
  <AppPreloader v-if="loading" @done="loading = false" />
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
