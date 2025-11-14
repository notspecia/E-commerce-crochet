import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useUserStore } from './user';
import { fetchUserOrders, fetchUserOrder } from '../apis/Order.api';
import { API_BASE_URL } from '../utils/costants';
import type Order from '../models/Order.model';



export const useOrdersStore = defineStore('orders', () => {

    /* IMPORTS PINIA USER */
    const userStore = useUserStore();


    /* --------------STATE---------------- */
    // state reactive of the object whit array of orders + bool loading and string error
    const stateOrders = reactive({
        orders: [] as Order[],
        order: null as Order | null,
        isLoading: false as boolean,
        error: null as null | string
    });


    /* ------------ACTIONS------------- */
    // funzione per fetchare l array dei orders[] con tutti gli ordini dell'user loggato 
    const fetchOrders = async (): Promise<void> => {
        try {
            const userId = userStore.stateUser.user?.id // setting dell'userId da usare per check del carrello e creazione
            stateOrders.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
            const response = await fetchUserOrders(
                `${API_BASE_URL}/api/orders?filters[userId][$eq]=${userId}`,
                userStore.stateUser.bearerToken
            );
            stateOrders.orders = response; // assegna gli ordini DATA recuperati alla ref 
        } catch (error) {
            stateOrders.error = `${error}`;
        } finally {
            setTimeout(() => {
                stateOrders.isLoading = false;
            }, 500);
        };
    }

    // funzione per fetchare un singolo order by documentId 
    const fetchOrder = async (documentId: string): Promise<void> => {
        try {
            stateOrders.isLoading = true;
            stateOrders.order = null;

            const response = await fetchUserOrder(
                `${API_BASE_URL}/api/orders/${documentId}`,
                userStore.stateUser.bearerToken
            );

            stateOrders.order = response;
        } catch (err: any) {
            stateOrders.error = err.message;
        } finally {
            stateOrders.isLoading = false;
        }
    };


    return {
        stateOrders,
        fetchOrders,
        fetchOrder
    };
});