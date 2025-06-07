<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      type="tel"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
     @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2 border"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  placeholder?: string
  modelValue: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  required: false
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>