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
  await page.waitForTimeout(1000);
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
//Test 4
test('financial manager', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  await page.getByTestId('login-input').fill('Michalek');
  await page.getByTestId('password-input').fill('michalek');
  await page.getByTestId('login-button').click();

  await page.getByRole('link', { name: 'manager finansowy' }).click();

  const select = page.getByTestId('financial-manager-select');

  for (const value of ['1', '2', '6', '12']) {
    await select.selectOption(value);
  }
});
//Test 5 - personal account
test('personal account', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('Michalek');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Michalek');
  await page.getByTestId('login-button').click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'konta osobiste' }).click();
  await page.getByText('więcej').click();
  await page.getByText('więcej').click();
  await expect(page.getByText('10 000')).toBeVisible();
});
//Test 6 - empty payment standard/express/click cancel

test('payments', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('Michalek');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Michalek');
  await page.waitForTimeout(1000);
  await page.getByTestId('login-button').click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'płatności' }).click();
  await page.getByRole('button', { name: 'wykonaj przelew' }).click();
  await page.getByRole('radio', { name: 'ekspresowy' }).check();
  await page.getByRole('button', { name: 'wykonaj przelew' }).click();
  await page.getByRole('link', { name: 'anuluj' }).click();
});
//Test 7 download raports 

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('Michalek');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('Michalek');
  await page.getByTestId('login-button').click();
  await page.getByRole('link', { name: 'raporty', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Pobierz jako txt' }).click();
  const download = await downloadPromise;
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Pobierz jako zip' }).click();
  const download1 = await download1Promise;
  await expect(page.getByRole('link', { name: 'Pobierz jako zip' })).toBeVisible();
});
