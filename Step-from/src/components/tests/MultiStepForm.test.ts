import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MultiStepForm from '../forms/MultiStepForm/MultiStep.vue'

// Mock des sous-composants
vi.mock('../StepOne.vue', () => ({
  default: {
    name: 'StepOne',
    template: '<div><button @click="$emit(\'next-step\', { nom: \'Alice\', prenom: \'Dupont\' })">Next</button></div>'
  }
}))
vi.mock('../StepTwo.vue', () => ({
  default: {
    name: 'StepTwo',
    template: '<div><button @click="$emit(\'next-step\', { nom: \'Parent\', email: \'p@example.com\', telephone: \'1234567890\', password: \'secret\' })">Next</button></div>'
  }
}))
vi.mock('../StepThree.vue', () => ({
  default: {
    name: 'StepThree',
    template: '<div><button @click="$emit(\'submit-form\', { classe: \'CE1\', serie: \'A\' })">Submit</button></div>'
  }
}))
vi.mock('../ProgressBarre.vue', () => ({
  default: {
    name: 'ProgressBarre',
    template: '<div class="progress-bar">Progress</div>'
  }
}))

describe('MultiStepForm.vue', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('passe par toutes les étapes et soumet les données', async () => {
    const push = vi.fn()
    const wrapper = mount(MultiStepForm, {
      global: {
        mocks: {
          $router: { push }
        }
      }
    })

    // Étape 1 ➜ 2
    await wrapper.find('button').trigger('click')
    expect(wrapper.html()).toContain('StepTwo')

    // Étape 2 ➜ 3
    await wrapper.find('button').trigger('click')
    expect(wrapper.html()).toContain('StepThree')

    // Étape 3 ➜ Soumission + Redirection
    await wrapper.find('button').trigger('click')
    expect(push).toHaveBeenCalledWith('/welcome')

    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    expect(savedUsers).toHaveLength(1)
    expect(savedUsers[0].parentInfo.email).toBe('p@example.com')
  })

  it('sauvegarde les données dans le localStorage à chaque étape', async () => {
    const wrapper = mount(MultiStepForm)

    await wrapper.find('button').trigger('click') // Étape 1 ➜ 2
    const savedData = JSON.parse(localStorage.getItem('formData')!)
    expect(savedData.childInfo.nom).toBe('Alice')
    expect(localStorage.getItem('currentStep')).toBe('2')
  })

  it('ne permet pas la soumission si email existe déjà', async () => {
    // Ajoute un utilisateur existant dans localStorage
    localStorage.setItem('registeredUsers', JSON.stringify([
      { parentInfo: { email: 'p@example.com' } }
    ]))

    const wrapper = mount(MultiStepForm)

    await wrapper.find('button').trigger('click') // Step 1 ➜ 2
    await wrapper.find('button').trigger('click') // Step 2 ➜ 3
    await wrapper.find('button').trigger('click') // Step 3 ➜ submit

    const users = JSON.parse(localStorage.getItem('registeredUsers')!)
    expect(users).toHaveLength(1) // Pas de doublon
  })
})
