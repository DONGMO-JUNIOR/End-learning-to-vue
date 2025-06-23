import { mount } from '@vue/test-utils'
import { describe, it, expect,vi } from 'vitest'
import AboutSection from '../AboutSection.vue'

const mockT = (key: string) => key


vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: mockT
  })
}))

describe('AboutSection', () => {
  it('Should render correctly', () => {
    const wrapper = mount(AboutSection, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('Should display the title and description', () => {
    const wrapper = mount(AboutSection, {
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('Should show stats when showStats is true', () => {
    const wrapper = mount(AboutSection, {
      props: {
        showStats: true
      },
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    expect(wrapper.find('[data-testid="stats"]').exists()).toBe(true)
  })

  it('Should hide stats when showStats is false', () => {
    const wrapper = mount(AboutSection, {
      props: {
        showStats: false
      },
      global: {
        mocks: {
          t: mockT
        }
      }
    })
    
    expect(wrapper.find('[data-testid="stats"]').exists()).toBe(false)
  })
})