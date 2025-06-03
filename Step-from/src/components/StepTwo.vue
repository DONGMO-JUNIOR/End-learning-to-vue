<template>
  <div class="box">
    <div class="step-box">
      <h2>Étape 2 : Informations du Parent</h2>
      <form @submit.prevent="submitForm" class="form-grid">
        <label>
          Email:
          <input v-model="form.email" type="email" required />
        </label>
        <label>
          Téléphone:
          <input v-model="form.telephone" required />
        </label>
        <div class="button-group">
          <button type="button" @click="emit('prevStep')">⬅️ Précédent</button>
          <button type="submit">Suivant ➡️</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ParentInfo } from '../types/Form'

// Props
interface Props {
  initialData?: ParentInfo;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ email: '', telephone: '' })
});

// Emits
const emit = defineEmits<{
  nextStep: [data: ParentInfo];
  prevStep: [];
}>();

// Reactive form data
const form = reactive<ParentInfo>({
  email: props.initialData.email,
  telephone: props.initialData.telephone
});

// Methods
const submitForm = (): void => {
  emit('nextStep', { ...form });
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f3f4f6;
}

.step-box {
  width: 100%;
  max-width: 500px;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  background: linear-gradient(to bottom right, #ffffff, #f7fafd);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  transition: box-shadow 0.3s ease;
}

.step-box h2 {
  margin-top: 0;
  font-size: 1.25rem;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #374151;
}

input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.button-group button {
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  min-width: 100px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button-group button:hover {
  background-color: #2563eb;
}
</style>