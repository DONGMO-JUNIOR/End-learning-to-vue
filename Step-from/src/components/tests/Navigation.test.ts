import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Navigation from '../NavigationBar.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => ({ path: '/' })
}))

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

vi.mock('@/components/LanguageSelector.vue', () => ({
  default: { template: '<div>LanguageSelector</div>' }
}))

describe('Navigation Component', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    
    mockPush.mockClear()
    wrapper = mount(Navigation)
  })

  it('should exist and mount correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="navigation"]').exists()).toBe(true)
  })

  describe('Initial render', () => {
    it('should display DNIOR logo', () => {
      const logo = wrapper.find('[data-testid="logo"]')
      
      expect(logo.exists()).toBe(true)
      expect(logo.text()).toContain('D')
      expect(logo.text()).toContain('NIOR')
    })

    it('should display all navigation items', () => {
      expect(wrapper.find('[data-testid="nav-item-home"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="nav-item-about-us"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="nav-item-program"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="nav-item-contact-us"]').exists()).toBe(true)
    })

    it('should display login buttons', () => {
      expect(wrapper.find('[data-testid="login-button"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="register-button"]').exists()).toBe(true)
    })
  })

  describe('Navigation functionality', () => {
    it('should navigate to Home route', async () => {
      const homeLink = wrapper.find('[data-testid="nav-item-home"]')
      
      await homeLink.trigger('click')
      
      expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('should navigate to all routes', async () => {
      const testCases = [
        { testid: 'nav-item-home', route: '/' },
        { testid: 'nav-item-about-us', route: '/about' },
        { testid: 'nav-item-program', route: '/programme' },
        { testid: 'nav-item-contact-us', route: '/contact' }
      ]
      
      for (const testCase of testCases) {
        await wrapper.find(`[data-testid="${testCase.testid}"]`).trigger('click')
        expect(mockPush).toHaveBeenCalledWith(testCase.route)
        mockPush.mockClear() // Réinitialise entre chaque test
      }
    })

    it('should mark first item as active by default', () => {
      const homeLink = wrapper.find('[data-testid="nav-item-home"]')
      
      expect(homeLink.classes()).toContain('text-blue-600')
      expect(homeLink.classes()).toContain('font-semibold')
    })
  })

  describe('Responsiveness', () => {
    it('should have classes to hide navigation on mobile', () => {
      const navLinks = wrapper.find('[data-testid="nav-links"]')
      
      expect(navLinks.classes()).toContain('hidden')
      expect(navLinks.classes()).toContain('md:flex')
    })

    it('should have fixed positioning classes', () => {
      const nav = wrapper.find('[data-testid="navigation"]')
      
      expect(nav.classes()).toContain('fixed')
      expect(nav.classes()).toContain('top-0')
      expect(nav.classes()).toContain('z-50')
    })

    it('should have correct Tailwind layout classes', () => {
      const nav = wrapper.find('[data-testid="navigation"]')
      
      expect(nav.classes()).toContain('flex')
      expect(nav.classes()).toContain('justify-between')
      expect(nav.classes()).toContain('items-center')
    })
  })
})