import { test, expect } from '@playwright/test'

test.describe('Page Mot de passe oublié', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password')
  })

 test('Affiche un message d\'erreur si l\'email est invalide', async ({ page }) => {
    await page.getByTestId('contact-email-input').locator('input').fill('email-invalide')

   await page.getByTestId('contact-submit-button').click()
   await page.waitForTimeout(1000)

    const errorMessage = page.locator('p.text-red-700') 
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 })

  })


  test('Soumission valide et affichage du message de succès', async ({ page }) => {
    const input = page.getByTestId('contact-email-input').locator('input')
    await input.fill('exemple@mail.com')

    await page.getByTestId('contact-submit-button').click()

    const successAlert = page.locator('.bg-green-50')
    await expect(successAlert).toBeVisible({ timeout: 5000 })
    await expect(successAlert).toContainText('exemple@mail.com')
  })

 test('Redirection vers la page de connexion', async ({ page }) => {
  // Utilisez directement le texte attendu (en français ou la langue par défaut)
  const retourBtn = page.getByRole('button', { name: /Se connecter|Log in/i })
  
  await retourBtn.waitFor({ state: 'visible' })
  
  await Promise.all([
    page.waitForURL(/SingnIn/i, { timeout: 5000 }),
    retourBtn.click()
  ])
  
  await expect(page).toHaveURL(/SingnIn/i)
})
})

