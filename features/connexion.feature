# language: fr
# Spécification lisible par le métier.
# Chaque scénario correspond à un test automatisé de tests/e2e/connexion.spec.ts (même identifiant CT).

Fonctionnalité: Connexion à la boutique
  En tant que client
  Je veux me connecter avec mon compte
  Afin d'accéder au catalogue et de commander

  @smoke @regression
  Scénario: CT-01 Connexion réussie avec un compte valide
    Étant donné que je suis sur la page de connexion
    Quand je me connecte avec "standard_user" et le bon mot de passe
    Alors j'arrive sur le catalogue "Products"

  @regression
  Scénario: CT-02 Compte verrouillé
    Étant donné que je suis sur la page de connexion
    Quand je me connecte avec "locked_out_user" et le bon mot de passe
    Alors un message indique que le compte est verrouillé
    Et je reste sur la page de connexion

  @regression
  Plan du scénario: <id> Connexion refusée : <cas>
    Étant donné que je suis sur la page de connexion
    Quand je me connecte avec "<identifiant>" et "<mot_de_passe>"
    Alors le message "<message>" s'affiche
    Et je reste sur la page de connexion

    Exemples:
      | id    | cas                | identifiant   | mot_de_passe | message              |
      | CT-03 | identifiant vide   |               | secret_sauce | Username is required |
      | CT-04 | mot de passe vide  | standard_user |              | Password is required |
      | CT-05 | mot de passe faux  | standard_user | mauvais-mdp  | do not match         |

  @regression
  Scénario: CT-06 Accès direct au catalogue sans être connecté
    Étant donné que je ne suis pas connecté
    Quand j'ouvre directement la page du catalogue
    Alors je suis renvoyé vers la connexion avec un message explicatif
