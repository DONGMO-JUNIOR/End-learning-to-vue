<template>
  <div class="w-full max-w-md sm:max-w-lg border border-gray-300 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
    <h2 class="mt-0 text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
      Étape 3 : Spécifications de l'enfant
    </h2>
    
    <Form @submit="submitForm" :validation-schema="schema" class="flex flex-col gap-4" v-slot="{ errors }">
      <!-- Afficher les erreurs globales -->
      <div v-if="Object.keys(errors).length" class="text-red-500 text-sm">
        Veuillez corriger les erreurs dans le formulaire
      </div>
      
      <Field name="classe" v-slot="{ field, errorMessage, meta }">
        <SelectInput
          id="classe"
          label="Classe"
          :model-value="field.value"
          @update:model-value="field.onChange"
          :options="classeOptions"
          :required="true"
          :error="errorMessage"
        />
        <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
      </Field>
      
      <Field name="serie" v-slot="{ field, errorMessage, meta }">
        <SelectInput
          id="serie"
          label="Série"
          :model-value="field.value"
          @update:model-value="field.onChange"
          :options="serieOptions"
          :required="true"
          :error="errorMessage"
        />
        <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
      </Field>

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
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import type { GenericObject } from 'vee-validate';
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
  { value: '3ème', label: '3ème' },
  { value: '2e', label: '2e' },
  { value: '1ème', label: '1ème' },
  { value: 'Tle', label: 'Tle' }
];

// Options pour le select des séries
const serieOptions: Option[] = [
  { value: '', label: 'Sélectionnez une série' },
  { value: 'A', label: 'Série A' },
  { value: 'B', label: 'Série B' },
  { value: 'C', label: 'Série C' },
  { value: 'D', label: 'Série D' },
  { value: 'S', label: 'Série S' },
  { value: 'IH', label: 'Série IH' }
];

const schema = yup.object({
  classe: yup.string()
  .required('La classe est requise')
  .notOneOf([''], 'Sélectionnez une classe'),
  serie: yup.string()
  .required('La série est requise')
  .notOneOf([''], 'Sélectionnez une série'),
});

// Methods - Correction du type pour SubmissionHandler
const submitForm = (values: GenericObject) => {
  // Type assertion pour s'assurer que values correspond à ChildSpecifications
  const formData = values as ChildSpecifications;
  emit('submitForm', formData);
};
</script>