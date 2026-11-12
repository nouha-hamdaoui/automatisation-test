# BUG-005 : Cliquer sur un produit ouvre la fiche d'un autre produit

| Champ | Valeur |
|---|---|
| Date | 2026-11-11 |
| Trouvée par | Session exploratoire `problem_user` (voir `../sessions-exploratoires/charte-problem-user.md`) |
| Environnement | https://www.saucedemo.com · Chrome ordinateur |
| Compte utilisé | `problem_user` |
| Sévérité | Majeure |
| Priorité | Haute |
| Statut | Ouverte |

## Étapes pour reproduire

1. Se connecter avec `problem_user`
2. Cliquer sur le nom « Sauce Labs Backpack »
3. Revenir et répéter avec les autres produits

## Résultat attendu

La fiche du produit cliqué s'ouvre.

## Résultat obtenu

Une autre fiche s'ouvre : Backpack ouvre Fleece Jacket, Bike Light ouvre Bolt T-Shirt, Onesie ouvre Test.allTheThings() T-Shirt. Fleece Jacket affiche « ITEM NOT FOUND ».

## Impact

Le client lit la description et le prix d'un autre produit : risque d'achat erroné et de réclamation.

## Reproductibilité

Toujours
