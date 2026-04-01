import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demo-bank.vercel.app/');
  }

  async login(username: string, password: string) {
    await this.page.getByTestId('login-input').fill(username);
    await this.page.getByTestId('password-input').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  async assertLoggedIn() {
    await expect(
      this.page.getByRole('heading', { name: 'konta osobiste' })
    ).toBeVisible();
  }
}