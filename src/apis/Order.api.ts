import type ProductCart from "../models/ProductCart.model";

/**
 * Crea una sessione di pagamento Stripe e salva l'ordine nel backend Strapi.
 *
 * @param {string} path - URL dell'endpoint API per la creazione dell'ordine.
 * @param {OrderPayload} payload - Oggetto contenente i prodotti del carrello.
 * @param {string} token - JWT dell'utente per l'autenticazione.
 * @returns {Promise<string>} - ID della sessione Stripe.
 * @throws {Error} - Se la richiesta HTTP fallisce o la sessione non viene creata.
 */
export const CreateStripeSession = async (path: string, products: ProductCart[], token: string): Promise<string> => {
    const response = await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
            data: { products }
        }),
    });

    if (!response.ok) {
        throw new Error("Errore nella creazione della sessione di pagamento");
    }

    const result = await response.json();
    const sessionId = result.data?.stripeSession?.id;

    if (!sessionId) {
        throw new Error("Session ID Stripe non trovato nella risposta");
    }

    return sessionId; // return the sessionId for the frontend to redirect to checkout
};