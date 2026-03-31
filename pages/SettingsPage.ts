import { expect, type Page } from '@playwright/test';

export class SettingsPage {
  private readonly placeholderMessage;

  constructor(private readonly page: Page) {
    this.placeholderMessage = page.getByText('Zapraszamy za jakiś czas...');
  }

  async assertSectionIsNotAvailableYet(): Promise<void> {
    await expect(this.placeholderMessage).toBeVisible();
  }
}