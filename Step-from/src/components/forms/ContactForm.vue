<template>
  <div class="rounded-lg bg-gray-50 flex flex-col justify-center m-[60px] py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">{{ t('contact.title') }}</h2>

    <Form @submit="handleSubmit" v-slot="{ errors, meta }" class="space-y-4 max-w-md mx-auto">
      <!-- Champ Nom -->
      <Field name="name" :rules="nameRules" v-slot="{ field, errorMessage }">
        <TextInput
          id="name"
          :modelValue="field.value || ''"
          @update:modelValue="field.onChange"
          @blur="field.onBlur"
          :label="t('contact.fields.name.label')"
          type="text"
          :placeholder="t('contact.fields.name.placeholder')"
          :required="true"
          :error="errorMessage"
        />
      </Field>

      <!-- Champ Email -->
      <Field name="email" :rules="emailRules" v-slot="{ field, errorMessage }">
        <TextInput
          id="email"
          :modelValue="field.value || ''"
          @update:modelValue="field.onChange"
          @blur="field.onBlur"
          :label="t('contact.fields.email.label')"
          type="email"
          :placeholder="t('contact.fields.email.placeholder')"
          :required="true"
          :error="errorMessage"
        />
      </Field>

      <!-- Champ Téléphone -->
      <Field name="phone" :rules="phoneRules" v-slot="{ field, errorMessage }">
        <PhoneInput
          id="phone"
          :modelValue="phoneDisplayValue"
          @update:modelValue="(val) => {
            const result = handlePhoneInput(val)
            field.onChange(result)
          }"
          @blur="field.onBlur"
          :label="t('contact.fields.phone.label')"
          :placeholder="t('contact.fields.phone.placeholder')"
          :required="true"
        />
        <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
      </Field>

      <!-- Champ Message -->
      <Field name="message" :rules="messageRules" v-slot="{ field, errorMessage }">
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
            {{ t('contact.fields.message.label') }} <span class="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            :value="field.value || ''"
            @input="(e) => field.onChange(e)"
            @blur="field.onBlur"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            :class="{ 'border-red-300': errorMessage }"
            :placeholder="t('contact.fields.message.placeholder')"
          ></textarea>
          <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
        </div>
      </Field>

      <!-- Bouton de soumission -->
      <div>
        <button
          type="submit"
          :disabled="!meta.valid"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {{ t('contact.submit') }}
        </button>
      </div>

      <!-- Debug Info (optionnel) -->
      <div v-if="debug" class="mt-6 p-4 bg-gray-100 rounded text-sm">
        <h4 class="font-bold mb-2">{{ t('contact.validation.title') }}</h4>
        <p>{{ t('contact.validation.valid') }} {{ meta.valid ? '✅' : '❌' }}</p>
        <p>{{ t('contact.validation.errors') }} {{ errors }}</p>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import TextInput from '@/components/ui/TextInput.vue'
import PhoneInput from '@/components/ui/PhoneInput.vue'

const { t } = useI18n()
const router = useRouter()
const debug = ref(false)
const phoneDisplayValue = ref('')

const handlePhoneInput = (value: string) => {
  const cleaned = value.replace(/\D/g, '')
  const fullNumber = cleaned.startsWith('237') ? cleaned : `237${cleaned}`

  if (fullNumber.length > 3) {
    const countryCode = fullNumber.substring(0, 3)
    const rest = fullNumber.substring(3)
    phoneDisplayValue.value = `+(${countryCode}) ${rest.substring(0, 3)} ${rest.substring(3, 6)} ${rest.substring(6)}`
  } else {
    phoneDisplayValue.value = value
  }

  return fullNumber
}

const nameRules = yup.string()
  .required(t('contact.fields.name.errors.required'))
  .min(2, t('contact.fields.name.errors.min'))
  .max(50, t('contact.fields.name.errors.max'))

const emailRules = yup.string()
  .required(t('contact.fields.email.errors.required'))
  .email(t('contact.fields.email.errors.invalid'))

const phoneRules = yup.string()
  .required(t('contact.fields.phone.errors.required'))
  .matches(/^(?:\+?237\s?)?6\d{8}$/, t('contact.fields.phone.errors.invalid'))

const messageRules = yup.string()
  .required(t('contact.fields.message.errors.required'))
  .min(10, t('contact.fields.message.errors.min'))
  .max(500, t('contact.fields.message.errors.max'))

const handleSubmit = async (values: any, { resetForm }: any) => {
  try {
    console.log('Form data:', values)
    alert(t('contact.success'))
    resetForm()
  } catch (error) {
    console.error('Error:', error)
    alert(t('contact.error'))
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
