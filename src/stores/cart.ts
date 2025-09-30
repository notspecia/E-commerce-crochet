/**
 * @file        cart.ts
 * @author      Gabriele Speciale
 * @date        2025-08-02
 * @description 
 * script file whit a persistant state whit PINIA in localstorage used for show the cart of the user
 * 
 * - viene spostato il ref/reactive con i prodotti ed eventuali funzioni per modificare esso, dentro un PINIA SETUP come questo file
 * - cosi riusciremo a centralizzare il carrello dei prodotti in un unico posto QUESTO FILE --> cart.ts
 * - evitare problema di spostare questi dati tra componenti siblings
 * - evitare il props drilling da componenti a sotto componenti
 * 
 * !defineStore() --> accetta 3 PARAMETRI:
 * 1. id: stringa univoca che identifica lo store (usata anche per il salvataggio persistente, devtools, ecc.)
 * 2. setup: funzione che definisce lo stato (`ref`, `reactive`, `computed`) e le azioni da restituire (in stile Composition API)
 * 3. options (facoltativo): oggetto opzionale per configurazioni aggiuntive come:
 *    - persist: abilitazione della persistenza dello stato nel localStorage o sessionStorage
 *    - other plugins: eventuali opzioni usate da plugin esterni
 */
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useProductsStore } from "./products";
import { goTopPage } from "../utils/utils";
import type ProductSelected from "../models/ProductSelected.model";
import type ProductCart from "../models/ProductCart.model";


export const useCartStore = defineStore('cart', () => {

    /* IMPORTS PINIA AND REACTIVE PRODUCTS */
    const productsStore = useProductsStore();
    const { stateProducts } = productsStore; // ora stateProducts è reattivo e puoi usarlo nei computed

    /* --------------STATE---------------- */
    const cartIsOpen = ref<boolean>(false); // stato booleano per gestire l'apertura/chiusura del carrello
    const productsSelected = ref<ProductSelected[]>([]); //* stato array di prodotti nel carrello (solo documentId prodtto e la quantità) PERSISTE NEL LOCALSTORAGE

    // computed per trasformare i prodotti selezionati in un array di prodotti completi da renderizzare nel cart con quantità
    const productsCart = computed((): ProductCart[] => {
        return productsSelected.value.map(cartItem => {
            console.log(productsSelected.value);
            const product = stateProducts.products.find(p => p.documentId === cartItem.documentId);
            if (product) {
                return { ...product, quantity: cartItem.quantity };
            }
            return null;
        }).filter(Boolean) as ProductCart[];
    });

    // computed per calcolare il numero totale di prodotti nel carrello 
    const cartCount = computed<number>((): number => {
        return productsSelected.value.reduce((total, item) => total + item.quantity, 0);
    });

    // computed per calcolare il totale di prezzo del carrello
    const cartTotal = computed<number>((): number => {
        return productsCart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) as unknown as number;
    });


    /* ------------ACTIONS------------- */
    // funzione per gestire la visibilità della sidebar del carrello
    const toggleCart = (): void => {
        goTopPage();
        cartIsOpen.value = !cartIsOpen.value;
    };

    // funzione per aggiungere un prodotto al carrello (se non presente lo aggiunge, se presente aumenta la quantità)
    const addToCart = (productId: string, quantity: number = 1): void => {
        console.log(`Aggiungo al carrello il prodotto con id: ${productId} e quantità: ${quantity}`);
        const existing = productsSelected.value.find((item: ProductSelected) => item.documentId === productId); // cerca se il prodotto è già presente nel carrello array productsSelected
        // prodotto già presente nel carrello + quantità || prodotto non presente nel carrello aggiunto model del prodotto e quanità inizio = 1
        if (existing) {
            existing.quantity += quantity;
        } else {
            productsSelected.value.push({ documentId: productId, quantity });
        }
        console.log(`Carrello aggiornato: ${JSON.stringify(productsSelected.value)}`);
    };

    // funzione per rimuovere un prodotto dal carrello confontando l'id del prodotto da rimuovere con gli altri
    const removeFromCart = (productId: string): void => {
        productsSelected.value = productsSelected.value.filter((item: ProductSelected) => item.documentId !== productId);
        console.log(`Prodotto con id: ${productId} rimosso dal carrello`);
        console.log(`Carrello aggiornato: ${JSON.stringify(productsSelected.value)}`);
    };

    // funzione per aggiornare la quantità di un prodotto dal carrello
    const updateCartItemQuantity = (productId: string, quantity: number): void => {
        const item = productsSelected.value.find(item => item.documentId === productId);
        if (item) {
            item.quantity = quantity;
        }
    };

    // funzione per svuotare il carrello
    const clearCart = (): void => {
        productsSelected.value = [];
        console.log("Carrello svuotato");
    }


    return {
        cartIsOpen,
        toggleCart,
        productsSelected,
        cartCount,
        cartTotal,
        productsCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart
    };

}, {
    persist: {
        key: 'cart',
        storage: localStorage,
        paths: ['productsSelected']
    }
});     