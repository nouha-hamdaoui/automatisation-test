# BUG-004 : Le tri du catalogue ne change pas l'ordre des produits

| Champ | Valeur |
|---|---|
| Date | 2026-11-11 |
| Trouvée par | Session exploratoire `problem_user` (voir `../sessions-exploratoires/charte-problem-user.md`) |
| Environnement | https://www.saucedemo.com · Chrome ordinateur |
| Compte utilisé | `problem_user` |
| Sévérité | Mineure |
| Priorité | Moyenne |
| Statut | Ouverte |

## Étapes pour reproduire

1. Se connecter avec `problem_user`
2. Choisir « Price (low to high) » dans le menu de tri
3. Choisir ensuite « Name (Z to A) »

## Résultat attendu

Les produits sont triés selon l'option choisie, et le menu affiche cette option.

## Résultat obtenu

L'ordre reste A à Z et le menu revient sur « Name (A to Z) ».

## Impact

Gêne pour trouver un produit, sans bloquer l'achat.

## Reproductibilité

Toujours
