<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import HeroSection from '@/components/homeSections/HeroSection.vue'
import SectionLoader from '@/components/preloader/SectionLoader.vue'

const lazySection = (loader: () => Promise<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: SectionLoader,
    delay: 0,
  })

const ProjectSection = lazySection(() => import('@/components/homeSections/ProjectSection.vue'))
const ServicesSection = lazySection(() => import('@/components/homeSections/ServicesSection.vue'))
const GithubSection = lazySection(() => import('@/components/homeSections/GithubSection.vue'))
const ContactSection = lazySection(() => import('@/components/homeSections/ContactSection.vue'))
</script>

<template>
  <main>
    <HeroSection />
    <ProjectSection />
    <ServicesSection />
    <GithubSection />
    <ContactSection />
  </main>
</template>
