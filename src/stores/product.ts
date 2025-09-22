import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { reactive, watch } from 'vue';
import { API_BASE_URL } from '../utils/costants';
import { GetProduct, GetProducts } from '../apis/Products.api';
import type Product from '../models/Product.model';



export const useProductsStore = defineStore('products', () => {

  /* I18N LANG */
  const { locale } = useI18n(); // rendiamolo reattivo per il cambio lingua cambiando la lingua dei prodotti in tutta l'applicazione


  /* STATE */
  // state reactive of the object whit array of products + bool loading and string error
  const stateProducts = reactive({
    products: [] as Product[],
    currentProduct: null as Product | null,
    isLoading: false as boolean,
    error: null as null | string
  });


  /* FUNCTIONS */
  // funzione per fetchare l array dei products[] con tutti i prodotti 
  const fetchProducts = async (): Promise<void> => {
    try {
      stateProducts.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
      const response = await GetProducts(`${API_BASE_URL}/api/products?locale=${locale.value}`);
      stateProducts.products = response; // assegna i prodotti DATA recuperati alla ref 
    } catch (error) {
      stateProducts.error = `${error}`;
      console.log(error)
    } finally {
      setTimeout(() => {
        stateProducts.isLoading = false;
      }, 1000);
    };
  }

  // funzione per fetchare prodotto singolo (api consumata nel dettaglio prodotto)
  const fetchProduct = async (documentId: string): Promise<void> => {
    try {
      stateProducts.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
      const response = await GetProduct(`${API_BASE_URL}/api/products`, documentId, locale.value);
      stateProducts.currentProduct = response;
    } catch (error: any) {
      stateProducts.error = error.message;
      console.error(error);
    } finally {
      setTimeout(() => {
        stateProducts.isLoading = false;
      }, 1000);
    }
  };


  /* WATCH */
  // Watch per il cambio della lingua, ricarica i prodotti quando cambia la lingua su tutta l'applicazione
  watch(locale, (): void => {
    console.log(`Lingua cambiata a: ${locale.value}, ricarico i prodotti...`);
    if (stateProducts.currentProduct) {
      fetchProduct(stateProducts.currentProduct.documentId);
    } else {
      fetchProducts();
    }
  });


  return { stateProducts, fetchProducts, fetchProduct };
});