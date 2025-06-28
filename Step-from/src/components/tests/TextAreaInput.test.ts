import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TextArea from '../forms/TextAreaInput.vue'
 
import { ref } from 'vue'
import { useField } from 'vee-validate'

// Mock de vee-validate
vi.mock('vee-validate', () => ({
  useField: vi.fn()
}))

const mockUseField = useField as ReturnType<typeof vi.fn>

describe('TextInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    mockUseField.mockReturnValue({
      value: ref(''),
      errorMessage: ref(''),
      handleBlur: vi.fn(),
      handleChange: vi.fn(),
      meta: { valid: false, touched: false, dirty: false }
    })
  })


  // Tests de base des props (comme TextInput)
  describe('Basic rendering', () => {
    it('should render correctly', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test Label'
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should display the label', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'My Label'
        }
      })
      expect(wrapper.find('label').text()).toContain('My Label')
    })

    it('should display required asterisk when required is true', () => {
      const wrapper = mount(TextArea, {
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
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          required: false
        }
      })
      expect(wrapper.find('span.text-red-500').exists()).toBe(false)
    })

    it('should render textarea element', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('should display placeholder text', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          placeholder: 'Enter your message'
        }
      })
      expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter your message')
    })
  })

  describe('Props testing', () => {
    it('should use default rows value of 4', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      expect(wrapper.find('textarea').attributes('rows')).toBe('4')
    })

    it('should apply custom rows value', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          rows: 6
        }
      })
      expect(wrapper.find('textarea').attributes('rows')).toBe('6')
    })

    it('should apply required attribute when required is true', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          required: true
        }
      })
      expect(wrapper.find('textarea').attributes('required')).toBeDefined()
    })

    it('should apply disabled attribute when disabled is true', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          disabled: true
        }
      })
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    })

    it('should set correct name  attributes', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test-name',
          label: 'Test'
        }
      })
      const textarea = wrapper.find('textarea')
      expect(textarea.attributes('name')).toBe('test-name')
    })

    it('should apply initial value through vee-validate', () => {
      mockUseField.mockReturnValue({
        value: 'initial message',
        errorMessage: undefined,
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          value: 'initial message'
        }
      })
      expect(wrapper.find('textarea').element.value).toBe('initial message')
    })
  })

  describe('CSS classes testing', () => {
    it('should apply disabled classes when disabled is true', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test',
          disabled: true
        }
      })
      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('bg-gray-100')
      expect(textarea.classes()).toContain('cursor-not-allowed')
    })

    it('should apply base classes by default', () => {
      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('block')
      expect(textarea.classes()).toContain('w-full')
      expect(textarea.classes()).toContain('rounded-md')
      expect(textarea.classes()).toContain('border-gray-300')
    })
  })

  describe('Error state testing', () => {
    it('should display error message when field has errors', () => {
      // Mock pour simuler un état d'erreur
      mockUseField.mockReturnValue({
        value: 'test value',
        errorMessage: 'This field is required',
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })
      expect(wrapper.find('p.text-red-600').text()).toBe('This field is required')
      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('border-red-300')
      expect(textarea.classes()).toContain('text-red-900')
    })

    it('should apply error classes when there is an error message', () => {
      mockUseField.mockReturnValue({
        value: '',
        errorMessage: 'Invalid input',
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('border-red-300')
      expect(textarea.classes()).toContain('focus:border-red-500')
      expect(textarea.classes()).toContain('focus:ring-red-500')
    })
  })

  describe('Success state testing', () => {
    it('should display success message when field is valid', () => {
      mockUseField.mockReturnValue({
        value: 'valid content',
        errorMessage: undefined,
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: true }
      })

      const wrapper = mount(TextArea, {
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
        value: 'valid content',
        errorMessage: undefined,
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: true }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('border-green-300')
      expect(textarea.classes()).toContain('focus:border-green-500')
      expect(textarea.classes()).toContain('focus:ring-green-500')
    })
  })

  describe('Event handling', () => {
    it('should call handleChange when input event occurs', async () => {
      const mockHandleChange = vi.fn()
      
      mockUseField.mockReturnValue({
        value: '',
        errorMessage: undefined,
        handleBlur: vi.fn(),
        handleChange: mockHandleChange,
        meta: { valid: false }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const textarea = wrapper.find('textarea')
      await textarea.trigger('input')

      expect(mockHandleChange).toHaveBeenCalled()
    })

    it('should call handleBlur when blur event occurs', async () => {
      const mockHandleBlur = vi.fn()
      
      mockUseField.mockReturnValue({
        value: '',
        errorMessage: undefined,
        handleBlur: mockHandleBlur,
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      const textarea = wrapper.find('textarea')
      await textarea.trigger('blur')

      expect(mockHandleBlur).toHaveBeenCalled()
    })
  })

  describe('Default state testing', () => {
    it('should render with default vee-validate state', () => {
      mockUseField.mockReturnValue({
        value: '',
        errorMessage: undefined,
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(TextArea, {
        props: {
          name: 'test',
          label: 'Test'
        }
      })

      expect(wrapper.find('p.text-red-600').exists()).toBe(false)
      expect(wrapper.find('p.text-green-600').exists()).toBe(false)
      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('border-gray-300')
    })
  })

  
})