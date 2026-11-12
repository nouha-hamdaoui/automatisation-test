# language: fr
# Chaque scénario correspond à un test automatisé de tests/e2e/commande.spec.ts (même identifiant CT).

Fonctionnalité: Tunnel de commande
  En tant que client connecté avec un panier rempli
  Je veux valider ma commande
  Afin de recevoir mes produits

  Contexte:
    Étant donné que je suis connecté avec "standard_user"
    Et mon panier contient "Sauce Labs Backpack" et "Sauce Labs Bike Light"

  @smoke @regression
  Scénario: CT-12 Commande complète
    Quand je saisis mes informations de livraison valides
    Alors le sous-total est égal à la somme des prix des produits
    Et le total est égal au sous-total plus la taxe
    Quand je valide la commande
    Alors le message "Thank you for your order!" s'affiche
    Et le panier est vide

  @regression
  Plan du scénario: <id> Champ obligatoire manquant : <champ>
    Quand je valide le formulaire de livraison sans <champ>
    Alors le message "<message>" s'affiche
    Et je reste sur le formulaire de livraison

    Exemples:
      | id    | champ       | message                 |
      | CT-13 | prénom      | First Name is required  |
      | CT-14 | nom         | Last Name is required   |
      | CT-15 | code postal | Postal Code is required |

  @regression
  Scénario: CT-16 Annulation pendant la saisie
    Quand j'annule sur le formulaire de livraison
    Alors je reviens au panier
    Et mes 2 produits sont toujours dans le panier
