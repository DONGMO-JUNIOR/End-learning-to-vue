<template>
  <div
    class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm p-4 sm:p-6 transition-shadow duration-300 hover:shadow-md"
  >
    <h2
      class="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 sm:mb-6"
    >
      {{ t('childForm.title') }}
    </h2>

    <Form @submit="submitForm" :validation-schema="schema" class="flex flex-col gap-4">
      <TextInput
      data-testid="child-nom"
        name="nom"
        :label="t('childForm.fields.nom.label')"
        :placeholder="t('childForm.fields.nom.placeholder')"
        :required="true"
      />
      <TextInput
      data-testid="child-prenom"
        name="prenom"
        :label="t('childForm.fields.prenom.label')"
        :placeholder="t('childForm.fields.prenom.placeholder')"
        :required="true"
      />

      <div class="mt-4 sm:mt-6">
        <SubmitButton
        data-testid="next-button"
          :text="t('childForm.submit')"
          type="submit"
          class="w-full sm:w-auto sm:mx-auto sm:block"
        />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import type { ChildInfo } from '@/types/Form'
import TextInput from '../BaseInput.vue'
import SubmitButton from '../SubmitButton.vue'

const { t } = useI18n()

const emit = defineEmits<{
  nextStep: [data: ChildInfo];
}>();

const schema = yup.object({
  nom: yup.string()
    .trim()
    .required(t('childForm.fields.nom.errors.required'))
    .min(4, t('childForm.fields.nom.errors.min')),
  prenom: yup.string()
    .trim()
    .required(t('childForm.fields.prenom.errors.required'))
    .min(4, t('childForm.fields.prenom.errors.min'))
});

const submitForm = (values: any) => {
  const childInfo = values as ChildInfo;
  emit('nextStep', childInfo);
};
</script>