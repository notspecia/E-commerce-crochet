<script setup lang="ts">
import { API_BASE_URL } from '../../utils/costants';
import { useRouter } from 'vue-router';
import type Product from '../../models/Product.model';


/* USEROUTER */
const router = useRouter();

/* PROPS TS */
const props = defineProps<{
    product: Product;
}>();
</script>


<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 g-5">
        <div @click="router.push(`/products/${props.product.documentId}`)" class="product-item">
            <img :src="`${API_BASE_URL}${props.product.images[0].url}`"
                :alt="`${props.product.images[0].alternativeText}`" />
            <p class="product-title mt-3 mb-1">{{ props.product.title }}</p>
            <p class="product-price">{{ props.product.price.toFixed(2) }}€</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
.product-item {
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.005);
    }
}

img {
    width: 100%;
    height: 270px;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
}

.product-title {
    font-size: 1.5rem;
    font-weight: $font-weight-bold;
}

.product-price {
    font-size: 1.05rem;
    font-family: $font-family-base;
    color: $color-gray-500;
}
</style>