<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { RouterView } from 'vue-router';
import Navbar from '@/layouts/Navbar/Navbar.vue';
import Cart from '@/layouts/Cart.vue';
import ToastContainer from '@/layouts/ToastContainer.vue';
import Footer from '@/layouts/Footer.vue';


/* PRODUCTS and CART PINIA STATE */
const productsStore = useProductsStore();
const cartStore = useCartStore();

/* ONMOUNTED */
// al montaggio dell'app carichiamo i prodotti tramite il metodo fetchProducts del Pinia Store
onMounted(async () => {
  await productsStore.fetchProducts();
  await cartStore.loadCart();
});
</script>



<template>
  <main class="container z-3">
    <!-- Navbar per la navigazione tra le rotte -->
    <Navbar />
    <!-- Cart dei prodotti dell'utente -->
    <transition name="slide-right">
      <Cart v-if="cartStore.cartIsOpen" />
    </transition>
    <!-- Rotte della pagina definitre nel router.js -->
    <RouterView />
  </main>
  <Footer />
  <!-- Toast container per contenere tutti i messaggi di notifica -->
  <ToastContainer />
</template>