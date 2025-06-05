<template>
  <div class="rounded-lg bg-gray-50 flex flex-col justify-center m-[60px] py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">Contact Us</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md mx-auto">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Enter your name"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="juniorqobu@maicom"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>
      
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          placeholder="+(237) 691753506"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>
      
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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