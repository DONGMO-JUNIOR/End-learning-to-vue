<template>
  <div class="flex items-center space-x-2" data-testid="checkbox-input-wrapper">
    <input
      type="checkbox"
      :name="name"
      v-model="value"
      :true-value="true"
      :false-value="false"
      @blur="handleBlur"
      data-testid="checkbox-input"
      :class="[
        'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
        ,{
        'ring-red-500 border-red-300': errorMessage,
      }]"
    />
    <span class="block text-sm text-gray-900 select-none" data-testid="checkbox-label">
      {{ label }}
    </span>
  </div>

  <p
    v-if="errorMessage"
    data-testid="checkbox-error"
    class="mt-1 text-sm text-red-600"
  >
    {{ errorMessage }}
  </p>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
  label: string
}>()
const { value, errorMessage, handleBlur } = useField<boolean>(props.name)
</script>
