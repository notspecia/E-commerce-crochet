<script setup lang="ts">
import { ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '../../stores/cart';
import { useUserStore } from '../../stores/user';
import { CreateStripeSession } from '../../apis/Order.api';
import { API_BASE_URL } from '../../utils/costants';


/* CART and USER PINIA STATE */
const cartStore = useCartStore();
const userStore = useUserStore();

// load stripe whit the public key from .env, Promise which return object stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // load public key from .env


/* REF */
const isLoading = ref<boolean>(false);


/* FUNCTIONS */
const handlePayment = async () => {
    try {
        // start loading
        isLoading.value = true;
        const userId = userStore.stateUser.user?.id;

        // check if strapi service is loaded
        const stripe = await stripePromise;
        if (!stripe || !userId) {
            console.error("Stripe is not loaded and connected to user correctly, retry!");
            return;
        }

        // usa la funzione API modulare
        const sessionId = await CreateStripeSession(
            `${API_BASE_URL}/api/orders`,
            cartStore.productsSelected,
            userId,
            userStore.stateUser.bearerToken
        );

        // redirect to stripe checkout page
        await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
        console.error("Error during payment process:", error);
    } finally {
        isLoading.value = false;
    }
};
</script>


<template>
    <button class="btn btn-one w-100" :disabled="isLoading" @click="handlePayment">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ isLoading ? 'Processing...' : 'Proceed to check out' }}
    </button>
</template>


<style scoped lang="scss">
button[disabled=disabled],
button:disabled {
    color: $color-white;
    background-color: $color-gray-700;
}
</style>