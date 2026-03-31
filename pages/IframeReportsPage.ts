import { expect, type Download, type Page } from '@playwright/test';

export class IframeReportsPage {
  private readonly frame;

  constructor(private readonly page: Page) {
    this.frame = page.frameLocator('iframe');
  }

  async downloadTxtReport(): Promise<void> {
    await this.frame.getByRole('link', { name: 'Pobierz jako txt' }).click();
  }

  async assertTxtLinkIsVisible(): Promise<void> {
    await expect(
      this.frame.getByRole('link', { name: 'Pobierz jako txt' })
    ).toBeVisible();
  }
}