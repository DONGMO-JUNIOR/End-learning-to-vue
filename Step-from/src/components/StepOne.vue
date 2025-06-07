<!-- components/StepOne.vue -->
<template>
    <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm p-4 sm:p-6 transition-shadow duration-300 hover:shadow-md">
      <h2 class=" text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 sm:mb-6">
        Étape 1 : Informations de l'enfant
      </h2>
      
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <TextInput
          id="nom"
          label="Nom"
          placeholder="Entrez le nom de l'enfant"
          v-model="form.nom"
          :required="true"
        />
        
        <TextInput
          id="prenom"
          label="Prénom"
          placeholder="Entrez le prénom de l'enfant"
          v-model="form.prenom"
          :required="true"
        />
        
        <div class="mt-4 sm:mt-6">
          <SubmitButton
            text="Suivant ➡️"
            type="submit"
            class="w-full sm:w-auto sm:mx-auto sm:block"
          />
        </div>
      </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ChildInfo } from '../types/Form';
import TextInput from '../components/ui/TextInput.vue';
import SubmitButton from '../components/ui/SubmitButton.vue';

// Props
interface Props {
  initialData?: ChildInfo;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ nom: '', prenom: '' })
});

// Emits
const emit = defineEmits<{
  nextStep: [data: ChildInfo];
}>();

// Reactive form data
const form = reactive<ChildInfo>({
  nom: props.initialData.nom,
  prenom: props.initialData.prenom
});

// Methods
const submitForm = (): void => {
  emit('nextStep', { ...form });
};
</script>
