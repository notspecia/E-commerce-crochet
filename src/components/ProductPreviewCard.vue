<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { API_BASE_URL } from '@/utils/costants';
import type Product from '@/models/Product.model';


/* PROPS TS */
const props = defineProps<{
    product: Product;
}>();

/* USEROUTER */
const router = useRouter();

/* CART e USER e TOAST PINIA STATE */
const cartStore = useCartStore();

/* FUNCTION */
// used on image and title click to go to product details page
const goProductDetails = () => {
    router.push(`/products/${props.product.documentId}`);
}
// funzione handle per aggiungere il prodotto al carrello tramite il metodo addProduct del cartStore di pinia
const handleAddToCart = async () => {
    await cartStore.addToCart(props.product);
}
</script>


<template>
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 g-5">
        <div class="product-item">
            <img :src="`${API_BASE_URL}${props.product.images[0].url}`"
                :alt="`${props.product.images[0].alternativeText}`" @click="goProductDetails" />
            <div class="d-flex justify-content-between align-items-center mt-3">
                <p class="product-title mb-0" @click="goProductDetails">{{ props.product.title }}</p>
                <i class="bi bi-cart-plus-fill cart-add fs-4" @click="handleAddToCart"></i>
            </div>
            <p class="product-price">{{ props.product.price.toFixed(2) }}€</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
.product-item {
    img {
        width: 100%;
        height: 270px;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
    }

    &:hover img {
        transform: scale(1.02);
    }

    .product-title {
        font-size: 1.5rem;
        font-weight: $font-weight-bold;
        cursor: pointer;
    }

    .product-price {
        font-size: 1.05rem;
        font-family: $font-family-base;
    }

    i.cart-add {
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            color: $color-gray-900;
            transform: scale(1.1);
        }
    }

}
</style>