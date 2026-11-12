# language: fr
# Chaque scénario correspond à un test automatisé de tests/e2e/panier.spec.ts (même identifiant CT).

Fonctionnalité: Catalogue et panier
  En tant que client connecté
  Je veux choisir des produits et gérer mon panier
  Afin de préparer ma commande

  Contexte:
    Étant donné que je suis connecté avec "standard_user"

  @smoke @regression
  Scénario: CT-07 Ajout d'un produit au panier
    Quand j'ajoute "Sauce Labs Backpack" au panier
    Alors le compteur du panier affiche "1"
    Et le bouton du produit devient "Remove"

  @regression
  Scénario: CT-08 Ajout de deux produits puis retrait d'un produit
    Quand j'ajoute "Sauce Labs Backpack" et "Sauce Labs Bike Light" au panier
    Et je retire "Sauce Labs Backpack"
    Alors le compteur du panier affiche "1"
    Et le panier contient uniquement "Sauce Labs Bike Light"

  @regression
  Scénario: CT-09 Retrait du dernier produit
    Quand j'ajoute puis je retire "Sauce Labs Bolt T-Shirt"
    Alors le compteur du panier n'est plus affiché

  @regression
  Scénario: CT-10 Tri par prix croissant
    Quand je trie les produits par prix croissant
    Alors chaque prix est inférieur ou égal au suivant

  @regression
  Scénario: CT-11 Tri par nom de Z à A
    Quand je trie les produits de Z à A
    Alors les noms sont dans l'ordre alphabétique inverse
