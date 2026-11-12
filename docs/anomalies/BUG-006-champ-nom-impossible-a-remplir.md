# BUG-006 : Le champ « Last Name » ne peut pas être rempli : commande impossible

| Champ | Valeur |
|---|---|
| Date | 2026-11-11 |
| Trouvée par | Session exploratoire `problem_user` (voir `../sessions-exploratoires/charte-problem-user.md`) |
| Environnement | https://www.saucedemo.com · Chrome ordinateur |
| Compte utilisé | `problem_user` |
| Sévérité | Bloquante |
| Priorité | Haute |
| Statut | Ouverte |

## Étapes pour reproduire

1. Se connecter avec `problem_user`
2. Ajouter un produit qui fonctionne (ex. Sauce Labs Backpack) et ouvrir le panier
3. Cliquer sur « Checkout »
4. Saisir un prénom, puis taper « Dupont » dans « Last Name »
5. Saisir un code postal et cliquer sur « Continue »

## Résultat attendu

Le nom saisi apparaît dans « Last Name » et la commande passe à l'étape suivante.

## Résultat obtenu

Le champ « Last Name » reste vide (la saisie n'y apparaît jamais) et le message « Error: Last Name is required » bloque la commande.

## Impact

Aucune commande ne peut être finalisée : blocage total du chiffre d'affaires.

## Reproductibilité

Toujours
