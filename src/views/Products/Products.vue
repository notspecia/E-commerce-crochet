<script setup lang="ts">
import { useProductsStore } from '../../stores/products';
import ProductPreviewCard from '../../components/ProductPreviewCard/ProductPreviewCard.vue';
import Loader from '../../components/Loader/Loader.vue';


/* PRODUCTS PINIA STATE */
const productsStore = useProductsStore();
</script>



<template>
    <h2 class="header mb-5">{{ $t('products.title') }}</h2>
    <!-- 
    container di card con i vari prodotti presi tramit GET (con la linuga correttamente selezionata ?lang=it/en)
    ciclando i dati tramite la direttiva v-for in un componente con CardProduct.vue
    -->
    <Loader v-if="productsStore.stateProducts.isLoading" />
    <p v-else-if="productsStore.stateProducts.error" class="text-danger">{{ productsStore.stateProducts.error }}</p>
    <div v-else class="row pb-5">
        <ProductPreviewCard v-for="(product, index) in productsStore.stateProducts.products" :key="index"
            :product="product" />
    </div>
</template>



<style scoped lang="scss"></style>