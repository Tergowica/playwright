import { expect, type Page } from '@playwright/test';

export type QuickTransferData = {
  receiverId: string;
  amount: string;
  title: string;
};

export class QuickTransferPage {
  private readonly receiverSelect;
  private readonly amountInput;
  private readonly titleInput;
  private readonly submitButton;
  private readonly closeButton;

  constructor(private readonly page: Page) {
    this.receiverSelect = page.locator('#widget_1_transfer_receiver');
    this.amountInput = page.locator('#widget_1_transfer_amount');
    this.titleInput = page.locator('#widget_1_transfer_title');
    this.submitButton = page.getByRole('button', { name: 'wykonaj' });
    this.closeButton = page.getByTestId('close-button');
  }

  async completeQuickTransfer(data: QuickTransferData): Promise<void> {
    await this.receiverSelect.selectOption(data.receiverId);
    await this.amountInput.fill(data.amount);
    await this.titleInput.fill(data.title);
    await this.submitButton.click();
  }

  async assertSuccessModalIsVisible(): Promise<void> {
    await expect(this.closeButton).toBeVisible();
  }

  async closeSuccessModal(): Promise<void> {
    await this.closeButton.click();
    await expect(this.closeButton).toBeHidden();
  }
}