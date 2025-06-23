
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import HeroSection from '../HeroSection.vue'

// ÉTAPE 1: CONFIGURATION DE BASE

// On crée de fausses traductions pour les tests
const fakeTranslations = {
  en: {
    hero: {
      title: 'Welcome to Our Platform',
      subtitle: 'Discover amazing features',
      cta: 'Get Started'
    }
  },
  fr: {
      hero: {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        cta: 'Test CTA'
      }
    }
}

// On configure vue-i18n avec nos fausses traductions
const i18n = createI18n({
  locale: 'en',
  messages: fakeTranslations
})

// Fonction helper pour créer le composant dans les tests
function createHeroComponent() {
  return mount(HeroSection, {
    global: {
      plugins: [i18n], // On ajoute i18n
      stubs: {
        // On remplace RouterLink par un simple lien HTML pour les tests
        RouterLink: {
          template: '<a :href="to"><slot /></a>',
          props: ['to']
        }
      }
    }
  })
}

// ÉTAPE 2: TESTS BASIQUES - CE QUI S'AFFICHE

describe('HeroSection - Tests de base', () => {
  
  it('Le composant s\'affiche sans erreur', () => {
    // On crée le composant
    const component = createHeroComponent()
    
    // On vérifie qu'il existe
    expect(component.exists()).toBe(true)
    
    console.log('✅ Le composant s\'affiche correctement')
  })

  it('Le titre s\'affiche avec le bon texte', () => {
    const component = createHeroComponent()
    
    // On cherche le titre (balise h1)
    const title = component.find('h1')
    
    // On vérifie qu'il existe
    expect(title.exists()).toBe(true)
    
    // On vérifie qu'il contient le bon texte
    expect(title.text()).toBe('Welcome to Our Platform')
    
    console.log('✅ Le titre s\'affiche:', title.text())
  })

  it('Le sous-titre s\'affiche avec le bon texte', () => {
    const component = createHeroComponent()
    
    // On cherche le paragraphe
    const subtitle = component.find('p')
    
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Discover amazing features')
    
    console.log('✅ Le sous-titre s\'affiche:', subtitle.text())
  })

  it('Le bouton "Get Started" s\'affiche et pointe vers /signup', () => {
    const component = createHeroComponent()
    
    // On cherche le lien
    const button = component.find('a')
    
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Get Started')
    expect(button.attributes('href')).toBe('/signup')
    
    console.log('✅ Le bouton s\'affiche avec le bon lien')
  })
})

// ÉTAPE 3: TESTS DE L'IMAGE SVG

describe('HeroSection - Tests de l\'image', () => {
  
  it('L\'image SVG s\'affiche', () => {
    const component = createHeroComponent()
    
    // On cherche le SVG avec le data-testid
    const svg = component.find('[data-testid="person-svg"]')
    
    expect(svg.exists()).toBe(true)
    
    console.log('✅ L\'image SVG est présente')
  })

  it('L\'image SVG a les bonnes dimensions', () => {
    const component = createHeroComponent()
    
    const svg = component.find('[data-testid="person-svg"]');
    
    expect(svg.attributes('viewBox')).toBe('0 0 800.283 459.452')
    expect(svg.attributes('width')).toBe('100%')
    
    console.log('✅ L\'image a les bonnes dimensions')
  })
})

// ÉTAPE 4: TESTS DES STYLES CSS

describe('HeroSection - Tests des styles', () => {
  
  it('La section principale a les bonnes classes CSS', () => {
    const component = createHeroComponent()
    
    const section = component.find('section')
    
    // On vérifie que certaines classes importantes sont présentes
    expect(section.classes()).toContain('bg-gray-50')
    expect(section.classes()).toContain('relative')
    
    console.log('✅ La section a les bonnes classes CSS')
  })

  it('Le titre a les bonnes couleurs', () => {
    const component = createHeroComponent()
    
    const title = component.find('h1')
    
    // On vérifie les classes de couleur et style
    expect(title.classes()).toContain('text-blue-900')
    expect(title.classes()).toContain('font-bold')
    expect(title.classes()).toContain('italic')
    
    console.log('✅ Le titre a les bonnes couleurs')
  })
})
