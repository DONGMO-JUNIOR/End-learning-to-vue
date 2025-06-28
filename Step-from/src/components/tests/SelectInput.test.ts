import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectInput from '../forms/SelectInput.vue'

vi.mock('vee-validate', () => ({
  useField: vi.fn()
}))

import { useField } from 'vee-validate'

const mockUseField = useField as ReturnType<typeof vi.fn>

// Options de test par défaut
const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true }
]

describe('SelectInput', () => {
  beforeEach(() => {
    // Reset du mock avant chaque test
    vi.clearAllMocks()
    
    // Mock par défaut pour tous les tests
    mockUseField.mockReturnValue({
      value: { value: '' },
      errorMessage: { value: undefined },
      handleBlur: vi.fn(),
      handleChange: vi.fn(),
      meta: { valid: false }
    })
  })

  describe('Basic rendering', () => {
    it('should render correctly', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test Label',
          options: defaultOptions
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should display the label', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'My Label',
          options: defaultOptions
        }
      })
      expect(wrapper.find('label').text()).toContain('My Label')
    })

    it('should display required asterisk when required is true', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          required: true,
          options: defaultOptions
        }
      })
      const asterisk = wrapper.find('span.text-red-500')
      expect(asterisk.exists()).toBe(true)
      expect(asterisk.text()).toBe('*')
    })

    it('should not display asterisk when required is false', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          required: false,
          options: defaultOptions
        }
      })
      expect(wrapper.find('span.text-red-500').exists()).toBe(false)
    })

    it('should render select element', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      expect(wrapper.find('select').exists()).toBe(true)
    })

    it('should display default placeholder', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      const placeholderOption = wrapper.find('option[value=""]')
      expect(placeholderOption.exists()).toBe(true)
      expect(placeholderOption.text()).toBe('Sélectionnez une option')
    })

    it('should display custom placeholder', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          placeholder: 'Choisissez votre option',
          options: defaultOptions
        }
      })
      const placeholderOption = wrapper.find('option[value=""]')
      expect(placeholderOption.text()).toBe('Choisissez votre option')
    })
  })

  describe('Options rendering', () => {
    it('should render all options correctly', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      
      const options = wrapper.findAll('option')
      // +1 pour l'option placeholder
      expect(options).toHaveLength(defaultOptions.length + 1)
      
      // Vérifier les labels des options (en excluant le placeholder)
      const optionLabels = options.slice(1).map(option => option.text())
      expect(optionLabels).toEqual(['Option 1', 'Option 2', 'Option 3'])
    })

    it('should set correct values for options', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      
      const options = wrapper.findAll('option')
      // Vérifier les valeurs (en excluant le placeholder)
      const optionValues = options.slice(1).map(option => option.attributes('value'))
      expect(optionValues).toEqual(['option1', 'option2', 'option3'])
    })

    it('should handle disabled options', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      
      const disabledOption = wrapper.find('option[value="option3"]')
      expect(disabledOption.attributes('disabled')).toBeDefined()
    })

    it('should handle enabled options', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      
      const enabledOption = wrapper.find('option[value="option1"]')
      expect(enabledOption.attributes('disabled')).toBeUndefined()
    })

    it('should render with empty options array', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: []
        }
      })
      
      const options = wrapper.findAll('option')
      expect(options).toHaveLength(1) // Seulement l'option placeholder
    })
  })

  describe('Props testing', () => {
    it('should apply required attribute when required is true', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          required: true,
          options: defaultOptions
        }
      })
      expect(wrapper.find('select').attributes('required')).toBeDefined()
    })

    it('should apply disabled attribute when disabled is true', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          disabled: true,
          options: defaultOptions
        }
      })
      expect(wrapper.find('select').attributes('disabled')).toBeDefined()
    })

    it('should set correct name and id attributes', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test-name',
          label: 'Test',
          options: defaultOptions
        }
      })
      const select = wrapper.find('select')
      expect(select.attributes('name')).toBe('test-name')
      expect(select.attributes('id')).toBe('test-name')
    })

    it('should apply initial value through vee-validate', () => {
      mockUseField.mockReturnValue({
        value: { value: 'option2' },
        errorMessage: { value: undefined },
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          value: 'option2',
          options: defaultOptions
        }
      })
      
      expect(mockUseField).toHaveBeenCalledWith(
        expect.objectContaining({ value: 'test' }),
        undefined,
        { initialValue: 'option2' }
      )
    })
  })

  describe('CSS classes testing', () => {
    it('should apply disabled classes when disabled is true', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          disabled: true,
          options: defaultOptions
        }
      })
      const select = wrapper.find('select')
      expect(select.classes()).toContain('bg-gray-100')
      expect(select.classes()).toContain('cursor-not-allowed')
    })

    it('should apply base classes by default', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      const select = wrapper.find('select')
      expect(select.classes()).toContain('block')
      expect(select.classes()).toContain('w-full')
      expect(select.classes()).toContain('rounded-md')
      expect(select.classes()).toContain('border-gray-300')
    })
  })

  describe('Error state testing', () => {
    it('should display error message when field has errors', () => {
      mockUseField.mockReturnValue({
        value: { value: 'test value' },
        errorMessage: { value: 'This field is required' },
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })
      
      const select = wrapper.find('select')
      expect(select.classes()).toContain('border-red-300')
      expect(select.classes()).toContain('text-red-900')
    })

    it('should apply error classes when there is an error message', () => {
      mockUseField.mockReturnValue({
        value: { value: '' },
        errorMessage: { value: 'Invalid selection' },
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })

      const select = wrapper.find('select')
      expect(select.classes()).toContain('border-red-300')
      expect(select.classes()).toContain('focus:border-red-500')
      expect(select.classes()).toContain('focus:ring-red-500')
      expect(select.classes()).toContain('placeholder-red-300')
    })
  })


  describe('Default state testing', () => {
    it('should render with default vee-validate state', () => {
      mockUseField.mockReturnValue({
        value: { value: '' },
        errorMessage: { value: undefined },
        handleBlur: vi.fn(),
        handleChange: vi.fn(),
        meta: { valid: false }
      })

      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })

      expect(wrapper.find('p.text-red-600').exists()).toBe(true)
      expect(wrapper.find('p.text-green-600').exists()).toBe(false)
      const select = wrapper.find('select')
      expect(select.classes()).toContain('border-gray-300')
    })
  })

  describe('Accessibility testing', () => {
    it('should have correct label association', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test-select',
          label: 'Test Select',
          options: defaultOptions
        }
      })

      const label = wrapper.find('label')
      const select = wrapper.find('select')
      
      expect(label.attributes('for')).toBe('test-select')
      expect(select.attributes('id')).toBe('test-select')
    })

    it('should have placeholder option disabled', () => {
      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: defaultOptions
        }
      })

      const placeholderOption = wrapper.find('option[value=""]')
      expect(placeholderOption.attributes('disabled')).toBeDefined()
    })
  })

  describe('Edge cases', () => {
    it('should handle options with special characters', () => {
      const specialOptions = [
        { value: 'special-1', label: 'Option with "quotes"' },
        { value: 'special-2', label: "Option with 'apostrophe'" },
        { value: 'special-3', label: 'Option with <tags>' }
      ]

      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: specialOptions
        }
      })

      const options = wrapper.findAll('option')
      expect(options[1].text()).toBe('Option with "quotes"')
      expect(options[2].text()).toBe("Option with 'apostrophe'")
      expect(options[3].text()).toBe('Option with <tags>')
    })

    it('should handle empty option labels', () => {
      const emptyLabelOptions = [
        { value: 'empty', label: '' },
        { value: 'normal', label: 'Normal Option' }
      ]

      const wrapper = mount(SelectInput, {
        props: {
          name: 'test',
          label: 'Test',
          options: emptyLabelOptions
        }
      })

      const options = wrapper.findAll('option')
      expect(options[1].text()).toBe('')
      expect(options[2].text()).toBe('Normal Option')
    })
  })
})