import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ContactForm from '@/components/forms/ContactForm.vue'
import type { VueWrapper } from '@vue/test-utils'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      contact: {
        title: 'Contact Us',
        submit: 'Send Message',
        success: 'Message sent successfully!',
        error: 'An error occurred. Please try again.',
        fields: {
          name: {
            label: 'Full Name',
            placeholder: 'Your full name',
            success: 'Looks good!',
            errors: {
              required: 'Name is required',
              min: 'Too short (minimum 2 characters)',
              max: 'Too long (maximum 50 characters)'
            }
          },
          email: {
            label: 'Email',
            placeholder: 'example@domain.com',
            success: 'Valid email!',
            errors: {
              required: 'Email is required',
              invalid: 'Invalid email format'
            }
          },
          phone: {
            label: 'Phone',
            placeholder: '6XX XXX XXX',
            success: 'Valid phone!',
            errors: {
              required: 'Phone is required',
              invalid: 'Invalid format. Use: 237XXXXXXXXX or 6XXXXXXXX'
            }
          },
          message: {
            label: 'Message',
            placeholder: 'Your message here...',
            success: 'Message is valid!',
            errors: {
              required: 'Message is required',
              min: 'Too short (minimum 10 characters)',
              max: 'Too long (maximum 500 characters)'
            }
          }
        }
      }
    }
  }
})

describe('ContactForm.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ContactForm, {
      global: { plugins: [i18n] }
    })
  })

  
  const fillValidForm = async () => {
    await wrapper.find('[data-testid="contact-name-input"] input').setValue('John Doe')
    await wrapper.find('[data-testid="contact-email-input"] input').setValue('john@example.com')
    await wrapper.find('[data-testid="contact-phone-input"] input').setValue('699123456')
    await wrapper.find('[data-testid="contact-message-input"] textarea').setValue('This is a valid message with enough characters.')
  }

  const waitForValidation = async (delay = 100) => {
    await new Promise(resolve => setTimeout(resolve, delay))
    await wrapper.vm.$nextTick()
  }

  const getFormElements = () => ({
    nameInput: wrapper.find('[data-testid="contact-name-input"] input'),
    emailInput: wrapper.find('[data-testid="contact-email-input"] input'),
    phoneInput: wrapper.find('[data-testid="contact-phone-input"] input'),
    messageInput: wrapper.find('[data-testid="contact-message-input"] textarea'),
    form: wrapper.find('[data-testid="contact-form"]')
  })

  it('renders the form correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="contact-form"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="contact-form-title"]').text()).toContain('Contact Us')
  })

  it('shows validation errors on empty submit', async () => {
    const { form } = getFormElements()
    
    await form.trigger('submit')
    await waitForValidation()

    const allText = wrapper.text()
    
    expect(allText).toContain('Name is required')
    expect(allText).toContain('Email is required')
    expect(allText).toContain('Phone is required')
    expect(allText).toContain('Message is required')
  })

  it('validates individual fields correctly', async () => {
    const { form, nameInput, emailInput } = getFormElements()

    await form.trigger('submit')
    await waitForValidation()
    
   
    await nameInput.setValue('A')
    await nameInput.trigger('input')
    await nameInput.trigger('blur')
    await waitForValidation(200)
    
    const textContent = wrapper.text()
    expect(textContent).toContain('Too short (minimum 2 characters)')

    // Tester l'email avec un format invalide
    await emailInput.setValue('invalid-email')
    await emailInput.trigger('input')
    await emailInput.trigger('blur')
    await waitForValidation(200)
    
    const textContent2 = wrapper.text()
    expect(textContent2).toContain('Invalid email format')
  })

  it('submits form when valid', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const { form } = getFormElements()

    await fillValidForm()
    await waitForValidation()

    await form.trigger('submit')
    await waitForValidation()

    expect(alertSpy).toHaveBeenCalledWith('Message sent successfully!')
    alertSpy.mockRestore()
  })

  it('handles form reset after successful submission', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const { form, nameInput, emailInput, phoneInput, messageInput } = getFormElements()

    await fillValidForm()

    await form.trigger('submit')
    await waitForValidation()
    expect(nameInput.attributes('value') || '').toBe('')
    expect(emailInput.attributes('value') || '').toBe('')
    expect(phoneInput.attributes('value') || '').toBe('')
    expect(messageInput.text()).toBe('')

    alertSpy.mockRestore()
  })
})