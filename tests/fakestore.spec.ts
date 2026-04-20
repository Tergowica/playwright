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

test('remove product in bin', async ({ page }) =>
{
  await page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' }).click();
  await page.getByRole('link', { name: 'Przejdź do kategorii produktu Żeglarstwo' }).click();
  await page.getByLabel('Zamówienie').first().selectOption('date');
  await page.goto('https://fakestore.testelka.pl/product-category/zeglarstwo/?orderby=date');
  await page.locator('a.add_to_cart_button').click();
  await page.getByRole('button', { name: 'Dodaj do koszyka: „Kurs ż' }).click();
  await page.getByTitle('Zobacz koszyk').waitFor({ state: 'attached' });
  await page.locator('#menu-item-200').getByRole('link', { name: 'Koszyk' }).click();
  await page.getByRole('button', { name: 'Usuń Kurs żeglarski na' }).click();
  await expect(page.getByText('Twój koszyk jest pusty.')).toBeVisible();
});

test('categories', async ({ page }) => {

  await page.getByRole('button', { name: ' Ukryj' }).click();
  await page.getByRole('link', { name: 'Przejdź do kategorii produktu Windsurfing' }).click();
  await page.getByRole('link', { name: 'Egipt - El Gouna Egipt – El' }).click();
  await page.locator('#woocommerce_product_categories-3').getByRole('link', { name: 'Windsurfing' }).click();
  await page.getByRole('link', { name: 'Wspinaczka' }).click();
  await page.getByRole('link', { name: 'Yoga i pilates' }).click();
  await page.getByRole('link', { name: 'Żeglarstwo' }).click();
  await page.getByText('(6)').click();
  await expect(page.getByRole('link', { name: 'Windsurfing' })).toBeVisible();
});






test('komentarz z aktualna godzina', async ({ page }, testInfo) => {

  const comment = `test ${testInfo.project.name} ${new Date().toLocaleTimeString('pl-PL')}`;

  const sklep = page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' });
  await sklep.waitFor({ state: 'visible' });
  await sklep.click();

  const kategoria = page.getByRole('link', { name: 'Przejdź do kategorii produktu Yoga i pilates' });
  await kategoria.waitFor({ state: 'visible' });
  await kategoria.click();

  const produkt = page.getByRole('link', { name: 'Yoga w Japonii Wakacje z yog' });
  await produkt.waitFor({ state: 'visible' });
  await produkt.click();

  const opinieTab = page.getByRole('tab', { name: 'Opinie (0)' });
  await opinieTab.waitFor({ state: 'visible' });
  await opinieTab.click();

  const rating = page.getByRole('radio', { name: ' 5 z 5 gwiazdek' });
  await rating.waitFor({ state: 'visible' });
  await rating.click();

  const textarea = page.getByRole('textbox', { name: 'Twoja opinia *' });
  await textarea.waitFor({ state: 'visible' });
  await textarea.fill(comment);

  const button = page.getByRole('button', { name: 'Dodaj opinię' });
  await button.waitFor({ state: 'visible' });
  await button.click();

  await expect(page.getByText(comment)).toBeVisible({ timeout: 15000 });
});