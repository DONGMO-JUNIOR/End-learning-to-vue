import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneInput from '@/components/forms/PhoneInput.vue'
import { useField } from 'vee-validate'
import { ref } from 'vue'

// Mock simple de vee-validate
vi.mock('vee-validate', () => ({
  useField: vi.fn()
}))

// Type assertion pour le mock
const mockUseField = useField as ReturnType<typeof vi.fn>

describe('PhoneInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock par défaut pour tous les tests
    mockUseField.mockReturnValue({
      value: ref(''),
      errorMessage: ref(''),
      handleBlur: vi.fn(),
      handleChange: vi.fn(),
      meta: { valid: false, touched: false, dirty: false }
    })
  })
  it('should render correctly', () => {
      const wrapper = mount(PhoneInput, {
        props: {
          name: 'phone',
          label: 'Téléphone'
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

  it('should render correctly with label', () => {
    const wrapper = mount(PhoneInput, {
      props: { name: 'phone', label: 'Téléphone' }
    })
    expect(wrapper.find('[data-testid="phone-input-label"]').text()).toBe('Téléphone')
  })

  it('should show required asterisk when required', () => {
    const wrapper = mount(PhoneInput, {
      props: { name: 'phone', label: 'Téléphone', required: true }
    })
    expect(wrapper.find('[data-testid="required-asterisk"]').text()).toBe('*')
  })

  it('should display phone value correctly', () => {
    mockUseField.mockReturnValue({
      value: ref('+33612345678'),
      errorMessage: ref(''),
      handleBlur: vi.fn(),
      handleChange: vi.fn(),
      meta: { valid: false }
    })

    const wrapper = mount(PhoneInput, {
      props: { name: 'phone', label: 'Téléphone' }
    })
    expect(wrapper.find('input').element.value).toBe('+33612345678')
  })

  it('should call handleChange on input', async () => {
    const mockHandleChange = vi.fn()
    mockUseField.mockReturnValue({
      value: ref(''),
      errorMessage: ref(''),
      handleBlur: vi.fn(),
      handleChange: mockHandleChange,
      meta: { valid: false }
    })

    const wrapper = mount(PhoneInput, {
      props: { name: 'phone', label: 'Téléphone' }
    })
    
    await wrapper.find('input').setValue('+33712345678')
    expect(mockHandleChange).toHaveBeenCalled()
  })

  it('should show error message when invalid', () => {
    mockUseField.mockReturnValue({
      value: ref(''),
      errorMessage: ref('Numéro invalide'),
      handleBlur: vi.fn(),
      handleChange: vi.fn(),
      meta: { valid: false }
    })

    const wrapper = mount(PhoneInput, {
      props: { name: 'phone', label: 'Téléphone' }
    })
    expect(wrapper.find('[data-testid="error-message"]').text()).toBe('Numéro invalide')
  })

  it('should show success message when valid', () => {
    mockUseField.mockReturnValue({
      value: ref('+33612345678'),
      errorMessage: ref(''),
      handleBlur: vi.fn(),
      handleChange: vi.fn(),
      meta: { valid: true }
    })

    const wrapper = mount(PhoneInput, {
      props: { 
        name: 'phone', 
        label: 'Téléphone',
        successMessage: 'Numéro valide' 
      }
    })
    expect(wrapper.find('[data-testid="success-message"]').text()).toBe('Numéro valide')
  })
})