<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const { locale, t } = useI18n()

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

watch(locale, (newLocale) => {
  localStorage.setItem('preferred-language', newLocale)
}, { immediate: true })

// Charger la langue depuis localStorage au démarrage
const savedLanguage = localStorage.getItem('preferred-language')
if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
  locale.value = savedLanguage
}
</script>

<template>
  <div data-testid="language-selector" class="language-selector">
    <label data-testid="language-label" class="text-sm font-medium text-gray-700 mb-2 block">
      {{ t('common.language') }}
    </label>
    <select 
      data-testid="language-select"
      v-model="locale" 
      class="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
    >
      <option 
        v-for="lang in languages" 
        :key="lang.code" 
        :value="lang.code"
        :data-testid="`language-option-${lang.code}`"
        class="flex items-center"
      >
        {{ lang.flag }} {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.language-selector {
  min-width: 150px;
}
</style>