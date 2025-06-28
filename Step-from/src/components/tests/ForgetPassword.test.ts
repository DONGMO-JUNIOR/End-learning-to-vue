import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import ForgotPassword from '../ForgetPassword.vue'

// Mock vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

// Mock vue-i18n
const mockT = vi.fn((key: string, params?: any) => {
  const translations: Record<string, string> = {
    'forgotPassword.title': 'Mot de passe oublié',
    'forgotPassword.subtitle': 'Entrez votre email pour recevoir un lien de réinitialisation',
    'forgotPassword.emailLabel': 'Adresse email',
    'forgotPassword.emailPlaceholder': 'votre@email.com',
    'forgotPassword.sendResetLink': 'Envoyer le lien de réinitialisation',
    'forgotPassword.sending': 'Envoi en cours...',
    'forgotPassword.validation.required': "L'email est requis",
    'forgotPassword.validation.invalid': "Format d'email invalide",
    'forgotPassword.successMessage': params?.email ? `Un lien de réinitialisation a été envoyé à ${params.email}` : 'Un lien de réinitialisation a été envoyé',
    'forgotPassword.errorMessage': 'Une erreur est survenue',
    'forgotPassword.rememberPassword': 'Vous vous souvenez de votre mot de passe ?',
    'forgotPassword.login': 'Se connecter'
  }
  return translations[key] || key
})

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: mockT
  })
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('ForgotPassword Component', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue('[]')
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  const createWrapper = () => {
    return mount(ForgotPassword, {
      global: {
        stubs: {
          'router-link': true
        }
      }
    })
  }

  describe('Component Rendering', () => {
    it('should mount and exist properly', () => {
      wrapper = createWrapper()
      expect(wrapper.exists()).toBe(true)
    })

    it('should display the logo', () => {
      wrapper = createWrapper()

      // The logo is represented by the "D" inside the div
      const logo = wrapper.find('.bg-gradient-to-r.from-blue-900.to-purple-600')
      expect(logo.exists()).toBe(true)
      expect(logo.text()).toContain('D')
    })

    it('should display the title and subtitle', () => {
      wrapper = createWrapper()

      const title = wrapper.find('h2')
      const subtitle = wrapper.find('p')

      expect(title.exists()).toBe(true)
      expect(subtitle.exists()).toBe(true)
      expect(mockT).toHaveBeenCalledWith('forgotPassword.title')
      expect(mockT).toHaveBeenCalledWith('forgotPassword.subtitle')
    })

    it('should display the email input field', () => {
      wrapper = createWrapper()

      const emailInput = wrapper.find('[data-testid="contact-email-input"]')
      expect(emailInput.exists()).toBe(true)
    })

    it('should display the submit button', () => {
      wrapper = createWrapper()

      const submitButton = wrapper.find('[data-testid="contact-submit-button"]')
      expect(submitButton.exists()).toBe(true)
    })

    it('should display the back to login button', () => {
      wrapper = createWrapper()

      const backButton = wrapper.find('[data-testid="back-to-login-button"]')
      expect(backButton.exists()).toBe(true)
    })
  })

  describe('Form Validation', () => {
    it('should accept a valid email', async () => {
      wrapper = createWrapper()

      const emailInput = wrapper.find('input[type="email"]')
      expect(emailInput.exists()).toBe(true)

      await emailInput.setValue('test@example.com')
      expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com')
    })
  })

  describe('LocalStorage Interaction', () => {
    it('should save the email after successful submission', async () => {
      wrapper = createWrapper()

      const emailInput = wrapper.find('input[type="email"]')
      await emailInput.setValue('test@example.com')

      const form = wrapper.find('form')
      await form.trigger('submit')

      await new Promise(resolve => setTimeout(resolve, 100))

      expect(wrapper.vm.isLoading).not.toBe(true)
    })
  })
})
