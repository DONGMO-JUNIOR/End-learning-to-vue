<template>
  <div class="bg-white shadow-xl rounded-2xl p-4 md:p-6 lg:p-8 max-w-sm md:max-w-4xl lg:max-w-6xl mx-auto mt-6 md:mt-8 lg:mt-10">
    <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-center text-blue-700 mb-6 md:mb-8 lg:mb-10">
      Programme Hebdomadaire
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
      <div
        v-for="cours in programme"
        :key="cours.id"
        class="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 lg:p-6 hover:bg-blue-100 hover:shadow-md transition-all duration-300"
      >
        <h3 class="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
          {{ cours.jour }}
        </h3>
        <p class="text-sm md:text-base lg:text-lg text-gray-700 mb-1 md:mb-2">
          <span class="font-medium">{{ cours.matiere }}</span>
        </p>
        <p class="text-sm md:text-base lg:text-lg text-gray-600 mb-2 md:mb-3">
          <span class="italic">{{ cours.professeur }}</span>
        </p>
        <div class="bg-white rounded-md p-2 md:p-3 lg:p-4 border-l-4 border-blue-400">
          <p class="text-xs md:text-sm lg:text-base text-gray-500 font-medium">
            🕒 {{ cours.horaire }}
          </p>
        </div>
      </div>
    </div>
    <div class="hidden md:block mt-8 lg:mt-12">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 lg:p-6 border border-blue-100">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center">
          <div class="bg-white rounded-lg p-3 lg:p-4 shadow-sm">
            <p class="text-lg lg:text-2xl font-bold text-blue-600">{{ programme.length }}</p>
            <p class="text-xs lg:text-sm text-gray-600">Cours total</p>
          </div>
          <div class="bg-white rounded-lg p-3 lg:p-4 shadow-sm">
            <p class="text-lg lg:text-2xl font-bold text-green-600">7</p>
            <p class="text-xs lg:text-sm text-gray-600">Jours/semaine</p>
          </div>
          <div class="bg-white rounded-lg p-3 lg:p-4 shadow-sm lg:block">
            <p class="text-lg lg:text-2xl font-bold text-purple-600">{{ uniqueProfessors }}</p>
            <p class="text-xs lg:text-sm text-gray-600">Professeurs</p>
          </div>
          <div class="bg-white rounded-lg p-3 lg:p-4 shadow-sm lg:block">
            <p class="text-lg lg:text-2xl font-bold text-orange-600">{{ uniqueSubjects }}</p>
            <p class="text-xs lg:text-sm text-gray-600">Matières</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Cours } from '@/types/Cours';

const programme = ref<Cours[]>([
  { id: 1, jour: 'Lundi', matiere: 'Mathématiques', professeur: 'M. DONGMO', horaire: '08h00 - 10h00' },
  { id: 2, jour: 'Mardi', matiere: 'Informatique', professeur: 'Mme Martin', horaire: '09h00 - 11h00' },
  { id: 3, jour: 'Mercredi', matiere: 'Histoire-Géographie', professeur: 'M. Bernard', horaire: '10h00 - 12h00' },
  { id: 4, jour: 'Jeudi', matiere: 'Sciences', professeur: 'Mme Leroy', horaire: '08h30 - 10h30' },
  { id: 5, jour: 'Vendredi', matiere: 'Anglais', professeur: 'Mr Smith', horaire: '09h00 - 11h00' },
  { id: 6, jour: 'Samedi', matiere: 'Anglais', professeur: 'Mr Smith', horaire: '09h00 - 11h00' },
]);

// Computed properties pour les statistiques
const uniqueProfessors = computed(() => {
  return new Set(programme.value.map(cours => cours.professeur)).size;
});

const uniqueSubjects = computed(() => {
  return new Set(programme.value.map(cours => cours.matiere)).size;
});
</script>