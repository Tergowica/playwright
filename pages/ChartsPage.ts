import { type Page } from '@playwright/test';

export class ChartsPage {
  constructor(private readonly page: Page) {}

  async interactWithFirstChartPath(): Promise<void> {
    await this.page.locator('path').first().click({ force: true });
  }
}