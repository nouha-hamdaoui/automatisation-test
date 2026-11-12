import type { Page, Locator } from '@playwright/test';

/** Options du menu de tri, telles qu'elles existent dans le site */
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Page Object de la liste des produits (affichée après la connexion).
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortSelect = page.getByTestId('product-sort-container');
    // Pastille rouge sur l'icône du panier, qui affiche le nombre d'articles
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  /** Bouton "Add to cart" d'un produit, par exemple add-to-cart-sauce-labs-backpack */
  addButton(slug: string): Locator {
    return this.page.getByTestId(`add-to-cart-${slug}`);
  }

  /** Bouton "Remove" d'un produit déjà dans le panier */
  removeButton(slug: string): Locator {
    return this.page.getByTestId(`remove-${slug}`);
  }

  async addToCart(slug: string) {
    await this.addButton(slug).click();
  }

  async removeFromCart(slug: string) {
    await this.removeButton(slug).click();
  }

  async sortBy(option: SortOption) {
    await this.sortSelect.selectOption(option);
  }

  /** Noms des produits, dans l'ordre affiché */
  async getNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /** Prix des produits, dans l'ordre affiché : "$29.99" devient 29.99 */
  async getPrices(): Promise<number[]> {
    const textes = await this.itemPrices.allTextContents();
    return textes.map((texte) => Number(texte.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
