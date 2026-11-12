import { test, expect } from '../../fixtures/test';
import { CLIENT, COMPTES, MOT_DE_PASSE, PRODUITS } from '../../fixtures/donnees';

/**
 * Fonctionnalité : tunnel de commande.
 * Scénarios décrits en Gherkin dans features/commande.feature
 */
test.describe('Tunnel de commande', () => {
  // Chaque test part d'un panier contenant 2 produits, sur la page panier
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(COMPTES.standard, MOT_DE_PASSE);
    await inventoryPage.addToCart(PRODUITS.sacADos.slug);
    await inventoryPage.addToCart(PRODUITS.lampeVelo.slug);
    await inventoryPage.openCart();
  });

  test(
    'CT-12 commande complète : montants justes et confirmation affichée',
    { tag: ['@smoke', '@regression'] },
    async ({ page, cartPage, checkoutPage, inventoryPage }) => {
      await expect(cartPage.items).toHaveCount(2);
      await cartPage.checkout();

      await checkoutPage.fillInformation(CLIENT.prenom, CLIENT.nom, CLIENT.codePostal);

      // Le sous-total doit être la somme des prix des produits du panier
      const montants = await checkoutPage.getAmounts();
      const sommeAttendue = PRODUITS.sacADos.prix + PRODUITS.lampeVelo.prix;
      expect(montants.subtotal).toBeCloseTo(sommeAttendue, 2);

      // Le total doit être égal au sous-total plus la taxe
      expect(montants.total).toBeCloseTo(montants.subtotal + montants.tax, 2);

      await checkoutPage.finish();

      await expect(page).toHaveURL(/checkout-complete\.html/);
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
      // Après la commande, le panier est vidé
      await expect(inventoryPage.cartBadge).toHaveCount(0);
    },
  );

  /**
   * Champs obligatoires du formulaire de livraison.
   * Chaque ligne laisse un seul champ vide et vérifie le message attendu.
   */
  const champsManquants = [
    { id: 'CT-13', champ: 'prénom', prenom: '', nom: CLIENT.nom, codePostal: CLIENT.codePostal, message: 'First Name is required' },
    { id: 'CT-14', champ: 'nom', prenom: CLIENT.prenom, nom: '', codePostal: CLIENT.codePostal, message: 'Last Name is required' },
    { id: 'CT-15', champ: 'code postal', prenom: CLIENT.prenom, nom: CLIENT.nom, codePostal: '', message: 'Postal Code is required' },
  ];

  for (const cas of champsManquants) {
    test(
      `${cas.id} formulaire de livraison bloqué si le ${cas.champ} est vide`,
      { tag: '@regression' },
      async ({ page, cartPage, checkoutPage }) => {
        await cartPage.checkout();
        await checkoutPage.fillInformation(cas.prenom, cas.nom, cas.codePostal);

        await expect(checkoutPage.errorMessage).toContainText(cas.message);
        // On reste sur l'écran de saisie
        await expect(page).toHaveURL(/checkout-step-one\.html/);
      },
    );
  }

  test(
    'CT-16 annulation pendant la saisie : retour au panier sans perte',
    { tag: '@regression' },
    async ({ page, cartPage, checkoutPage }) => {
      await cartPage.checkout();
      await checkoutPage.cancelButton.click();

      await expect(page).toHaveURL(/cart\.html/);
      await expect(cartPage.items).toHaveCount(2);
    },
  );
});
