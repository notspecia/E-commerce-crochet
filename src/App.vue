<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsStore } from './stores/product';
import { useCartStore } from './stores/cart';
import { RouterView } from 'vue-router';
import Navbar from './layouts/Navbar/Navbar.vue';
import Cart from './layouts/Cart/Cart.vue';
import Footer from './layouts/Footer/Footer.vue';


/* PRODUCTS PINIA STATE */
const productsStore = useProductsStore();


/* CART PINIA STATE */
const cartStore = useCartStore();


/* ONMOUNTED */
// al montaggio dell'app carichiamo i prodotti tramite il metodo fetchProducts del Pinia Store
onMounted(() => {
  productsStore.fetchProducts();
});
</script>



<template>
  <!-- overlay sfondo nero sopra bg-autunm body -->
  <div className="app-bg" />
  <main class="container px-2 pt-3 pb-5">
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
</template>



<style scoped lang="scss">
// sfondo nero opaco per migliorare leggibilità testo su immagine
.app-bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.75);
}

// main continer con pagine, messo sopra lo sfondo nero opaco
main.container {
  position: relative;
  z-index: 5;
}
</style>