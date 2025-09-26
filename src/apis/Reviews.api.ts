import type Review from "../models/Review.model";


/**
 * Recupera tutte le recensioni di un prodotto dal backend Strapi.
 *
 * @param {string} path - URL dell'endpoint API per il recupero delle recensioni.
 * @returns {Promise<Review[]>} - Lista delle recensioni associate al prodotto.
 * @throws {Error} - Se la richiesta HTTP fallisce.
 */
export const GetReviews = async (path: string): Promise<Review[]> => {

    const response = await fetch(path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Errore nel recupero delle recensioni, riprova più tardi :(");
    }

    const jsonResponse = await response.json();
    return jsonResponse.data; // Strapi restituisce sempre { data, meta }
};


// !SERVE TOKEN BEARER
/**
 * Invia una nuova recensione al backend Strapi.
 *
 * @param {string} path - URL base dell'endpoint API (es: /api/recensioni).
 * @param {Object} review - Oggetto recensione con contenuto, voto, utente, prodotto.
 * @returns {Promise<Review>} - La recensione creata.
 * @throws {Error} - Se la richiesta HTTP fallisce.
 */
// export const PostReview = async (path: string, review: Review): Promise<Review> => {
//     const response = await fetch(path, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             data: review, // Strapi 5 vuole sempre data: {}
//         }),
//     });

//     if (!response.ok) {
//         throw new Error("Errore nell'invio della recensione, riprova più tardi :(");
//     }

//     const jsonResponse = await response.json();
//     return jsonResponse.data;
// };