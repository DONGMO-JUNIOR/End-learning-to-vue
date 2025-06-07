<!-- components/StepTwo.vue -->
<template>
    <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm p-4 sm:p-6 transition-shadow duration-300 hover:shadow-md">
      <h2 class="mt-0 text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 sm:mb-6">
        Étape 2 : Informations du Parent
      </h2>
      
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">

        <TextInput
          id="nom"
          label="Nom Parent"
          placeholder="Entrez le nom du parent"
        modelValue="form.nom"
          :required="true"
        />

        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="exemple@email.com"
          v-model="form.email"
          :required="true"
        />
        
        <PhoneInput
          id="telephone"
          label="Téléphone"
          placeholder="Ex: +237 6XX XXX XXX"
          v-model="form.telephone"
          :required="true"
        />
        
        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <SubmitButton
            text="⬅️ Précédent"
            type="button"
            @click="emit('prevStep')"
            class="w-full sm:w-auto min-w-[120px] bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
          />
          <SubmitButton
            text="Suivant ➡️"
            type="submit"
            class="w-full sm:w-auto min-w-[120px]"
          />
        </div>
      </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ParentInfo } from '../types/Form';
import TextInput from '../components/ui/TextInput.vue'
import PhoneInput from '../components/ui/PhoneInput.vue';
import SubmitButton from '../components/ui/SubmitButton.vue';

// Props
interface Props {
  initialData?: ParentInfo;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ email: '', telephone: '' })
});

// Emits
const emit = defineEmits<{
  nextStep: [data: ParentInfo];
  prevStep: [];
}>();

// Reactive form data
const form = reactive<ParentInfo>({
  email: props.initialData.email,
  telephone: props.initialData.telephone
});

// Methods
const submitForm = (): void => {
  emit('nextStep', { ...form });
};
</script>