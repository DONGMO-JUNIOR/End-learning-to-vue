<template>
  <div class="mb-4">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        :name="name"
        :type="currentType"
        :placeholder="placeholder"
        :value="inputValue"
        :required="required"
        :disabled="disabled"
        @input="handleChange"
        @blur="handleBlur"
        :class="[
          'block w-full rounded-md border-gray-300 shadow-sm p-2 border pr-10',
          {
            'invalid:border-red-500 invalid:text-red-500 focus:border-red-500 focus:outline focus:outline-red-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20': !!errorMessage,
          }
        ]"
      />
      <button
  type="button"
  @click="togglePasswordVisibility"
  class="absolute inset-y-0 right-0 pr-3 flex items-center"
  :disabled="disabled"
>
  <svg
    v-if="isPasswordVisible"
    class="h-5 w-5 text-gray-400 hover:text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  <svg
    v-else
    class="h-5 w-5 text-gray-400 hover:text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
</button>
    </div>
    </div>
    <p v-if="errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { toRef, ref, computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
})

const isPasswordVisible = ref(false)
const currentType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password'
})

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const name = toRef(props, 'name')
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
})
</script>