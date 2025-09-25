import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { API_BASE_URL } from "../utils/costants";
import { authUser } from "../apis/auth.api";
import { useRouter } from "vue-router";
import type Login from "../models/Login.model";
import type Register from "../models/Register.model";
import type User from "../models/User.model";



export const useUserStore = defineStore("user", () => {

    /* --------------STATE---------------- */
    // stato reactive contenete il TOKEN preso in caso dal localStorage, user credenziali, e flag di caricamento errore
    const stateUser = reactive({
        bearerToken: "", // legge il JWT dal local storage (se presente)
        user: null as User | null, // legge user dal local storage (se presente)
        isLoading: false,
        error: null as string | null,
    });

    // computed reattiva al cambiamento dei dati user e jwt controllo in real time
    const isLoggedIn = computed(() => !!stateUser.bearerToken && !!stateUser.user);

    // useRouter per i redirect dopo login/register/logout
    const router = useRouter();


    /* ------------ACTIONS------------- */
    // funzione di fetch user sia per il LOGIN che REGISTER
    const fetchAuthUser = async (isRegister: boolean, credentials: Login | Register): Promise<void> => {

        // AVVIO loading e reset errori precedenti
        stateUser.isLoading = true;
        stateUser.error = null;

        try {
            // definizione del path endpoint (login || register)
            const endpoint = isRegister
                ? `${API_BASE_URL}/api/auth/local/register`
                : `${API_BASE_URL}/api/auth/local`;

            const res = await authUser(endpoint, credentials);

            // settaggio dei dati utente + JWT in entrambi i casi nel local storage
            stateUser.bearerToken = res.jwt;
            stateUser.user = res.user;
            router.push("/"); // redirect alla home page
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
        router.push("/login");
    };


    return {
        stateUser,
        isLoggedIn,
        fetchAuthUser,
        logoutUser
    };
}, {
    persist: {
        key: 'user',
        storage: localStorage,
        paths: ['stateUser.bearerToken', 'stateUser.user']
    }
});