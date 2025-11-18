<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { useOrdersStore } from '../../stores/orders';
import OrderPreviewCard from '../../components/OrderPreviewCard/OrderPreviewCard.vue';
import Loader from '../../components/Loader/Loader.vue';


/* ROUTER */
const router = useRouter();

/* PINIA STORES orders and user */
const ordersStore = useOrdersStore();
const userStore = useUserStore();

/* ONMOUNTED */
onMounted(() => {

    // controllo se l'utente è loggato, altrimenti reindirizzo alla homepage
    if (!userStore.isLoggedIn) {
        router.push('/');
    } else {
        // fetch ordini utente loggato
        ordersStore.fetchOrders();
    }
});
</script>


<template>
    <div class="orders-container container">
        <h2 class="mb-4">I tuoi ordini</h2>

        <Loader v-if="ordersStore.stateOrders.isLoading" />
        <p v-else-if="ordersStore.stateOrders.error" class="text-danger">{{ ordersStore.stateOrders.error }}</p>
        <p v-else-if="ordersStore.stateOrders.orders.length === 0">Non hai effettuato ordini!</p>
        <div v-else class="row gap-2">
            <OrderPreviewCard v-for="order in ordersStore.stateOrders.orders" :key="order.documentId" :order="order" />
        </div>
    </div>
</template>


<style lang="scss" scoped></style>