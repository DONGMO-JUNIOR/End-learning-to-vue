import { test, expect } from '@playwright/test'

test.describe('Formulaire de contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact') 
  })

  test('soumet avec succès un formulaire valide', async ({ page }) => {
    await page.getByTestId('contact-name-input').locator('input').fill('Jean Dupont')
    await page.getByTestId('contact-email-input').locator('input').fill('jean@example.com')
    await page.getByTestId('contact-phone-input').locator('input').fill('+237699999999')
    await page.getByTestId('contact-message-input').locator('textarea').fill('Bonjour, ceci est un test message valide.')

    let dialogAppeared = false
    let dialogMessage = ''
    page.on('dialog', async dialog => {
      dialogAppeared = true
      dialogMessage = dialog.message()
      await dialog.accept()
    })

    await page.getByTestId('contact-submit-button').click()

    await page.waitForTimeout(3000)
    expect(dialogAppeared).toBe(true)
    expect(dialogMessage).toMatch(/envoyé|merci|success/i)
  })

  test('affiche les erreurs si les champs sont vides', async ({ page }) => {
    await page.getByTestId('contact-submit-button').click()
    const errorMessage = page.locator('text=/requis|required|obligatoire/i')
    await expect(errorMessage.first()).toBeVisible()
  })

  test('valide les formats (email, téléphone)', async ({ page }) => {
    
    await page.getByTestId('contact-name-input').locator('input').fill('J')
    await page.getByTestId('contact-email-input').locator('input').fill('email-invalide')
    await page.getByTestId('contact-phone-input').locator('input').fill('123')
    await page.getByTestId('contact-message-input').locator('textarea').fill('court')

    await page.getByTestId('contact-submit-button').click()

    await page.waitForTimeout(1000)
    const errorMessages = page.locator('p.text-red-600')
    
    await expect(errorMessages.first()).toBeVisible({ timeout: 5000 })
        const errorCount = await errorMessages.count()
    expect(errorCount).toBeGreaterThanOrEqual(2) 
        const errorTexts = await errorMessages.allTextContents()
    console.log('Messages d\'erreur trouvés:', errorTexts)
  })
})