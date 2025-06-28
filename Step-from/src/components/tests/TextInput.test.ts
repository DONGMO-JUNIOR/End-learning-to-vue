import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TextInput from '../forms/BaseInput.vue'

vi.mock('vee-validate', () => ({
  useField: vi.fn()
}))

import { useField } from 'vee-validate'
import { ref } from 'vue'

// Type assertion pour le mock
const mockUseField = useField as ReturnType<typeof vi.fn>


describe('TextInput', () => {
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
    const wrapper = mount(TextInput, {
      props: {
        name: 'test',
        label: 'Test Label'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  describe('Basic rendering', () => {
    it('should display the label', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'My Label'
        }
      })
      expect(wrapper.find('label').text()).toContain('My Label')
    })

    it('should display required asterisk when required is true', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          required: true
        }
      })
      const asterisk = wrapper.find('span.text-red-500')
      expect(asterisk.exists()).toBe(true)
      expect(asterisk.text()).toBe('*')
    })

    it('should not display asterisk when required is false', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          required: false
        }
      })
      expect(wrapper.find('span.text-red-500').exists()).toBe(false)
    })

    it('should render input element', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('should display placeholder text', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          placeholder: 'Enter your name'
        }
      })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your name')
    })
  })

  describe('Props testing', () => {
    it('should apply correct input type', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          type: 'email'
        }
      })
      expect(wrapper.find('input').attributes('type')).toBe('email')
    })

    it('should use "text" as default type', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('should apply required attribute when required is true', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          required: true
        }
      })
      expect(wrapper.find('input').attributes('required')).toBeDefined()
    })

    it('should apply disabled attribute when disabled is true', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          disabled: true
        }
      })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('should set correct name attributes', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test-name',
          label: 'Test'
        }
      })
      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe('test-name')
    })

    it('should apply initial value through vee-validate', () => {
      mockUseField.mockReturnValue({
        value: ref('initial value'),
        errorMessage: ref(''),
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          value: 'initial value'
        }
      })
      expect(wrapper.find('input').element.value).toBe('initial value')
    })
  })

  describe('CSS classes testing', () => {
    it('should apply disabled classes when disabled is true', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          disabled: true
        }
      })
      const input = wrapper.find('input')
      expect(input.classes()).toContain('bg-gray-100')
      expect(input.classes()).toContain('cursor-not-allowed')
    })

    it('should apply base classes by default', () => {
      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      const input = wrapper.find('input')
      expect(input.classes()).toContain('block')
      expect(input.classes()).toContain('w-full')
      expect(input.classes()).toContain('rounded-md')
    })
  })

  describe('Error state testing', () => {
    it('should display error message when field has errors', () => {
      mockUseField.mockReturnValue({
        value: ref('test value'),
        errorMessage: ref('This field is required'),
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      expect(wrapper.find('p.text-red-600').text()).toBe('This field is required')
      const input = wrapper.find('input')
      expect(input.classes()).toContain('border-red-300')
      expect(input.classes()).toContain('text-red-900')
    })

    it('should apply error classes when there is an error message', () => {
      mockUseField.mockReturnValue({
        value: ref(''),
        errorMessage: ref('Invalid input'),
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('border-red-300')
      expect(input.classes()).toContain('focus:border-red-500')
      expect(input.classes()).toContain('focus:ring-red-500')
    })
  })

  describe('Success state testing', () => {
    it('should display success message when field is valid', () => {
      mockUseField.mockReturnValue({
        value: ref('valid content'),
        errorMessage: ref(''),
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: true }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test',
          successMessage: 'Field is valid!'
        }
      })
      expect(wrapper.find('p.text-green-600').text()).toBe('Field is valid!')
    })

    it('should apply success classes when field is valid', () => {
      mockUseField.mockReturnValue({
        value: ref('valid content'),
        errorMessage: ref(''),
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: true }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const input = wrapper.find('input')
      expect(input.classes()).toContain('border-green-300')
      expect(input.classes()).toContain('focus:border-green-500')
      expect(input.classes()).toContain('focus:ring-green-500')
    })
  })

  describe('Event handling', () => {
    it('should call handleChange when input event occurs', async () => {
      const mockHandleChange = vi.fn()
      
      mockUseField.mockReturnValue({
        value: ref(''),
        errorMessage: ref(''),
        handleBlur: vi.fn(),
        handleChange: mockHandleChange,
        meta: { valid: false }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const input = wrapper.find('input')
      await input.trigger('input')

      expect(mockHandleChange).toHaveBeenCalled()
    })

    it('should call handleBlur when blur event occurs', async () => {
      const mockHandleBlur = vi.fn()
      
      mockUseField.mockReturnValue({
        value: ref(''),
        errorMessage: ref(''),
        handleBlur: mockHandleBlur,
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextInput, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const input = wrapper.find('input')
      await input.trigger('blur')

      expect(mockHandleBlur).toHaveBeenCalled()
    })
  })
  describe('Input behavior', () => {
  it('should update value on user input and mark as valid (success)', async () => {
    const valueRef = ref('')
    const mockHandleChange = vi.fn((e) => {
      valueRef.value = e.target.value
    })

    mockUseField.mockReturnValue({
      value: valueRef,
      errorMessage: ref(''),
      handleBlur: vi.fn(),
      handleChange: mockHandleChange,
      meta: { valid: true, touched: true }
    })

    const wrapper = mount(TextInput, {
      props: {
        name: 'email',
        label: 'Email'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('user@example.com')

    expect(mockHandleChange).toHaveBeenCalled()
    expect(valueRef.value).toBe('user@example.com')
    expect(input.classes()).toContain('border-green-300')
  })

  it('should update value on user input and show error (failure)', async () => {
    const valueRef = ref('')
    const errorMessageRef = ref('Invalid email')
    const mockHandleChange = vi.fn((e) => {
      valueRef.value = e.target.value
      errorMessageRef.value = 'Invalid email'
    })

    mockUseField.mockReturnValue({
      value: valueRef,
      errorMessage: errorMessageRef,
      handleBlur: vi.fn(),
      handleChange: mockHandleChange,
    })

    const wrapper = mount(TextInput, {
      props: {
        name: 'email',
        label: 'Email'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('bademail')

    expect(mockHandleChange).toHaveBeenCalled()
    expect(valueRef.value).toBe('bademail')
    expect(wrapper.find('p.text-red-600').text()).toBe('Invalid email')
    expect(input.classes()).toContain('border-red-300')
  })
})


  
})