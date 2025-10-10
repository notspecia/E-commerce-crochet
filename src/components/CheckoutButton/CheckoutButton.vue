<script setup lang="ts">
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


/* FUNCTIONS */
const handlePayment = async () => {
    try {
        // check if strapi service is loaded
        const stripe = await stripePromise;
        if (!stripe) {
            console.error("Stripe is not loaded, retry!");
            return;
        }

        // usa la funzione API modulare
        const sessionId = await CreateStripeSession(
            `${API_BASE_URL}/api/orders`,
            cartStore.productsCart,
            userStore.stateUser.bearerToken
        );

        await stripe.redirectToCheckout({ sessionId }); // redirect to stripe checkout page
    } catch (error) {
        console.error("Error during payment process:", error);
    }
};
</script>


<template>
    <button class="btn btn-one w-100" @click="handlePayment">
        Proceed to check out
    </button>
</template>


<style scoped lang="scss"></style>