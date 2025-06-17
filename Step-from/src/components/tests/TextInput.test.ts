import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TextInput from '@/components/ui/TextInput.vue' 

describe('TextInput.vue', () => {
  it('affiche le label et le champ input', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'email',
        label: 'Adresse Email',
        modelValue: ''
      }
    })

    expect(wrapper.find('label').text()).toBe('Adresse Email')
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('met à jour la valeur quand l’utilisateur tape', async () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'username',
        label: 'Nom',
        modelValue: ''
      }
    })

    await wrapper.find('input').setValue('Junior')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    console.log(wrapper.emitted('update:modelValue'))

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Junior'])
  })

  it('affiche un message d’erreur si error est fourni', () => {
    const wrapper = mount(TextInput, {
      props: {
        id: 'password',
        label: 'Mot de passe',
        modelValue: '',
        error: 'Champ requis'
      }
    })

    expect(wrapper.find('p').text()).toBe('Champ requis')
  })
})