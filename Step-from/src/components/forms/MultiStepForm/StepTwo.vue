<!-- components/StepTwo.vue -->
<template>
    <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm p-4 sm:p-6 transition-shadow duration-300 hover:shadow-md">
      <h2 class="mt-0 text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 sm:mb-6">
        {{ t('parentForm.title') }}
      </h2>
      
      <Form @submit="submitForm" :validation-schema="schema" class="flex flex-col gap-4">
        
        <!-- Champ Nom Parent  -->
        <TextInput
        data-testid="parent-nom"
          name="nom"
          :label="t('parentForm.fields.nom.label')"
          :placeholder="t('parentForm.fields.nom.placeholder')"
          :required="true"
          :value="props.initialData.nom"
        />

        <!-- Champ Email -->
        <TextInput
        data-testid="parent-email"
          name="email"
          :label="t('parentForm.fields.email.label')"
          type="email"
          :placeholder="t('parentForm.fields.email.placeholder')"
          :required="true"
          :value="props.initialData.email"
        />

        <!-- Champ Mot de passe -->
        <TextInput
        data-testid="parent-password"
          name="password"
          :label="t('parentForm.fields.password.label')"
          type="password"
          :placeholder="t('parentForm.fields.password.placeholder')"
          :required="true"
          :value="props.initialData.password"
        />

        <!-- Champ Téléphone -->
        <PhoneInput
        data-testid="parent-telephone"
          name="telephone"
          :label="t('parentForm.fields.telephone.label')"
          :placeholder="t('parentForm.fields.telephone.placeholder')"
          :required="true"
          :value="props.initialData.telephone"
        />
        
        <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <SubmitButton
            :text="t('parentForm.buttons.previous')"
            type="button"
            @click="emit('prevStep')"
            class="w-full sm:w-auto min-w-[120px] bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
          />
          <SubmitButton
          data-testid="next-button"
            :text="t('parentForm.buttons.next')"
            type="submit"
            class="w-full sm:w-auto min-w-[120px]"
          />
        </div>
      </Form>
    </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import type { ParentInfo } from '@/types/Form';
import TextInput from '../BaseInput.vue'
import PhoneInput from '../PhoneInput.vue';
import SubmitButton from '../SubmitButton.vue';

const { t } = useI18n()

// Props
const props = defineProps({
  initialData: {
    type: Object as () => ParentInfo,
    default: () => ({ nom: '', email: '', telephone: '', password: '' })
  }
});

// Emits
const emit = defineEmits<{
  nextStep: [data: ParentInfo];
  prevStep: [];
}>();


const schema = yup.object({
  nom: yup.string()
    .trim()
    .required(t('parentForm.fields.nom.errors.required'))
    .min(2, t('parentForm.fields.nom.errors.min')),
  
  email: yup.string()
    .trim()
    .required(t('parentForm.fields.email.errors.required'))
    .email(t('parentForm.fields.email.errors.invalid')),
  
  telephone: yup.string()
    .required(t('parentForm.fields.telephone.errors.required'))
    .trim()
    .test('cameroon-phone', t('parentForm.fields.telephone.errors.invalid'), (value) => {
      if (!value) return false;
      return /^(?:\+?237\s?)?6\d{8}$/.test(value);
    }),

  password: yup
    .string()
    .required(t('parentForm.fields.password.errors.required'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
      t('parentForm.fields.password.errors.pattern')
    )
});

// Methods
const submitForm = (values: Record<string, any>) => {
  const parentInfo = values as ParentInfo;
  emit('nextStep', parentInfo);
};
</script>