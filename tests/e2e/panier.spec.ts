import { test, expect } from '../../fixtures/test';
import { COMPTES, MOT_DE_PASSE, PRODUITS } from '../../fixtures/donnees';

/**
 * Fonctionnalités : catalogue et panier.
 * Scénarios décrits en Gherkin dans features/panier.feature
 */
test.describe('Catalogue et panier', () => {
  // Chaque test part d'un utilisateur connecté, sur le catalogue
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(COMPTES.standard, MOT_DE_PASSE);
  });

  test(
    'CT-07 ajout d\'un produit : le compteur du panier passe à 1',
    { tag: ['@smoke', '@regression'] },
    async ({ inventoryPage }) => {
      await inventoryPage.addToCart(PRODUITS.sacADos.slug);

      await expect(inventoryPage.cartBadge).toHaveText('1');
      // Le bouton "Add to cart" est remplacé par "Remove"
      await expect(inventoryPage.removeButton(PRODUITS.sacADos.slug)).toBeVisible();
    },
  );

  test(
    'CT-08 ajout de deux produits puis retrait d\'un : le panier contient le bon produit',
    { tag: '@regression' },
    async ({ inventoryPage, cartPage }) => {
      await inventoryPage.addToCart(PRODUITS.sacADos.slug);
      await inventoryPage.addToCart(PRODUITS.lampeVelo.slug);
      await expect(inventoryPage.cartBadge).toHaveText('2');

      await inventoryPage.removeFromCart(PRODUITS.sacADos.slug);
      await expect(inventoryPage.cartBadge).toHaveText('1');

      await inventoryPage.openCart();
      await expect(cartPage.itemNames).toHaveText([PRODUITS.lampeVelo.nom]);
    },
  );

  test(
    'CT-09 retrait du dernier produit : le compteur du panier disparaît',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      await inventoryPage.addToCart(PRODUITS.teeShirt.slug);
      await inventoryPage.removeFromCart(PRODUITS.teeShirt.slug);

      await expect(inventoryPage.cartBadge).toHaveCount(0);
    },
  );

  test(
    'CT-10 tri par prix croissant',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      await inventoryPage.sortBy('lohi');

      const prix = await inventoryPage.getPrices();
      const prixTries = [...prix].sort((a, b) => a - b);
      expect(prix).toEqual(prixTries);
    },
  );

  test(
    'CT-11 tri par nom de Z à A',
    { tag: '@regression' },
    async ({ inventoryPage }) => {
      await inventoryPage.sortBy('za');

      const noms = await inventoryPage.getNames();
      const nomsTries = [...noms].sort().reverse();
      expect(noms).toEqual(nomsTries);
    },
  );
});
