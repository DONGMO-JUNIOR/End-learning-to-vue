import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

// Fonction pour détecter la langue du navigateur
function getBrowserLanguage() {
  const browserLang = navigator.language.substring(0, 2)
  const supportedLanguages = ['en', 'fr', 'pl']
  return supportedLanguages.includes(browserLang) ? browserLang : 'en'
}

// Fonction pour récupérer la langue sauvegardée ou celle du navigateur
function getInitialLanguage() {
  const savedLanguage = localStorage.getItem('preferred-language')
  if (savedLanguage && ['en', 'fr', ].includes(savedLanguage)) {
    return savedLanguage
  }
  return getBrowserLanguage()
}

const i18n = createI18n({
  locale: getInitialLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
  },
  legacy: false // Utilise la Composition API
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n)
app.mount('#app')
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)
// app.mount('#app')