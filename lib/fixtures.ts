import { test as base } from '@playwright/test';
import { TopUpPage } from '../pages/TopUpPage';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  topUpPage: TopUpPage;
  loginPage: LoginPage;
};

// Rozszerzamy podstawowy test o nasze obiekty stron [11]
export const test = base.extend<MyFixtures>({
  topUpPage: async ({ page }, use) => {
    await use(new TopUpPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';