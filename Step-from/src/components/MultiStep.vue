<template>
  <div class="multistep-form">
    <div class="form-wrapper">
      <ProgressBarre 
        :current-step="currentStep"
        :total-steps="3"
        :step-labels="['Enfant', 'Parent', 'Spécifications']"
      />
      
      <div class="form-container">
        <StepOne
          v-if="currentStep === 1"
          :initial-data="formData.childInfo"
          @next-step="handleStepOne"
        />
        
        <StepTwo
          v-if="currentStep === 2"
          :initial-data="formData.parentInfo"
          @next-step="handleStepTwo"
          @prev-step="prevStep"
        />
        
        <StepThree
          v-if="currentStep === 3"
          :initial-data="formData.childSpecs"
          @submit-form="handleSubmit"
          @prev-step="prevStep"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';
import ProgressBarre from './ProgressBarre.vue';
import type { 
  ChildInfo, 
  ParentInfo, 
  ChildSpecifications, 
  CompleteFormData 
} from '../types/Form';

// State
const currentStep = ref<number>(1);
const formData = reactive<CompleteFormData>({
  childInfo: { nom: '', prenom: '' },
  parentInfo: { email: '', telephone: '' },
  childSpecs: { classe: '', serie: '' }
});

// Computed
const isFormComplete = computed((): boolean => {
  return !!(
    formData.childInfo?.nom &&
    formData.childInfo?.prenom &&
    formData.parentInfo?.email &&
    formData.parentInfo?.telephone &&
    formData.childSpecs?.classe &&
    formData.childSpecs?.serie
  );
});

// Methods
const nextStep = (): void => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const prevStep = (): void => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleStepOne = (data: ChildInfo): void => {
  formData.childInfo = { ...data };
  nextStep();
};

const handleStepTwo = (data: ParentInfo): void => {
  formData.parentInfo = { ...data };
  nextStep();
};

const handleSubmit = (data: ChildSpecifications): void => {
  formData.childSpecs = { ...data };
  
  if (isFormComplete.value) {
    console.log('Formulaire complet soumis:', formData);
    
    // Ici vous pouvez envoyer les données à votre API
    submitToAPI();
  }
};

const submitToAPI = async (): Promise<void> => {
  try {
    // Simulation d'appel API
    console.log('Envoi des données à l\'API...');
    
    // const response = await fetch('/api/submit-form', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    
    alert('Formulaire soumis avec succès !');
    
    // Réinitialiser le formulaire si nécessaire
    resetForm();
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    alert('Erreur lors de la soumission du formulaire.');
  }
};

const resetForm = (): void => {
  currentStep.value = 1;
  formData.childInfo = { nom: '', prenom: '' };
  formData.parentInfo = { email: '', telephone: '' };
  formData.childSpecs = { classe: '', serie: '' };
};
</script>

<style scoped>
.multistep-form {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  width: 100%;
  max-width: 600px; /* Largeur optimale */
  margin: 0 auto;
  padding: 0 1rem;
}

.progress-bar {
  margin-bottom: 1rem; /* Espacement réduit */
}

.form-container {
  padding: 0.5rem;
  max-height: calc(100vh - 180px); /* Ajustement précis */
  overflow-y: auto;
}

/* Pour les étapes individuelles */
.step-content {
  padding: 0.5rem;
}

.step-content label {
  display: block;
  margin-bottom: 0.3rem; /* Espacement réduit */
  font-weight: 500;
}

.step-content input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.8rem; /* Espacement réduit */
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Suppression des espaces inutiles */
h2 {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .form-wrapper {
    padding: 0 0.5rem;
  }
  
  .form-container {
    max-height: calc(100vh - 160px);
  }
}
</style>