import { expect, type Download, type Page } from '@playwright/test';

export class ReportsPage {
  private readonly txtLink;
  private readonly zipLink;

  constructor(private readonly page: Page) {
    this.txtLink = page.getByRole('link', { name: 'Pobierz jako txt' });
    this.zipLink = page.getByRole('link', { name: 'Pobierz jako zip' });
  }

  async downloadTxtReport(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.txtLink.click();
    return await downloadPromise;
  }

  async downloadZipReport(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.zipLink.click();
    return await downloadPromise;
  }

  async assertTxtLinkIsVisible(): Promise<void> {
    await expect(this.txtLink).toBeVisible();
  }

  async assertZipLinkIsVisible(): Promise<void> {
    await expect(this.zipLink).toBeVisible();
  }
}