import type Login from "../models/Login.model";
import type Register from "../models/Register.model";

/**
 * Autenticazione utente (login o registrazione) funzione usata comunamente.
 * @param path Endpoint completo (login o register)
 * @param credentials Dati per login o registrazione
 */
export const authUser = async (path: string, credentials: Login | Register) => {

    const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error.message || "Errore di autenticazione");
    }

    return await response.json(); // { jwt, user }
};