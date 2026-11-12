# BUG-002 : « Add to cart » sans effet sur 3 produits du catalogue

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
2. Cliquer sur « Add to cart » pour Sauce Labs Bolt T-Shirt
3. Faire de même pour Sauce Labs Fleece Jacket et Test.allTheThings() T-Shirt (Red)

## Résultat attendu

Le compteur du panier augmente de 1 et le bouton devient « Remove ».

## Résultat obtenu

Rien ne se passe : le compteur ne change pas et le bouton reste « Add to cart ». Les 3 autres produits s'ajoutent normalement.

## Impact

La moitié du catalogue ne peut pas être achetée : perte de ventes directe.

## Reproductibilité

Toujours
