<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrdersStore } from '@/stores/orders';
import Order from '@/components/Order.vue';
import Loader from '@/components/Loader.vue';
import GoBack from '@/components/GoBack.vue';


/* STORE PINIA product */
const orderStore = useOrdersStore();

/* ROUTE */
const route = useRoute();
const documentId = route.params.documentId as string;

/* ONMOUNTED */
onMounted(() => {
    orderStore.fetchOrders();
});
</script>


<template>
    <GoBack />

    <!-- loader in caso nel pinia store dei prodotti non sia ancora pronto -->
    <Loader v-if="orderStore.stateOrders.isLoading" />
    <!-- TODO - generic error, da mettere custom per ogni lingua  -->
    <p v-else-if="orderStore.stateOrders.error" class="text-danger">{{ orderStore.stateOrders.error }}</p>
    <!-- component con il dettaglio del prodotto da aggiungere e modificare il carrello -->
    <Order v-else-if="orderStore.stateOrders.order" :order="orderStore.stateOrders.order" />
</template>


<style scoped lang="scss"></style>