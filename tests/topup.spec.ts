// tests/topup.spec.ts
// 💡 KLUCZOWE: Importujemy 'test' z naszego pliku fixtures, a nie z @playwright/test
import { test, expect } from '../lib/fixtures'; 

test('doładowanie telefonu po zalogowaniu', async ({ loginPage, topUpPage }) => {
  // Wykorzystujemy metody z klasy LoginPage
  await loginPage.open();
  await loginPage.loginAsStandardUser();
  await loginPage.assertUserIsLoggedIn();

  // Wykorzystujemy metody z klasy TopUpPage
  // Nie musimy otwierać strony, jeśli logowanie przeniosło nas we właściwe miejsce, 
  // ale możemy wywołać nawigację jeśli jest to konieczne [4]
  await topUpPage.performTopUp('504 xxx xxx', '100');
  
  // Wykonujemy asercję zdefiniowaną w Page Object Model [5, 6]
  await topUpPage.assertTopUpSuccess('100');
});





test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('testtest');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('tetes');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('tetestes');
  await page.getByTestId('login-button').click();
});