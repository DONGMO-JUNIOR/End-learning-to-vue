import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProgressStep from '../forms/MultiStepForm/ProgressBarre.vue'

describe('ProgressStep', () => {
  const defaultProps = {
    currentStep: 2,
    totalSteps: 4,
    stepLabels: ['Étape 1', 'Étape 2', 'Étape 3', 'Étape 4']
  }

  it('Should render correctly', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="progress-container"]').exists()).toBe(true)
  })

  it('Should display correct number of step indicators', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    const stepIndicators = wrapper.findAll('[data-testid^="step-"]')
    expect(stepIndicators).toHaveLength(4)
  })

  it('Should display step indicators with correct status', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    const step1 = wrapper.find('[data-testid="step-1"]')
    expect(step1.attributes('data-step-status')).toBe('completed')
    expect(step1.find('[data-testid="check-1"]').exists()).toBe(true)
    
    const step2 = wrapper.find('[data-testid="step-2"]')
    expect(step2.attributes('data-step-status')).toBe('current')
    expect(step2.find('[data-testid="number-2"]').exists()).toBe(true)
    
    const step3 = wrapper.find('[data-testid="step-3"]')
    expect(step3.attributes('data-step-status')).toBe('pending')
    expect(step3.find('[data-testid="number-3"]').exists()).toBe(true)
    
    const step4 = wrapper.find('[data-testid="step-4"]')
    expect(step4.attributes('data-step-status')).toBe('pending')
    expect(step4.find('[data-testid="number-4"]').exists()).toBe(true)
  })

  it('Should display correct progress bar width', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    const progressBarFill = wrapper.find('[data-testid="progress-bar-fill"]')
    expect(progressBarFill.exists()).toBe(true)
    
    expect(progressBarFill.attributes('style')).toContain('width: 50%')
  })

  it('Should display all step labels', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    const labels = wrapper.findAll('[data-testid^="label-"]')
    expect(labels).toHaveLength(4)
    
    expect(labels[0].text()).toBe('Étape 1')
    expect(labels[1].text()).toBe('Étape 2')
    expect(labels[2].text()).toBe('Étape 3')
    expect(labels[3].text()).toBe('Étape 4')
  })

  it('Should highlight current step label', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    const currentLabel = wrapper.find('[data-testid="label-2"]')
    expect(currentLabel.attributes('data-label-status')).toBe('active')
    const inactiveLabel = wrapper.find('[data-testid="label-1"]')
    expect(inactiveLabel.attributes('data-label-status')).toBe('inactive')
  })

  it('Should work with different step configurations', () => {
    const wrapper = mount(ProgressStep, {
      props: {
        currentStep: 1,
        totalSteps: 3,
        stepLabels: ['Start', 'Middle', 'End']
      }
    })
    
    const stepIndicators = wrapper.findAll('[data-testid^="step-"]')
    expect(stepIndicators).toHaveLength(3)
    
    const progressBarFill = wrapper.find('[data-testid="progress-bar-fill"]')
    // currentStep = 1, totalSteps = 3 => 33.33%
    expect(progressBarFill.attributes('style')).toContain('width: 33.33333333333333%')
  })

  it('Should show all steps completed when currentStep equals totalSteps', () => {
    const wrapper = mount(ProgressStep, {
      props: {
        currentStep: 4,
        totalSteps: 4,
        stepLabels: ['Étape 1', 'Étape 2', 'Étape 3', 'Étape 4']
      }
    })
    
    // Les 3 premières étapes doivent être complétées
    const step1 = wrapper.find('[data-testid="step-1"]')
    const step2 = wrapper.find('[data-testid="step-2"]')
    const step3 = wrapper.find('[data-testid="step-3"]')
    
    expect(step1.attributes('data-step-status')).toBe('completed')
    expect(step2.attributes('data-step-status')).toBe('completed')
    expect(step3.attributes('data-step-status')).toBe('completed')
    
    // La dernière étape doit être courante
    const step4 = wrapper.find('[data-testid="step-4"]')
    expect(step4.attributes('data-step-status')).toBe('current')
    
    // Barre de progression à 100%
    const progressBarFill = wrapper.find('[data-testid="progress-bar-fill"]')
    expect(progressBarFill.attributes('style')).toContain('width: 100%')
  })

  it('Should have proper structure elements', () => {
    const wrapper = mount(ProgressStep, {
      props: defaultProps
    })
    
    expect(wrapper.find('[data-testid="step-indicators"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="progress-bar-container"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="progress-bar-fill"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="step-labels"]').exists()).toBe(true)
  })
})