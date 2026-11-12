import { defineConfig, devices } from '@playwright/test';

/**
 * Configuration de Playwright.
 *
 * - Les tests d'interface (e2e) tournent sur Sauce Demo, un site e-commerce
 *   de démonstration fait pour s'entraîner au test.
 * - Les tests d'API tournent sur Restful Booker, une API de réservation
 *   d'hôtel faite pour s'entraîner au test d'API.
 */
const SITE_URL = 'https://www.saucedemo.com';
const API_URL = 'https://restful-booker.herokuapp.com';

// Vrai quand les tests tournent sur GitHub Actions
const enCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  // Les tests indépendants tournent en parallèle pour aller plus vite
  fullyParallel: true,

  // En CI, on refuse un test.only oublié dans le code
  forbidOnly: enCI,

  // En CI, on relance 2 fois un test qui échoue (le site peut être lent).
  // En local, pas de relance : on veut voir l'échec tout de suite.
  retries: enCI ? 2 : 0,

  // Rapport HTML (à ouvrir avec : npm run rapport) + liste dans le terminal
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // getByTestId('username') cherche l'attribut data-test="username"
    testIdAttribute: 'data-test',

    // Preuves en cas d'échec, utiles pour rédiger une fiche anomalie
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Tests d'interface sur 2 navigateurs d'ordinateur et 1 téléphone
    {
      name: 'chromium',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'], baseURL: SITE_URL },
    },
    {
      name: 'firefox',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Firefox'], baseURL: SITE_URL },
    },
    {
      name: 'mobile-chrome',
      testDir: './tests/e2e',
      use: { ...devices['Pixel 5'], baseURL: SITE_URL },
    },

    // Tests d'API : pas de navigateur, uniquement des requêtes HTTP
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: API_URL,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
