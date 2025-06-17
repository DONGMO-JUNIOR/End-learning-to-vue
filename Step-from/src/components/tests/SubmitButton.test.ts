import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubmitButton from '../ui/SubmitButton.vue'

describe('SubmitButton.vue', () => {
  it('affiche le texte du bouton via la prop text', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        text: 'Envoyer'
      }
    })
    
    expect(wrapper.text()).toContain('Envoyer')
  })

  it('affiche le contenu du slot si fourni', () => {
    const wrapper = mount(SubmitButton, {
      slots: {
        default: 'Cliquez ici'
      }
    })
    
    expect(wrapper.text()).toContain('Cliquez ici')
  })

  it('émet un événement click quand on clique', async () => {
    const wrapper = mount(SubmitButton)
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('affiche l\'état désactivé quand disabled=true', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        disabled: true
      }
    })
    
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').classes()).toContain('opacity-50')
    expect(wrapper.find('button').classes()).toContain('cursor-not-allowed')
  })

  it('applique les classes personnalisées via customClass', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        customClass: 'bg-red-500 hover:bg-red-700 focus:ring-red-500'
      }
    })
    
    expect(wrapper.find('button').classes()).toContain('bg-red-500')
    expect(wrapper.find('button').classes()).toContain('hover:bg-red-700')
    expect(wrapper.find('button').classes()).toContain('focus:ring-red-500')
  })

  it('affiche le type par défaut (button)', () => {
    const wrapper = mount(SubmitButton)
    
    expect(wrapper.find('button').attributes('type')).toBe('button')
  })

  it('accepte différents types via la prop type', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        type: 'submit'
      }
    })
    
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })
})