import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mediaexpert.pl/');
  await page.getByRole('button', { name: 'ZAAKCEPTUJ WSZYSTKIE' }).click();
  await page.getByRole('textbox', { name: 'Czego szukasz?' }).click();
  await page.getByRole('textbox', { name: 'Czego szukasz?' }).fill('irygator');
  await page.getByRole('textbox', { name: 'Czego szukasz?' }).press('Enter');
  await page.getByLabel('Irygator PHILIPS Sonicare Compact Flosser 1000 HX3333/24 Bezprzewodowy Niebieski').getByRole('button', { name: 'Do koszyka' }).click();
  await page.getByRole('button', { name: 'Idź do koszyka' }).click();
  await page.getByRole('button').nth(4).click();
  await page.getByRole('button', { name: 'Przejdź do zamówienia' }).click();
  await page.getByRole('link', { name: 'Kontynuuj bez logowania' }).click();
  await page.getByRole('radio', { name: 'Dostawa na adres, obszar,' }).click();
  await page.getByRole('textbox', { name: 'Kod pocztowy' }).click();
  await page.getByRole('textbox', { name: 'Kod pocztowy' }).fill('42-500');
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await page.getByRole('button', { name: 'Zapisz' }).click();
  await page.getByRole('link', { name: 'Przejdź do wyboru płatności' }).click();

  await page.getByRole('radio', { name: 'Szybki przelew online, Szczeg' }).waitFor({ state: 'visible' });
  await page.getByRole('radio', { name: 'Szybki przelew online, Szczeg' }).click();

  await page.getByRole('radio', { name: 'ING Bank Śląski SA' }).waitFor({ state: 'visible' });
  await page.getByRole('radio', { name: 'ING Bank Śląski SA' }).click();

  await page.getByRole('button', { name: 'Zapisz' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Zapisz' }).click();

  await page.getByRole('link', { name: 'Przejdź do uzupełniania danych' }).click();
  await page.getByRole('button', { name: 'Przejdź do podsumowania' }).click();
  await expect(page.getByText('Pole Imię jest wymagane')).toBeVisible();
  await page.getByRole('link', { name: 'Media Expert | Sklep' }).click();
  await page.getByRole('link', { name: 'Koszyk, 538,00 zł, 2 produkty' }).click();
  await page.getByRole('button', { name: 'Usuń produkty' }).click();
  await page.getByRole('button', { name: 'Tak, usuń' }).click();
  await expect(page.getByRole('heading', { name: 'Twój koszyk jest pusty' })).toBeVisible();
});