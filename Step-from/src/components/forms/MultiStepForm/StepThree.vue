<template>
  <div
    class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200 border-l-4 border-l-blue-500 rounded-lg bg-gradient-to-br from-white to-blue-50 shadow-sm p-4 sm:p-6 transition-shadow duration-300 hover:shadow-md"
  >
    <h2
      class="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 sm:mb-6"
    >
      {{ t('childSpecsForm.title') }}
    </h2>
    
    <Form @submit="submitForm" :validation-schema="schema" class="flex flex-col gap-4">
      <SelectInput
      data-testid="child-classe"
        name="classe"
        :label="t('childSpecsForm.fields.classe.label')"
        :options="classeOptions"
        :required="true"
        :placeholder="t('childSpecsForm.fields.classe.placeholder')"
      />
      
      <SelectInput
      data-testid="child-serie"
        name="serie"
        :label="t('childSpecsForm.fields.serie.label')"
        :options="serieOptions"
        :required="true"
        :placeholder="t('childSpecsForm.fields.serie.placeholder')"
      />

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button 
        
          type="button" 
          @click="emit('prevStep')"
          class="px-4 py-2 text-sm min-w-[100px] bg-gray-500 hover:bg-gray-600 text-white border-none rounded font-semibold cursor-pointer transition-colors duration-200"
        >
          {{ t('childSpecsForm.buttons.previous') }}
        </button>
        <button 
        data-testid="submit-button"
          type="submit"
          class="px-4 py-2 text-sm min-w-[100px] bg-blue-600 hover:bg-blue-700 text-white border-none rounded font-semibold cursor-pointer transition-colors duration-200"
        >
          {{ t('childSpecsForm.buttons.submit') }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import SelectInput from '../SelectInput.vue'
import { computed } from 'vue'
const { t } = useI18n()

const emit = defineEmits(['submitForm', 'prevStep'])

// Options pour le select des classes
const classeOptions = computed(() => [
  { value: '6ème', label: t('childSpecsForm.options.classe.6eme') },
  { value: '5ème', label: t('childSpecsForm.options.classe.5eme') },
  { value: '4ème', label: t('childSpecsForm.options.classe.4eme') },
  { value: '3ème', label: t('childSpecsForm.options.classe.3eme') },
  { value: '2e', label: t('childSpecsForm.options.classe.2e') },
  { value: '1ème', label: t('childSpecsForm.options.classe.1ere') },
  { value: 'Tle', label: t('childSpecsForm.options.classe.tle') }
])

// Options pour le select des séries
const serieOptions = computed(() => [
  { value: 'A', label: t('childSpecsForm.options.serie.a') },
  { value: 'B', label: t('childSpecsForm.options.serie.b') },
  { value: 'C', label: t('childSpecsForm.options.serie.c') },
  { value: 'D', label: t('childSpecsForm.options.serie.d') },
  { value: 'S', label: t('childSpecsForm.options.serie.s') },
  { value: 'IH', label: t('childSpecsForm.options.serie.ih') }
])

// Schéma de validation
const schema = yup.object({
  classe: yup.string()
    .required('La classe est requise')
    .notOneOf([''], 'Sélectionnez une classe'),
  serie: yup.string()
    .required('La série est requise')
    .notOneOf([''], 'Sélectionnez une série'),
})

// Methods
const submitForm = (values: any) => {
  emit('submitForm', values)
}
</script>