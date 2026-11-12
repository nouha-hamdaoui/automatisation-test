# BUG-001 : Toutes les fiches du catalogue affichent la même image

| Champ | Valeur |
|---|---|
| Date | 2026-11-11 |
| Trouvée par | Session exploratoire `problem_user` (voir `../sessions-exploratoires/charte-problem-user.md`) |
| Environnement | https://www.saucedemo.com · Chrome ordinateur |
| Compte utilisé | `problem_user` |
| Sévérité | Majeure |
| Priorité | Moyenne |
| Statut | Ouverte |

## Étapes pour reproduire

1. Se connecter avec `problem_user` / `secret_sauce`
2. Regarder les images des 6 produits du catalogue

## Résultat attendu

Chaque produit affiche sa propre photo.

## Résultat obtenu

Les 6 produits affichent la même photo (un chien), fichier `sl-404-….jpg`.

## Impact

Le client ne peut pas voir ce qu'il achète. Perte de confiance et risque d'erreur d'achat.

## Reproductibilité

Toujours
