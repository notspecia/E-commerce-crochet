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
    <div class="col-12 col-sm-6 col-md-4 g-5 mb-4">
        <!-- contenitore card in colonne -->
        <div class="card" @click="() => router.push(`/products/${props.product.documentId}`)">
            <!-- immagine preview della card prodotto (le immagini HANNO URL ASSOLUTO!!) -->
            <img :src="`${API_BASE_URL}${props.product.images[0].url}`"
                :alt="`${props.product.images[0].alternativeText}`">
            <div class="card-body">
                <!-- titolo card -->
                <p class="card-title mb-1">{{ props.product.title }}</p>
                <!-- prezzo prodotto -->
                <p class="card-text">{{ props.product.price.toFixed(2) }}€</p>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.card {
    background: $gradient-secondary;
    box-shadow: 8px 7px 7px 1px rgba(255, 255, 255, 0.1);
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        transition: transform 0.3s ease-in-out;
    }
}

// immagine preview prodotto
img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}

p.card-title {
    font-size: 1.8rem;
    font-weight: $font-weight-bold;
}

p.card-text {
    font-size: 1.1rem;
    font-family: $font-family-base;
}
</style>