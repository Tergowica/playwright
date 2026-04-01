import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { TransferPage } from '../pages/transfer.page';

test.describe('Scenariusze po zalogowaniu', () => {
  let loginPage: LoginPage;
  let dashboard: DashboardPage;
  let transfer: TransferPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    transfer = new TransferPage(page);

    await loginPage.goto();
    await loginPage.login('testtest', '12312312');
    await loginPage.assertLoggedIn();
  });

  test('wykonanie przelewu', async () => {
    await dashboard.goTo('mój pulpit');
    await dashboard.goTo('szybki przelew');

    await transfer.makeQuickTransfer();
    await transfer.closeSuccessModal();
  });
});