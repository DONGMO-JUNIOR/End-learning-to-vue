<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue "
      :required="required"
      :disabled="disabled"
      @input="handleInput"
      @blur="handleBlur"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border transition duration-150 ease-in-out"
       v-bind="$attrs"
      :class="{
        'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500': error,
        'bg-gray-100 cursor-not-allowed': disabled
      }"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  placeholder?: string
  modelValue: string | number
  required?: boolean
  disabled?: boolean
  error?: string
  
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: Event): void
}>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
const handleBlur = (e: Event) => {
  emit('blur', e) 
}
</script>