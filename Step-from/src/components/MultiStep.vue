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
} from '../types/Form';

const router = useRouter();

// State
const currentStep = ref<1 | 2 | 3>(1); 
const formData = reactive<CompleteFormData>({
  childInfo: { nom: '', prenom: '' },
  parentInfo: { nom: '', email: '', telephone: '', password: '' }, // Ajout du password
  childSpecs: { classe: '', serie: '' }
});

// Typage des composants d'étape
interface StepComponent {
  (data: any): void;
}

const stepsComponents: Record<1 | 2 | 3, ReturnType<typeof defineComponent>> = {
  1: StepOne,
  2: StepTwo,
  3: StepThree
};

// Computed
const currentStepComponent = computed(() => stepsComponents[currentStep.value]);

const isFormComplete = computed((): boolean => {
  return !!(
    formData.childInfo.nom &&
    formData.childInfo.prenom &&
    formData.parentInfo.nom &&
    formData.parentInfo.email &&
    formData.parentInfo.telephone &&
    formData.parentInfo.password && // Vérification du password
    formData.childSpecs.classe &&
    formData.childSpecs.serie
  );
});

// Methods
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

// Fonction pour sauvegarder l'utilisateur dans la liste des utilisateurs enregistrés
const saveUserToRegisteredUsers = (completeData: CompleteFormData): boolean => {
  try {
    // Récupérer les utilisateurs existants
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Vérifier si l'email existe déjà
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
  formData.childSpecs = data;
  
  console.log('=== DONNÉES COMPLÈTES AVANT SAUVEGARDE ===');
  console.log('Enfant:', formData.childInfo);
  console.log('Parent:', formData.parentInfo);
  console.log('Spécifications:', formData.childSpecs);
  console.log('Formulaire complet?', isFormComplete.value);
  
  if (isFormComplete.value) {
    try {
      // Sauvegarder l'utilisateur dans la liste des utilisateurs enregistrés
      const saved = saveUserToRegisteredUsers(formData);
      
      if (!saved) {
        // Gérer l'erreur (email déjà utilisé, etc.)
        alert('Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.');
        return;
      }
      
      // Sauvegarder les données de session pour la connexion automatique
      const sessionData = {
        nom: formData.parentInfo.nom,
        email: formData.parentInfo.email,
        telephone: formData.parentInfo.telephone,
        enfant: {
          nom: formData.childInfo.nom,
          prenom: formData.childInfo.prenom
        },
        specifications: {
          classe: formData.childSpecs.classe,
          serie: formData.childSpecs.serie
        },
        isLoggedIn: true
      };
      
      localStorage.setItem('user', JSON.stringify(sessionData));
      
      // Nettoyer les données temporaires du formulaire
      localStorage.removeItem('formData');
      localStorage.removeItem('currentStep');
      
      console.log('Inscription réussie, redirection vers welcome...');
      await router.push('/welcome');
      resetForm();
      
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
  } else {
    console.error('Formulaire incomplet:', {
      childInfo: formData.childInfo,
      parentInfo: formData.parentInfo,
      childSpecs: formData.childSpecs
    });
    alert('Veuillez remplir tous les champs obligatoires.');
  }
};

const resetForm = (): void => {
  currentStep.value = 1;
  formData.childInfo = { nom: '', prenom: '' };
  formData.parentInfo = { nom: '', email: '', telephone: '', password: '' };
  formData.childSpecs = { classe: '', serie: '' };
};

// Fonction de debug pour vérifier le localStorage
const debugLocalStorage = () => {
  console.log('=== DEBUG LOCALSTORAGE ===');
  console.log('registeredUsers:', localStorage.getItem('registeredUsers'));
  console.log('user:', localStorage.getItem('user'));
  console.log('formData:', localStorage.getItem('formData'));
  
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  console.log('Nombre d\'utilisateurs enregistrés:', users.length);
  users.forEach((user: any, index: number) => {
    console.log(`Utilisateur ${index + 1}:`, {
      nom: user.nom,
      email: user.email,
      hasPassword: !!user.password,
      enfant: user.enfant
    });
  });
};

// Exposer la fonction de debug pour les tests
(window as any).debugLocalStorage = debugLocalStorage;

// Persistance des données
onMounted(() => {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    try {
      Object.assign(formData, JSON.parse(savedData));
    } catch (error) {
      console.error('Erreur lors du chargement des données sauvegardées:', error);
    }
  }
  
  const savedStep = localStorage.getItem('currentStep');
  if (savedStep) {
    const step = parseInt(savedStep) as 1 | 2 | 3;
    if ([1, 2, 3].includes(step)) {
      currentStep.value = step;
    }
  }
});

watch([currentStep, formData], () => {
  localStorage.setItem('formData', JSON.stringify(formData));
  localStorage.setItem('currentStep', currentStep.value.toString());
}, { deep: true });
</script>