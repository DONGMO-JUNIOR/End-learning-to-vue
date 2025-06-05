<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

// Props
interface Props {
  text?: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  variant: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false
})

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed
const buttonClasses = computed(() => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:scale-105 focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:scale-105 focus:ring-gray-500',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500',
    ghost: 'text-blue-500 hover:bg-blue-50 focus:ring-blue-500'
  }
  
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }
  
  // Width classes
  const widthClasses = props.fullWidth ? 'w-full' : ''
  
  // Disabled classes
  const disabledClasses = props.disabled 
    ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' 
    : ''
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    widthClasses,
    disabledClasses
  ].filter(Boolean).join(' ')
})

// Methods
const handleClick = (event: MouseEvent): void => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>