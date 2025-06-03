<template>
 <div id="app">
    <header class="app-header">
      <h1>{{ appTitle }}</h1>
      <p class="subtitle">Inscription scolaire en ligne</p>
    </header>

    <main class="main-content">
      <MultiStep />
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 - Système d'inscription</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import MultiStep from '@/components/MultiStep.vue';

const appTitle: string = "Formulaire d'Inscription";
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  flex-shrink: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.8rem 1rem;
  text-align: center;
}

.app-header h1 {
  font-size: 1.5rem;
  margin: 0;
}

.subtitle {
  font-size: 0.9rem;
  margin: 0.3rem 0 0;
}

.main-content {
  flex: 1;
  overflow: hidden;
  padding: 0.5rem;
  background: #f8fafc;
}

.app-footer {
  flex-shrink: 0;
  background-color: #1f2937;
  color: #9ca3af;
  padding: 0.6rem;
  font-size: 0.75rem;
  text-align: center;
}
</style>








<!-- <template>
  <div class="min-h-screen bg-white text-center flex flex-col justify-between">
    Header 
    <header class="flex justify-between items-center p-6 border-b">
      <h1 class="text-2xl font-bold text-blue-800">MaPlateforme</h1>
      <div class="space-x-4">
        <button class="px-4 py-2 border rounded text-gray-800 hover:bg-gray-100">Se connecter</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">S'inscrire</button>
      </div>
    </header>

     Main Content 
    <main class="flex-1 flex flex-col items-center justify-center px-4">
      <h2 class="text-4xl font-bold text-gray-900">
        Améliorez <span class="text-blue-600 underline decoration-wavy">vos compétences</span><br />
        en testant vos connaissances.
      </h2>
      <p class="mt-4 text-lg text-gray-600">À tout moment, à votre rythme.</p>
      <button class="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow">
        Commencer
      </button>
    </main>

     Footer 
    <footer class="text-center text-sm text-gray-400 py-4">
      © 2025 MaPlateforme. Tous droits réservés.
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Ajoute si tu veux un style personnalisé */
</style> -->
