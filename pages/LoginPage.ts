import { expect, type Page, type Locator } from '@playwright/test';

export class LoginPage {
  // Definiujemy pola dla strony i jej elementów (lokatorów)
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly accountsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // Inicjalizujemy lokatory w konstruktorze [3]
    // Używamy zalecanych lokatorów typu 'User-facing' [4, 5]
    this.usernameInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.accountsHeading = page.getByRole('heading', { name: 'konta osobiste' });
  }

  // Metoda do otwierania strony [6]
  async open() {
    await this.page.goto('https://demo-bank.vercel.app/');
  }

  // Logika logowania zamknięta w jednej metodzie [6]
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Pomocnicza metoda dla standardowego użytkownika
  async loginAsStandardUser() {
    await this.login('testtest', '12312312');
  }

  // Asercja sprawdzająca stan po zalogowaniu [6]
  async assertUserIsLoggedIn() {
    // Web-first assertions automatycznie czekają na pojawienie się elementu [7, 8]
    await expect(this.accountsHeading).toBeVisible();
  }
}