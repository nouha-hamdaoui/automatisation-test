/**
 * Jeux de données de test.
 *
 * On les range ici, et pas dans les tests, pour deux raisons :
 * - on change une donnée à un seul endroit ;
 * - les tests se lisent comme des scénarios, sans valeurs en dur.
 */

// Comptes fournis par Sauce Demo (tous avec le même mot de passe)
export const MOT_DE_PASSE = 'secret_sauce';

export const COMPTES = {
  standard: 'standard_user', // compte normal
  verrouille: 'locked_out_user', // compte bloqué : la connexion doit être refusée
  problemes: 'problem_user', // compte qui contient des anomalies volontaires
} as const;

// Produits utilisés dans les tests.
// "slug" sert à construire l'identifiant du bouton : add-to-cart-<slug>
export const PRODUITS = {
  sacADos: { nom: 'Sauce Labs Backpack', slug: 'sauce-labs-backpack', prix: 29.99 },
  lampeVelo: { nom: 'Sauce Labs Bike Light', slug: 'sauce-labs-bike-light', prix: 9.99 },
  teeShirt: { nom: 'Sauce Labs Bolt T-Shirt', slug: 'sauce-labs-bolt-t-shirt', prix: 15.99 },
} as const;

export type Produit = (typeof PRODUITS)[keyof typeof PRODUITS];

// Client valide pour le formulaire de livraison
export const CLIENT = {
  prenom: 'Nadia',
  nom: 'Martin',
  codePostal: '06000',
};

// Réservation valide pour les tests d'API
export function nouvelleReservation() {
  return {
    firstname: 'Nadia',
    lastname: 'Martin',
    totalprice: 120,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Petit-déjeuner',
  };
}
