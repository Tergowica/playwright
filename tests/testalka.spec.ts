import { test, expect } from '@playwright/test';

const sizes = [
  { width: 375, height: 667 },
  { width: 768, height: 1024 },
  { width: 1920, height: 1080 },
];

for (const size of sizes) {
  test(`submit form for ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('https://testapka.testelka.pl/');

    // 👇 mobile/tablet → hamburger
    if (size.width < 1024) {
      await page.getByRole('button').filter({ hasText: /^$/ }).click();
    }

    // 👇 wspólne
    await page.getByRole('link', { name: 'Zaproponuj testapkę' }).click();

    await page.getByRole('textbox', { name: 'https://jakaś-apka.pl' })
      .waitFor({ state: 'visible' });

    await page.getByRole('textbox', { name: 'https://jakaś-apka.pl' })
      .fill('https://testapka.testelka.pl/');

    await page.getByRole('textbox', { name: 'Opisz krótko co to za apka o' })
      .fill('Testowy opis jeden dwa trzy');

    await page.getByRole('textbox', { name: 'Twój email' })
      .fill('test@test.pl');

    await page.getByRole('button', { name: 'Wyślij' }).click();

    await page.getByText('Dzięki! Aplikacja pojawi się')
      .waitFor({ state: 'visible' });

    await expect(page.getByText('Dzięki! Aplikacja pojawi się'))
      .toBeVisible();
  });
}