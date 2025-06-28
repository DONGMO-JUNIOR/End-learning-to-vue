import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AboutSection from '../AboutSection.vue'

const mockT = (key: string) => key

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: mockT
  })
}))

function mountComponent(props = {}) {
  return mount(AboutSection, {
    props,
    global: {
      mocks: {
        t: mockT
      }
    }
  })
}

describe('AboutSection', () => {
  it('Should render correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('Should display the title and description', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('Should show stats when showStats is true', () => {
    const wrapper = mountComponent({ showStats: true })
    expect(wrapper.find('[data-testid="stats"]').exists()).toBe(true)
  })

  it('Should hide stats when showStats is false', () => {
    const wrapper = mountComponent({ showStats: false })
    expect(wrapper.find('[data-testid="stats"]').exists()).toBe(false)
  })
})
