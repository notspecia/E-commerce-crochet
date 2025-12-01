<script setup lang="ts">
import { useOrdersStore } from "@/stores/orders";
import { useUserStore } from "@/stores/user";
import type Order from "@/models/Order.model";


/* PROPS TS */
const props = defineProps<{
    order: Order;
}>();


/* STORE e USER PINIA STATE*/
// const ordersStore = useOrdersStore();
// const userStore = useUserStore();
</script>

<template>
    <div class="container order-detail">

        <!-- DETTAGLIO ORDINE -->
        <div class="card p-4 shadow-sm">
            <h4 class="mb-3">
                Ordine #{{ props.order.stripeId }}
            </h4>
            <p>
                <strong>Totale:</strong>
                €{{ props.order.amount_total_cents }}
            </p>

            <!-- Lista prodotti -->
            <h5 class="mt-4">Prodotti acquistati</h5>
            <ul class="list-group mt-2">
                <li class=" d-flex justify-content-between align-items-center" v-for="prod in props.order.products"
                    :key="prod.documentId">
                    <span>{{ prod.productName }}</span>
                    <span>× {{ prod.quantity }}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<style scoped lang="scss">
.order-detail {
    max-width: 700px;
}

.card {
    border-radius: 12px;
    background: #4a4947;
}
</style>
