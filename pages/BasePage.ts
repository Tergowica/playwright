import { type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected navLink(name: string): Locator {
    return this.page
      .getByRole('navigation')
      .getByRole('link', { name, exact: true });
  }

  async navigateTo(sectionName: string): Promise<void> {
    await this.navLink(sectionName).click();
  }
}