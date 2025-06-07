<script setup lang="ts">
defineProps({
  modelValue: Boolean,
  label: String,
  id: String
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label :for="id" class="ml-2 block text-sm text-gray-900">
      {{ label }}
    </label>
  </div>
</template>