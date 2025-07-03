<template>
  <div 
    data-testid="login-container"
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="flex justify-center">
          <div 
            data-testid="login-logo"
            class="w-16 h-16 bg-gradient-to-r from-blue-900 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-2xl">D</span>
          </div>
        </div>
        <h2 
          data-testid="login-title"
          class="mt-6 text-center text-3xl font-extrabold text-gray-900"
        >
          {{ t('login.title') }}
        </h2>
        <p 
          data-testid="login-signup-text"
          class="mt-2 text-center text-sm text-gray-600"
        >
          {{ t('login.or') }}
           <RouterLink
          data-testid="signup-link"
          to="/signup" 
            class="font-medium text-blue-600 hover:text-blue-500 ml-1 focus:outline-none"

          >
            {{ t('login.signup') }}
          </RouterLink>
        </p>
      </div>
      
      <div 
        v-if="errorMessage" 
        data-testid="error-message"
        class="bg-red-50 border-l-4 border-red-500 p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg 
              data-testid="error-icon"
              class="h-5 w-5 text-red-500" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293
                   1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0
                   001.414-1.414L11.414 10l1.293-1.293a1 1 0
                   00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p 
              data-testid="error-text"
              class="text-sm text-red-700"
            >
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>
      
      <Form 
        data-testid="login-form"
        @submit="handleSignIn" 
        :validation-schema="schema" 
        v-slot="{  errors }" 
        class="mt-8 space-y-6"
      >
        <div class="space-y-4">
          <TextInput
            data-testid="login-email-input"
            name="email"
            type="email"
            :label="t('login.fields.email.label')"
            :placeholder="t('login.fields.email.placeholder')"
            :required="true"
          />
          
          <PasswordInput
            data-testid="login-password-input"
            name="password"
            type="password"
            :label="t('login.fields.password.label')"
            :placeholder="t('login.fields.password.placeholder')"
            :required="true"
          />
           
        </div>

        <div class="flex items-center justify-between">
          <CheckboxInput
            data-testid="login-remember-checkbox"
            name="rememberMe"
            :label="t('login.fields.remember.label')"
          />

          <div class="text-sm">
           <RouterLink

            to="/forgot-password"
            
            class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              {{ t('login.forgot') }}
            </RouterLink>
          </div>
        </div>

        <button
          data-testid="login-submit-button"
          type="submit"
          :disabled=" isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">
            <svg 
              data-testid="loading-spinner"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" 
              xmlns="http://www.w3.org/2000/svg"
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373..."
              ></path>
            </svg>
            {{ t('login.loading') }}
          </span>
          <span v-else>
            {{ t('login.submit') }}
          </span>
        </button>

        <div 
          v-if="debug" 
          data-testid="debug-panel"
          class="mt-6 p-4 bg-gray-100 rounded text-sm"
        >
          <h4 class="font-bold mb-2">{{ t('login.validation.title') }}</h4>
          <p data-testid="debug-valid-status">{{ t('login.validation.valid') }} </p>
          <p data-testid="debug-errors">{{ t('login.validation.errors') }} {{ JSON.stringify(errors) }}</p>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import CheckboxInput from '@/components/forms/CheckboxInput.vue'
import TextInput from '@/components/forms/BaseInput.vue'
import PasswordInput from './forms/PasswordInput.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const debug = ref(false)

const schema = yup.object({
  email: yup
    .string()
    .required(t('login.fields.email.errors.required'))
    .email(t('login.fields.email.errors.invalid')),
  password: yup
    .string()
    .required(t('login.fields.password.errors.required'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
      t('login.fields.password.errors.pattern')
    ),
  rememberMe: yup.boolean().default(false)
})

const getRegisteredUsers = () => {
  try {
    const users = localStorage.getItem('registeredUsers')
    return users ? JSON.parse(users) : []
  } catch {
    return []
  }
}

const authenticateUser = (email: string, password: string) =>
  getRegisteredUsers().find((u: any) => u.email === email && u.password === password)

const handleSignIn = async (values: any, { resetForm }: any) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    const users = getRegisteredUsers()
    const exists = users.some((u: any) => u.email === values.email)
    
    if (!exists) {
      errorMessage.value = t('login.errors.notRegistered')
      isLoading.value = false
      return
    }
    
    const user = authenticateUser(values.email, values.password)
    if (!user) {
      errorMessage.value = t('login.errors.wrongPassword')
      isLoading.value = false
      return
    }
    
    await new Promise(r => setTimeout(r, 1000))
    
    if (values.rememberMe) {
      // Logique pour mémoriser l'utilisateur (cookies, localStorage étendu, etc.)
      console.log('Remember me activated')
    }
    
    localStorage.setItem('user', JSON.stringify({ ...user, isLoggedIn: true }))
    router.push('/welcome')
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = t('login.error')
  } finally {
    isLoading.value = false
  }
}
</script>