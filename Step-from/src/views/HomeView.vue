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
      block: 'start'
    })
  }
}
</script>

<template>
  <div class="snap-container">
    
    <section id="home" class="snap-section">
      <HeroSection @scroll-down="() => scrollToSection('about')" />
    </section>

   
    <section id="about" class="snap-section">
      <AboutSection @scroll-down="() => scrollToSection('program')" />
    </section>

    
    <section id="program" class="snap-section">
      <ProgrammeScolaire @scroll-down="() => scrollToSection('contact')" />
    </section>

   
    <section id="contact" class="snap-section">
      <ContactSection />
    </section>
    <footer class="text-center text-sm text-gray-400 py-4">
      © 2025 MaPlateforme. Tous droits réservés.
    </footer>
  </div>
</template>

<style scoped>
.snap-container {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
   scrollbar-width: none; 
  -ms-overflow-style: none; 
}
.snap-section {
  scroll-snap-align: start;
  height: 100vh;
}
</style>
