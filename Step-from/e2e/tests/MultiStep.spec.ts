import { test, expect } from '@playwright/test';

test.describe('Multi-step Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup'); 
  });

 test('should complete the full registration journey successfully', async ({ page }) => {
  await expect(page.locator('text=Enfant')).toBeVisible();
  
  await page.locator('[data-testid="child-nom"] input').fill('Dupont');
  await page.locator('[data-testid="child-prenom"] input').fill('Jean');
  await page.click('[data-testid="next-button"]');
  await page.waitForTimeout(300);
  await page.waitForSelector('[data-testid="parent-nom"] input');
  await page.locator('[data-testid="parent-nom"] input').fill('Dupont');
  await page.locator('[data-testid="parent-email"] input').fill('parent@example.com');
  await page.locator('[data-testid="parent-telephone"] input').fill('691753506');
  await page.locator('[data-testid="parent-password"] input').fill('P@ssw1');
  await page.click('[data-testid="next-button"]');
  await page.waitForTimeout(300);

  await page.waitForSelector('[data-testid="child-classe"]');
  await page.locator('[data-testid="child-classe"] select').selectOption('6ème');
  
  await page.locator('[data-testid="child-serie"] select').selectOption('A');
  
  await page.click('[data-testid="submit-button"]');
  await page.waitForTimeout(1000);
  
await expect(page).toHaveURL('/welcome');
});
test('should validate required fields at each step', async ({ page }) => {
  await page.click('[data-testid="next-button"]');
  
  await expect(page.locator('.text-red-500').first()).toBeVisible();
  
  await page.locator('[data-testid="child-nom"] input').fill('Test');
  await page.click('[data-testid="next-button"]');
  await expect(page.locator('.text-red-500').first()).toBeVisible();
});
});