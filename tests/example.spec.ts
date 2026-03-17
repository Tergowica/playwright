<<<<<<< HEAD
=======
import { test, expect } from '@playwright/test';

// 🔹 Test 1
test('logowanie i widok kont', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  await page.getByTestId('login-input').fill('qwertyui');
  await page.getByTestId('password-input').fill('zxcvbnm,');
  await page.getByTestId('login-button').click();

  await expect(page.getByRole('heading', { name: 'konta osobiste' })).toBeVisible();
});


// 🔹 Test 2
test('wykonanie przelewu', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
git push origin studiowiatrak
  await page.getByTestId('login-input').fill('qwertyui');
  await page.getByTestId('password-input').fill('Terg1234');
  await page.getByTestId('login-button').click();

  await page.getByRole('link', { name: 'mój pulpit' }).click();
  await page.getByRole('link', { name: 'szybki przelew' }).click();

  await page.locator('#widget_1_transfer_receiver').selectOption('1');
  await page.locator('#widget_1_transfer_amount').fill('500');
  await page.locator('#widget_1_transfer_title').fill('Ale kasa');

  await page.getByRole('button', { name: 'wykonaj' }).click();

  // sprawdzamy czy pojawił się modal / przycisk
  await expect(page.getByTestId('close-button')).toBeVisible();

  await page.getByTestId('close-button').click();

  // opcjonalnie: sprawdzamy że zniknął
  await expect(page.getByTestId('close-button')).toBeHidden();
});
>>>>>>> 3d94d6a (dodanie testów playwright)
