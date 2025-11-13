<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/user';
import type Order from '../../models/Order.model';
import { API_BASE_URL } from '../../utils/costants';

const userStore = useUserStore();
const orders = ref<Order[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const fetchUserOrders = async () => {
    try {
        if (!userStore.stateUser.user) {
            error.value = "Utente non autenticato";
            return;
        }

        const userId = userStore.stateUser.user.id;
        const res = await fetch(
            `${API_BASE_URL}/api/orders?filters[userId][$eq]=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userStore.stateUser.bearerToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Errore nella richiesta: ${res.status}`);
        }

        const data = await res.json();
        // Strapi restituisce i dati dentro data[]
        orders.value = data.data.map((order: any) => ({
            stripeId: order.stripeId,
            amountTotalCents: order.amount_total_cents,
            products: order.products,
            userId: order.userId,
        }));
    } catch (err: any) {
        error.value = err.message || "Errore durante il caricamento degli ordini";
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchUserOrders);
</script>

<template>
    <div class="orders-container container mt-5">
        <h2>I tuoi ordini</h2>

        <div v-if="isLoading" class="mt-4 text-center">
            <span class="spinner-border" role="status"></span>
        </div>

        <div v-else-if="error" class="alert alert-danger mt-3">
            {{ error }}
        </div>

        <div v-else-if="orders.length === 0" class="alert alert-warning mt-3">
            Nessun ordine trovato.
        </div>

        <div v-else class="orders-list">
            <div v-for="order in orders" :key="order.stripeId" class="card mb-3 shadow-sm p-3">
                <h5>Ordine #{{ order.stripeId }}</h5>
                <p><strong>Totale:</strong> €{{ (order.amountTotalCents / 100).toFixed(2) }}</p>
                <ul class="list-group list-group-flush">
                    <li v-for="prod in order.products" :key="prod.documentId" class="">
                        {{ prod.productName }} × {{ prod.quantity }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.orders-container {
    max-width: 700px;
}

.card {
    color: #333 !important;
    border-radius: 12px;
    background-color: red;
}
</style>
