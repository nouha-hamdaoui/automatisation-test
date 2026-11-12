# Recette automatisée avec Playwright

Projet d'entraînement à l'automatisation des tests, réalisé dans le cadre de ma montée en compétence de testeuse QA fonctionnelle vers l'automatisation.

- **Interface** : recette de [Sauce Demo](https://www.saucedemo.com), une boutique en ligne de démonstration (connexion, panier, commande).
- **API** : tests de [Restful Booker](https://restful-booker.herokuapp.com), une API de réservation d'hôtel d'entraînement.

![Tests Playwright](../../actions/workflows/tests.yml/badge.svg)

## Ce que montre ce projet

| Pratique | Où la voir |
|---|---|
| Plan de test et cahier de recette (vocabulaire ISTQB) | [`docs/`](docs/) |
| Scénarios Gherkin en français, lisibles par le métier | [`features/`](features/) |
| Page Object Model | [`pages/`](pages/) |
| Jeux de données séparés des tests | [`fixtures/donnees.ts`](fixtures/donnees.ts) |
| Tests pilotés par les données (partitions d'équivalence) | [`tests/e2e/connexion.spec.ts`](tests/e2e/connexion.spec.ts) |
| Tests d'API REST | [`tests/api/`](tests/api/) |
| Tags `@smoke` et `@regression` | dans chaque test |
| Multi-navigateurs et mobile | [`playwright.config.ts`](playwright.config.ts) |
| Intégration continue | [`.github/workflows/tests.yml`](.github/workflows/tests.yml) |

**Couverture actuelle** : 16 cas de test d'interface et 5 cas de test d'API, tous automatisés. Les 16 cas d'interface tournent sur Chrome, Firefox et mobile.

**Test exploratoire** : une session sur le compte `problem_user` a révélé 6 anomalies, dont une bloquante. Voir le [compte rendu](docs/sessions-exploratoires/charte-problem-user.md) et les [fiches anomalies](docs/anomalies/).

## Organisation

```
├── docs/
│   ├── plan-de-test.md          # objectif, périmètre, approche, critères
│   ├── cahier-de-recette.md     # liste des cas de test CT-01 à CT-16, API-01 à API-05
│   ├── anomalies/               # fiches anomalies
│   └── sessions-exploratoires/  # chartes et comptes rendus
├── features/                    # scénarios Gherkin (spécification)
├── pages/                       # Page Objects : un fichier par écran
├── fixtures/                    # données de test et fixtures Playwright
├── tests/
│   ├── e2e/                     # tests d'interface
│   └── api/                     # tests d'API
├── playwright.config.ts         # navigateurs, relances, rapports
└── .github/workflows/tests.yml  # exécution à chaque push
```

Chaque cas de test a un identifiant (CT-01, API-02…) repris dans le cahier de recette, le scénario Gherkin et le titre du test automatisé.

## Lancer les tests

Prérequis : [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install                 # installe Playwright
npx playwright install      # installe les navigateurs

npm test                    # tous les tests
npm run test:smoke          # uniquement les parcours critiques
npm run test:api            # uniquement l'API
npm run test:ui             # mode interactif, pour voir les tests s'exécuter
npm run rapport             # ouvre le rapport HTML du dernier lancement
```

## Prochaines étapes

- [ ] Brancher les fichiers `.feature` directement sur les tests avec `playwright-bdd`.
- [ ] Ajouter des valeurs limites sur le formulaire de livraison.
- [ ] Tests d'accessibilité avec `@axe-core/playwright`.
- [x] Rédiger les anomalies trouvées sur le compte `problem_user`.

## Auteure

**Nouha Hamdaoui**, testeuse QA fonctionnelle à Nice, certifiée ISTQB CTFL v4.0.

[LinkedIn](https://www.linkedin.com/in/nouha-hamdaoui/) · [GitHub](https://github.com/nouha-hamdaoui) · nouhahamdaoui1@gmail.com
