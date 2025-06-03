<template>
  <div class="progress-container">
    <div class="steps-indicator">
      <div
        v-for="step in totalSteps"
        :key="step"
        :class="[
          'step-circle',
          {
            'active': currentStep === step,
            'completed': currentStep > step,
            'pending': currentStep < step
          }
        ]"
      >
        <span v-if="currentStep > step">✓</span>
        <span v-else>{{ step }}</span>
      </div>
    </div>
    
    <div class="progress-bar">
      <div 
        class="progress-fill"
        :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
      ></div>
    </div>
    
    <div class="step-labels">
      <span 
        v-for="(label, index) in stepLabels"
        :key="index"
        :class="[
          'step-label',
          { 'active': currentStep === index + 1 }
        ]"
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

<style scoped>
.progress-container {
  padding: 2rem;
  background-color: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.step-circle.pending {
  background-color: #e5e7eb;
  color: #6b7280;
  border: 2px solid #d1d5db;
}

.step-circle.active {
  background-color: #3b82f6;
  color: white;
  border: 2px solid #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.step-circle.completed {
  background-color: #10b981;
  color: white;
  border: 2px solid #10b981;
}

.progress-bar {
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.5s ease;
  border-radius: 2px;
}

.step-labels {
  display: flex;
  justify-content: space-between;
}

.step-label {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  flex: 1;
  transition: color 0.3s ease;
}

.step-label.active {
  color: #3b82f6;
  font-weight: 600;
}
</style>