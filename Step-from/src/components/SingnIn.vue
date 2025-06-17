

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
          Connectez-vous à votre compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <button 
            @click="goToSignUp"
            class="font-medium text-blue-600 hover:text-blue-500 ml-1 focus:outline-none"
          >
            créez un nouveau compte
          </button>
        </p>
      </div>
      
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
      
      <Form @submit="handleSignIn" :validation-schema="schema" class="mt-8 space-y-6">
        <div class="space-y-4">
          <Field name="email" v-slot="{ field, errorMessage: fieldError }">
            <TextInput
              id="signin-email"
              label="Adresse email"
              type="email"
              :model-value="field.value || ''"
              @update:model-value="field.onChange"
              @blur="field.onBlur"
              required
              placeholder="Entrez votre email"
              :error="fieldError"
            />
          </Field>
          
          <Field name="password" v-slot="{ field, errorMessage: fieldError }">
            <TextInput
              id="signin-password"
              label="Mot de passe"
              type="password"
              :model-value="field.value || ''"
              @update:model-value="field.onChange"
              @blur="field.onBlur"
              required
              placeholder="Entrez votre mot de passe"
              :error="fieldError"
            />
          </Field>
        </div>

        <div class="flex items-center justify-between">
          <CheckboxInput
            v-model="rememberMe"
            id="remember-me"
            label="Se souvenir de moi"
          />

          <div class="text-sm">
            <button 
              type="button"
              @click="goToForgotPassword"
              class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Mot de passe oublié?
            </button>
          </div>
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
            Connexion en cours...
          </span>
          <span v-else>
            Se connecter
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

const router = useRouter()
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const schema = yup.object({
    
  email: yup
    .string()
    .required('L\'email est requis')
    .email('Format d\'email invalide'),
    
password: yup
  .string()
  .required('Le mot de passe est requis')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6}$/,
    'Le mot de passe doit faire exactement 6 caractères et contenir : 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial (@$!%*?&)'
  )
})
// Fonction pour récupérer les utilisateurs enregistrés
const getRegisteredUsers = () => {
  try {
    const users = localStorage.getItem('registeredUsers')
    console.log('Users from localStorage:', users)
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Erreur lors de la lecture du localStorage:', error)
    return []
  }
}

// Fonction pour vérifier si l'utilisateur existe
const checkIfUserExists = (email: string) => {
  const users = getRegisteredUsers()
  const userExists = users.some((user: any) => user.email === email)
  console.log('Checking if user exists:', email, 'Result:', userExists) // Debug
  return userExists
}

// Fonction pour authentifier l'utilisateur
const authenticateUser = (email: string, password: string) => {
  const users = getRegisteredUsers()
  const user = users.find((user: any) => user.email === email && user.password === password)
  console.log('Authenticating user:', email, 'User found:', user) // Debug
  return user
}

const handleSignIn = async (values: any) => {
  console.log('Form submitted with values:', values)
  try {
    isLoading.value = true
    errorMessage.value = ''
    
    // Vérifier si l'utilisateur existe
    if (!checkIfUserExists(values.email)) {
      errorMessage.value = "Cet email n'est pas enregistré. Veuillez vérifier votre saisie ou créer un compte."
      return
    }
    
    // Authentifier l'utilisateur
    const user = authenticateUser(values.email, values.password)
    
    if (!user) {
      errorMessage.value = "Mot de passe incorrect. Veuillez réessayer."
      return
    }
    
    console.log('Authentication successful for user:', user)
    
    // Simuler un délai de connexion
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Créer les données utilisateur pour la session
    const userData = {
      nom: user.nom || user.name, // Gérer les deux cas
      email: user.email,
      telephone: user.telephone,
      isLoggedIn: true,
      // Ajouter les informations de l'enfant si disponibles
      enfant: user.enfant || null,
      specifications: user.specifications || null
    }

    // Stocker les données utilisateur
    localStorage.setItem('user', JSON.stringify(userData))
    console.log('User data stored:', userData)
    
    // Rediriger vers la page d'accueil
    router.push('/welcome')
    
  } catch (error) {
    console.error('Login failed:', error)
    errorMessage.value = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

const goToSignUp = () => {
  console.log('Redirecting to signup')
  router.push('/signup')
}

const goToForgotPassword = () => {
  console.log('Redirecting to forgot password')
  router.push('/forgot-password')
}
</script>