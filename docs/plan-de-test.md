# Plan de test : Sauce Demo et Restful Booker

Projet d'entraînement. Le vocabulaire suit le syllabus ISTQB CTFL v4.0.

## 1. Objectif

Vérifier que les parcours critiques d'une boutique en ligne fonctionnent (connexion, panier, commande), et que l'API de réservation respecte son contrat. Construire une suite de non-régression automatisée avec Playwright.

## 2. Objets de test

| Objet | Description | Adresse |
|---|---|---|
| Sauce Demo | Boutique en ligne de démonstration | https://www.saucedemo.com |
| Restful Booker | API REST de réservation d'hôtel | https://restful-booker.herokuapp.com |

## 3. Périmètre

**Dans le périmètre**
- Connexion : compte valide, compte verrouillé, champs vides, mauvais mot de passe, accès sans être connecté.
- Catalogue : tri par prix et par nom.
- Panier : ajout, retrait, compteur.
- Tunnel de commande : formulaire de livraison, calcul des montants, confirmation, annulation.
- API : disponibilité, création, lecture, suppression avec et sans authentification, ressource inexistante.

**Hors périmètre**
- Performance et charge.
- Sécurité (au-delà du contrôle d'accès basique).
- Accessibilité (prévue dans une prochaine itération).
- Paiement réel : le site de démonstration n'en a pas.

## 4. Approche

- **Test basé sur les risques** : les parcours qui font perdre une vente (connexion, panier, commande) sont testés en premier et taggés `@smoke`.
- **Techniques boîte noire** :
  - partitions d'équivalence : saisies invalides à la connexion (CT-03 à CT-05) ;
  - champs obligatoires du formulaire de livraison (CT-13 à CT-15) ;
  - test de transition d'état du panier : vide, 1 produit, 2 produits, vide (CT-07 à CT-09) ;
  - vérification de règles de calcul : total = sous-total + taxe (CT-12).
- **Test exploratoire** : sessions chronométrées sur le compte `problem_user`, voir `sessions-exploratoires/`.
- **Niveaux de test** : tests système de bout en bout (interface) et tests d'API.

## 5. Environnements

| Projet Playwright | Navigateur / appareil |
|---|---|
| chromium | Chrome ordinateur |
| firefox | Firefox ordinateur |
| mobile-chrome | Pixel 5 (émulation) |
| api | Aucun navigateur, requêtes HTTP |

## 6. Critères d'entrée

- Le site et l'API répondent (test API-01 et CT-01 au vert).
- Les comptes de test sont disponibles.

## 7. Critères de sortie

- 100 % des tests `@smoke` passent.
- Aucune anomalie bloquante ou majeure ouverte sur les parcours critiques.
- Toutes les anomalies trouvées sont documentées dans `anomalies/`.

## 8. Risques et parades

| Risque | Parade |
|---|---|
| Le site de démonstration change ses identifiants `data-test` | Sélecteurs centralisés dans les Page Objects |
| L'API d'entraînement est lente ou redémarre | 2 relances automatiques en CI |
| Données partagées avec d'autres utilisateurs de l'API | Chaque test crée ses propres données |

## 9. Livrables

- Ce plan de test.
- Le cahier de recette : `cahier-de-recette.md`.
- Les scénarios Gherkin : dossier `features/`.
- La suite automatisée : dossier `tests/`.
- Les fiches anomalies : dossier `anomalies/`.
- Le rapport d'exécution HTML généré par Playwright.
