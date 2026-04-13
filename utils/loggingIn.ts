import { Page, expect } from '@playwright/test';

// dane testowe
const URL = 'https://fakestore.testelka.pl/';
const EMAIL = 'testowyemail@test.pl';
const PASSWORD = 'ZAQ!XSW@CDE3';

export async function loggingIn(page: Page) {
  await page.goto(URL);

  await page.locator('#menu-item-201').getByRole('link', { name: 'Moje konto' }).click();

  await page.getByRole('textbox', { name: 'Użytkownik lub e-mail' }).fill(EMAIL);
  await page.locator('#password').fill(PASSWORD);

  await page.getByRole('button', { name: 'Zaloguj się' }).click();

  // 👇 KLUCZOWE
  const logoutLink = page.getByRole('link', { name: 'Wyloguj się' });

  await expect(logoutLink).toBeVisible({ timeout: 10000 });

  await page.goto(URL);
}