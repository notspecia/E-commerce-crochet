<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../../stores/product';
import Product from '../../components/Product/Product.vue';
import Loader from '../../components/Loader/Loader.vue';
import GoBack from '../../components/GoBack/GoBack.vue';


/* STORE PINIA product */
const productStore = useProductStore();

/* ROUTE */
const route = useRoute();

/* FUNCTIONS */
// used for the change of the route and mount of component detail
const loadProduct = (): void => {
    productStore.fetchProduct(route.params.documentId as string);
};

/* WATCHS */
// used for check if the documentId detail change while using cart router.push()
watch(
    () => route.params.documentId as string,
    () => {
        loadProduct();
    }
);

/* ONMOUNTED */
onMounted(() => {
    loadProduct();
});
</script>


<template>
    <GoBack />

    <!-- loader in caso nel pinia store dei prodotti non sia ancora pronto -->
    <Loader v-if="productStore.stateProduct.isLoading" />
    <!-- TODO - generic error, da mettere custom per ogni lingua  -->
    <p v-else-if="productStore.stateProduct.error" class="text-danger">{{ productStore.stateProduct.error }}</p>
    <!-- component con il dettaglio del prodotto da aggiungere e modificare il carrello -->
    <Product v-else-if="productStore.stateProduct.product && !productStore.stateProduct.isLoading"
        :product="productStore.stateProduct.product" />
</template>


<style scoped lang="scss"></style>