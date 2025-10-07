import type { Locale } from "vue-i18n";
import type Product from "../models/Product.model";


/**
 * Recupera la lista dei prodotti dall'endpoint API specificato.
 * Effettua una richiesta HTTP GET all'URL fornito e restituisce un array di oggetti Product.
 * 
 * @param {string} path - URL dell'endpoint API per il recupero della lista dei prodotti.
 * @returns {Promise<Product[]>} - Promessa che risolve con un array di prodotti.
 * @throws {Error} - Se la richiesta fallisce (status non OK).
 */
export const GetProducts = async (path: string): Promise<Product[]> => {

    const response = await fetch(path, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti, riprova più tardi :(");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    const jsonResponse = await response.json(); // JSON FORMATO DA : data + meta
    return jsonResponse.data;
};




/**
 * Recupera un singolo prodotto dall'endpoint API specificato.
 * Effettua una richiesta HTTP GET all'URL fornito e restituisce un oggetto Product.
 * 
 * @param {string} path - URL dell'endpoint API per il recupero del prodotto.
 * @returns {Promise<Product>} - Promessa che risolve con il prodotto richiesto.
 * @throws {Error} - Se la richiesta fallisce (status non OK).
 */
export const GetProduct = async (path: string): Promise<Product> => {

    const response = await fetch(path,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

    if (!response.ok) {
        throw new Error("Errore nel recupero del prodotto");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    const jsonResponse = await response.json(); // JSON FORMATO DA : data + meta
    return jsonResponse.data;
};