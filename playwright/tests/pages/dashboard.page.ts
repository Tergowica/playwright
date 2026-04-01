import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async goTo(linkName: string) {
    await this.page
      .getByRole('navigation')
      .getByRole('link', { name: linkName, exact: true })
      .click();
  }
}