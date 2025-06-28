<template>
  <div class="multistep-form">
    <div class="form-wrapper">
      <ProgressBarre 
        :current-step="currentStep"
        :total-steps="3"
        :step-labels="['Enfant', 'Parent', 'Spécifications']"
      />
      
      <div class="form-container">
        <keep-alive>
          <component
            :is="currentStepComponent"
            :initial-data="getCurrentStepData()"
            @next-step="handleStep"
            @prev-step="prevStep"
            @submit-form="handleSubmit"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive, computed, onMounted, watch, defineComponent } from 'vue';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';
import ProgressBarre from './ProgressBarre.vue';
import type { 
  ChildInfo, 
  ParentInfo, 
  ChildSpecifications, 
  CompleteFormData 
} from '../../../types/Form';

const router = useRouter();

const currentStep = ref<1 | 2 | 3>(1); 
const formData = reactive<CompleteFormData>({
  childInfo: { nom: '', prenom: '' },
  parentInfo: { nom: '', email: '', telephone: '', password: '' }, // Ajout du password
  childSpecs: { classe: '', serie: '' }
});

const stepsComponents: Record<1 | 2 | 3, ReturnType<typeof defineComponent>> = {
  1: StepOne,
  2: StepTwo,
  3: StepThree
};
const currentStepComponent = computed(() => stepsComponents[currentStep.value]);

const getCurrentStepData = () => {
  switch(currentStep.value) {
    case 1: return formData.childInfo;
    case 2: return formData.parentInfo;
    case 3: return formData.childSpecs;
    default: return {};
  }
};

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

const handleStep = (data: ChildInfo | ParentInfo): void => {
  if (currentStep.value === 1) {
    formData.childInfo = data as ChildInfo;
    console.log('Données enfant sauvegardées:', formData.childInfo);
  } else if (currentStep.value === 2) {
    formData.parentInfo = data as ParentInfo;
    console.log('Données parent sauvegardées:', formData.parentInfo);
  }
  nextStep();
};
const saveUserToRegisteredUsers = (completeData: CompleteFormData): boolean => {
  try {
   
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    const emailExists = existingUsers.some((user: any) => user.email === completeData.parentInfo.email);
    
    if (emailExists) {
      console.error('Cet email est déjà utilisé');
      return false;
    }
    
    // Créer l'objet utilisateur complet
    const newUser = {
      // Informations du parent (pour la connexion)
      nom: completeData.parentInfo.nom,
      email: completeData.parentInfo.email,
      password: completeData.parentInfo.password,
      telephone: completeData.parentInfo.telephone,
      
      // Informations de l'enfant
      enfant: {
        nom: completeData.childInfo.nom,
        prenom: completeData.childInfo.prenom
      },
      
      // Spécifications
      specifications: {
        classe: completeData.childSpecs.classe,
        serie: completeData.childSpecs.serie
      },
      
      // Métadonnées
      dateInscription: new Date().toISOString(),
      id: Date.now()
    };
    
    // Ajouter le nouvel utilisateur
    existingUsers.push(newUser);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    console.log('Utilisateur enregistré avec succès:', newUser);
    console.log('Total utilisateurs enregistrés:', existingUsers.length);
    
    return true;
    
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return false;
  }
};

const handleSubmit = async (data: ChildSpecifications): Promise<void> => {
  // 1. Fusionner les données finales
  const completeData = {
    childInfo: formData.childInfo,
    parentInfo: formData.parentInfo,
    childSpecs: data
  };

  // 2. Validation
  if (!completeData.parentInfo.password) {
    alert("Mot de passe manquant");
    currentStep.value = 2; 
    return;
  }

  try {
    const saved = saveUserToRegisteredUsers(completeData);
    
    if (!saved) {
      alert("Cet email est déjà utilisé");
      currentStep.value = 2; // Retour à l'étape email
      return;
    }

    // Stocker les infos de connexion
    localStorage.setItem('currentUser', JSON.stringify({
      email: completeData.parentInfo.email,
      name: completeData.parentInfo.nom
    }));

    // Redirection FIRST
    await router.push('/welcome');

    // Nettoyage APRÈS redirection réussie
    currentStep.value = 1;
    Object.assign(formData, {
      childInfo: { nom: '', prenom: '' },
      parentInfo: { nom: '', email: '', telephone: '', password: '' },
      childSpecs: { classe: '', serie: '' }
    });
    
  } catch (error) {
    console.error("Erreur finale:", error);
    alert("Une erreur est survenue lors de l'inscription");
  }
};
</script>