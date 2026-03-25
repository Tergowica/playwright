import { test, expect } from '@playwright/test';

// Grupowanie testów za pomocą test.describe pomaga zachować porządek [1, 4]
test.describe('Scenariusze po zalogowaniu', () => {

  // Ta część wykona się przed KAŻDYM testem zdefiniowanym poniżej [2, 3]
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testtest');
    await page.getByTestId('password-input').fill('12312312');
    await page.getByTestId('login-button').click();
    
    // Możesz tutaj dodać asercję sprawdzającą, czy logowanie się udało [5, 6]
 //   await expect(page).toHaveURL(/desktop.html/); 
  });

  test('Scenariusz 1: Sprawdzenie szczegółów konta', async ({ page }) => {
    // Jesteś już zalogowany, zaczynasz od razu od swoich kroków
    await page.locator('#accounts_list').getByText('więcej').click();
    await page.getByText('300').click();
    
    // Tutaj dopisz sprawdzenie rezultatu (asercję) [7, 8]
    await expect(page.getByText('300')).toBeVisible();
  });

  test('Scenariusz 2: Kolejna akcja w banku', async ({ page }) => {
    // Tutaj dopisujesz kolejny, zupełnie inny scenariusz
    // Playwright ponownie wykona logowanie przed tym testem [9, 10]
    await page.getByRole('link', { name: 'Płatności' }).click();
    // ... dalsze kroki
  });

});