import { useUserStore } from "../stores/user";
import type ProductSelected from "../models/ProductSelected.model";


/*
 Sincronizza il carrello dell'utente con il server.
 funzione per sincronizzare il carrello locale con il carrello remoto nel DB quando effettuate modifiche all array productsSelected
 */
export const syncUserCart = async (path: string, token: string, items: ProductSelected[]) => {

    const userStore = useUserStore();
    if (!userStore.isLoggedIn) return; // Se l'utente non è loggato, esci dalla funzione

    const response = await fetch(path,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: { items } }),
        });

    if (!response.ok) {
        throw new Error("Errore aggiornamento carrello");
    }
};



/*
 GET → Recupera il carrello associato all’utente
 */
export const fetchUserCart = async (path: string, token: string) => {
    const response = await fetch(path,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Errore nel recupero del carrello");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    const jsonResponse = await response.json(); // JSON FORMATO DA : data + meta
    return jsonResponse.data;
};



/*
 POST → Crea nuovo carrello vuoto per l’utente
 */
export const createUserCart = async (path: string, userId: number, token: string,) => {

    const response = await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            data: {
                userId,
                items: [],
            },
        }),
    });

    if (!response.ok) {
        throw new Error("Errore nella creazione del carrello");
    }

    // restituisce i dati in formato risposta JSON dalla chiamata HTTP GET
    const jsonResponse = await response.json(); // JSON FORMATO DA : data + meta
    return jsonResponse.data;
};