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
          Réinitialiser votre mot de passe
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Entrez votre adresse email pour recevoir un lien de réinitialisation
        </p>
      </div>
      
      <!-- Message de succès -->
      <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Message d'erreur -->
      <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
      
      <!-- Formulaire avec initialValues réactif -->
      <Form 
        @submit="handleForgotPassword" 
        :initial-values="formInitialValues" 
        :key="formKey"
        class="mt-8 space-y-6"
      >
        <div class="space-y-4">
          <Field name="email" :rules="emailRules" v-slot="{ field, errorMessage: fieldError }">
            <TextInput
              id="forgot-email"
              :modelValue="field.value"
              @update:modelValue="field.onChange"
              @blur="field.onBlur"
              label="Adresse email"
              type="email"
              required
              placeholder="Entrez votre email"
              :error="fieldError"
            />
          </Field>
        </div>

        <SubmitButton 
          type="submit" 
          :disabled="isLoading"
          class="w-full justify-center"
        >
          <span v-if="isLoading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Envoi en cours...
          </span>
          <span v-else>
            Envoyer le lien de réinitialisation
          </span>
        </SubmitButton>
      </Form>

      <div class="text-center mt-6">
        <div class="text-center mt-6">
          <p class="text-sm text-gray-600 inline-flex items-center">
            Vous vous souvenez de votre mot de passe?
            <button 
              @click="goBack"
              class="m-6 px-2 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors duration-200"
            >
              LogIn
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { Form, Field } from 'vee-validate'
import SubmitButton from '@/components/ui/SubmitButton.vue'
import TextInput from '@/components/ui/TextInput.vue'

const emailRules = yup.string()
  .required('L\'email est obligatoire')
  .email('Format d\'email invalide')

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const savedEmail = ref('')
const formKey = ref(0) 

const formInitialValues = computed(() => ({
  email: savedEmail.value || ''
}))

const loadSavedEmail = () => {
  try {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      savedEmail.value = rememberedEmail
      return
    }

    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      savedEmail.value = userData.email || ''
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
  }
}
onMounted(() => {
  loadSavedEmail()
  formKey.value++
})

const handleForgotPassword = async (values: { email: string }) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    // Sauvegarder l'email pour une utilisation future
    localStorage.setItem('rememberedEmail', values.email)
    savedEmail.value = values.email // Mettre à jour la référence locale
    
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulation d'une réponse réussie
    successMessage.value = `Un lien de réinitialisation a été envoyé à ${values.email}`
    
    // Optionnel : Sauvegarder l'historique des tentatives
    const forgotPasswordHistory = JSON.parse(localStorage.getItem('forgotPasswordHistory') || '[]')
    forgotPasswordHistory.push({
      email: values.email,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('forgotPasswordHistory', JSON.stringify(forgotPasswordHistory))
    
    setTimeout(() => {
      router.push('/SingnIn')
    }, 3000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    errorMessage.value = 'Une erreur s\'est produite. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/SingnIn')
}
</script>