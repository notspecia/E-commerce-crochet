<script setup lang="ts">
import { onMounted } from 'vue';
import { API_BASE_URL } from '../../utils/costants';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useProductsStore } from '../../stores/products';
import Loader from '../../components/Loader/Loader.vue';


/* USEROUTER */
const router = useRouter();

/* CART PINIA STATE */
const cartStore = useCartStore();

/* PRODUCTS PINIA STATE */
const productsStore = useProductsStore();

// log console per debugging
onMounted(() => {
    console.log(productsStore.stateProducts.products);
    console.log(cartStore.productsCart);
});
</script>



<template>
    <aside class="cart-menu">
        <!-- title cart + close icon (presente sempre anche con error/loading)-->
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h2>Your Cart</h2>
            <i class="bi bi-x-lg fs-2 text-end" @click="cartStore.toggleCart" />
        </div>

        <!-- loader -->
        <Loader v-if="productsStore.stateProducts.isLoading" />

        <!-- errore generico in caso errore dei prodotti da gestire per ogni lang -->
        <p v-else-if="productsStore.stateProducts.error" class="text-danger">
            {{ productsStore.stateProducts.error }}
        </p>

        <!-- empty cart, bottone con il tasto vai ai prodotti! -->
        <div v-else-if="!cartStore.productsCart.length" class="text-center py-5">
            <p class="fs-5 mb-4">Il tuo carrello è vuoto</p>
            <button class="btn cta-btn text-white"
                @click="() => { router.push(`/products`); cartStore.cartIsOpen = false }">
                Visualizza i prodotti
            </button>
        </div>

        <!-- products in cart -->
        <template v-else>
            <div class="cart-products-list">
                <!-- column header -->
                <div class="d-flex justify-content-between align-items-end border-bottom">
                    <p>PRODUCT</p>
                    <p>PRICE</p>
                </div>
                <!-- TODO FIX REVIEW + SCSS STYLES -->
                <div v-for="product in cartStore.productsCart" :key="product.id" class="cart-product">
                    <!-- immagine di copertina principale -->
                    <img :src="`${API_BASE_URL}${product.images[0].url}`" :alt="`${product.images[0].alternativeText}`"
                        class="cart-product-img me-3" @click="() => router.push(`/products`)" />
                    <!--info -->
                    <div class=" flex-grow-1">
                        <h5 class="mb-1">{{ product.title }}</h5>
                        <p class="mb-1">{{ product.price.toFixed(2) }} €</p>
                        <!-- quantità -->
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm quantity-button"
                                @click="cartStore.updateCartItemQuantity(product.documentId, product.quantity - 1)"
                                :disabled="product.quantity <= 1">-</button>
                            <span>{{ product.quantity }}</span>
                            <button class="btn btn-sm quantity-button"
                                @click="cartStore.updateCartItemQuantity(product.documentId, product.quantity + 1)">+</button>
                        </div>
                    </div>
                    <!-- column flex total + remove product button -->
                    <div class="d-flex flex-column justify-content-between">
                        <p class="fs-5 fw-bold">{{ (product.price * product.quantity).toFixed(2) }}€</p>
                        <button class="btn btn-sm btn-danger ms-3"
                            @click="cartStore.removeFromCart(product.documentId)">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- checkout summary container -->
            <div class="cart-summary border-top pt-4">
                <div class="d-flex justify-content-between align-items-center fs-4 mb-3">
                    <strong>Estimated total:</strong>
                    <span>{{ cartStore.cartTotal }}€</span>
                </div>
                <button class="btn" @click="() => { router.push(`/checkout`); cartStore.cartIsOpen = false }">Check
                    out</button>
            </div>
        </template>

    </aside>
</template>



<style scoped lang="scss">
.cart-menu {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 40%;
    height: 100vh;
    background: $body-bg;
    color: $color-gray-900;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 30px 20px;
    z-index: 3;

    // 65% width per brk <= 768 (tablet)
    @media (max-width: $breakpoint-lg) {
        width: 65%;
    }

    // 85% width per brk <= 576 (mobile)
    @media (max-width: $breakpoint-sm) {
        width: 85%;
    }
}

/* lista prodotti nel carrello scrollabile */
.cart-products-list {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    padding-right: 15px;
}

/* thumbnail immagine prodotto */
.cart-product-img {
    width: 120px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
}

/* ogni riga prodotto */
.cart-product {
    display: flex;
    align-items: center;
    margin: 30px 0;

    .quantity-button {
        color: $color-black;
        border: 1px solid $color-primary;

        &:hover {
            background-color: $color-secondary;
        }
    }
}

/* summary checkout carrello */
.cart-summary {
    button {
        width: 100%;
        font-size: 1.3rem;
        background: $gradient-primary;
        color: $color-gray-900;
        padding: 10px 0;
        border: none;
        transition: all 0.2s ease;

        &:hover {
            color: $color-white;
            background: $gradient-secondary;
            transform: scale(1.02);
        }
    }
}
</style>
