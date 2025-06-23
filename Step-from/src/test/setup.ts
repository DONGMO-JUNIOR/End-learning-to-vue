// test/test-utils.ts
import { mount, VueWrapper } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import type { Component } from 'vue'
import {expect} from 'vitest'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

// Configuration i18n pour les tests
export const createTestI18n = (locale = 'fr') => {
  return createI18n({
    locale,
    legacy: false, // Pour Vue 3 composition API
    messages: { fr, en }
  })
}

// Options par défaut pour tous vos tests
export const defaultMountOptions = {
  global: {
    plugins: [createTestI18n()]
  }
}

// Wrapper helper pour monter des composants avec i18n
export const mountWithI18n = (
  component: Component, 
  options: any = {},
  locale = 'fr'
) => {
  const i18n = createTestI18n(locale)
  
  return mount(component, {
    ...options,
    global: {
      plugins: [i18n],
      ...options.global
    }
  })
}

// Helper pour tester avec différentes langues
export const mountWithLocales = (component: Component, options: any = {}) => {
  return {
    fr: mountWithI18n(component, options, 'fr'),
    en: mountWithI18n(component, options, 'en')
  }
}

// Types pour TypeScript
export interface TestWrapper extends VueWrapper<any> {}

// Matchers personnalisés pour vos tests (optionnel)
export const expectTranslation = (wrapper: TestWrapper, key: string, locale = 'fr') => {
  const i18n = createTestI18n(locale)
  const expectedText = i18n.global.t(key)
  return expect(wrapper.text()).toContain(expectedText)
}