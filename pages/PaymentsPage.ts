import { expect, type Page } from '@playwright/test';

export type PaymentTransferData = {
  receiver: string;
  accountNumber: string;
  amount: string;
  title: string;
  isExpress?: boolean;
};

export class PaymentsPage {
  private readonly openTransferButton;
  private readonly receiverInput;
  private readonly accountInput;
  private readonly amountInput;
  private readonly titleInput;
  private readonly expressTransferRadio;
  private readonly submitTransferButton;
  private readonly cancelLink;
  private readonly successMessage;

  constructor(private readonly page: Page) {
    this.openTransferButton = page.getByRole('button', { name: 'wykonaj przelew' });
    this.receiverInput = page.getByTestId('transfer_receiver');
    this.accountInput = page.getByTestId('form_account_to');
    this.amountInput = page.getByTestId('form_amount');
    this.titleInput = page.getByTestId('form_title');
    this.expressTransferRadio = page.getByRole('radio', { name: 'ekspresowy' });
    this.submitTransferButton = page.getByRole('button', { name: 'wykonaj przelew' });
    this.cancelLink = page.getByRole('link', { name: 'anuluj' });
    this.successMessage = page.getByTestId('message-text');
  }

  async startTransfer(): Promise<void> {
    await this.openTransferButton.click();
  }

  async selectExpressTransfer(): Promise<void> {
    await this.expressTransferRadio.check();
  }

  async cancelTransfer(): Promise<void> {
    await this.cancelLink.click();
  }

  async completeTransfer(data: PaymentTransferData): Promise<void> {
    await this.receiverInput.fill(data.receiver);
    await this.accountInput.fill(data.accountNumber);
    await this.amountInput.fill(data.amount);
    await this.titleInput.fill(data.title);

    if (data.isExpress) {
      await this.selectExpressTransfer();
    }

    await this.submitTransferButton.click();
  }

  async beginExpressTransferAndCancel(): Promise<void> {
    await this.startTransfer();
    await this.selectExpressTransfer();
    await this.submitTransferButton.click();
    await this.cancelTransfer();
  }

  async assertTransferSucceeded(): Promise<void> {
    await expect(this.successMessage).toContainText('Przelew wykonany');
  }
}