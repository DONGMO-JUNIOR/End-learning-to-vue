import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PhoneInput from '@/components/ui/PhoneInput.vue' 

describe('PhoneInput', () => {
  const defaultProps = {
    id: 'phone-input',
    label: 'Numéro de téléphone',
    modelValue: ''
  }

  it('devrait afficher le composant avec les props de base', () => {
    const wrapper = mount(PhoneInput, {
      props: defaultProps
    })

    expect(wrapper.find('label').text()).toBe('Numéro de téléphone')
    expect(wrapper.find('input').attributes('id')).toBe('phone-input')
    expect(wrapper.find('input').attributes('type')).toBe('tel')
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('devrait afficher le placeholder correctement', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        placeholder: '+33 1 23 45 67 89'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('+33 1 23 45 67 89')
  })

  it('devrait afficher une valeur initiale', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        modelValue: '+33123456789'
      }
    })

    expect(wrapper.find('input').element.value).toBe('+33123456789')
  })

  it('devrait afficher l\'astérisque rouge quand required est true', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        required: true
      }
    })

    const asterisk = wrapper.find('span.text-red-500')
    expect(asterisk.exists()).toBe(true)
    expect(asterisk.text()).toBe('*')
  })

  it('ne devrait pas afficher l\'astérisque quand required est false', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        required: false
      }
    })

    expect(wrapper.find('span.text-red-500').exists()).toBe(false)
  })

  it('devrait avoir l\'attribut required sur l\'input quand required est true', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        required: true
      }
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('devrait émettre update:modelValue lors de la saisie', async () => {
    const wrapper = mount(PhoneInput, {
      props: defaultProps
    })

    const input = wrapper.find('input')
    await input.setValue('+33123456789')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['+33123456789'])
  })

  it('devrait émettre plusieurs événements update:modelValue lors de saisies multiples', async () => {
    const wrapper = mount(PhoneInput, {
      props: defaultProps
    })

    const input = wrapper.find('input')
    await input.setValue('+33')
    await input.setValue('+33123')
    await input.setValue('+33123456789')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(3)
    expect(emitted?.[0]).toEqual(['+33'])
    expect(emitted?.[1]).toEqual(['+33123'])
    expect(emitted?.[2]).toEqual(['+33123456789'])
  })

  it('devrait avoir les bonnes classes CSS', () => {
    const wrapper = mount(PhoneInput, {
      props: defaultProps
    })

    const label = wrapper.find('label')
    expect(label.classes()).toContain('block')
    expect(label.classes()).toContain('text-sm')
    expect(label.classes()).toContain('font-medium')
    expect(label.classes()).toContain('text-gray-700')

    const input = wrapper.find('input')
    expect(input.classes()).toContain('mt-1')
    expect(input.classes()).toContain('block')
    expect(input.classes()).toContain('w-full')
    expect(input.classes()).toContain('rounded-md')
    expect(input.classes()).toContain('border-gray-300')
    expect(input.classes()).toContain('shadow-sm')
  })

  it('devrait associer le label à l\'input via l\'attribut for', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        id: 'test-phone'
      }
    })

    expect(wrapper.find('label').attributes('for')).toBe('test-phone')
    expect(wrapper.find('input').attributes('id')).toBe('test-phone')
  })

  it('devrait gérer les valeurs vides correctement', async () => {
    const wrapper = mount(PhoneInput, {
      props: {
        ...defaultProps,
        modelValue: '+33123456789'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('devrait avoir les valeurs par défaut correctes pour les props optionnelles', () => {
    const wrapper = mount(PhoneInput, {
      props: {
        id: 'test',
        label: 'Test',
        modelValue: ''
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBeUndefined()
    expect(wrapper.find('input').attributes('required')).toBeUndefined()
    expect(wrapper.find('span.text-red-500').exists()).toBe(false)
  })
})