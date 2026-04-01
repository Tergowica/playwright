import { expect, type Locator, type Page } from '@playwright/test';

export class TopUpPage {
  private readonly receiverSelect: Locator;
  private readonly amountInput: Locator;
  private readonly agreementCheckbox: Locator;
  private readonly submitButton: Locator;
  private readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    // Używamy lokatorów odpornych na zmiany w kodzie (Best Practices) [3, 4]
    this.receiverSelect = page.locator('#widget_1_topup_receiver');
    this.amountInput = page.locator('#widget_1_topup_amount');
    this.agreementCheckbox = page.locator('#uniform-widget_1_topup_agreement > span');
    this.submitButton = page.getByRole('button', { name: 'doładuj telefon' });
    this.successMessage = page.getByRole('paragraph');
  }

  async open() {
    await this.page.goto('https://demo-bank.vercel.app/desktop/index.html'); // Przykładowy URL [5]
  }

  async performTopUp(receiver: string, amount: string) {
    await this.receiverSelect.selectOption(receiver);

    // Obsługa dynamicznego tagu (SELECT vs INPUT) wewnątrz Page Object [6, 7]
    const tagName = await this.amountInput.evaluate(el => el.tagName);
    if (tagName === 'SELECT') {
      await this.amountInput.selectOption(amount);
    } else {
      await this.amountInput.fill(amount);
    }

    await this.agreementCheckbox.click();
    await this.submitButton.click();
  }

  async assertTopUpSuccess(amount: string) {
    // Web-first assertions automatycznie czekają na wynik (nie ma flakiness) [8, 9]
    await expect(this.successMessage).toContainText('Doładowanie wykonane');
    await expect(this.successMessage).toContainText(amount);
    await expect(this.successMessage).toContainText('PLN');
  }
}