import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useProductsStore } from "./products";
import { useUserStore } from "./user";
import { goTopPage } from "../utils/utils";
import { createUserCart, fetchUserCart, syncUserCart } from "../apis/Cart.api";
import { API_BASE_URL } from "../utils/costants";
import type ProductSelected from "../models/ProductSelected.model";
import type ProductCart from "../models/ProductCart.model";
import type Product from "../models/Product.model";



export const useCartStore = defineStore("cart", () => {

    /* IMPORTS PINIA AND REACTIVE PRODUCTS */
    const productsStore = useProductsStore();
    const { stateProducts } = productsStore; // ora stateProducts è reattivo e puoi usarlo nei computed

    /* IMPORTS PINIA USER */
    const userStore = useUserStore();


    /* --------------------------- STATE --------------------------- */
    /* -- REF -- */
    const cartIsOpen = ref<boolean>(false); // stato booleano per gestire l'apertura/chiusura del carrello
    const productsSelected = ref<ProductSelected[]>([]); // stato array di prodotti nel carrello (solo documentId prodtto e la quantità) REMOTE
    const cartId = ref<string | null>(null); // stato per salvare il cartId del carrello remoto (documentId del carrello nel DB)


    /* -- COMPUTED -- */
    // computed per trasformare i prodotti selezionati in un array di prodotti completi da renderizzare nel cart COMPONENTE + con quantità 
    const productsCart = computed<ProductCart[]>(() => {
        return productsSelected.value
            .map((cartItem) => {
                const product = stateProducts.products.find(
                    (p) => p.documentId === cartItem.documentId
                );
                return product ? { ...product, quantity: cartItem.quantity } : null;
            })
            .filter(Boolean) as ProductCart[];
    });

    // computed url cart per il sync del carrello remoto
    const cartSyncUrl = computed<string | null>(
        () => (cartId.value ? `${API_BASE_URL}/api/carts/${cartId.value}` : null)
    );

    // computed per calcolare il numero totale di prodotti nel carrello
    const cartCount = computed<number>(() => productsSelected.value.reduce((total, item) => total + item.quantity, 0));

    // computed per calcolare il totale di prezzo del carrello
    const cartTotal = computed<number>(() => Number(productsCart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)));


    /* ------------------------ ACTIONS ---------------------- */
    // funzione per gestire la visibilità della sidebar del carrello
    const toggleCart = (): void => {
        goTopPage();
        loadCart(); // carico il carrello ad ogni apertura (evitare incoerenze dati)
        cartIsOpen.value = !cartIsOpen.value;
    };

    // funzione handler con check se l'url dell'update cart sia valido ed esista prima di sincronizzare il cart
    const syncCart = async () => {
        if (!cartSyncUrl.value) return; // evitiamo di mandare path null|undefind
        await syncUserCart(
            cartSyncUrl.value,
            userStore.stateUser.bearerToken,
            productsSelected.value
        );
        console.log(productsSelected.value);
    };


    // funzione per aggiungere un prodotto al carrello (se non presente lo aggiunge, se presente aumenta la quantità) e richiama il syncCart        
    const addToCart = async (product: Product, quantity: number = 1) => {
        const existing = productsSelected.value.find(
            (i) => i.documentId === product.documentId
        );
        // if product already in cart, increase quantity || else add new product to cart
        if (existing) {
            existing.quantity += quantity;
        } else {
            productsSelected.value.push({ productName: product.title, documentId: product.documentId, quantity });
        }
        await syncCart();
    };


    // funzione per aggiornare la quantità di un prodotto dal carrello e richiama il syncCart
    const updateCartItemQuantity = async (
        productId: string,
        quantity: number
    ) => {
        const item = productsSelected.value.find((i) => i.documentId === productId);
        if (item) item.quantity = quantity;
        await syncCart();
    };


    // funzione per rimuovere un prodotto dal carrello confontando l'id del prodotto da rimuovere con gli altri e richiama il syncCart
    const removeFromCart = async (productId: string) => {
        productsSelected.value = productsSelected.value.filter(
            (i) => i.documentId !== productId
        );
        await syncCart();
    };


    // funzione per svuotare lo store pinia del carrello (dal logout) e richiama il syncCart
    const clearCart = async () => {
        productsSelected.value = [];
        await syncCart();
    };


    // check iniziale se l'utente è loggato e carico il carrello dal DB, altrimenti creo una nuova istanza carrello vuota da mandare al DB
    const loadCart = async () => {
        if (!userStore.isLoggedIn) return; // Se l'utente non è loggato, esci dalla funzione

        try {
            const userId = userStore.stateUser.user?.id // setting dell'userId da usare per check del carrello e creazione
            const data = await fetchUserCart(
                `${API_BASE_URL}/api/carts?filters[userId][$eq]=${userId}`,
                userStore.stateUser.bearerToken
            );

            // se il carrello esiste già → lo carico || altrimenti creo un nuovo carrello vuoto
            if (data.length > 0) {
                const cart = data[0];
                cartId.value = cart.documentId;
                productsSelected.value = cart.items || [];
                console.log("Carrello caricato dal server:", cart.items);
            } else {
                if (!userId) return;
                const response = await createUserCart(`${API_BASE_URL}/api/carts`, userId, userStore.stateUser.bearerToken);
                cartId.value = response.documentId;
                productsSelected.value = [];
            }
        } catch (err) {
            console.error("Errore loadCart:", err);
        }
    };


    return {
        cartIsOpen,
        productsSelected,
        productsCart,
        cartCount,
        cartTotal,
        syncCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        loadCart,
    };
});