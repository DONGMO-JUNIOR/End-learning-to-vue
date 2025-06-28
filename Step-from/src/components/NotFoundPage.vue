<template>
  <div 
    data-testid="not-found-page"
    class="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-700 to-pink-900 flex items-center justify-center relative overflow-hidden"
  >
    <!-- Étoiles animées -->
    <div 
      v-for="(star, index) in stars" 
      :key="index"
      data-testid="star"
      class="absolute bg-white rounded-full animate-pulse"
      :style="{
        width: star.size + 'px',
        height: star.size + 'px',
        top: star.top + '%',
        left: star.left + '%',
        animationDelay: star.delay + 's'
      }"
    ></div>

    <div class="text-center px-6 z-10">
      <div class="relative mb-8">
        <h1 
          data-testid="error-code"
          class="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"
        >
          404
        </h1>
      </div>

      <h2 
        data-testid="error-title"
        class="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        Oups ! Page non trouvée
      </h2>
      
      <p 
        data-testid="error-message"
        class="text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto"
      >
        La page que vous recherchez semble s'être perdue dans l'espace. 
        Ne vous inquiétez pas, nous allons vous ramener à la maison !
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          data-testid="home-button"
          @click="goHome"
          class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
        >
          <i class="fas fa-home mr-2"></i>
          Retour à l'accueil
        </button>
        
        <button 
          data-testid="back-button"
          @click="goBack"
          class="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          Page précédente
        </button>
      </div>

      <!-- Liens utiles -->
      <div class="mt-12">
        <p 
          data-testid="quick-links-title"
          class="text-gray-400 mb-4"
        >
          Ou explorez ces sections :
        </p>
        <div 
          data-testid="quick-links-container"
          class="flex flex-wrap gap-3 justify-center"
        >
          <router-link 
            v-for="link in quickLinks" 
            :key="link.name"
            :to="link.path"
            :data-testid="`quick-link-${link.name.toLowerCase()}`"
            class="px-4 py-2 text-sm text-cyan-300 border border-cyan-300/30 rounded-full transition-all duration-300 hover:bg-cyan-300/10 hover:border-cyan-300"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </div>

    <div 
      data-testid="rocket-emoji"
      class="absolute bottom-10 right-10 opacity-20 animate-bounce"
    >
      <div class="text-6xl">🚀</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stars = ref<Array<{size: number, top: number, left: number, delay: number}>>([])

const quickLinks = ref([
  { name: 'À propos', path: '/about' },
  { name: 'Programme', path: '/programme' },
  { name: 'Contact', path: '/contact' }
])

const generateStars = () => {
  const starCount = 30
  const newStars = []
  
  for (let i = 0; i < starCount; i++) {
    newStars.push({
      size: Math.random() * 4 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3
    })
  }
  
  stars.value = newStars
}

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

onMounted(() => {
  generateStars()
  
  document.title = 'Page non trouvée - NIOR'
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>