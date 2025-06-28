import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NotFound from '../NotFoundPage.vue'

// Mock du router au niveau du module
const mockRouter = {
  push: vi.fn(),
  back: vi.fn()
}

// Mock de vue-router au niveau du module (obligatoire)
vi.mock('vue-router', () => ({
  useRouter: () => mockRouter
}))

describe('NotFound', () => {
  let wrapper: ReturnType<typeof mount>
  beforeEach(() => {
    
    vi.clearAllMocks()
    wrapper = mount(NotFound)
    
    // Mock de window.history
    Object.defineProperty(window, 'history', {
      value: { length: 2 },
      writable: true
    })
  })

  it('should render the component', () => {
    expect(wrapper.find('[data-testid="not-found-page"]').exists()).toBe(true)
  })

  it('should display error code 404', () => {
    const errorCode = wrapper.find('[data-testid="error-code"]')
    expect(errorCode.exists()).toBe(true)
    expect(errorCode.text()).toBe('404')
  })

  it('should display error title', () => {
    const errorTitle = wrapper.find('[data-testid="error-title"]')
    expect(errorTitle.exists()).toBe(true)
    expect(errorTitle.text()).toBe('Oups ! Page non trouvée')
  })

  it('should navigate to home when home button is clicked', async () => {
    const homeButton = wrapper.find('[data-testid="home-button"]')
    
    await homeButton.trigger('click')
    
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  it('should go back when back button is clicked', async () => {
    const backButton = wrapper.find('[data-testid="back-button"]')
    
    await backButton.trigger('click')
    
    expect(mockRouter.back).toHaveBeenCalled()
  })

  it('should display quick links', () => {
    const quickLinksContainer = wrapper.find('[data-testid="quick-links-container"]')
    const aboutLink = wrapper.find('[data-testid="quick-link-à propos"]')
    const programmeLink = wrapper.find('[data-testid="quick-link-programme"]')
    const contactLink = wrapper.find('[data-testid="quick-link-contact"]')
    
    expect(quickLinksContainer.exists()).toBe(true)
    expect(aboutLink.exists()).toBe(true)
    expect(programmeLink.exists()).toBe(true)
    expect(contactLink.exists()).toBe(true)
  })

  it('should generate stars on mount', () => {
    const stars = wrapper.findAll('[data-testid="star"]')
    
    expect(stars.length).toBeLessThanOrEqual(30)
  })
})