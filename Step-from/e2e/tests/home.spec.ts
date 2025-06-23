import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.describe('Page d\'accueil', () => {
  test('Affichage de la page d\'accueil', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    
    // Attendre que le contenu soit chargé
    await page.waitForTimeout(2000)

    // Vérifier que la page est chargée en cherchant le logo
    await expect(page.locator('text=NIOR')).toBeVisible()

    // Navigation items - utiliser des sélecteurs plus spécifiques
    // Chercher dans la navigation seulement
    const nav = page.locator('nav')
    
    await expect(nav.getByText('Home')).toBeVisible()
    await expect(nav.getByText('About Us')).toBeVisible()
    await expect(nav.getByText('Program')).toBeVisible()
    await expect(nav.getByText('Contact Us')).toBeVisible()
    
    // Boutons d'authentification
    await expect(page.getByRole('link', { name: /log in|connexion/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /register|inscription/i })).toBeVisible()
  })

  test('Redirection vers About Us', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Cliquer sur le lien About Us dans la navigation
    const nav = page.locator('nav')
    await nav.getByText('About Us').click()
    
    // Vérifier l'URL
    await expect(page).toHaveURL(/.*about/i)
    
    // Attendre le chargement de la page
    await page.waitForLoadState('networkidle')
  })

  test('Redirection vers Program', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Cliquer sur le lien Program dans la navigation
    const nav = page.locator('nav')
    await nav.getByText('Program').click()
    
    // Vérifier l'URL
    await expect(page).toHaveURL(/.*programme/i)
    
    // Attendre le chargement de la page
    await page.waitForLoadState('networkidle')
  })

  test('Redirection vers Contact Us', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Cliquer sur le lien Contact Us dans la navigation
    const nav = page.locator('nav')
    await nav.getByText('Contact Us').click()
    
    // Vérifier l'URL
    await expect(page).toHaveURL(/.*contact/i)
    
    // Attendre le chargement de la page
    await page.waitForLoadState('networkidle')
  })

  test('Redirection vers Sign In', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Cliquer sur le bouton Log In
    await page.getByRole('link', { name: /log in/i }).click()
    
    // Vérifier l'URL (noter la faute de frappe dans votre route)
    await expect(page).toHaveURL(/.*singnIn/i)
    
    // Attendre le chargement de la page
    await page.waitForLoadState('networkidle')
  })

  test('Redirection vers Register', async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Cliquer sur le bouton Register
    await page.getByRole('link', { name: /register/i }).click()
    
    // Vérifier l'URL
    await expect(page).toHaveURL(/.*signup/i)
    
    // Attendre le chargement de la page
    await page.waitForLoadState('networkidle')
  })
})