<script setup lang="ts">
import { ref } from 'vue';
import { useOrdersStore } from '@/stores/orders';


/* PINIA STORE orders */
const ordersStore = useOrdersStore();

/* REF */
const isLoading = ref<boolean>(false);

/* FUNCTION HANDLE PAYMENT */
const handlePayment = async () => {
    isLoading.value = true;
    await ordersStore.createStripeCheckoutSession();
    isLoading.value = false;
}
</script>


<template>
    <button class="btn btn-one w-100" :disabled="isLoading" @click="handlePayment">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ isLoading ? 'Processing...' : 'Proceed to check out' }}
    </button>
</template>


<style scoped lang="scss"></style>