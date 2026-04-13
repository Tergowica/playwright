import { test, expect } from '@playwright/test';
import { loggingIn } from '../utils/loggingIn';

test.beforeEach(async ({ page }) => {
  await loggingIn(page);
});

test('wejście do sklepu', async ({ page }) => {
  await page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' }).click();
  await expect(page).toHaveURL(/shop/);
});




test('zakup produktu', async ({ page }) => {
  await page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' }).click();
  await page.getByRole('link', { name: 'Przejdź do kategorii produktu Windsurfing' }).click();
  await page.getByRole('button', { name: 'Dodaj do koszyka: „Egipt - El' }).click();

    const koszykLink = page.locator('a.added_to_cart');
  await expect(koszykLink).toBeVisible();
  await koszykLink.click();

  await page.getByRole('link', { name: 'Przejdź do płatności ' }).click();
  await page.getByRole('textbox', { name: 'Imię' }).fill('Testoweimię');
  await page.getByRole('textbox', { name: 'Nazwisko' }).fill('Testowenazwisko');
  await page.getByRole('textbox', { name: 'Nazwa firmy (opcjonalne)' }).fill('Nazwafirmytestowa');
  await page.getByRole('textbox', { name: 'Ulica' }).fill('Uliczna');
  await page.getByRole('textbox', { name: 'Nr mieszkania, lokalu, itp. (' }).fill('Ulicznica');
  await page.getByRole('textbox', { name: 'Kod pocztowy' }).fill('12-123');
  await page.getByRole('textbox', { name: 'Miasto' }).fill('Miastowice');
  await page.getByRole('textbox', { name: 'Telefon' }).fill('123456789');
  await page.getByRole('textbox', { name: 'Uwagi do zamówienia (' }).fill('dodatkowe informacje do zamowienia');
  await page.getByText('BLIK', { exact: true }).click();
  await page.getByRole('textbox', { name: 'BLIK Code' }).fill('000000');
  await page.getByRole('checkbox', { name: 'Przeczytałem/am i akceptuję' }).check();
  await page.getByRole('button', { name: 'Kupuję i płacę' }).click();
  await expect(page.getByText('Dziękujemy. Otrzymaliśmy')).toBeVisible();
});