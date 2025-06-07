<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import SubmitButton from '@/components/ui/SubmitButton.vue'
import TextInput from '@/components/ui/TextInput.vue'

const router = useRouter()
const rememberMe = ref(false)

const formData = ref({
  email: '',
  password: ''
})

const handleSignIn = async () => {
  try {
    console.log('Sign in attempt:', { ...formData.value, rememberMe: rememberMe.value })
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const goToSignUp = () => router.push('/signup')
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo et titre (peut aussi devenir un composant) -->
      <div>
        <div class="flex justify-center">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-900 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-2xl">D</span>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connectez-vous à votre compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <button 
            @click="goToSignUp"
            class="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            créez un nouveau compte
          </button>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSignIn">
        <div class="space-y-4">
          <TextInput
            id="signin-email"
            v-model="formData.email"
            label="Adresse email"
            type="email"
            required
            placeholder="Entrez votre email"
          />
          
          <TextInput
          id="signin-password"
            v-model="formData.password"
            label="Mot de passe"
            type="password"
            required
            placeholder="Entrez votre mot de passe"
          />
        </div>

        <div class="flex items-center justify-between">
          <CheckboxInput
            v-model="rememberMe"
            id="remember-me"
            label="Se souvenir de moi"
          />

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              Mot de passe oublié?
            </a>
          </div>
        </div>

        <SubmitButton>
          Se connecter
        </SubmitButton>
      </form>
    </div>
  </div>
</template>