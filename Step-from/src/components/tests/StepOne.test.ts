import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import StepOne from '../forms/MultiStepForm/StepOne.vue'

// Mock components
const mockTextInput = {
  template: '<input :name="name" :placeholder="placeholder" v-model="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
  props: ['name', 'label', 'placeholder', 'required', 'modelValue'],
  emits: ['update:modelValue']
}

const mockSubmitButton = {
  template: '<button type="submit"><slot>{{ text }}</slot></button>',
  props: ['text', 'type']
}

const mockForm = {
  template: '<form @submit.prevent="handleSubmit"><slot /></form>',
  props: ['validationSchema'],
  emits: ['submit'],
  data() {
    return {
      values: {} as Record<string, any>
    }
  },
  methods: {
    handleSubmit(this: any) {
      this.$emit('submit', this.values)
    }
  }
}

// Mock translations
const messages = {
  en: {
    childForm: {
      title: 'Child Information',
      fields: {
        nom: {
          label: 'Last Name',
          placeholder: 'Enter last name',
          errors: {
            required: 'Last name is required',
            min: 'Last name must be at least 4 characters'
          }
        },
        prenom: {
          label: 'First Name',
          placeholder: 'Enter first name',
          errors: {
            required: 'First name is required',
            min: 'First name must be at least 4 characters'
          }
        }
      },
      submit: 'Next'
    }
  }
}

const i18n = createI18n({
  locale: 'en',
  messages
})

describe('ChildForm', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(StepOne, {
      global: {
        plugins: [i18n],
        components: {
          Form: mockForm,
          TextInput: mockTextInput,
          SubmitButton: mockSubmitButton
        }
      }
    })
  })

  it('should render the component with title', () => {
    expect(wrapper.find('h2').text()).toBe('Child Information')
  })

  it('should render form fields with correct labels and placeholders', () => {
    const nomInput = wrapper.find('input[name="nom"]')
    const prenomInput = wrapper.find('input[name="prenom"]')

    expect(nomInput.exists()).toBe(true)
    expect(prenomInput.exists()).toBe(true)
    expect(nomInput.attributes('placeholder')).toBe('Enter last name')
    expect(prenomInput.attributes('placeholder')).toBe('Enter first name')
  })

  it('should successfully submit form with valid data', async () => {
    const validData = {
      nom: 'Johnson',
      prenom: 'John'
    }
    
    const submitSpy = vi.spyOn(wrapper.vm, 'submitForm')
    wrapper.vm.submitForm(validData)
    
    expect(submitSpy).toHaveBeenCalledWith(validData)
    expect(wrapper.emitted('nextStep')).toBeTruthy()
    expect(wrapper.emitted('nextStep')?.[0]?.[0]).toEqual(validData)
  })

it('should handle validation errors when user enters empty fields', async () => {
    const nomInput = wrapper.find('input[name="nom"]')
    const prenomInput = wrapper.find('input[name="prenom"]')
    const form = wrapper.find('form')
    
    await nomInput.setValue('')
    await prenomInput.setValue('')
    
    await form.trigger('submit')
    
    expect(wrapper.emitted('nextStep')).toBeFalsy()
  })

  it('should handle validation errors when user enters short values', async () => {
    const nomInput = wrapper.find('input[name="nom"]')
    const prenomInput = wrapper.find('input[name="prenom"]')
    const form = wrapper.find('form')
    
    // User enters values that are too short (less than 4 characters)
    await nomInput.setValue('Doe')
    await prenomInput.setValue('Jo')
    
    // User submits the form
    await form.trigger('submit')
    
    // Form should not emit nextStep due to validation errors
    expect(wrapper.emitted('nextStep')).toBeFalsy()
  })

  it('should emit nextStep event when form is submitted with valid data', async () => {
    const validChildInfo = {
      nom: 'Smith',
      prenom: 'Jane'
    }

    // Simulate successful form submission
    await wrapper.vm.submitForm(validChildInfo)
    
    expect(wrapper.emitted('nextStep')).toBeTruthy()
    expect(wrapper.emitted('nextStep')?.[0]?.[0]).toEqual(validChildInfo)
  })

  it('should have proper validation schema configured', () => {

    expect(wrapper.vm.schema).toBeDefined()
    
    const schemaFields = wrapper.vm.schema.fields
    expect(schemaFields.nom).toBeDefined()
    expect(schemaFields.prenom).toBeDefined()
  })

  it('should apply correct CSS classes for styling', () => {
    const container = wrapper.find('div')
    expect(container.classes()).toContain('border-l-blue-500')
    expect(container.classes()).toContain('bg-gradient-to-br')
    expect(container.classes()).toContain('from-white')
    expect(container.classes()).toContain('to-blue-50')
  })
})