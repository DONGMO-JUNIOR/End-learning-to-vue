<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
    :class="[
      'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
       'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
 
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false
})

defineEmits<{
  click: []
}>()
</script>