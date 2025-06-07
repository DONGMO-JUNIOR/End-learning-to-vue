<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProgrammeScolaire from '@/components/ProgrammeScolaire.vue'

const { t } = useI18n()

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' // Ajoutez ceci pour un alignement cohérent
    })
  }
}
</script>

<template>
  <div class="snap-container">
    <!-- Hero Section -->
    <section id="home" class="snap-section">
      <HeroSection @scroll-down="() => scrollToSection('about')" />
    </section>

    <!-- About Section -->
    <section id="about" class="snap-section">
      <AboutSection @scroll-down="() => scrollToSection('program')" />
    </section>

    <!-- Program Section -->
    <section id="program" class="snap-section">
      <ProgrammeScolaire @scroll-down="() => scrollToSection('contact')" />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="snap-section">
      <ContactSection />
    </section>
  </div>
</template>

<style scoped>
.snap-container {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
}

.snap-section {
  scroll-snap-align: start;
  height: 100vh;
}
</style>
<!-- <script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'

const router = useRouter()

const handleSignIn = (): void => {
  router.push('/login')
}

const handleSignUp = (): void => {
  router.push('/register')
}

const handleExplore = (): void => {
  router.push('/programme')
}
</script> -->