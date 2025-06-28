<template>
  <div class="mb-4" data-testid="submit-button-container">
    <button
      data-testid="submit-button"
      :type="type"
      :disabled="disabled"
      @click="$emit('click')"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
    >
      <slot>{{ text }}</slot>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String as () => 'button' | 'submit' ,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits<{
  click: []
}>()
</script>

