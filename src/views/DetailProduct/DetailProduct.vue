<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../../stores/product';
import Product from '../../components/Product/Product.vue';
import Loader from '../../components/Loader/Loader.vue';
import GoBack from '../../components/GoBack/GoBack.vue';


/* STORE PINIA product */
const productStore = useProductStore();

/* ROUTE */
const route = useRoute();
const documentId = route.params.documentId as string;

/* ONMOUNTED */
onMounted(() => {
    productStore.fetchProduct(documentId);
});
</script>


<template>
    <GoBack />

    <!-- loader in caso nel pinia store dei prodotti non sia ancora pronto -->
    <Loader v-if="productStore.stateProduct.isLoading" />
    <!-- TODO - generic error, da mettere custom per ogni lingua  -->
    <p v-else-if="productStore.stateProduct.error" class="text-danger">{{ productStore.stateProduct.error }}</p>
    <!-- component con il dettaglio del prodotto da aggiungere e modificare il carrello -->
    <Product v-else-if="productStore.stateProduct.product" :product="productStore.stateProduct.product" />
</template>


<style scoped lang="scss"></style>