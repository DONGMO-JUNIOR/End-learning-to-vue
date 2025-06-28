<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-900 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-2xl">D</span>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t('forgotPassword.title') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ t('forgotPassword.subtitle') }}
        </p>
      </div>

      <!-- Message de succès -->
      <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <p class="ml-3 text-sm text-green-700">{{ successMessage }}</p>
        </div>
      </div>

      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd" />
          </svg>
          <p class="ml-3 text-sm text-red-700">{{ errorMessage }}</p>
        </div>
      </div>

      <Form
        @submit="handleForgotPassword"
        :validation-schema="schema"
        :initial-values="initialValues"
        class="mt-8 space-y-6"
        ref="formRef"
      >
        <div class="space-y-4">
          <TextInput
            data-testid="contact-email-input"
            name="email"
            type="email"
            :label="t('forgotPassword.emailLabel')"
            :placeholder="t('forgotPassword.emailPlaceholder')"
            :required="true"
          />
        </div>

        <SubmitButton
          data-testid="contact-submit-button"
          type="submit"
          :disabled="isLoading"
          :text="isLoading ? t('forgotPassword.sending') : t('forgotPassword.sendResetLink')"
        >
          <template v-if="isLoading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ t('forgotPassword.sending') }}
          </template>
          <template v-else>
            {{ t('forgotPassword.sendResetLink') }}
          </template>
        </SubmitButton>
      </Form>

      <div class="text-center mt-6">
        <p class="text-sm text-gray-600 inline-flex items-center">
          {{ t('forgotPassword.rememberPassword') }}
          <button
            @click="goBack"
            class="ml-2 px-2 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
            data-testid="back-to-login-button"
          >
            {{ t('forgotPassword.login') }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import SubmitButton from '@/components/forms/SubmitButton.vue'
import TextInput from '@/components/forms/BaseInput.vue'
import type { SubmissionHandler } from 'vee-validate'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const formRef = ref()

// Utiliser reactive pour les valeurs initiales
const initialValues = reactive({
  email: ''
})

const schema = yup.object({
  email: yup
    .string()
    .required(t('forgotPassword.validation.required'))
    .email(t('forgotPassword.validation.invalid'))
})

const loadSavedEmail = async () => {
  try {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      initialValues.email = rememberedEmail
      // Mettre à jour le formulaire après le rendu
      await nextTick()
      if (formRef.value) {
        formRef.value.setFieldValue('email', rememberedEmail)
      }
      return
    }

    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      const userEmail = userData.email || ''
      initialValues.email = userEmail
      await nextTick()
      if (formRef.value) {
        formRef.value.setFieldValue('email', userEmail)
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}

onMounted(() => {
  loadSavedEmail()
})

const handleForgotPassword: SubmissionHandler = async (values) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const email = (values as { email: string }).email

    await new Promise(resolve => setTimeout(resolve, 2000))

    successMessage.value = t('forgotPassword.successMessage', { email })

    // Sauvegarder l'email pour la prochaine fois
    localStorage.setItem('rememberedEmail', email)

    const history = JSON.parse(localStorage.getItem('forgotPasswordHistory') || '[]')
    history.push({ email, timestamp: new Date().toISOString() })
    localStorage.setItem('forgotPasswordHistory', JSON.stringify(history))

    setTimeout(() => {
      router.push('/SingnIn')
    }, 3000)

  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    errorMessage.value = t('forgotPassword.errorMessage')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => router.push('/SingnIn')
</script>