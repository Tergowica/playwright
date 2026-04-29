import { test, expect } from '@playwright/test';

const sizes = [
  { width: 375, height: 667 },
  { width: 768, height: 1024 },
  { width: 1920, height: 1080 },
];

// ✅ testy responsywne – tylko dla formularza
for (const size of sizes) {
  test(`submit form for ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('https://testapka.testelka.pl/');

    // hamburger tylko mobile/tablet
    if (size.width < 1024) {
      await page.locator('button[aria-label*="menu"], button:has(svg)').first().click();
    }

    await page.getByRole('link', { name: 'Zaproponuj testapkę' }).click();

    const urlInput = page.getByRole('textbox', { name: /https:\/\/jakaś-apka/ });
    await expect(urlInput).toBeVisible();

    await urlInput.fill('https://testapka.testelka.pl/');

    await page.getByRole('textbox', { name: /Opisz krótko/ })
      .fill('Testowy opis jeden dwa trzy');

    await page.getByRole('textbox', { name: /Twój email/ })
      .fill('test@test.pl');

    await page.getByRole('button', { name: 'Wyślij' }).click();

    await expect(page.getByText('Dzięki! Aplikacja pojawi się'))
      .toBeVisible();
  });
}

// ✅ osobny test – NIE w pętli
test('redirect on youtube lesson', async ({ page }) => {
  await page.goto('https://testapka.testelka.pl/');

  await page.getByRole('link', { name: 'Kontakt' }).click();

  const iframe = page.frameLocator('iframe[title="Formularz kontaktowy"]');

  await iframe.getByRole('textbox').click();
  await iframe.getByText('Start i cena kursów').click();

  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    iframe.getByRole('link', { name: /darmowym kursem Javy/ }).click()
  ]);

  await page1.waitForLoadState();

 await page1.getByRole('link', { name: 'Przejdź do lekcji' }).click();

// klik lekcji + czekanie na zmianę URL
await Promise.all([
  page1.waitForURL(/zmienne-i-typy-proste/),
  page1.locator('a[href*="zmienne-i-typy-proste"]').click()
]);

// 👇 sprawdzenie YouTube iframe (TO jest właściwy test)
const ytFrame = page1.frameLocator('iframe[title="YouTube video player"]');

await expect(
  page1.locator('iframe[title="YouTube video player"]')
).toBeVisible();
});

test('check listing policy private', async ({ page }) => {
  await page.goto('https://testapka.testelka.pl/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Polityka prywatności' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: '# 1: Kto jest administratorem' }).click();
  await page1.getByRole('link', { name: '# 2: Z kim możesz kontaktowa' }).click();
  await page1.getByRole('link', { name: '# 3: Jakie informacje na Twój' }).click();
  await page1.getByRole('link', { name: '# 4: Skąd mam Twoje dane' }).click();
  await page1.getByRole('link', { name: '# 5: Czy Twoje dane są' }).click();
  await page1.getByRole('button', { name: 'AKCEPTUJĘ', exact: true }).click();
  await expect(page1.getByRole('link', { name: '# 1: Kto jest administratorem' })).toBeVisible();
});
