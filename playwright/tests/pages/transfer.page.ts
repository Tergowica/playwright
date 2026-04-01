import { Page, expect } from '@playwright/test';

export class TransferPage {
  constructor(private page: Page) {}

  async makeQuickTransfer() {
    await this.page.locator('#widget_1_transfer_receiver').selectOption('1');
    await this.page.locator('#widget_1_transfer_amount').fill('500');
    await this.page.locator('#widget_1_transfer_title').fill('Ale kasa');

    await this.page.getByRole('button', { name: 'wykonaj' }).click();
  }

  async closeSuccessModal() {
    const closeBtn = this.page.getByTestId('close-button');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(closeBtn).toBeHidden();
  }
}