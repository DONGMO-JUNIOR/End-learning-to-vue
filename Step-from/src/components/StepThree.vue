<template>
  <div class="w-full max-w-md sm:max-w-lg border border-gray-300 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
    <h2 class="mt-0 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
      Étape 3 : Spécifications de l'enfant
    </h2>
    
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <!-- Composant Select pour la classe -->
      <SelectInput
        id="classe"
        label="Classe"
        v-model="form.classe"
        :options="classeOptions"
        :required="true"
      />
      
      <!-- Composant Select pour la série -->
      <SelectInput
        id="serie"
        label="Série"
        v-model="form.serie"
        :options="serieOptions"
        :required="true"
      />

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button 
          type="button" 
          @click="emit('prevStep')"
          class="px-4 py-2 text-sm min-w-[100px] bg-gray-500 hover:bg-gray-600 text-white border-none rounded font-semibold cursor-pointer transition-colors duration-200"
        >
          ⬅️ Précédent
        </button>
        <button 
          type="submit"
          class="px-4 py-2 text-sm min-w-[100px] bg-blue-600 hover:bg-blue-700 text-white border-none rounded font-semibold cursor-pointer transition-colors duration-200"
        >
          Soumettre
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import SelectInput from '@/components/ui/SelectInput.vue'; 
import type { ChildSpecifications } from '../types/Form';

// Interface pour les options du Select
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

// Props
interface Props {
  initialData?: ChildSpecifications;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ classe: '', serie: '' })
});

// Emits
const emit = defineEmits<{
  submitForm: [data: ChildSpecifications];
  prevStep: [];
}>();

// Options pour le select des classes
const classeOptions: Option[] = [
  { value: '', label: 'Sélectionnez une classe' },
  { value: '6ème', label: '6ème' },
  { value: '5ème', label: '5ème' },
  { value: '4ème', label: '4ème' },
  { value: '3ème', label: '3ème' }
];

// Options pour le select des séries
const serieOptions: Option[] = [
  { value: '', label: 'Sélectionnez une série' },
  { value: 'A', label: 'Série A' },
  { value: 'B', label: 'Série B' },
  { value: 'C', label: 'Série C' },
  { value: 'D', label: 'Série D' }
];

// Reactive form data
const form = reactive<ChildSpecifications>({
  classe: props.initialData.classe,
  serie: props.initialData.serie
});

// Methods
const submitForm = (): void => {
  emit('submitForm', { ...form });
};
</script>