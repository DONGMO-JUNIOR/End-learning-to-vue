<!-- components/StepTwo.vue -->
<template>
    <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm p-4 sm:p-6 transition-shadow duration-300 hover:shadow-md">
      <h2 class="mt-0 text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 sm:mb-6">
        Étape 2 : Informations du Parent
      </h2>
      
      <Form @submit="submitForm" :validation-schema="schema" class="flex flex-col gap-4">
        
        <!-- Champ Nom Parent  -->
        <Field name="nom" v-slot="{ field, errorMessage }">
          <TextInput
            id="nom"
            label="Nom Parent"
            placeholder="Entrez le nom du parent"
            :model-value="field.value || ''"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
            :required="true"
            :error="errorMessage"
          />
        </Field>

        <!-- Champ Email -->
        <Field name="email" v-slot="{ field, errorMessage }">
          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="exemple@email.com"
            :model-value="field.value || ''"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
            :required="true"
            :error="errorMessage"
          />
        </Field>
         <Field name="password" v-slot="{ field, errorMessage }">
      <TextInput
      id="password"
        label="Mot de passe"
        type="password"
        placeholder="Créez un mot de passe"
       :model-value="field.value || ''"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
            :required="true"
            :error="errorMessage"
      />
         </Field>
        <Field name="telephone" v-slot="{ field, errorMessage }">
          <PhoneInput
            id="telephone"
            label="Téléphone"
            placeholder="6XX XXX XXX"
            :model-value="field.value"
            @update:model-value="
              field.onChange"
            @blur="field.onBlur"
            :required="true"
          />
          <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
        </Field>
        
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
      </Form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import type { ParentInfo } from '../types/Form';
import TextInput from '../components/ui/TextInput.vue'
import PhoneInput from '../components/ui/PhoneInput.vue';
import SubmitButton from '../components/ui/SubmitButton.vue';

// Props
interface Props {
  initialData?: ParentInfo;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ nom: '', email: '', telephone: '', password: '' })
});

// Emits
const emit = defineEmits<{
  nextStep: [data: ParentInfo];
  prevStep: [];
}>();

// Reactive form data
const form = reactive<ParentInfo>({
  nom: props.initialData.nom || '',
  email: props.initialData.email,
  telephone: props.initialData.telephone,
  password: props.initialData.password
});

// Schéma de validation
const schema = yup.object({
  nom: yup.string()
    .trim()
    .required('Le nom du parent est requis')
    .min(2, 'Au moins 2 caractères'),
  
  email: yup.string()
    .trim()
    .required('L\'email est obligatoire')
    .email('Format d\'email invalide'),
  
  telephone: yup.string()
    .required('Le téléphone est obligatoire')
    .trim()
    .test('cameroon-phone', 'Format invalide. Utilisez: 237XXXXXXXXX ou 6XXXXXXXX', (value) => {
  if (!value) return false;
return /^(?:\+?237\s?)?6\d{8}$/.test(value);}),

password: yup
    .string()
    .required('Le mot de passe est requis')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
      'Le mot de passe doit contenir au moins : une minuscule, une majuscule, un chiffre et un caractère spécial (@$!%*?&)'
    )
    
});

// Methods
const submitForm = (values: Record<string, any>) => {
  const parentInfo = values as ParentInfo;
  emit('nextStep', parentInfo);
};
</script>