import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckboxInput from '../ui/CheckboxInput.vue'

describe('CheckboxInput', () => {
  it('rend correctement avec les props de base', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
        label: 'Test Label',
        id: 'test-checkbox'
      }
    })

    const input = wrapper.find('input[type="checkbox"]')
    const label = wrapper.find('label')

    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('test-checkbox')
    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(label.text()).toBe('Test Label')
    expect(label.attributes('for')).toBe('test-checkbox')
  })

  it('affiche la checkbox comme cochée quand modelValue est true', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: true,
        label: 'Test Label',
        id: 'test-checkbox'
      }
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
  })

  it('émet update:modelValue avec true quand on coche la checkbox', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
        label: 'Test Label',
        id: 'test-checkbox'
      }
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('émet update:modelValue avec false quand on décoche la checkbox', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: true,
        label: 'Test Label',
        id: 'test-checkbox'
      }
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setValue(false)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('applique les bonnes classes CSS', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
        label: 'Test Label',
        id: 'test-checkbox'
      }
    })

    const container = wrapper.find('div')
    const input = wrapper.find('input')
    const label = wrapper.find('label')

    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    
    expect(input.classes()).toEqual(
      expect.arrayContaining([
        'h-4', 'w-4', 'text-blue-600', 'focus:ring-blue-500', 
        'border-gray-300', 'rounded'
      ])
    )
    
    expect(label.classes()).toEqual(
      expect.arrayContaining([
        'ml-2', 'block', 'text-sm', 'text-gray-900'
      ])
    )
  })

  it('fonctionne sans label', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
        id: 'test-checkbox'
        // pas de label
      }
    })

    const label = wrapper.find('label')
    expect(label.text()).toBe('')
  })

  it('fonctionne sans id', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
        label: 'Test Label'
        // pas d'id
      }
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')
    
    expect(input.attributes('id')).toBeUndefined()
    expect(label.attributes('for')).toBeUndefined()
  })

  it('gère le changement via événement change', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
        label: 'Test Label',
        id: 'test-checkbox'
      }
    })

    const input = wrapper.find('input')
    
    // Simule un clic qui change la valeur
    ;(input.element as HTMLInputElement).checked = true
    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })
})