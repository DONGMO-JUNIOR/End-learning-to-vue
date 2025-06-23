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
          {{ t('login.title') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ t('login.or') }}
          <button 
            @click="goToSignUp"
            class="font-medium text-blue-600 hover:text-blue-500 ml-1 focus:outline-none"
          >
            {{ t('login.signup') }}
          </button>
        </p>
      </div>
      
      <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293
                   1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0
                   001.414-1.414L11.414 10l1.293-1.293a1 1 0
                   00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
      
      <Form @submit="handleSignIn" :validation-schema="schema" class="mt-8 space-y-6">
        <div class="space-y-4">
          <Field name="email" v-slot="{ field, errorMessage: fieldError }">
            <TextInput
              id="signin-email"
              :label="t('login.fields.email.label')"
              type="email"
              :model-value="field.value || ''"
              @update:model-value="field.onChange"
              @blur="field.onBlur"
              required
              :placeholder="t('login.fields.email.placeholder')"
              :error="fieldError"
            />
          </Field>
          
          <Field name="password" v-slot="{ field, errorMessage: fieldError }">
            <TextInput
              id="signin-password"
              :label="t('login.fields.password.label')"
              type="password"
              :model-value="field.value || ''"
              @update:model-value="field.onChange"
              @blur="field.onBlur"
              required
              :placeholder="t('login.fields.password.placeholder')"
              :error="fieldError"
            />
          </Field>
        </div>

        <div class="flex items-center justify-between">
          <CheckboxInput
            v-model="rememberMe"
            id="remember-me"
            :label="t('login.fields.remember.label')"
          />

          <div class="text-sm">
            <button 
              type="button"
              @click="goToForgotPassword"
              class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              {{ t('login.forgot') }}
            </button>
          </div>
        </div>

        <SubmitButton type="submit" :disabled="isLoading" class="w-full justify-center">
          <span v-if="isLoading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
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
        </SubmitButton>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import SubmitButton from '@/components/ui/SubmitButton.vue'
import TextInput from '@/components/ui/TextInput.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

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
    )
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

const handleSignIn = async (values: any) => {
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
  localStorage.setItem('user', JSON.stringify({ ...user, isLoggedIn: true }))
  router.push('/welcome')
}

const goToSignUp = () => router.push('/signup')
const goToForgotPassword = () => router.push('/forgot-password')
</script>
