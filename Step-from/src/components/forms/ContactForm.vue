<template>
  <div class="rounded-lg bg-gray-50 flex flex-col justify-center m-[60px] py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">Contactez-nous</h2>
    
    <Form @submit="handleSubmit" v-slot="{ errors, meta }" class="space-y-4 max-w-md mx-auto">
      
      <!-- Champ Nom -->
      <Field name="name" :rules="nameRules" v-slot="{ field, errorMessage }">
        <TextInput
          id="name"
          :modelValue="field.value || ''"
          @update:modelValue="field.onChange"
          @blur="field.onBlur"
          label="Nom complet"
          type="text"
          placeholder="Votre nom complet"
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
          label="Email"
          type="email"
          placeholder="exemple@domaine.com"
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
    field.onChange(result) // VeeValidate reçoit la vraie valeur
  }"
  @blur="field.onBlur"
  label="Téléphone"
  placeholder="6XX XXX XXX"
  :required="true"
/>

        <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
      </Field>
      
      <!-- Champ Message -->
      <Field name="message" :rules="messageRules" v-slot="{ field, errorMessage }">
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
            Message
            <span class="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            :value="field.value || ''"
            @input="(e) => field.onChange(e)"
            @blur="field.onBlur"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            :class="{ 'border-red-300': errorMessage }"
            placeholder="Votre message ici..."
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
          Envoyer le message
        </button>
      </div>

      <!-- Debug Info (optionnel) -->
      <div v-if="debug" class="mt-6 p-4 bg-gray-100 rounded text-sm">
        <h4 class="font-bold mb-2">État de validation :</h4>
        <p>Formulaire valide : {{ meta.valid ? '✅' : '❌' }}</p>
        <p>Erreurs : {{ errors }}</p>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import TextInput from '@/components/ui/TextInput.vue'
import PhoneInput from '@/components/ui/PhoneInput.vue'

const router = useRouter()
const debug = ref(false) // Mettre à true pour le mode debug
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

// Règles de validation
const nameRules = yup.string()
  .required('Le nom est obligatoire')
  .trim()
  .min(2, 'Trop court (minimum 2 caractères)')
  .max(50, 'Trop long (maximum 50 caractères)')

const emailRules = yup.string()
  .required('L\'email est obligatoire')
  .trim()
  .email('Format d\'email invalide')

const phoneRules = yup.string()
  .required('Le téléphone est obligatoire')
  .trim()
  .matches(/^237\d{9}$/, 'Numéro invalide (doit contenir 9 chiffres après 237)')



const messageRules = yup.string()
  .required('Le message est obligatoire')
  .trim()
  .min(10, 'Trop court (minimum 10 caractères)')
  .max(500, 'Trop long (maximum 500 caractères)')

// Soumission du formulaire
const handleSubmit = async (values: any, { resetForm }: any) => {
  try {
    console.log('Données du formulaire:', values)
    
    alert('Message envoyé avec succès! Nous vous contacterons bientôt.')
    resetForm()
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  }
}
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>