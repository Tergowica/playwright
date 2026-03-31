import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  async goToMyDashboard(): Promise<void> {
    await this.navigateTo('mój pulpit');
  }

  async goToQuickTransfer(): Promise<void> {
    await this.navigateTo('szybki przelew');
  }

  async goToPhoneTopUp(): Promise<void> {
    await this.navigateTo('doładowanie telefonu');
  }

  async goToFinancialManager(): Promise<void> {
    await this.navigateTo('manager finansowy');
  }

  async goToPersonalAccounts(): Promise<void> {
    await this.navigateTo('konta osobiste');
  }

  async goToPayments(): Promise<void> {
    await this.navigateTo('płatności');
  }

  async goToReports(): Promise<void> {
    await this.navigateTo('raporty');
  }

  async goToIframeReports(): Promise<void> {
    await this.navigateTo('raporty (iframe)');
  }

  async goToGenerateTransfer(): Promise<void> {
    await this.navigateTo('generuj przelew');
  }

  async goToCharts(): Promise<void> {
    await this.navigateTo('wykresy');
  }

  async goToSettings(): Promise<void> {
    await this.navigateTo('ustawienia');
  }

  async openQuickTransferFromDashboard(): Promise<void> {
    await this.goToMyDashboard();
    await this.goToQuickTransfer();
  }
}