<template>
  <div class="mb-4">
    <label :for="name" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="inputValue"
      :required="required"
      :disabled="disabled"
      @input="handleChange"
      @blur="handleBlur"
      :class="[
      '',
      'block w-full rounded-md border-gray-300 shadow-sm p-2 border',
      {
        'invalid:border-red-500 invalid:text-red-500 focus:border-red-500 focus:outline focus:outline-red-500 focus:invalid:border-red-500 focus:invalid:outline-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ': !!errorMessage,
  
      }
      ]"
      
    />
    <p v-if="errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
})

const name = toRef(props, 'name')
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
})
</script>

 test('devrait permettre la navigation arrière et conserver les données', async ({ page }) => {
    // Étape 1: Remplir les données de l'enfant
    await page.fill('[data-testid="child-nom"]', 'Martin');
    await page.fill('[data-testid="child-prenom"]', 'Sophie');
    await page.click('[data-testid="next-button"]');
    
    // Étape 2: Remplir partiellement les données du parent
    await page.fill('[data-testid="parent-nom"]', 'Martin');
    await page.fill('[data-testid="parent-email"]', 'martin@example.com');
    
    // Retourner à l'étape précédente
    await page.click('[data-testid="prev-button"]');
    
    // Vérifier qu'on est revenu à l'étape 1
    await expect(page.locator('text=1')).toBeVisible();
    
    // Vérifier que les données de l'enfant sont conservées
    await expect(page.locator('[data-testid="child-nom"]')).toHaveValue('Martin');
    await expect(page.locator('[data-testid="child-prenom"]')).toHaveValue('Sophie');
    
    // Retourner à l'étape 2
    await page.click('[data-testid="next-button"]');
    
    // Vérifier que les données du parent sont conservées
    await expect(page.locator('[data-testid="parent-nom"]')).toHaveValue('Martin');
    await expect(page.locator('[data-testid="parent-email"]')).toHaveValue('martin@example.com');
  });

   
  test('devrait afficher correctement la barre de progression', async ({ page }) => {
    // Étape 1
    await expect(page.locator('[data-testid="progress-step-1"]')).toHaveClass(/active/);
    await expect(page.locator('[data-testid="progress-step-2"]')).not.toHaveClass(/active/);
    await expect(page.locator('[data-testid="progress-step-3"]')).not.toHaveClass(/active/);
    
    // Passer à l'étape 2
    await page.fill('[data-testid="child-nom"]', 'Progress');
    await page.fill('[data-testid="child-prenom"]', 'Test');
    await page.click('[data-testid="next-button"]');
    
    // Vérifier la progression
    await expect(page.locator('[data-testid="progress-step-1"]')).toHaveClass(/completed/);
    await expect(page.locator('[data-testid="progress-step-2"]')).toHaveClass(/active/);
    await expect(page.locator('[data-testid="progress-step-3"]')).not.toHaveClass(/active/);
  });
  