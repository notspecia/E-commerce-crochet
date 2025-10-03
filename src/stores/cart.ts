import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "./products";
import { useUserStore } from "./user";
import { goTopPage } from "../utils/utils";
import { API_BASE_URL } from "../utils/costants";
import type ProductSelected from "../models/ProductSelected.model";
import type ProductCart from "../models/ProductCart.model";




export const useCartStore = defineStore("cart", () => {

    /* USEROUTER + USEROUTE */
    const router = useRouter();

    /* IMPORTS PINIA AND REACTIVE PRODUCTS */
    const productsStore = useProductsStore();
    const { stateProducts } = productsStore; // ora stateProducts è reattivo e puoi usarlo nei computed

    /* IMPORTS PINIA USER */
    const userStore = useUserStore();


    /* --------------STATE---------------- */
    const cartIsOpen = ref<boolean>(false); // stato booleano per gestire l'apertura/chiusura del carrello
    const productsSelected = ref<ProductSelected[]>([]); //* stato array di prodotti nel carrello (solo documentId prodtto e la quantità) REMOTE
    const cartId = ref<string | null>(null); // stato per salvare il cartId del carrello remoto (documentId del carrello nel DB)

    // computed per trasformare i prodotti selezionati in un array di prodotti completi da renderizzare nel cart COMPONENTE + con quantità 
    const productsCart = computed((): ProductCart[] => {
        return productsSelected.value
            .map((cartItem) => {
                const product = stateProducts.products.find(
                    (p) => p.documentId === cartItem.documentId
                );
                return product ? { ...product, quantity: cartItem.quantity } : null;
            })
            .filter(Boolean) as ProductCart[];
    });

    // computed per calcolare il numero totale di prodotti nel carrello
    const cartCount = computed<number>(() => productsSelected.value.reduce((total, item) => total + item.quantity, 0));

    // computed per calcolare il totale di prezzo del carrello
    const cartTotal = computed<number>(() => productsCart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) as unknown as number);


    /* ------------ACTIONS------------- */
    // funzione per gestire la visibilità della sidebar del carrello
    const toggleCart = (): void => {
        goTopPage();
        cartIsOpen.value = !cartIsOpen.value;
    };

    // funzione per sincronizzare il carrello locale con il carrello remoto nel DB quando effettuate modifiche all array productsSelected
    const syncCart = async () => {
        if (!cartId.value || !userStore.isLoggedIn) return;
        try {
            await fetch(`${API_BASE_URL}/api/carts/${cartId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userStore.stateUser.bearerToken}`,
                },
                body: JSON.stringify({
                    data: { items: productsSelected.value },
                }),
            });
        } catch (err) {
            console.error("Errore sync cart:", err);
        }
    };

    // funzione per aggiungere un prodotto al carrello (se non presente lo aggiunge, se presente aumenta la quantità) e richiama il syncCart        
    const addToCart = async (productId: string, quantity = 1) => {
        const existing = productsSelected.value.find(
            (i) => i.documentId === productId
        );
        if (existing) existing.quantity += quantity;
        else productsSelected.value.push({ documentId: productId, quantity });
        await syncCart();
    };

    // funzione per rimuovere un prodotto dal carrello confontando l'id del prodotto da rimuovere con gli altri e richiama il syncCart
    const removeFromCart = async (productId: string) => {
        productsSelected.value = productsSelected.value.filter(
            (i) => i.documentId !== productId
        );
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

    // funzione per svuotare LO STATO LOCALE del cartrello e richiama il syncCart
    const clearCart = async () => {
        productsSelected.value = [];
        await syncCart();
    };

    // check iniziale se l'utente è loggato e carico il carrello dal DB, altrimenti creo una nuova istanza carrello vuota da mandare al DB
    const loadCart = async () => {
        if (!userStore.isLoggedIn) return;

        try {
            const res = await fetch(
                `${API_BASE_URL}/api/carts?filters[userId][$eq]=${userStore.stateUser.user?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userStore.stateUser.bearerToken}`,
                    },
                }
            );
            const data = await res.json();
            // controllo se esiste un carrello per l'utente loggato (in base alla lunghezza dell'array data items)
            if (data.data.length > 0) {
                const cart = data.data[0];
                cartId.value = cart.documentId; // settaggio del cartId per future modifiche (documentId del carrello)
                productsSelected.value = cart.items || [];
            } else {
                // crea nuovo carrello se non esiste
                const createRes = await fetch(`${API_BASE_URL}/api/carts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userStore.stateUser.bearerToken}`,
                    },
                    body: JSON.stringify({
                        data: {
                            users_permissions_user: userStore.stateUser.user?.id,
                            userId: userStore.stateUser.user?.id,
                            items: [],
                        },
                    }),
                });
                const created = await createRes.json();
                cartId.value = created.data.documentId;
                productsSelected.value = [];
            }
        } catch (err) {
            console.error("Errore loadRemoteCart:", err);
        }
    };

    return {
        cartIsOpen,
        productsSelected,
        productsCart,
        cartCount,
        cartTotal,
        toggleCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        loadCart,
    };
});


// /**
//  * @file        cart.ts
//  * @author      Gabriele Speciale
//  * @date        2025-08-02
//  * @description
//  * script file whit a persistant state whit PINIA in localstorage used for show the cart of the user
//  *
//  * - viene spostato il ref/reactive con i prodotti ed eventuali funzioni per modificare esso, dentro un PINIA SETUP come questo file
//  * - cosi riusciremo a centralizzare il carrello dei prodotti in un unico posto QUESTO FILE --> cart.ts
//  * - evitare problema di spostare questi dati tra componenti siblings
//  * - evitare il props drilling da componenti a sotto componenti
//  *
//  * !defineStore() --> accetta 3 PARAMETRI:
//  * 1. id: stringa univoca che identifica lo store (usata anche per il salvataggio persistente, devtools, ecc.)
//  * 2. setup: funzione che definisce lo stato (`ref`, `reactive`, `computed`) e le azioni da restituire (in stile Composition API)
//  * 3. options (facoltativo): oggetto opzionale per configurazioni aggiuntive come:
//  *    - persist: abilitazione della persistenza dello stato nel localStorage o sessionStorage
//  *    - other plugins: eventuali opzioni usate da plugin esterni
//  */
// import { defineStore } from "pinia";
// import { computed, ref } from "vue";
// import { useProductsStore } from "./products";
// import { useUserStore } from "./user";
// import { goTopPage } from "../utils/utils";
// import type ProductSelected from "../models/ProductSelected.model";
// import type ProductCart from "../models/ProductCart.model";


// // TODO - integrare parte cart user loggato con DB (vedi user.ts store)
// export const useCartStore = defineStore('cart', () => {

//     /* IMPORTS PINIA AND REACTIVE PRODUCTS */
//     const productsStore = useProductsStore();
//     const { stateProducts } = productsStore; // ora stateProducts è reattivo e puoi usarlo nei computed

//     /* IMPORTS PINIA USER */
//     const userStore = useUserStore();


//     /* --------------STATE---------------- */
//     const cartIsOpen = ref<boolean>(false); // stato booleano per gestire l'apertura/chiusura del carrello
//     const productsSelected = ref<ProductSelected[]>([]); //* stato array di prodotti nel carrello (solo documentId prodtto e la quantità)

//     // computed per trasformare i prodotti selezionati in un array di prodotti completi da renderizzare nel cart con quantità
//     const productsCart = computed((): ProductCart[] => {
//         return productsSelected.value.map(cartItem => {
//             const product = stateProducts.products.find(p => p.documentId === cartItem.documentId);
//             if (product) {
//                 return { ...product, quantity: cartItem.quantity };
//             }
//             return null;
//         }).filter(Boolean) as ProductCart[];
//     });

//     // computed per calcolare il numero totale di prodotti nel carrello
//     const cartCount = computed((): number => {
//         return productsSelected.value.reduce((total, item) => total + item.quantity, 0);
//     });

//     // computed per calcolare il totale di prezzo del carrello
//     const cartTotal = computed<number>((): number => {
//         return productsCart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) as unknown as number;
//     });


//     /* ------------ACTIONS------------- */
//     // funzione per gestire la visibilità della sidebar del carrello
//     const toggleCart = (): void => {
//         goTopPage();
//         cartIsOpen.value = !cartIsOpen.value;
//     };

//     // funzione per aggiungere un prodotto al carrello (se non presente lo aggiunge, se presente aumenta la quantità)
//     const addToCart = (productId: string, quantity: number = 1): void => {
//         console.log(`Aggiungo al carrello il prodotto con id: ${productId} e quantità: ${quantity}`);
//         const existing = productsSelected.value.find((item: ProductSelected) => item.documentId === productId); // cerca se il prodotto è già presente nel carrello array productsSelected
//         // prodotto già presente nel carrello + quantità || prodotto non presente nel carrello aggiunto model del prodotto e quanità inizio = 1
//         if (existing) {
//             existing.quantity += quantity;
//         } else {
//             productsSelected.value.push({ documentId: productId, quantity });
//         }
//         console.log(`Carrello aggiornato: ${JSON.stringify(productsSelected.value)}`);
//     };

//     // funzione per rimuovere un prodotto dal carrello confontando l'id del prodotto da rimuovere con gli altri
//     const removeFromCart = (productId: string): void => {
//         productsSelected.value = productsSelected.value.filter((item: ProductSelected) => item.documentId !== productId);
//         console.log(`Prodotto con id: ${productId} rimosso dal carrello`);
//         console.log(`Carrello aggiornato: ${JSON.stringify(productsSelected.value)}`);
//     };

//     // funzione per aggiornare la quantità di un prodotto dal carrello
//     const updateCartItemQuantity = (productId: string, quantity: number): void => {
//         const item = productsSelected.value.find(item => item.documentId === productId);
//         if (item) {
//             item.quantity = quantity;
//         }
//     };

//     // funzione per svuotare il carrello
//     const clearCart = (): void => {
//         productsSelected.value = [];
//         console.log("Carrello svuotato");
//     }


//     return {
//         cartIsOpen,
//         productsSelected,
//         cartCount,
//         cartTotal,
//         productsCart,
//         toggleCart,
//         addToCart,
//         removeFromCart,
//         updateCartItemQuantity,
//         clearCart
//     };

// }, {
//     persist: {
//         key: 'cart',
//         storage: localStorage,
//         paths: ['productsSelected']
//     }
// });     