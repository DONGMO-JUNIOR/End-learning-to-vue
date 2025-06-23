<template>
  <div class="p-4 sm:p-6 bg-slate-50 border-b border-gray-200">
    <!-- Indicateurs de progression -->
    <div class="flex justify-between mb-3 relative">
      <div
        v-for="step in totalSteps"
        :key="step"
        :class="[
          'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 relative z-10',
          {
            'bg-blue-500 text-white border-2 border-blue-500 shadow-lg shadow-blue-500/25': currentStep === step,
            'bg-green-500 text-white border-2 border-green-500': currentStep > step,
            'bg-gray-200 text-gray-500 border-2 border-gray-300': currentStep < step
          }
        ]"
      >
        <span v-if="currentStep > step" class="text-xs">✓</span>
        <span v-else class="text-xs">{{ step }}</span>
      </div>
    </div>
    
    <!-- Barre de progression -->
    <div class="h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
      <div 
        class="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
        :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        data-testid="progress-bar-fill"
      ></div>
    </div>
    
    <!-- Labels des étapes -->
    <div class="flex justify-between">
      <span 
        v-for="(label, index) in stepLabels"
        :key="index"
        :class="[
          'text-xs text-center flex-1 transition-colors duration-300',
          currentStep === index + 1 
            ? 'text-blue-500 font-semibold' 
            : 'text-gray-500'
        ]"
        :data-testid="`label-${index + 1}`"
        :data-label-status="currentStep === index + 1 ? 'active' : 'inactive'"

      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

defineProps<Props>();
</script>