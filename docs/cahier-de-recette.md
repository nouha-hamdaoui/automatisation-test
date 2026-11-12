# Cahier de recette

Chaque cas de test a un identifiant unique, repris dans le titre du test automatisé et dans le scénario Gherkin. On retrouve ainsi un cas de test dans le code, et inversement.

Priorité : **P1** = parcours critique (smoke), **P2** = régression.

## Interface : Sauce Demo

| ID | Fonctionnalité | Cas de test | Technique | Priorité | Automatisé |
|---|---|---|---|---|---|
| CT-01 | Connexion | Connexion réussie avec un compte valide | Cas nominal | P1 | `connexion.spec.ts` |
| CT-02 | Connexion | Compte verrouillé : connexion refusée, message clair | Cas d'erreur | P2 | `connexion.spec.ts` |
| CT-03 | Connexion | Identifiant vide | Partition d'équivalence | P2 | `connexion.spec.ts` |
| CT-04 | Connexion | Mot de passe vide | Partition d'équivalence | P2 | `connexion.spec.ts` |
| CT-05 | Connexion | Mot de passe erroné | Partition d'équivalence | P2 | `connexion.spec.ts` |
| CT-06 | Connexion | Accès direct au catalogue sans être connecté | Contrôle d'accès | P2 | `connexion.spec.ts` |
| CT-07 | Panier | Ajout d'un produit, compteur à 1 | Transition d'état | P1 | `panier.spec.ts` |
| CT-08 | Panier | Ajout de 2 produits puis retrait d'un | Transition d'état | P2 | `panier.spec.ts` |
| CT-09 | Panier | Retrait du dernier produit, compteur masqué | Transition d'état | P2 | `panier.spec.ts` |
| CT-10 | Catalogue | Tri par prix croissant | Cas nominal | P2 | `panier.spec.ts` |
| CT-11 | Catalogue | Tri par nom de Z à A | Cas nominal | P2 | `panier.spec.ts` |
| CT-12 | Commande | Commande complète, montants et confirmation | Règle de calcul | P1 | `commande.spec.ts` |
| CT-13 | Commande | Prénom manquant | Champ obligatoire | P2 | `commande.spec.ts` |
| CT-14 | Commande | Nom manquant | Champ obligatoire | P2 | `commande.spec.ts` |
| CT-15 | Commande | Code postal manquant | Champ obligatoire | P2 | `commande.spec.ts` |
| CT-16 | Commande | Annulation pendant la saisie, panier conservé | Cas alternatif | P2 | `commande.spec.ts` |

## API : Restful Booker

| ID | Cas de test | Résultat attendu | Priorité | Automatisé |
|---|---|---|---|---|
| API-01 | Le service répond | `GET /ping` renvoie 201 | P1 | `reservations.spec.ts` |
| API-02 | Créer puis relire une réservation | 200, données identiques à l'envoi | P1 | `reservations.spec.ts` |
| API-03 | Lire une réservation inexistante | 404 | P2 | `reservations.spec.ts` |
| API-04 | Supprimer sans authentification | 403, la réservation existe toujours | P2 | `reservations.spec.ts` |
| API-05 | Supprimer avec un jeton valide | 201, puis 404 à la relecture | P2 | `reservations.spec.ts` |

## Cas à ajouter (prochaines itérations)

- [ ] Valeurs limites sur le code postal (longueur, caractères spéciaux).
- [ ] Panier conservé après déconnexion puis reconnexion.
- [ ] Modification d'une réservation (`PUT /booking/:id`) avec et sans jeton.
- [ ] Contrôles d'accessibilité de base.
