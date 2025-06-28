<template>
  <div 
    data-testid="contact-form-container"
    class="rounded-lg bg-gray-50 flex flex-col justify-center m-[60px] py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto"
  >
    <h2 
      data-testid="contact-form-title"
      class="text-2xl font-bold mb-6 text-center"
    >
      {{ t('contact.title') }}
    </h2>

    <Form 
      data-testid="contact-form"
      @submit="handleSubmit" 
      :validation-schema="schema" 
      v-slot="{ errors }" 
      class="space-y-4 max-w-md mx-auto"
    >
      <TextInput
        data-testid="contact-name-input"
        name="name"
        type="text"
        :label="t('contact.fields.name.label')"
        :placeholder="t('contact.fields.name.placeholder')"
        :required="true"
        :success-message="t('contact.fields.name.success')"
      />
      <TextInput
        data-testid="contact-email-input"
        name="email"
        type="email"
        :label="t('contact.fields.email.label')"
        :placeholder="t('contact.fields.email.placeholder')"
        :required="true"
        :success-message="t('contact.fields.email.success')"
      />
      <PhoneInput
        data-testid="contact-phone-input"
        name="phone"
        :label="t('contact.fields.phone.label')"
        :placeholder="t('contact.fields.phone.placeholder')"
        :required="true"
        :success-message="t('contact.fields.phone.success')"
      />
      <TextAreaInput
        data-testid="contact-message-input"
        name="message"
        :label="t('contact.fields.message.label')"
        :placeholder="t('contact.fields.message.placeholder')"
        :required="true"
        :rows="4"
        :success-message="t('contact.fields.message.success')"
      />
      
      <SubmitButton
        data-testid="contact-submit-button"
        type="submit"
        :text="t('contact.submit')"
      />
      
      <div 
        v-if="debug" 
        data-testid="contact-debug-panel"
        class="mt-6 p-4 bg-gray-100 rounded text-sm"
      >
        <h4 class="font-bold mb-2">{{ t('contact.validation.title') }}</h4>
        <p data-testid="debug-valid-status">{{ t('contact.validation.valid') }}</p>
        <p data-testid="debug-errors">{{ t('contact.validation.errors') }} {{ JSON.stringify(errors) }}</p>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import TextInput from '@/components/forms/BaseInput.vue'
import PhoneInput from '@/components/forms/PhoneInput.vue'
import TextAreaInput from '@/components/forms/TextAreaInput.vue'
import SubmitButton from '@/components/forms/SubmitButton.vue'

const { t } = useI18n()
const debug = ref(false)
const schema = yup.object({
  name: yup.string()
    .required(t('contact.fields.name.errors.required'))
    .min(2, t('contact.fields.name.errors.min'))
    .max(50, t('contact.fields.name.errors.max')),
    
  email: yup.string()
    .required(t('contact.fields.email.errors.required'))
    .email(t('contact.fields.email.errors.invalid')),
    
  phone: yup.string()
    .required(t('contact.fields.phone.errors.required'))
    .matches(/^(?:\+?237\s?)?6\d{8}$/, t('contact.fields.phone.errors.invalid')),
    
  message: yup.string()
    .required(t('contact.fields.message.errors.required'))
    .min(10, t('contact.fields.message.errors.min'))
    .max(500, t('contact.fields.message.errors.max'))
})

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
