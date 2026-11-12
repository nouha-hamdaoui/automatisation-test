# BUG-003 : « Remove » depuis le catalogue ne retire pas le produit

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

1. Se connecter avec `problem_user`
2. Ajouter Sauce Labs Backpack au panier (compteur à 1)
3. Cliquer sur « Remove » sur la même carte produit

## Résultat attendu

Le produit est retiré : le compteur baisse et le bouton redevient « Add to cart ».

## Résultat obtenu

Rien ne se passe : le compteur ne change pas et le bouton reste « Remove ». Constaté aussi sur Bike Light et Onesie.

## Impact

Le client ne peut pas corriger son panier depuis le catalogue et risque de commander un produit non voulu.

## Reproductibilité

Toujours
