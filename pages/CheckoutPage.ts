import type { Page, Locator } from '@playwright/test';

/**
 * Page Object du tunnel de commande. Il couvre 3 écrans :
 * 1. les informations de livraison (prénom, nom, code postal) ;
 * 2. le récapitulatif avec les montants ;
 * 3. la confirmation de commande.
 */
export class CheckoutPage {
  readonly page: Page;

  // Écran 1 : informations
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Écran 2 : récapitulatif
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Écran 3 : confirmation
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');

    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');

    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillInformation(prenom: string, nom: string, codePostal: string) {
    await this.firstNameInput.fill(prenom);
    await this.lastNameInput.fill(nom);
    await this.postalCodeInput.fill(codePostal);
    await this.continueButton.click();
  }

  /**
   * Lit les montants du récapitulatif.
   * "Item total: $39.98" devient 39.98
   */
  async getAmounts() {
    const lireMontant = async (label: Locator) => {
      const texte = (await label.textContent()) ?? '';
      return Number(texte.split('$')[1]);
    };
    return {
      subtotal: await lireMontant(this.subtotalLabel),
      tax: await lireMontant(this.taxLabel),
      total: await lireMontant(this.totalLabel),
    };
  }

  async finish() {
    await this.finishButton.click();
  }
}
