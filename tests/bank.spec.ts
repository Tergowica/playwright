import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { QuickTransferPage } from '../pages/QuickTransferPage';
import { PhoneTopUpPage } from '../pages/PhoneTopUpPage';
import { FinancialManagerPage } from '../pages/FinancialManagerPage';
import { PersonalAccountsPage } from '../pages/PersonalAccountsPage';
import { PaymentsPage } from '../pages/PaymentsPage';
import { ReportsPage } from '../pages/ReportsPage';
import { IframeReportsPage } from '../pages/IframeReportsPage';
import { GenerateTransferPage } from '../pages/GenerateTransferPage';
import { ChartsPage } from '../pages/ChartsPage';
import { SettingsPage } from '../pages/SettingsPage';

test.describe('Bank application - authenticated user flows', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginAsStandardUser();
    await loginPage.assertUserIsLoggedIn();
  });

  test('should display personal accounts after login', async ({ page }) => {
    const personalAccountsPage = new PersonalAccountsPage(page);

    await personalAccountsPage.assertPageIsVisible();
  });

  test('should complete quick transfer from dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const quickTransferPage = new QuickTransferPage(page);

    await dashboardPage.openQuickTransferFromDashboard();

    await quickTransferPage.completeQuickTransfer({
      receiverId: '1',
      amount: '500',
      title: 'Ale kasa',
    });

    await quickTransferPage.assertSuccessModalIsVisible();
    await quickTransferPage.closeSuccessModal();
  });

  test('should top up phone successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const phoneTopUpPage = new PhoneTopUpPage(page);

    await dashboardPage.goToPhoneTopUp();

    await phoneTopUpPage.topUpPhone({
      phoneNumber: '504 xxx xxx',
      amount: '100',
    });

    await phoneTopUpPage.assertTopUpSucceeded('100');
  });

  test('should review financial manager periods', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const financialManagerPage = new FinancialManagerPage(page);

    await dashboardPage.goToFinancialManager();
    await financialManagerPage.reviewAvailablePeriods(['1', '2', '6', '12']);
  });

  test('should display personal account details', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const personalAccountsPage = new PersonalAccountsPage(page);

    await dashboardPage.goToPersonalAccounts();
    await personalAccountsPage.openAccountDetails();
    await personalAccountsPage.assertBalanceIsVisible('10 000');
  });

  test('should cancel express transfer in payments section', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const paymentsPage = new PaymentsPage(page);

    await dashboardPage.goToPayments();
    await paymentsPage.beginExpressTransferAndCancel();
  });

  test('should download reports in txt and zip formats', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const reportsPage = new ReportsPage(page);

    await dashboardPage.goToReports();

    await reportsPage.assertTxtLinkIsVisible();
    await reportsPage.downloadTxtReport();

    await reportsPage.assertZipLinkIsVisible();
    await reportsPage.downloadZipReport();
  });

  test('should complete full transfer form successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const paymentsPage = new PaymentsPage(page);

    await dashboardPage.goToPayments();

    await paymentsPage.completeTransfer({
      receiver: 'ODBIORCA PRZELEWU ŻÓŁĆ',
      accountNumber: '42 4594 6543 5795 4765 4985 49547',
      amount: '2137',
      title: 'Tytuł przelew',
      isExpress: true,
    });

    await paymentsPage.assertTransferSucceeded();
  });

  test('should download iframe report', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const iframeReportsPage = new IframeReportsPage(page);

    await dashboardPage.goToIframeReports();
    await iframeReportsPage.downloadTxtReport();
    await iframeReportsPage.assertTxtLinkIsVisible();
  });

test('should generate transfer file and download txt', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const generateTransferPage = new GenerateTransferPage(page);

  await dashboardPage.goToGenerateTransfer();

  await generateTransferPage.prepareTransferFile({
    sourceAccount: '[KO] konto na życie [13 159,20 PLN] 4141...0000',
    receiver: 'Michał Tester',
    accountNumber: '42 8165 4651 5643 5432 4654 65466',
    amount: '123',
    title: 'Tytuł',
  });

  await generateTransferPage.assertTxtDownloadIsVisible();
  await generateTransferPage.downloadTxtFile();
});

  test('should interact with chart area', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const chartsPage = new ChartsPage(page);

    await dashboardPage.goToCharts();
    await chartsPage.interactWithFirstChartPath();
  });

  test('should display settings placeholder message', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const settingsPage = new SettingsPage(page);

    await dashboardPage.goToSettings();
    await settingsPage.assertSectionIsNotAvailableYet();
  });
});