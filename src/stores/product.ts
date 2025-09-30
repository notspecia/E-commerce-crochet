import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { GetProduct } from "../apis/Products.api";
import { API_BASE_URL } from "../utils/costants";
import type Product from "../models/Product.model";



export const useProductStore = defineStore('product', () => {

    /* I18N LANG */
    const { locale } = useI18n(); // rendiamolo reattivo per il cambio lingua cambiando la lingua dei prodotti in tutta l'applicazione


    /* --------------STATE---------------- */
    // state reactive of the object whit array of products + bool loading and string error
    const stateProduct = reactive({
        product: null as Product | null,
        isLoading: false,
        error: null as string | null
    });


    /* ------------ACTIONS------------- */
    // function for fetch single product (api consumed in the product detail)
    const fetchProduct = async (documentId: string) => {
        try {
            stateProduct.isLoading = true;
            const response = await GetProduct(`${API_BASE_URL}/api/products/${documentId}?locale=${locale.value}`);
            stateProduct.product = response;
        } catch (err: any) {
            stateProduct.error = err.message;
        } finally {
            stateProduct.isLoading = false;
        }
    };


    /* WATCH */
    // Watch per il cambio della lingua, ricarica il prodotto quando cambia la lingua su tutta l'applicazione
    watch(locale, (): void => {
        if (stateProduct.product) {
            fetchProduct(stateProduct.product.documentId);
        }
    });


    return { stateProduct, fetchProduct };
});
