import { expect, type Page } from '@playwright/test';

export class PersonalAccountsPage {
  private readonly moreButton;
  private readonly pageHeading;

  constructor(private readonly page: Page) {
    this.moreButton = page.getByText('więcej').first();
    this.pageHeading = page.getByRole('heading', { name: 'konta osobiste' });
  }

  async assertPageIsVisible(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async openAccountDetails(): Promise<void> {
    await this.moreButton.click();
  }

  async assertBalanceIsVisible(expectedBalance: string): Promise<void> {
    await expect(this.page.getByText(expectedBalance)).toBeVisible();
  }
}