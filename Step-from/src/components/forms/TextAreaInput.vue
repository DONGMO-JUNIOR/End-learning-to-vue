
<template>
  <div class="mb-4">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :value="inputValue"
      :required="required"
      :rows="rows"
      @input="handleChange"
      @blur="handleBlur"
      :class="[
        'block w-full rounded-md border-gray-300 shadow-sm p-2 border ',
       {
        'invalid:border-red-500 invalid:text-red-500 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ': !!errorMessage,
  
      }]"
    />
    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
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
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
})

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