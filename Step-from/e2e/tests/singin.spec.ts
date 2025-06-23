import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Cette fonction s'exécute avant chaque test
  await page.goto('/login');
  await page.evaluate(() => {
    const testUsers = [
      {
        email: 'user@example.com',
        password: 'P@ix12',
        name: 'John Doe'
      },
      {
        email: 'admin@example.com',
        password: 'Admin123!',
        name: 'Admin User'
      }
    ];
    localStorage.setItem('registeredUsers', JSON.stringify(testUsers));
    localStorage.removeItem('user'); 
  });
});

test.describe('Validation des champs', () => {
  
  test('doit valider les champs requis', async ({ page }) => {
    // Cliquer sur le bouton sans remplir les champs
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    
    // Vérifier qu'au moins un message d'erreur est visible
    const errorElements = page.locator('text=/required|requis|obligatoire/i');
    await expect(errorElements.first()).toBeVisible();
  });

  test('doit valider le format de l\'email', async ({ page }) => {
    await page.fill('#signin-email', 'email-invalide');
    await page.fill('#signin-password', 'P@ix12');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(500);
    
    const emailError = page.locator('text=/email|invalid|invalide/i');
    await expect(emailError.first()).toBeVisible();
  });

  test('doit valider le format du mot de passe', async ({ page }) => {
    await page.fill('#signin-email', 'user@example.com');
    await page.fill('#signin-password', 'faible');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(500);
    
    const passwordError = page.locator('text=/password|mot de passe|pattern/i');
    await expect(passwordError.first()).toBeVisible();
  });
});

// Groupe de tests pour l'authentification
test.describe('Processus d\'authentification', () => {
  
  test('doit rejeter un utilisateur non enregistré', async ({ page }) => {
    await page.fill('#signin-email', 'nonexistent@example.com');
    await page.fill('#signin-password', 'P@ie12');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.bg-red-50 p').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('button[type="submit"]')).not.toBeDisabled();
  });

  test('doit rejeter un mot de passe incorrect', async ({ page }) => {
    await page.fill('#signin-email', 'user@example.com');
    await page.fill('#signin-password', 'P!ai2n');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.bg-red-50 p').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('button[type="submit"]')).not.toBeDisabled();
  });

  test('doit connecter un utilisateur avec des identifiants valides', async ({ page }) => {
    await page.fill('#signin-email', 'user@example.com');
    await page.fill('#signin-password', 'P@ix12');
    
    // Cocher "Se souvenir de moi" si disponible
    const rememberMe = page.locator('#remember-me');
    if (await rememberMe.isVisible()) {
      await rememberMe.check();
    }
    
    await page.click('button[type="submit"]');
    
    // Vérifier l'état de chargement
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    
    // Attendre la redirection
    await page.waitForURL('/welcome', { timeout: 10000 });
    
    // Vérifier le localStorage
    const user = await page.evaluate(() => {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    });
    
    expect(user).toBeTruthy();
    expect(user.email).toBe('user@example.com');
    expect(user.isLoggedIn).toBe(true);
  });
});

// Groupe de tests pour la navigation
test.describe('Navigation', () => {
  
  test('doit naviguer vers la page d\'inscription', async ({ page }) => {
    await page.click('button:has-text("Log in"), button:has-text("inscription")');
    await expect(page).toHaveURL('/signup');
  });

  test('doit naviguer vers la page de mot de passe oublié', async ({ page }) => {
    await page.click('button:has-text("forgot"), button:has-text("oublié")');
    await expect(page).toHaveURL('/forgot-password');
  });
});

// Groupe de tests pour l'expérience utilisateur
test.describe('Expérience utilisateur', () => {
  
  test('doit gérer l\'état de chargement', async ({ page }) => {
    await page.fill('#signin-email', 'user@example.com');
    await page.fill('#signin-password', 'P@ix12');
    
    await page.click('button[type="submit"]');
    
    // Vérifier l'état de chargement
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    
    // Vérifier le spinner
    const spinner = page.locator('.animate-spin');
    await expect(spinner).toBeVisible();
    
    await page.waitForURL('/welcome', { timeout: 10000 });
  });

  test('doit gérer la checkbox "Se souvenir de moi"', async ({ page }) => {
    const checkbox = page.locator('#remember-me');
    if (await checkbox.isVisible()) {
      await checkbox.check();
      expect(await checkbox.isChecked()).toBe(true);
      
      await checkbox.uncheck();
      expect(await checkbox.isChecked()).toBe(false);
    }
  });
});

// // Groupe de tests pour l'accessibilité
// test.describe('Accessibilité', () => {
  
//   test('doit avoir des labels appropriés', async ({ page }) => {
//     await expect(page.locator('label').first()).toBeVisible();
//   });

//   test('doit permettre la navigation au clavier', async ({ page }) => {
//     await page.focus('#signin-email');
//     await expect(page.locator('#signin-email')).toBeFocused();
    
//     await page.focus('#signin-password');
//     await expect(page.locator('#signin-password')).toBeFocused();
//   });
// });

// test('doit valider la navigation au clavier', async ({ page }) => {
//   await setupTestData(page);
  
//   // Navigation avec Tab
//   await page.press('body', 'Tab'); // Premier élément focusable
  
//   // Continuer jusqu'au champ email
//   let attempts = 0;
//   while (attempts < 10) {
//     const focused = await page.locator(':focus').getAttribute('id');
//     if (focused === 'signin-email') break;
//     await page.press('body', 'Tab');
//     attempts++;
//   }
  
//   await expect(page.locator('#signin-email')).toBeFocused();
  
//   await page.press('body', 'Tab'); // Password
//   await expect(page.locator('#signin-password')).toBeFocused();
// });

// test('doit gérer les données localStorage corrompues', async ({ page }) => {
//   await page.goto('/login');
  
//   // Corrompre les données localStorage
//   await page.evaluate(() => {
//     localStorage.setItem('registeredUsers', 'données-corrompues');
//   });
  
//   // Tenter de se connecter
//   await page.fill('#signin-email', 'user@example.com');
//   await page.fill('#signin-password', 'Tes12!');
//   await page.click('button[type="submit"]');
  
//   // Vérifier que l'application gère gracieusement l'erreur
//   await expect(page.locator('.bg-red-50').first()).toBeVisible({ timeout: 5000 });
// });

