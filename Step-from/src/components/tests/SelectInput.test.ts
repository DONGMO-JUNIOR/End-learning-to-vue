import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectInput from '../ui/SelectInput.vue' // Ajuste le chemin selon ton projet

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4' }
]

describe('SelectInput', () => {
  it('rend correctement avec les props de base', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
      }
    })

    const select = wrapper.find('select')
    const label = wrapper.find('label')

    expect(select.exists()).toBe(true)
    expect(select.attributes('id')).toBe('test-select')
    expect(label.text()).toBe('Test Label')
    expect(label.attributes('for')).toBe('test-select')
  })

  it('affiche toutes les options', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
      }
    })

    const options = wrapper.findAll('option')
    
    expect(options).toHaveLength(mockOptions.length)
    
    options.forEach((option, index) => {
      expect(option.attributes('value')).toBe(mockOptions[index].value)
      expect(option.text()).toBe(mockOptions[index].label)
    })
  })

  it('affiche la valeur sélectionnée', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: 'option2',
        options: mockOptions
      }
    })

    const select = wrapper.find('select')
    expect((select.element as HTMLSelectElement).value).toBe('option2')
  })

  it('émet update:modelValue quand la sélection change', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
      }
    })

    const select = wrapper.find('select')
    await select.setValue('option1')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option1'])
  })

  it('gère les options désactivées', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
      }
    })

    const options = wrapper.findAll('option')
    const disabledOption = options[2] // option3 est désactivée
    
    expect(disabledOption.attributes('disabled')).toBeDefined()
  })

  it('affiche l\'astérisque rouge quand required est true', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions,
        required: true
      }
    })

    const requiredSpan = wrapper.find('span.text-red-500')
    expect(requiredSpan.exists()).toBe(true)
    expect(requiredSpan.text()).toBe('*')
  })

  it('n\'affiche pas l\'astérisque quand required est false', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions,
        required: false
      }
    })

    const requiredSpan = wrapper.find('span.text-red-500')
    expect(requiredSpan.exists()).toBe(false)
  })

  it('applique l\'attribut required sur le select', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions,
        required: true
      }
    })

    const select = wrapper.find('select')
    expect(select.attributes('required')).toBeDefined()
  })

  it('n\'applique pas l\'attribut required quand required est false', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions,
        required: false
      }
    })

    const select = wrapper.find('select')
    expect(select.attributes('required')).toBeUndefined()
  })

  it('applique les bonnes classes CSS', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
      }
    })

    const container = wrapper.find('div')
    const label = wrapper.find('label')
    const select = wrapper.find('select')

    expect(container.classes()).toContain('mb-4')
    
    expect(label.classes()).toEqual(
      expect.arrayContaining([
        'block', 'text-sm', 'font-medium', 'text-gray-700', 'mb-1'
      ])
    )
    
    expect(select.classes()).toEqual(
      expect.arrayContaining([
        'block', 'w-full', 'px-3', 'py-2', 'border', 'border-gray-300',
        'rounded-md', 'shadow-sm', 'focus:outline-none', 'focus:ring-blue-500',
        'focus:border-blue-500'
      ])
    )
  })

  it('fonctionne avec des options vides', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: []
      }
    })

    const options = wrapper.findAll('option')
    expect(options).toHaveLength(0)
  })

  it('gère le changement via événement change', async () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
      }
    })

    const select = wrapper.find('select')
    
    // Simule un changement de valeur
    ;(select.element as HTMLSelectElement).value = 'option2'
    await select.trigger('change')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option2'])
  })

  it('utilise les valeurs par défaut des props', () => {
    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: mockOptions
        // required et placeholder utilisent les valeurs par défaut
      }
    })

    const select = wrapper.find('select')
    const requiredSpan = wrapper.find('span.text-red-500')

    expect(select.attributes('required')).toBeUndefined() // required: false par défaut
    expect(requiredSpan.exists()).toBe(false)
  })

  it('gère les options avec des caractères spéciaux', () => {
    const specialOptions = [
      { value: 'special1', label: 'Option avec & caractères spéciaux' },
      { value: 'special2', label: 'Option avec <tags>' },
      { value: 'special3', label: 'Option avec "guillemets"' }
    ]

    const wrapper = mount(SelectInput, {
      props: {
        id: 'test-select',
        label: 'Test Label',
        modelValue: '',
        options: specialOptions
      }
    })

    const options = wrapper.findAll('option')
    
    expect(options[0].text()).toBe('Option avec & caractères spéciaux')
    expect(options[1].text()).toBe('Option avec <tags>')
    expect(options[2].text()).toBe('Option avec "guillemets"')
  })
})