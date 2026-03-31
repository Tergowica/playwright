import { type Page } from '@playwright/test';

export class FinancialManagerPage {
  private readonly periodSelect;

  constructor(private readonly page: Page) {
    this.periodSelect = page.getByTestId('financial-manager-select');
  }

  async reviewAvailablePeriods(periods: string[]): Promise<void> {
    for (const period of periods) {
      await this.periodSelect.selectOption(period);
    }
  }
}