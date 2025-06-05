<template>
  <div class="absolute bottom-0 left-0 right-0">
    <svg 
      viewBox="0 0 1440 120" 
      :class="waveClasses"
      preserveAspectRatio="none"
    >
      <path :d="wavePath" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Props {
  color?: string
  height?: string
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'fill-pink-100',
  height: 'h-20',
  animated: false
})

// Computed
const waveClasses = computed(() => {
  const baseClasses = `w-full ${props.height} ${props.color}`
  const animatedClasses = props.animated ? 'animate-wave' : ''
  
  return [baseClasses, animatedClasses].filter(Boolean).join(' ')
})

const wavePath = computed(() => {
  return "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
})
</script>

<style scoped>
@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-wave {
  animation: wave 3s ease-in-out infinite;
}
</style>