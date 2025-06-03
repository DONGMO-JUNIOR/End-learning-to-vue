// components/StepOne.vue
<template>
  <div class="box">
    <div class="step-box">
      <h2>Étape 1 : Informations de l'enfant</h2>
      <form @submit.prevent="submitForm" class="form-grid">
        <label>
          Nom :
          <input v-model="form.nom" required />
        </label>
        <label>
          Prénom :
          <input v-model="form.prenom" required />
        </label>
        <button type="submit" class="submit-btn">Suivant ➡️</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ChildInfo } from '../types/Form';


// Props
interface Props {
  initialData?: ChildInfo;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({ nom: '', prenom: '' })
});

// Emits
const emit = defineEmits<{
  nextStep: [data: ChildInfo];
}>();

// Reactive form data
const form = reactive<ChildInfo>({
  nom: props.initialData.nom,
  prenom: props.initialData.prenom
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

.submit-btn {
  margin: 1rem auto 0;
  display: block;
  padding: 0.5rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #2563eb;
}
</style>