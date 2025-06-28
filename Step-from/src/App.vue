

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <div id="app">
    <NavigationBar />
        <main class="pt-20">
      <router-view />
    </main>
    <footer class="text-center text-sm text-gray-400 py-4">
      © 2025 MaPlateforme. Tous droits réservés.
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}

main {
  padding-top: 5rem; 
}
</style>

