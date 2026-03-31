import { expect, type Download, type Page } from '@playwright/test';

export type GeneratedTransferData = {
  sourceAccount: string;
  receiver: string;
  accountNumber: string;
  amount: string;
  title: string;
};

export class GenerateTransferPage {
  private readonly sourceAccountSelect;
  private readonly receiverInput;
  private readonly accountInput;
  private readonly amountInput;
  private readonly titleInput;
  private readonly txtDownloadLink;

  constructor(private readonly page: Page) {
    this.sourceAccountSelect = page.locator('#form_account_from');
    this.receiverInput = page.getByTestId('transfer_receiver');
    this.accountInput = page.getByTestId('form_account_to');
    this.amountInput = page.getByTestId('form_amount');
    this.titleInput = page.getByTestId('form_title');
    this.txtDownloadLink = page.getByText('Pobierz jako txt');
  }

  async prepareTransferFile(data: GeneratedTransferData): Promise<void> {
    await this.sourceAccountSelect.selectOption(data.sourceAccount);
    await this.receiverInput.fill(data.receiver);
    await this.accountInput.fill(data.accountNumber);
    await this.amountInput.fill(data.amount);
    await this.titleInput.fill(data.title);
  }

  async assertTxtDownloadIsVisible(): Promise<void> {
    await expect(this.txtDownloadLink).toBeVisible();
  }

  async downloadTxtFile(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.txtDownloadLink.click();
    return await downloadPromise;
  }
}