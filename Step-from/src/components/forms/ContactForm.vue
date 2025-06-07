<template>
  <div class="rounded-lg bg-gray-50 flex flex-col justify-center m-[60px] py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">Contact Us</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md mx-auto">
      
      <!-- Utilisation du premier composant input -->
      <TextInput
        id="name"
        v-model="formData.name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        :required="true"
      />
      
      <!-- Utilisation du premier composant input pour email -->
      <TextInput
        id="email"
        v-model="formData.email"
        label="Email"
        type="email"
        placeholder="juniorqobu@maicom"
        :required="true"
      />
      
      <!-- Utilisation du deuxième composant input -->
      <PhoneInput
        id="phone"
        v-model="formData.phone"
        label="Phone"
        placeholder="+(237) 691753506"
      />
      
      <!-- Utilisation du composant bouton -->
      <div>
        <SubmitButton
          type="submit"
          text="Submit"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from '../ui/TextInput.vue'
import PhoneInput from '../ui/PhoneInput.vue'
import SubmitButton from '../ui/SubmitButton.vue'

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  phone: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  // Ici vous pourriez ajouter une logique pour envoyer les données à un backend
  alert('Thank you for your message! We will contact you soon.')
  router.push('/') // Redirige vers la page d'accueil après soumission
}
</script>

<style scoped>
</style>