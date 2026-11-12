import { test, expect } from '../../fixtures/test';
import { COMPTES, MOT_DE_PASSE } from '../../fixtures/donnees';

/**
 * Fonctionnalité : connexion.
 * Scénarios décrits en Gherkin dans features/connexion.feature
 * Cas de test détaillés dans docs/cahier-de-recette.md
 */
test.describe('Connexion', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'CT-01 connexion réussie avec un compte valide',
    { tag: ['@smoke', '@regression'] },
    async ({ page, loginPage, inventoryPage }) => {
      await loginPage.login(COMPTES.standard, MOT_DE_PASSE);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.title).toHaveText('Products');
    },
  );

  test(
    'CT-02 compte verrouillé : connexion refusée avec un message clair',
    { tag: '@regression' },
    async ({ page, loginPage }) => {
      await loginPage.login(COMPTES.verrouille, MOT_DE_PASSE);

      await expect(loginPage.errorMessage).toContainText('locked out');
      // L'utilisateur reste sur la page de connexion
      await expect(page).not.toHaveURL(/inventory\.html/);
    },
  );

  /**
   * Partitions d'équivalence : chaque ligne représente une classe
   * de saisie invalide. Un seul test, exécuté une fois par ligne.
   */
  const saisiesInvalides = [
    { id: 'CT-03', cas: 'identifiant vide', identifiant: '', motDePasse: MOT_DE_PASSE, message: 'Username is required' },
    { id: 'CT-04', cas: 'mot de passe vide', identifiant: COMPTES.standard, motDePasse: '', message: 'Password is required' },
    { id: 'CT-05', cas: 'mot de passe erroné', identifiant: COMPTES.standard, motDePasse: 'mauvais-mdp', message: 'do not match' },
  ];

  for (const saisie of saisiesInvalides) {
    test(
      `${saisie.id} connexion refusée : ${saisie.cas}`,
      { tag: '@regression' },
      async ({ page, loginPage }) => {
        await loginPage.login(saisie.identifiant, saisie.motDePasse);

        await expect(loginPage.errorMessage).toContainText(saisie.message);
        await expect(page).not.toHaveURL(/inventory\.html/);
      },
    );
  }

  test(
    'CT-06 accès direct au catalogue sans être connecté : redirection vers la connexion',
    { tag: '@regression' },
    async ({ page, loginPage }) => {
      await page.goto('/inventory.html');

      await expect(loginPage.errorMessage).toContainText('when you are logged in');
      await expect(loginPage.loginButton).toBeVisible();
    },
  );
});
