import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckboxInput from '@/components/forms/CheckboxInput.vue'
import { useField } from 'vee-validate'
import { ref } from 'vue'

vi.mock('vee-validate', () => ({
  useField: vi.fn()
}))

const mockUseField = useField as ReturnType<typeof vi.fn>

describe('CheckboxInput', () => {
  const defaultFieldConfig = {
    value: ref(false),
    errorMessage: ref(''),
    handleBlur: vi.fn(),
    handleChange: vi.fn(),
    meta: { valid: false, touched: false, dirty: false }
  }

  const defaultProps = {
    name: 'terms',
    label: 'Accept Terms'
  }

  const createWrapper = (fieldConfig = {}, props = {}) => {
    const finalFieldConfig = { ...defaultFieldConfig, ...fieldConfig }
    mockUseField.mockReturnValue(finalFieldConfig)
    
    return mount(CheckboxInput, {
      props: { ...defaultProps, ...props }
    })
  }

  const selectors = {
    wrapper: '[data-testid="checkbox-input-wrapper"]',
    input: '[data-testid="checkbox-input"]',
    label: '[data-testid="checkbox-label"]',
    error: '[data-testid="checkbox-error"]'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.find(selectors.wrapper).exists()).toBe(true)
    expect(wrapper.find(selectors.input).exists()).toBe(true)
    expect(wrapper.find(selectors.label).text()).toBe(defaultProps.label)
  })

  it('should bind the checked value from useField', () => {
    const wrapper = createWrapper({ value: ref(true) })
    const input = wrapper.find(selectors.input) as any
    
    expect(input.element.checked).toBe(true)
  })

  it('should display error message if present', () => {
    const errorMessage = 'This field is required'
    const wrapper = createWrapper({ errorMessage: ref(errorMessage) })

    const error = wrapper.find(selectors.error)
    expect(error.exists()).toBe(true)
    expect(error.text()).toBe(errorMessage)
  })

  it('should not display error when no error message', () => {
    const wrapper = createWrapper({ errorMessage: ref('') })
    const error = wrapper.find(selectors.error)
    
    expect(error.exists()).toBe(false)
  })
})
