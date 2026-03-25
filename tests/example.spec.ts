import { test, expect, type Page } from '@playwright/test';

// 🔹 WSPÓLNA NAWIGACJA
async function goTo(page: Page, linkName: string) {
  await page
    .getByRole('navigation')
    .getByRole('link', { name: linkName, exact: true })
    .click();
}

test.describe('Scenariusze po zalogowaniu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testtest');
    await page.getByTestId('password-input').fill('12312312');
    await page.getByTestId('login-button').click();

    await expect(page.getByRole('heading', { name: 'konta osobiste' })).toBeVisible();
  });

  // 🔹 Test 1
  test('logowanie i widok kont', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'konta osobiste' })).toBeVisible();
  });

  // 🔹 Test 2
  test('wykonanie przelewu', async ({ page }) => {
    await goTo(page, 'mój pulpit');
    await goTo(page, 'szybki przelew');

    await page.locator('#widget_1_transfer_receiver').selectOption('1');
    await page.locator('#widget_1_transfer_amount').fill('500');
    await page.locator('#widget_1_transfer_title').fill('Ale kasa');

    await page.getByRole('button', { name: 'wykonaj' }).click();

    const closeBtn = page.getByTestId('close-button');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(closeBtn).toBeHidden();
  });

  // 🔹 Test 3
  test('doładowanie telefonu', async ({ page }) => {
    await goTo(page, 'doładowanie telefonu');

    await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');

    const amount = page.locator('#widget_1_topup_amount');
    const tagName = await amount.evaluate(el => el.tagName);

    if (tagName === 'SELECT') {
      await amount.selectOption('100');
    } else {
      await amount.fill('100');
    }

    await page.locator('#uniform-widget_1_topup_agreement > span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    const message = page.getByRole('paragraph');

    await expect(message).toContainText('Doładowanie wykonane');
    await expect(message).toContainText('100');
    await expect(message).toContainText('PLN');
  });

  // 🔹 Test 4
  test('financial manager', async ({ page }) => {
    await goTo(page, 'manager finansowy');

    const select = page.getByTestId('financial-manager-select');

    for (const value of ['1', '2', '6', '12']) {
      await select.selectOption(value);
    }
  });

  // 🔹 Test 5
  test('personal account', async ({ page }) => {
    await goTo(page, 'konta osobiste');

    await page.getByText('więcej').click();
    await expect(page.getByText('10 000')).toBeVisible();
  });

  // 🔹 Test 6
  test('payments cancel', async ({ page }) => {
    await goTo(page, 'płatności');

    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByRole('radio', { name: 'ekspresowy' }).check();
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByRole('link', { name: 'anuluj' }).click();
  });

  // 🔹 Test 7
  test('download reports', async ({ page }) => {
    await goTo(page, 'raporty');

    await page.getByRole('link', { name: 'Pobierz jako txt' }).click();
    await expect(page.getByRole('link', { name: 'Pobierz jako txt' })).toBeVisible();

    await page.getByRole('link', { name: 'Pobierz jako zip' }).click();
    await expect(page.getByRole('link', { name: 'Pobierz jako zip' })).toBeVisible();
  });

  // 🔹 Test 8
  test('platnosci full form', async ({ page }) => {
    await goTo(page, 'płatności');

    await page.getByTestId('transfer_receiver').fill('ODBIORCA PRZELEWU ŻÓŁĆ');
    await page.getByTestId('form_account_to').fill('42 4594 6543 5795 4765 4985 49547');
    await page.getByTestId('form_amount').fill('2137');
    await page.getByTestId('form_title').fill('Tytuł przelew');

    await page.getByRole('radio', { name: 'ekspresowy' }).check();
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();

    await expect(page.getByTestId('message-text')).toContainText('Przelew wykonany');
  });

  // 🔹 Test 9
  test('iframe reports', async ({ page }) => {
    await goTo(page, 'raporty (iframe)');

    const frame = page.getByText('Sorry your browser does not').contentFrame();

    await frame.getByRole('link', { name: 'Pobierz jako txt' }).click();
    await expect(frame.getByRole('link', { name: 'Pobierz jako txt' })).toBeVisible();
  });

  // 🔹 Test 10
  test('generuj przelew', async ({ page }) => {
    await goTo(page, 'generuj przelew');

    await page.getByTestId('transfer_receiver').fill('Michał Tester');
    await page.getByTestId('form_account_to').fill('42 8165 4651 5643 5432 4654 65466');
    await page.getByTestId('form_amount').fill('123');
    await page.getByTestId('form_title').fill('Tytuł');

    const downloadBtn = page.getByText('Pobierz jako txt');

    await expect(downloadBtn).toBeVisible();
    await downloadBtn.click();
    await expect(downloadBtn).toBeVisible();
  });

  // 🔹 Test 11
  test('check graphs', async ({ page }) => {
    await goTo(page, 'wykresy');
    await page.locator('path').first().click({ force: true });
  });

  // 🔹 Test 12
  test('settings', async ({ page }) => {
    await goTo(page, 'ustawienia');
    await expect(page.getByText('Zapraszamy za jakiś czas...')).toBeVisible();
  });
});