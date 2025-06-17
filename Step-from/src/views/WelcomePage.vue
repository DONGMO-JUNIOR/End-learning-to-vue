<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">

    <div 
      v-for="(star, index) in stars" 
      :key="index"
      class="absolute bg-white rounded-full animate-twinkle"
      :style="{
        width: star.size + 'px',
        height: star.size + 'px',
        top: star.top + '%',
        left: star.left + '%',
        animationDelay: star.delay + 's'
      }"
    ></div>

    
    <div class="absolute w-0.5 h-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent top-1/5 right-1/6 rotate-45 animate-meteor"></div>

    <div 
      v-for="(cloud, index) in clouds" 
      :key="'cloud-' + index"
      class="absolute rounded-[100px] opacity-60 animate-float"
      :class="'cloud-' + (index + 1)"
      :style="{
        animationDuration: cloud.duration + 's',
        animationDelay: cloud.delay + 's'
      }"
    ></div>

    <div class="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white to-gray-100 rounded-full top-1/4 left-1/2 -translate-x-1/2 z-10 shadow-[0_0_50px_rgba(255,255,255,0.3)] animate-moon-glow"></div>

    <div class="absolute bottom-0 left-0 right-0 h-3/5 z-10">
      <div class="absolute bottom-0 w-[120%] h-full bg-gradient-to-t from-purple-900 to-purple-700 clip-path-mountain1"></div>
      <div class="absolute bottom-0 w-[120%] h-full bg-gradient-to-t from-blue-900 to-blue-600 opacity-80 clip-path-mountain2"></div>
      <div class="absolute bottom-0 w-[120%] h-full bg-gradient-to-t from-blue-800 to-blue-500 opacity-60 clip-path-mountain3"></div>
    </div>
    <div class="relative flex flex-col items-center justify-center min-h-screen text-center px-5 z-20">
      <div class="max-w-2xl mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent bg-size-200 animate-gradient-text">
          BIENVENUE !
        </h1>
        <div class="text-2xl sm:text-3xl text-cyan-300 mb-4 text-shadow-cyan">
          Bonjour, {{ displayName || 'Cher Utilisateur' }} !
        </div>
        <p class="text-lg sm:text-xl text-white/80 leading-relaxed">
          Nous sommes ravis de vous accueillir dans votre espace personnel. 
          Découvrez toutes les fonctionnalités qui vous attendent et 
          commencez votre parcours avec nous dès maintenant.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <button 
          @click="navigateToDashboard"
          class="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/40"
        >
          Accéder au Tableau de Bord
        </button>
        <button 
          @click="navigateToServices"
          class="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full transition-all hover:-translate-y-1 hover:bg-white/10"
        >
          Explorer les Services
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Données utilisateur
const parentName = ref('');
const childName = ref('');
const userEmail = ref('');
const userDataFound = ref(false);
const debugUserData = ref(null);
const showDebug = ref(false);

// Configuration des étoiles
const stars = ref([]);
const clouds = ref([
  { duration: 20, delay: 0 },
  { duration: 25, delay: -10 }
]);
// Nom à afficher (priorité au nom de l'enfant)
const displayName = computed(() => {
  if (childName.value) {
    return childName.value;
  }
  if (parentName.value) {
    return parentName.value;
  }
  return 'Cher Utilisateur';
});

// Récupérer le prénom de l'utilisateur
const fetchUserData = () => {
 try {
    // 1. Depuis le localStorage
    const userData = localStorage.getItem('user');
    console.log('Raw userData from localStorage:', userData);
    
    if (userData) {
      const user = JSON.parse(userData);
      console.log('Parsed user object:', user);
      
      debugUserData.value = user;
      userDataFound.value = true;
      
      // Récupérer le nom du parent
      parentName.value = user.nom || user.name || user.firstName || '';
      console.log('Parent name found:', parentName.value);
      
      // Récupérer le nom de l'enfant (priorité)
      if (user.enfant && user.enfant.nom) {
        childName.value = user.enfant.nom;
        console.log('Child name found:', childName.value);
      } else if (user.enfant && user.enfant.name) {
        childName.value = user.enfant.name;
        console.log('Child name found (alt):', childName.value);
      }
      
      // Email pour debug
      userEmail.value = user.email || '';
      
      return;
    }
  
   // 2. Depuis les paramètres URL (pour les démos)
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('name') || urlParams.get('prenom') || urlParams.get('enfant');
    if (nameFromUrl) {
      childName.value = nameFromUrl;
      console.log('Name from URL:', nameFromUrl);
      return;
    }
    
    console.log('No user data found, using default');
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }
};
// Générer des étoiles aléatoires
const generateStars = () => {
  const starCount = 20;
  const newStars = [];
  
  for (let i = 0; i < starCount; i++) {
    newStars.push({
      size: Math.random() * 3 + 1,
      top: Math.random() * 60,
      left: Math.random() * 100,
      delay: Math.random() * 3
    });
  }
  
  stars.value = newStars;
};

// Navigation
const navigateToDashboard = () => {
  router.push('/not_found_page');
};

const navigateToServices = () => {
  router.push('/not_found_page');
};

// Initialisation
onMounted(() => {
  fetchUserData();
  generateStars();
});
</script>

<style>
/* Animations personnalisées */
@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.2); }
}

@keyframes meteor {
  0% { transform: rotate(45deg) translateX(-100px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: rotate(45deg) translateX(200px); opacity: 0; }
}

@keyframes float {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(100vw + 200px)); }
}

@keyframes moon-glow {
  0% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.3); }
  100% { box-shadow: 0 0 80px rgba(255, 255, 255, 0.5); }
}

@keyframes gradient-text {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Formes des montagnes */
.clip-path-mountain1 {
  clip-path: polygon(0% 100%, 20% 40%, 40% 60%, 60% 20%, 80% 50%, 100% 30%, 100% 100%);
}

.clip-path-mountain2 {
  clip-path: polygon(0% 100%, 15% 50%, 35% 30%, 55% 45%, 75% 25%, 95% 40%, 100% 100%);
}

.clip-path-mountain3 {
  clip-path: polygon(0% 100%, 25% 45%, 45% 25%, 65% 40%, 85% 20%, 100% 35%, 100% 100%);
}

/* Classes d'animation */
.animate-twinkle {
  animation: twinkle 2s infinite alternate;
}

.animate-meteor {
  animation: meteor 3s ease-in-out infinite;
}

.animate-float {
  animation: float linear infinite;
}

.animate-moon-glow {
  animation: moon-glow 4s ease-in-out infinite alternate;
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-text 3s ease infinite;
}

/* Nuages */
.cloud-1 {
  width: 100px;
  height: 40px;
  top: 20%;
  left: -100px;
  background: rgba(255, 255, 255, 0.1);
}

.cloud-1::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  top: -40px;
  left: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
}

.cloud-2 {
  width: 80px;
  height: 30px;
  top: 35%;
  left: -80px;
  background: rgba(255, 255, 255, 0.1);
}

.cloud-2::before {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  top: -30px;
  left: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
}

/* Ombre de texte pour le nom */
.text-shadow-cyan {
  text-shadow: 0 0 20px rgba(0, 245, 255, 0.5);
}
</style>