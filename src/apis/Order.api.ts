import type ProductSelected from "../models/ProductSelected.model";
import type Order from "../models/Order.model";

/**
 * Crea una sessione di pagamento Stripe e salva l'ordine nel backend Strapi.
 *
 * @param {string} path - URL dell'endpoint API per la creazione dell'ordine.
 * @param {OrderPayload} payload - Oggetto contenente i prodotti del carrello.
 * @param {string} token - JWT dell'utente per l'autenticazione.
 * @returns {Promise<string>} - ID della sessione Stripe.
 * @throws {Error} - Se la richiesta HTTP fallisce o la sessione non viene creata.
 */
export const CreateStripeSession = async (path: string, products: ProductSelected[], userId: number, token: string): Promise<string> => {
    const response = await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
            // dati da inviare al backend per la creazione della sessione stripe presi dal backend come CTX.REQUEST.BODY.DATA
            data: {
                userId,
                products
            }
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


/**
 * Recupera gli ordini associati a un determinato utente autenticato.
 *
 * @param {number} userId - ID dell’utente autenticato.
 * @param {string} token - JWT dell’utente per l’autenticazione.
 * @returns {Promise<Order[]>} - Lista degli ordini dell’utente.
 * @throws {Error} - Se la richiesta HTTP fallisce.
 */
export const fetchUserOrders = async (path: string, token: string): Promise<Order[]> => {
    const response = await fetch(path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    const jsonResponse = await response.json(); // JSON FORMATO DA : data + meta
    return jsonResponse.data;
};


/**
 * SOSPESA - Recupera un singolo ordine tramite documentId.
 *
 * @param {string} path - URL dell'endpoint API del singolo ordine.
 * @param {string} token - JWT per autenticazione.
 * @returns {Promise<Order>}
 */
// export const fetchUserOrder = async (path: string, token: string): Promise<Order> => {

//     const response = await fetch(path, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     if (!response.ok) {
//         throw new Error("Errore nel recupero del singolo ordine");
//     }

//     const json = await response.json(); // { data, meta }
//     return json.data;
// };