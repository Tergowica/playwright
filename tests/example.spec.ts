import { test, expect } from '@playwright/test';

// 🔹 Test 1
test('logowanie i widok kont', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  await page.getByTestId('login-input').fill('qwertyui');
  await page.getByTestId('password-input').fill('zxcvbnm,');
  await page.getByTestId('login-button').click();

  await expect(
    page.getByRole('heading', { name: 'konta osobiste' })
  ).toBeVisible();
});

// 🔹 Test 2
test('wykonanie przelewu', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  await page.getByTestId('login-input').fill('qwertyui');
  await page.getByTestId('password-input').fill('Terg1234');
  await page.getByTestId('login-button').click();

  await page.getByRole('link', { name: 'mój pulpit' }).click();
  await page.getByRole('link', { name: 'szybki przelew' }).click();

  await page.locator('#widget_1_transfer_receiver').selectOption('1');
  await page.locator('#widget_1_transfer_amount').fill('500');
  await page.locator('#widget_1_transfer_title').fill('Ale kasa');

  await page.getByRole('button', { name: 'wykonaj' }).click();

  await expect(page.getByTestId('close-button')).toBeVisible();

  await page.getByTestId('close-button').click();

  await expect(page.getByTestId('close-button')).toBeHidden();
});

// 🔹 Test 3
test('przelew', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('qwertyui');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('zxcvbvnm');
  await page.getByTestId('login-button').click();

  await page.getByRole('link', { name: 'doładowanie telefonu' }).click();
  await page.waitForTimeout(1000);
  await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');
  await page.waitForTimeout(1000);
  await page.locator('#widget_1_topup_amount').selectOption('100');
  await page.locator('#uniform-widget_1_topup_agreement > span').click();
  await page.getByRole('button', { name: 'doładuj telefon' }).click();

  await expect(page.getByRole('paragraph')).toMatchAriaSnapshot(`- paragraph: "/Doładowanie wykonane! Kwota: 100PLN Numer: \\\\d+ xxx xxx/"`);
});