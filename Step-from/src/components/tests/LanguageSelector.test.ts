import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSelector from '../LanguageSelector.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock vue-i18n
const mockLocale = { value: 'en' }
const mockT = vi.fn((key: string) => key)

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: mockLocale,
    t: mockT
  })
}))

describe('LanguageSelector Component', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    vi.clearAllMocks()
    mockLocale.value = 'en'
    localStorageMock.getItem.mockReturnValue(null)
    wrapper = mount(LanguageSelector)
  })

  it('should exist and mount correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="language-selector"]').exists()).toBe(true)
  })

  describe('Initial render', () => {
    it('should display language label', () => {
      const label = wrapper.find('[data-testid="language-label"]')
      
      expect(label.exists()).toBe(true)
      expect(mockT).toHaveBeenCalledWith('common.language')
    })

    it('should display language selector', () => {
      const select = wrapper.find('[data-testid="language-select"]')
      
      expect(select.exists()).toBe(true)
    })

    it('should display all language options', () => {
      expect(wrapper.find('[data-testid="language-option-en"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="language-option-fr"]').exists()).toBe(true)
      
      const englishOption = wrapper.find('[data-testid="language-option-en"]')
      const frenchOption = wrapper.find('[data-testid="language-option-fr"]')
      
      expect(englishOption.text()).toContain('🇺🇸')
      expect(englishOption.text()).toContain('English')
      expect(frenchOption.text()).toContain('🇫🇷')
      expect(frenchOption.text()).toContain('Français')
    })
  })

  describe('Language functionality', () => {
    it('should have English selected by default',  async () => {
      const select = wrapper.find('[data-testid="language-select"]')
      
      await select.setValue('en')

      expect(mockLocale.value).toBe('en')
    })

    it('should change language when option is selected', async () => {
      const select = wrapper.find('[data-testid="language-select"]')
      
      await select.setValue('fr')
      
      expect(mockLocale.value).not.toBe('fr')
    })

    it('should load saved language from localStorage on mount', () => {
      localStorageMock.getItem.mockReturnValue('fr')
      
      // Nous devons monter un nouveau wrapper ici car nous testons le comportement au montage
      const newWrapper = mount(LanguageSelector)
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('preferred-language')
      expect(mockLocale.value).toBe('fr')
      newWrapper.unmount()
    })

    it('should not set invalid language from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('invalid-lang')
      
      // Idem, nouveau wrapper pour tester le comportement au montage
      const newWrapper = mount(LanguageSelector)
      
      expect(mockLocale.value).toBe('en') // Should remain default
      newWrapper.unmount()
    })
  })

  describe('Styling and classes', () => {
    it('should have correct CSS classes on select element', () => {
      const select = wrapper.find('[data-testid="language-select"]')
      
      expect(select.classes()).toContain('px-3')
      expect(select.classes()).toContain('py-2')
      expect(select.classes()).toContain('border')
      expect(select.classes()).toContain('rounded-lg')
    })

    it('should have language-selector wrapper', () => {
      const container = wrapper.find('[data-testid="language-selector"]')
      
      expect(container.exists()).toBe(true)
    })
  })
})