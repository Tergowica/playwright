import { expect, type Locator, type Page } from '@playwright/test';

export type PhoneTopUpData = {
  phoneNumber: string;
  amount: string;
};

export class PhoneTopUpPage {
  private readonly receiverSelect;
  private readonly amountField;
  private readonly agreementCheckbox;
  private readonly topUpButton;
  private readonly resultMessage;

  constructor(private readonly page: Page) {
    this.receiverSelect = page.locator('#widget_1_topup_receiver');
    this.amountField = page.locator('#widget_1_topup_amount');
    this.agreementCheckbox = page.locator('#uniform-widget_1_topup_agreement > span');
    this.topUpButton = page.getByRole('button', { name: 'doładuj telefon' });
    this.resultMessage = page.getByRole('paragraph');
  }

  private async setAmount(amount: string): Promise<void> {
    const tagName = await this.amountField.evaluate((element) => element.tagName);

    if (tagName === 'SELECT') {
      await this.amountField.selectOption(amount);
      return;
    }

    await this.amountField.fill(amount);
  }

  async topUpPhone(data: PhoneTopUpData): Promise<void> {
    await this.receiverSelect.selectOption(data.phoneNumber);
    await this.setAmount(data.amount);
    await this.agreementCheckbox.click();
    await this.topUpButton.click();
  }

  async assertTopUpSucceeded(expectedAmount: string): Promise<void> {
    await expect(this.resultMessage).toContainText('Doładowanie wykonane');
    await expect(this.resultMessage).toContainText(expectedAmount);
    await expect(this.resultMessage).toContainText('PLN');
  }
}