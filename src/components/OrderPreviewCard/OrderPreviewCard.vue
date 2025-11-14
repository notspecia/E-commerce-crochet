<script setup lang="ts">
import { useRouter } from "vue-router";
import type Order from "../../models/Order.model";

/* ROUTER */
const router = useRouter();

/* PROPS */
const props = defineProps<{
    order: Order;
}>();
</script>


<template>
    <div class="col-12">
        <div class="order-card p-3 shadow-sm" @click="router.push(`/orders/${props.order.documentId}`)">
            <h5 class="mb-2">Ordine #{{ order.stripeId }}</h5>

            <p class="mb-2">
                <strong>Totale:</strong>
                €{{ (order.amount_total_cents / 100).toFixed(2) }}
            </p>

            <ul>
                <li v-for="p in order.products" :key="p.documentId">
                    {{ p.productName }} × {{ p.quantity }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.order-card {
    cursor: pointer;
    border-radius: 10px;
    background-color: #393737;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.01);
    }
}
</style>
