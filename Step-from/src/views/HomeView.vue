<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
</script>

<template>
  <div>
    <!-- <NavBar /> -->
    <HeroSection />
    <!-- <AboutSection /> -->
    
  </div>
</template>
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