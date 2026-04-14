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



test('purchase with coupon', async ({ page }) => {



  await page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' }).click();
  await page.getByRole('link', { name: 'Przejdź do kategorii produktu Yoga i pilates' }).click();
  await page.getByRole('button', { name: 'Dodaj do koszyka: „Yoga i pilates w Portugalii”' }).click();
    
  //   const koszykLink = page.locator('a.added_to_cart');
  // await expect(koszykLink).toBeVisible();
  // await koszykLink.click();

  await page.locator('a.added_to_cart').click();


  await page.getByRole('textbox', { name: 'Kupon:' }).fill('kwotowy250');
  await page.getByRole('button', { name: 'Zastosuj kupon' }).click();

  await expect(page.getByText('Kupon został pomyślnie użyty.')).toBeVisible();


  await page.getByRole('link', { name: 'Przejdź do płatności ' }).click();


  await page.getByRole('textbox', { name: 'BLIK Code' }).click();
  await page.getByRole('textbox', { name: 'BLIK Code' }).fill('111111');
  await page.getByRole('checkbox', { name: 'Przeczytałem/am i akceptuję' }).check();
  await page.getByRole('button', { name: 'Kupuję i płacę' }).click();


  await expect(page.getByRole('heading', { name: 'Zamówienie otrzymane' })).toBeVisible();
});







test('zakres cen', async ({ page }) => {


  await page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' }).click();
  await page.getByRole('link', { name: 'Przejdź do kategorii produktu Windsurfing' }).click();

  await page.locator('#min_price').evaluate((el, value) => {
  (el as HTMLInputElement).value = value;
}, '3400');

await page.locator('#max_price').evaluate((el, value) => {
  (el as HTMLInputElement).value = value;
}, '3400');


// powyższe kroki ustawiają wartości w polach zakresu cen, mimo że są one ukryte, a następnie klikają przycisk filtruj, aby zastosować te wartości



//  await page.locator('#min_price').fill('3400', { force: true });
//  await page.locator('#max_price').fill('3400', { force: true });

// to wyżej nie jest krokiem wykonanym, bo elementy są ukryte, więc trzeba użyć JavaScriptu do ustawienia wartości, a następnie kliknąć przycisk filtruj, żeby zastosować te wartości


  await page.getByRole('button', { name: 'Filtruj' }).click();



  await page.getByRole('button', { name: 'Dodaj do koszyka: „Egipt - El' }).click();


  await page.locator('a.added_to_cart').click();


  await page.getByRole('link', { name: 'Przejdź do płatności ' }).click();


  await page.getByRole('textbox', { name: 'BLIK Code' }).click();
  await page.getByRole('textbox', { name: 'BLIK Code' }).fill('111111');
  await page.getByRole('checkbox', { name: 'Przeczytałem/am i akceptuję' }).check();
  await page.getByRole('button', { name: 'Kupuję i płacę' }).click();


  await expect(page.getByRole('heading', { name: 'Zamówienie otrzymane' })).toBeVisible();


});





