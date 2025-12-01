import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "./cart";
import { useToastStore } from "./toast";
import { API_BASE_URL } from "@/utils/costants";
import { authUser } from "@/apis/Auth.api";
import type Login from "@/models/Login.model";
import type Register from "@/models/Register.model";
import type User from "@/models/User.model";



export const useUserStore = defineStore("user", () => {

    // useRouter per i redirect dopo login/register/logout
    const router = useRouter();

    /* IMPORTS PINIA CART and TOAST STORE */
    const cartStore = useCartStore();
    const toastStore = useToastStore();


    /* --------------STATE---------------- */
    // stato reactive contenete il TOKEN preso in caso dal localStorage, user credenziali, e flag di caricamento errore
    const stateUser = reactive({
        bearerToken: "", // legge il JWT dal local storage (se presente)
        user: null as User | null, // legge user dal local storage (se presente)
        isLoading: false,
        error: null as string | null,
    });

    // computed reattiva al cambiamento dei dati user e jwt controllo in real time
    const isLoggedIn = computed<boolean>(() => !!stateUser.bearerToken && !!stateUser.user);


    /* ------------ACTIONS------------- */
    // funzione di fetch user sia per il LOGIN che REGISTER da salvare nel DB degli user strapi
    const fetchAuthUser = async (isRegister: boolean, credentials: Login | Register): Promise<void> => {
        // AVVIO loading e reset errori precedenti
        stateUser.isLoading = true;
        stateUser.error = null;

        // definizione del path endpoint (login || register)
        const endpoint = isRegister
            ? `${API_BASE_URL}/api/auth/local/register`
            : `${API_BASE_URL}/api/auth/local`;

        try {
            const res = await authUser(endpoint, credentials);
            // settaggio dei dati utente + JWT in entrambi i casi nel local storage
            stateUser.bearerToken = res.jwt;
            stateUser.user = res.user;
            // toast + re-load of the cart user if login or register was successful
            if (isRegister) {
                toastStore.addToast("light", "Registrazione effetuata con successo!");
            } else {
                toastStore.addToast("light", "Login effettuato con successo!");
            }
            cartStore.loadCart(); // carico il carrello dell'utente loggato
            // redirect to home page
            router.push("/");
        } catch (err: any) {
            stateUser.error = err.message || "Errore autenticazione";
        } finally {
            stateUser.isLoading = false;
        }
    };


    // distrugge la "sessione" e il bearer token + user data resettati dal local storage
    const logoutUser = (): void => {
        stateUser.bearerToken = '';
        stateUser.user = null;
        // svuota anche il carrello subito
        cartStore.clearCart();
        cartStore.cartIsOpen = false;
        // redirect to login page
        toastStore.addToast("light", "Disconnesione dall'account effetuata con successo!");
        router.push("/login");
    };

    // reset errors while touching fields of register and login
    const clearError = (): void => {
        stateUser.error = null;
    }


    return {
        stateUser,
        isLoggedIn,
        fetchAuthUser,
        logoutUser,
        clearError
    };
}, {
    persist: {
        key: 'user',
        storage: localStorage,
        paths: ['stateUser.bearerToken', 'stateUser.user']
    }
});