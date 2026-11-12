import type { Page, Locator } from '@playwright/test';

/**
 * Page Object de la page de connexion.
 *
 * Tous les sélecteurs de cette page sont ici. Si l'interface change,
 * on corrige ce fichier et tous les tests qui l'utilisent remarchent.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // getByTestId lit l'attribut data-test (réglé dans playwright.config.ts)
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
