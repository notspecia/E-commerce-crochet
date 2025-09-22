<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '../../stores/product';
import ProductDetail from '../../components/ProductDetail/ProductDetail.vue';
import Loader from '../../components/Loader/Loader.vue';
import GoBack from '../../components/GoBack/GoBack.vue';


/* STORE PINIA products */
const productsStore = useProductsStore();


/* ROUTE */
const route = useRoute();
const documentId = route.params.documentId as string;


/* ONMOUNTED */
onMounted(() => {
    productsStore.fetchProduct(documentId);
});
</script>



<template>

    <GoBack />

    <!-- loader in caso nel pinia store dei prodotti non sia ancora pronto -->
    <Loader v-if="productsStore.stateProducts.isLoading" />
    <!-- TODO - generic error, da mettere custom per ogni lingua  -->
    <p v-else-if="productsStore.stateProducts.error" class="text-danger">{{ productsStore.stateProducts.error }}</p>
    <!-- component con il dettaglio del prodotto da aggiungere e modificare il carrello -->
    <ProductDetail v-else-if="productsStore.stateProducts.currentProduct"
        :product="productsStore.stateProducts.currentProduct" />
</template>



<style scoped lang="scss"></style>