<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSelector from '@/components/LanguageSelector.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const navigationItems = ref([
  { name: 'Home', path: '/', current: false },
  { name: 'About Us', path: '/about', current: false },
  { name: 'Program', path: '/programme', current: false },
  { name: 'Contact Us', path: '/contact', current: false },

])

// Fonction pour naviguer vers une page
const navigateTo = (path: string): void => {
  router.push(path)
}

// Fonction pour mettre à jour l'élément actif basé sur la route actuelle
const updateActiveItem = () => {
  navigationItems.value.forEach(item => {
    item.current = item.path === route.path
  })
}

// Mettre à jour l'élément actif au montage du composant
updateActiveItem()

// Surveiller les changements de route pour mettre à jour l'élément actif
watch(() => route.path, () => {
  updateActiveItem()
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
    <!-- Logo -->
    <div class="flex items-center">
      <div class="w-12 h-12 bg-gradient-to-r from-blue-900 to-purple-600 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-xl">D</span>
      </div>
      <span class="ml-2 text-2xl font-bold text-gray-800">NIOR</span>
    </div>
    
    <!-- Navigation Links -->
    <div class="hidden md:flex space-x-8">
      <a 
        v-for="item in navigationItems" 
        :key="item.name"
        @click="navigateTo(item.path)"
        :class="{
          'text-blue-600 font-semibold border-b-2 border-blue-600': item.current,
          'text-gray-600 hover:text-blue-500': !item.current
        }"
        class="cursor-pointer transition-colors duration-200 px-3 py-2"
      >
        {{t(`navigation.${item.name}`) }}
      </a>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex items-center space-x-4">
      <!-- Sélecteur de langue -->
      <LanguageSelector />
      
      <!-- Boutons d'action -->
      <router-link 
        to="/SingnIn" 
        class="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors duration-200"
      >
        {{ t('home.logOut.logIn') }}
      </router-link>
      
      <router-link 
        to="/signup" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
      >
        {{ t('home.logOut.register') }}
      </router-link>
    </div>
  </nav>
</template>
