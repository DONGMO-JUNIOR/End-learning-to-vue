import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../SingnIn.vue'

// Mock du router Vue
const mockPush = vi.fn()
const mockRouter = {
  push: mockPush,
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  currentRoute: { value: { path: '/login' } }
}

// Mock de useRouter
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: () => mockRouter
  }
})

// Mock des composants enfants
vi.mock('@/components/forms/TextInput.vue', () => ({
  default: {
    name: 'TextInput',
    props: ['name', 'type', 'label', 'placeholder', 'required', 'modelValue'],
    emits: ['update:modelValue'],
    template: `
      <div>
        <label>{{ label }}</label>
        <input 
          :type="type" 
          :name="name" 
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :data-testid="name + '-input'"
        />
      </div>
    `
  }
}))

vi.mock('@/components/forms/CheckboxInput.vue', () => ({
  default: {
    name: 'CheckboxInput',
    props: ['name', 'label', 'modelValue'],
    emits: ['update:modelValue'],
    template: `
      <div>
        <input 
          type="checkbox" 
          :name="name" 
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          :data-testid="name + '-checkbox'"
        />
        <label>{{ label }}</label>
      </div>
    `
  }
}))

// Mock de vee-validate
vi.mock('vee-validate', () => ({
  Form: {
    name: 'Form',
    props: ['validationSchema'],
    emits: ['submit'],
    template: `
      <form @submit.prevent="handleSubmit" ref="form" data-testid="login-form">
        <slot :meta="{ valid: isValid }" :errors="formErrors" />
      </form>
    `,
    data() {
      return {
        isValid: true,
        formErrors: {},
        formValues: {
          email: '',
          password: '',
          rememberMe: false
        }
      }
    },
    methods: {
      handleSubmit(this: any) {
        this.$emit('submit', this.formValues, { resetForm: () => {} })
      },
      setFormData(this: any, data: any) {
        Object.assign(this.formValues, data)
      }
    }
  }
}))

// Mock de yup
vi.mock('yup', () => ({
  object: vi.fn(() => ({
    // Mock schema de validation
  })),
  string: vi.fn(() => ({
    required: vi.fn().mockReturnThis(),
    email: vi.fn().mockReturnThis(),
    matches: vi.fn().mockReturnThis()
  })),
  boolean: vi.fn(() => ({
    default: vi.fn().mockReturnThis()
  }))
}))

// Configuration i18n
const i18n = createI18n({
  locale: 'fr',
  messages: {
    fr: {
      login: {
        title: 'Connexion',
        or: 'ou',
        signup: 'Créer un compte',
        forgot: 'Mot de passe oublié ?',
        loading: 'Connexion...',
        submit: 'Se connecter',
        fields: {
          email: {
            label: 'Email',
            placeholder: 'Entrez votre email',
            errors: {
              required: 'Email requis',
              invalid: 'Email invalide'
            }
          },
          password: {
            label: 'Mot de passe',
            placeholder: 'Entrez votre mot de passe',
            errors: {
              required: 'Mot de passe requis',
              pattern: 'Le mot de passe doit contenir au moins 6 caractères'
            }
          },
          remember: {
            label: 'Se souvenir de moi'
          }
        },
        errors: {
          notRegistered: 'Aucun compte trouvé avec cet email',
          wrongPassword: 'Mot de passe incorrect'
        },
        error: 'Une erreur est survenue'
      }
    }
  }
})

// Configuration du router pour les tests
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: { template: '<div>Login</div>' } },
    { path: '/signup', name: 'signup', component: { template: '<div>Signup</div>' } },
    { path: '/forgot-password', name: 'forgot-password', component: { template: '<div>Forgot</div>' } },
    { path: '/welcome', name: 'welcome', component: { template: '<div>Welcome</div>' } }
  ]
})

const createWrapper = (options = {}) => {
  return mount(Login, {
    global: {
      plugins: [i18n, router],
      mocks: {
        $router: mockRouter
      }
    },
    ...options
  })
}

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
})

describe('Composant Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPush.mockClear()
    localStorageMock.clear()
    localStorageMock.getItem.mockReturnValue('[]')
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  // Test 1: Vérifier que le composant existe
  it('exists and renders correctly', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="login-container"]').exists()).toBe(true)
  })

  // Test 2: Vérification des éléments visuels
  it('renders all visual elements correctly', () => {
    const wrapper = createWrapper()
    
    // Logo
    expect(wrapper.find('[data-testid="login-logo"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="login-logo"] span').text()).toBe('D')
    
    // Titre
    expect(wrapper.find('[data-testid="login-title"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="login-title"]').text()).toBe('Connexion')
    
    // Liens
    expect(wrapper.find('[data-testid="signup-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="signup-link"]').text()).toBe('Créer un compte')
    expect(wrapper.find('[data-testid="forgot-password-link"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="forgot-password-link"]').text()).toBe('Mot de passe oublié ?')
    
    // Bouton
    expect(wrapper.find('[data-testid="login-submit-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="login-submit-button"]').text()).toBe('Se connecter')
  })

  // Test 3: Navigation vers inscription - CORRIGÉ
  it('navigates to signup page when signup link is clicked', async () => {
    const wrapper = createWrapper()
    
    // Vérifier que le lien existe
    const signupLink = wrapper.find('[data-testid="signup-link"]')
    expect(signupLink.exists()).toBe(true)
    
    // Déclencher le clic
    await signupLink.trigger('click')
    await nextTick()
    
    // Vérifier la navigation
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/signup')
  })

  // Test 4: Navigation vers mot de passe oublié - CORRIGÉ
  it('navigates to forgot password page when link is clicked', async () => {
    const wrapper = createWrapper()
    
    // Vérifier que le lien existe
    const forgotLink = wrapper.find('[data-testid="forgot-password-link"]')
    expect(forgotLink.exists()).toBe(true)
    expect(forgotLink.text()).toBe('Mot de passe oublié ?')
    
    // Simuler le clic
    await forgotLink.trigger('click')
    await nextTick()
    
    // Vérifier que la navigation a été déclenchée
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/forgot-password')
  })

  // Test 5: Affichage d'un message d'erreur
  it('displays error message when errorMessage is set', async () => {
    const wrapper = createWrapper()
    
    // Simuler une erreur en modifiant directement la donnée du composant
    await wrapper.vm.$nextTick()
    wrapper.vm.errorMessage = 'Test error message'
    await wrapper.vm.$nextTick()
    
    const errorContainer = wrapper.find('[data-testid="error-message"]')
    expect(errorContainer.exists()).toBe(true)
    
    const errorText = wrapper.find('[data-testid="error-text"]')
    expect(errorText.text()).toBe('Test error message')
  })

  // Test 6: État de chargement
  it('shows loading state when isLoading is true', async () => {
    const wrapper = createWrapper()
    
    // Simuler l'état de chargement
    wrapper.vm.isLoading = true
    await wrapper.vm.$nextTick()
    
    const submitButton = wrapper.find('[data-testid="login-submit-button"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
    
    const spinner = wrapper.find('[data-testid="loading-spinner"]')
    expect(spinner.exists()).toBe(true)
  })

  // Test 7: Soumission du formulaire avec utilisateur valide
  it('handles successful login with valid credentials', async () => {
    const wrapper = createWrapper()
    
    // Préparer utilisateur de test
    const testUsers = [{
      email: 'test@example.com',
      password: 'Test123!',
      name: 'Test User'
    }]
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testUsers))
    
    // Simuler la soumission du formulaire
    const formValues = {
      email: 'test@example.com',
      password: 'Test123!',
      rememberMe: false
    }
    
    // Déclencher la méthode handleSignIn directement
    await wrapper.vm.handleSignIn(formValues, { resetForm: vi.fn() })
    
    // Attendre que les promesses se résolvent
    await new Promise(resolve => setTimeout(resolve, 1100))
    
    // Vérifier la navigation vers la page de bienvenue
    expect(mockPush).toHaveBeenCalledWith('/welcome')
  })

  // Test 8: Gestion erreur email non enregistré
  it('shows error message for unregistered email', async () => {
    const wrapper = createWrapper()
    
    // Aucun utilisateur enregistré
    localStorageMock.getItem.mockReturnValue('[]')
    
    const formValues = {
      email: 'inexistant@example.com',
      password: 'Test123!',
      rememberMe: false
    }
    
    // Déclencher la méthode handleSignIn
    await wrapper.vm.handleSignIn(formValues, { resetForm: vi.fn() })
    await nextTick()
    
    // Vérifier que le message d'erreur est affiché
    expect(wrapper.vm.errorMessage).toBe('Aucun compte trouvé avec cet email')
  })

  // Test 9: Gestion erreur mot de passe incorrect
  it('shows error message for wrong password', async () => {
    const wrapper = createWrapper()
    
    // Utilisateur avec mot de passe différent
    const testUsers = [{
      email: 'test@example.com',
      password: 'CorrectPassword123!',
      name: 'Test User'
    }]
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testUsers))
    
    const formValues = {
      email: 'test@example.com',
      password: 'WrongPassword123!',
      rememberMe: false
    }
    
    await wrapper.vm.handleSignIn(formValues, { resetForm: vi.fn() })
    await nextTick()
    
    expect(wrapper.vm.errorMessage).toBe('Mot de passe incorrect')
  })

  // Test 10: Fonctionnalité "Se souvenir de moi"
  it('handles remember me functionality', async () => {
    const wrapper = createWrapper()
    const consoleSpy = vi.spyOn(console, 'log')
    
    const testUsers = [{
      email: 'test@example.com',
      password: 'Test123!',
      name: 'Test User'
    }]
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(testUsers))
    
    const formValues = {
      email: 'test@example.com',
      password: 'Test123!',
      rememberMe: true
    }
    
    await wrapper.vm.handleSignIn(formValues, { resetForm: vi.fn() })
    
    // Vérifier que la fonctionnalité "Remember me" est activée
    expect(consoleSpy).toHaveBeenCalledWith('Remember me activated')
  })
})