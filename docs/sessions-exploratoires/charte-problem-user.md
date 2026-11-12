# Charte de session exploratoire : compte `problem_user`

Sauce Demo propose un compte, `problem_user`, qui contient des anomalies volontaires. C'est un très bon terrain pour s'entraîner à trouver, reproduire et rédiger des anomalies.

## Charte

| | |
|---|---|
| **Explorer** | le catalogue, le panier et le tunnel de commande |
| **Avec** | le compte `problem_user` / `secret_sauce`, sur Chrome puis sur mobile |
| **Pour découvrir** | les écarts par rapport au comportement du compte `standard_user` |
| **Durée** | 45 minutes |

## Pistes

- Comparer chaque écran avec le même écran vu par `standard_user`.
- Images, noms et prix des produits : sont-ils cohérents ?
- Tri : chaque option du menu fonctionne-t-elle ?
- Ajout et retrait au panier : sur chaque produit, pas seulement le premier.
- Formulaire de livraison : saisir chaque champ et vérifier ce qui s'affiche réellement.
- Aller jusqu'au bout de la commande.

## Compte rendu de session

| Champ | Valeur |
|---|---|
| Date | 2026-11-11 |
| Durée réelle | 40 minutes |
| Navigateurs testés | Chrome ordinateur |
| Anomalies trouvées | 6 : BUG-001 à BUG-006 (fiches dans `docs/anomalies/`) |
| Questions ouvertes | Comportement sur mobile à vérifier |
| Idées de tests à automatiser | Vérifier que chaque bouton « Add to cart » incrémente le compteur ; vérifier que le nom cliqué correspond à la fiche ouverte |

## Synthèse

| ID | Sévérité | Anomalie |
|---|---|---|
| BUG-001 | Majeure | Toutes les fiches du catalogue affichent la même image |
| BUG-002 | Majeure | « Add to cart » sans effet sur 3 produits |
| BUG-003 | Majeure | « Remove » depuis le catalogue ne retire pas le produit |
| BUG-004 | Mineure | Le tri du catalogue ne change pas l'ordre |
| BUG-005 | Majeure | Cliquer sur un produit ouvre la fiche d'un autre produit |
| BUG-006 | Bloquante | Le champ « Last Name » ne peut pas être rempli : commande impossible |

**Conclusion** : critère de sortie non atteint (une anomalie bloquante sur le tunnel de commande). Version non livrable en l'état.
