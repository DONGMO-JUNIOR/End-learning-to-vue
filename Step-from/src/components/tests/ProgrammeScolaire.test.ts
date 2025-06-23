import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ProgrammeScolaire from '../ProgrammeScolaire.vue'

const mockT = (key: string) => key

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: mockT
  })
}))

describe('ProgrammeSection', () => {
  it('Should render correctly', () => {
    const wrapper = mount(ProgrammeScolaire, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('Should display the title', () => {
    const wrapper = mount(ProgrammeScolaire, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('programme.title')
  })

  it('Should display programme details correctly', () => {
    const wrapper = mount(ProgrammeScolaire, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    expect(wrapper.text()).toContain('M. DONGMO')
    expect(wrapper.text()).toContain('Mme BILL')
    expect(wrapper.text()).toContain('M. Bernard')
    expect(wrapper.text()).toContain('Mme Leroy')
    expect(wrapper.text()).toContain('Mr Smith')
    expect(wrapper.text()).toContain('08h00 - 10h00')
    expect(wrapper.text()).toContain('09h00 - 11h00')
    expect(wrapper.text()).toContain('10h00 - 12h00')
  })

  it('Should display correct stats values', () => {
    const wrapper = mount(ProgrammeScolaire, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    expect(wrapper.text()).toContain('6') 
    
    expect(wrapper.text()).toContain('6') 
    
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('5')
  })

  it('Should render programme cards with proper structure', () => {
    const wrapper = mount(ProgrammeScolaire, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    const programmeCards = wrapper.findAll('[data-testid=" program"]')
    
    programmeCards.forEach(card => {
      expect(card.find('h3').exists()).toBe(true)
      expect(card.find('span.font-medium').exists()).toBe(true)
      expect(card.find('span.italic').exists()).toBe(true)
      expect(card.find('p').text()).toMatch(/🕒/)
    })
  })

})