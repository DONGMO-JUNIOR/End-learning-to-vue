<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      :required="required"
    >
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  id: string
  label: string
  modelValue: string
  options: Option[]
  required?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: 'Sélectionnez une option'
})

const emit = defineEmits(['update:modelValue'])
</script>