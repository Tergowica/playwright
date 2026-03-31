import { expect, type Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput;
  private readonly passwordInput;
  private readonly loginButton;
  private readonly accountsHeading;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.accountsHeading = page.getByRole('heading', { name: 'konta osobiste' });
  }

  async open(): Promise<void> {
    await this.page.goto('https://demo-bank.vercel.app/');
  }

  async login(credentials: { username: string; password: string }): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async loginAsStandardUser(): Promise<void> {
    await this.login({
      username: 'testtest',
      password: '12312312',
    });
  }

  async assertUserIsLoggedIn(): Promise<void> {
    await expect(this.accountsHeading).toBeVisible();
  }
}