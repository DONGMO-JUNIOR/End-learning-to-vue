<template>
  <div class="absolute inset-0 pointer-events-none">
    <!-- Cercles colorés -->
    <div 
      v-for="circle in circles" 
      :key="circle.id"
      :class="[
        'absolute rounded-full animate-bounce',
        circle.color,
        circle.size,
        circle.position,
        circle.opacity
      ]"
      :style="{ animationDelay: circle.delay }"
    ></div>

    <!-- Formes géométriques -->
    <div 
      v-for="shape in geometricShapes" 
      :key="shape.id"
      :class="[
        'absolute border-4',
        shape.color,
        shape.size,
        shape.position,
        shape.opacity,
        shape.rotation
      ]"
    ></div>

    <!-- Triangles -->
    <div 
      v-for="triangle in triangles" 
      :key="triangle.id"
      :class="[
        'absolute',
        triangle.position,
        triangle.opacity
      ]"
    >
      <div 
        :class="[
          'w-0 h-0',
          triangle.color,
          triangle.size
        ]"
      ></div>
    </div>

    <!-- Symboles mathématiques -->
    <div 
      v-for="symbol in mathSymbols" 
      :key="symbol.id"
      :class="[
        'absolute text-2xl font-bold',
        symbol.color,
        symbol.position,
        symbol.opacity
      ]"
    >
      {{ symbol.symbol }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Types
interface FloatingElement {
  id: number
  position: string
  color: string
  size: string
  opacity: string
  delay?: string
  rotation?: string
}

interface MathSymbol extends Omit<FloatingElement, 'size'> {
  symbol: string
}

interface Triangle extends FloatingElement {
  // Triangle spécifique avec border style
}

// Cercles colorés
const circles = ref<FloatingElement[]>([
  {
    id: 1,
    position: '-top-4 -right-4',
    color: 'bg-yellow-400',
    size: 'w-16 h-16',
    opacity: 'opacity-80',
    delay: '0s'
  },
  {
    id: 2,
    position: 'top-20 -left-8',
    color: 'bg-pink-400',
    size: 'w-8 h-8',
    opacity: 'opacity-70',
    delay: '1s'
  },
  {
    id: 3,
    position: 'bottom-20 -right-6',
    color: 'bg-cyan-400',
    size: 'w-12 h-12',
    opacity: 'opacity-60',
    delay: '2s'
  },
  {
    id: 4,
    position: 'bottom-40 left-4',
    color: 'bg-purple-400',
    size: 'w-6 h-6',
    opacity: 'opacity-50',
    delay: '1.5s'
  }
])

// Formes géométriques (carrés et cercles avec bordures)
const geometricShapes = ref<FloatingElement[]>([
  {
    id: 1,
    position: 'top-16 right-16',
    color: 'border-orange-400',
    size: 'w-8 h-8',
    opacity: 'opacity-70',
    rotation: 'rotate-45'
  },
  {
    id: 2,
    position: 'top-32 left-2',
    color: 'border-cyan-400',
    size: 'w-10 h-10',
    opacity: 'opacity-60',
    rotation: 'rounded-full'
  }
])

// Triangles
const triangles = ref<Triangle[]>([
  {
    id: 1,
    position: 'bottom-32 left-8',
    color: 'border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-yellow-400',
    size: '', // Géré par les classes border
    opacity: 'opacity-80'
  }
])

// Symboles mathématiques
const mathSymbols = ref<MathSymbol[]>([
  {
    id: 1,
    position: 'top-8 left-12',
    color: 'text-white',
    opacity: 'opacity-70',
    symbol: '+'
  },
  {
    id: 2,
    position: 'bottom-16 right-8',
    color: 'text-pink-300',
    opacity: 'opacity-80',
    symbol: '×'
  }
])
</script>

<style scoped>
/* Animation personnalisée pour les formes flottantes */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
</style>