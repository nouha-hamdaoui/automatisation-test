import { test, expect } from '@playwright/test';
import { nouvelleReservation } from '../../fixtures/donnees';

/**
 * Tests d'API sur Restful Booker (API de réservation d'hôtel d'entraînement).
 * Documentation de l'API : https://restful-booker.herokuapp.com/apidoc/index.html
 *
 * Ici pas de navigateur : "request" envoie directement des requêtes HTTP.
 */
test.describe('API Réservations', () => {
  test(
    'API-01 le service répond',
    { tag: ['@smoke', '@regression'] },
    async ({ request }) => {
      const reponse = await request.get('/ping');
      // Particularité de cette API : /ping renvoie 201 et non 200
      expect(reponse.status()).toBe(201);
    },
  );

  test(
    'API-02 création d\'une réservation puis relecture : les données sont identiques',
    { tag: ['@smoke', '@regression'] },
    async ({ request }) => {
      const donnees = nouvelleReservation();

      // 1. Création
      const creation = await request.post('/booking', { data: donnees });
      expect(creation.status()).toBe(200);
      const corps = await creation.json();
      expect(typeof corps.bookingid).toBe('number');

      // 2. Relecture de la réservation créée
      const lecture = await request.get(`/booking/${corps.bookingid}`);
      expect(lecture.status()).toBe(200);
      expect(await lecture.json()).toMatchObject(donnees);
    },
  );

  test(
    'API-03 réservation inexistante : erreur 404',
    { tag: '@regression' },
    async ({ request }) => {
      const reponse = await request.get('/booking/999999999');
      expect(reponse.status()).toBe(404);
    },
  );

  test(
    'API-04 suppression sans être authentifié : refusée',
    { tag: '@regression' },
    async ({ request }) => {
      const creation = await request.post('/booking', { data: nouvelleReservation() });
      const { bookingid } = await creation.json();

      const suppression = await request.delete(`/booking/${bookingid}`);
      expect(suppression.status()).toBe(403);

      // La réservation existe toujours
      const lecture = await request.get(`/booking/${bookingid}`);
      expect(lecture.status()).toBe(200);
    },
  );

  test(
    'API-05 suppression avec un jeton valide : la réservation n\'existe plus',
    { tag: '@regression' },
    async ({ request }) => {
      // 1. Obtenir un jeton d'authentification (identifiants publics de l'API d'entraînement)
      const auth = await request.post('/auth', {
        data: { username: 'admin', password: 'password123' },
      });
      const { token } = await auth.json();
      expect(token).toBeTruthy();

      // 2. Créer une réservation à supprimer
      const creation = await request.post('/booking', { data: nouvelleReservation() });
      const { bookingid } = await creation.json();

      // 3. La supprimer avec le jeton (envoyé dans un cookie)
      const suppression = await request.delete(`/booking/${bookingid}`, {
        headers: { Cookie: `token=${token}` },
      });
      // Particularité de cette API : la suppression renvoie 201
      expect(suppression.status()).toBe(201);

      // 4. Vérifier qu'elle n'existe plus
      const lecture = await request.get(`/booking/${bookingid}`);
      expect(lecture.status()).toBe(404);
    },
  );
});
