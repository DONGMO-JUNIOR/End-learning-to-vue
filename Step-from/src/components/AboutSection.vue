<template>
  <section class="border-2 border-indigo-200 bg-indigo-50 m-[80px] rounded-xl  p-6 w-full max-w-4xl mx-auto shadow-sm  my-20 py-20">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">
          {{ title }}
        </h2>
        <p class="text-lg text-gray-600 mx-auto leading-relaxed">
          {{ description }}
        </p>
        
        <!-- Optionnel: Statistiques ou points forts -->
        <div v-if="showStats" class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="stat in stats" 
            :key="stat.id"
            class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-indigo-100"
          >
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-gray-600">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Types
interface Stat {
  id: number
  value: string
  label: string
}

// Props
interface Props {
  title?: string
  description?: string
  showStats?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'About us',
  description: 'Nous sommes dédiés à créer un environnement d\'apprentissage créatif et stimulant pour les enfants, où ils peuvent explorer, jouer et grandir dans un monde adapté à leurs besoins.',
  showStats: false
})

// Stats data (si nécessaire)
const stats = ref<Stat[]>([
  {
    id: 1,
    value: '1000+',
    label: 'Enfants heureux'
  },
  {
    id: 2,
    value: '50+',
    label: 'Programmes créatifs'
  },
  {
    id: 3,
    value: '10+',
    label: 'Années d\'expérience'
  }
])
</script>