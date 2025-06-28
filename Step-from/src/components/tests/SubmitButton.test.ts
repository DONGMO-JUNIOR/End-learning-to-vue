import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubmitButton from '../forms/SubmitButton.vue'

describe('SubmitButton', () => {
  it('should render the component', () => {
    const wrapper = mount(SubmitButton)
    expect(wrapper.find('[data-testid="submit-button-container"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="submit-button"]').exists()).toBe(true)
  })

  it('should display text via prop', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        text: 'Envoyer'
      }
    })
    
    const button = wrapper.find('[data-testid="submit-button"]')
    expect(button.text()).toBe('Envoyer')
  })

  it('should display slot content when provided', () => {
    const wrapper = mount(SubmitButton, {
      slots: {
        default: 'Cliquez ici'
      }
    })
    
    const button = wrapper.find('[data-testid="submit-button"]')
    expect(button.text()).toBe('Cliquez ici')
  })

  it('should emit click event when clicked', async () => {
    const wrapper = mount(SubmitButton)
    const button = wrapper.find('[data-testid="submit-button"]')
    
    await button.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        disabled: true
      }
    })
    
    const button = wrapper.find('[data-testid="submit-button"]')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('opacity-50')
    expect(button.classes()).toContain('cursor-not-allowed')
  })

  it('should have default type button', () => {
    const wrapper = mount(SubmitButton)
    const button = wrapper.find('[data-testid="submit-button"]')
    
    expect(button.attributes('type')).toBe('button')
  })

  it('should accept different types via type prop', () => {
    const wrapper = mount(SubmitButton, {
      props: {
        type: 'submit'
      }
    })
    
    const button = wrapper.find('[data-testid="submit-button"]')
    expect(button.attributes('type')).toBe('submit')
  })
})