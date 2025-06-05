<template>
  <div class="bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto mt-10">
    <h2 class="text-2xl font-bold text-center text-blue-700 mb-8">Programme Hebdomadaire</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="cours in programme"
        :key="cours.id"
        class="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition"
      >
        <h3 class="text-lg font-semibold text-gray-800">{{ cours.jour }}</h3>
        <p class="text-gray-700">
          {{ cours.matiere }} - <span class="italic">{{ cours.professeur }}</span>
        </p>
        <p class="text-sm text-gray-500">Horaire : {{ cours.horaire }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Cours } from '@/types/Cours';

const programme = ref<Cours[]>([
  { id: 1, jour: 'Lundi', matiere: 'Mathématiques', professeur: 'M. Dupont', horaire: '08h00 - 10h00' },
  { id: 2, jour: 'Mardi', matiere: 'Français', professeur: 'Mme Martin', horaire: '09h00 - 11h00' },
  { id: 3, jour: 'Mercredi', matiere: 'Histoire-Géographie', professeur: 'M. Bernard', horaire: '10h00 - 12h00' },
  { id: 4, jour: 'Jeudi', matiere: 'Sciences', professeur: 'Mme Leroy', horaire: '08h30 - 10h30' },
  { id: 5, jour: 'Vendredi', matiere: 'Anglais', professeur: 'Mr Smith', horaire: '09h00 - 11h00' },
{ id: 6, jour: 'Samedi', matiere: 'Anglais', professeur: 'Mr Smith', horaire: '09h00 - 11h00' },
  { id: 7, jour: 'Dimanche', matiere: 'Sport', professeur: 'Mr BIL', horaire: '09h00 - 11h00' },

  // Vous pouvez ajouter d'autres cours ici
]);
</script>