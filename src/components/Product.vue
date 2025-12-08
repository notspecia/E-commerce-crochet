<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { API_BASE_URL } from '@/utils/costants';
import { goTopPage } from '@/utils/utils';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import Reviews from './Reviews.vue';
import type Product from '@/models/Product.model';


/* PROPS TS */
const props = defineProps<{
    product: Product;
}>();

/* USEROUTER */
const router = useRouter();

/* CART e USER e TOAST PINIA STATE */
const cartStore = useCartStore();
const userStore = useUserStore();
const toastStore = useToastStore();


/* MARKDOWNS CONVERTER */
const md = new MarkdownIt();

const descriptionMarkdown = computed((): string => {
    return md.render(props.product.description || ''); // conversione Markdown in HTML 
});


/* REF */
const quantity = ref<number>(1); // quantità del prodotto da aggiungere al carrello (default 1)
const mainImage = ref<string>(props.product.images[0]?.url || ''); // immagine principale da far apparire in alto tra le sclete del carosello


/* FUNCTIONS */
// funzione per cambiare immagine come principale ingradinta in alto
const setMainImage = (url: string) => {
    mainImage.value = url;
};

// funzione handle per aggiungere il prodotto al carrello tramite il metodo addProduct del cartStore di pinia
const handleAddToCart = async () => {
    if (!userStore.isLoggedIn) {
        router.push('/register'); // se non loggato reindirizzo alla pagina di login
        toastStore.addToast("light", "Devi essere registrato per poter effettuare un ordine!");
        return;
    }
    await cartStore.addToCart(props.product, quantity.value);
    quantity.value = 1;
    cartStore.toggleCart();
}


/* ONMOUNTED */
onMounted(() => {
    goTopPage();
}); 
</script>



<template>
    <div class="row g-5 pb-1">
        <!-- COLONNA SINISTRA: IMMAGINI -->
        <div class="col-12 col-md-6">
            <!-- immagine principale selezionata -->
            <div class="main-image-container mb-3">
                <img :src="`${API_BASE_URL}${mainImage}`" alt="Immagine prodotto" class="img-fluid main-image" />
            </div>
            <!-- thumbnails scelta immagini -->
            <div class="gap-3 thumbnail-container">
                <img v-for="(img, i) in props.product.images" :key="i" :src="`${API_BASE_URL}${img.url}`"
                    :alt='`Thumbnail immagine prodotto ${i + 1}`' class="thumbnail"
                    :class="{ active: mainImage === img.url }" @click="setMainImage(img.url)" />
            </div>
        </div>

        <!-- COLONNA DESTRA: DETTAGLI -->
        <div class="col-12 col-md-6">
            <h2 class="my-1">{{ props.product.title }}</h2>
            <p class="fs-4 my-4 price-block"> {{ props.product.price.toFixed(2) }}€</p>
            <!-- descrizioni aggiuntive sul prodotto  usando markdown-it converter con v-html -->
            <p class="fs-5 mt-4" v-html="descriptionMarkdown"></p>
            <!-- bottone per modificare quantita del prodotto da aggiungere al carrello -->
            <div class="button-quantity mb-3">
                <i class="bi bi-dash" @click="quantity--" :class="{ disabled: quantity === 1 }"></i>
                <span>{{ quantity }}</span>
                <i class="bi bi-plus" @click="quantity++"></i>
            </div>
            <!-- bottone per aggiungere il prodotto al carrello -->
            <div class="button-add-product btn-two" @click="handleAddToCart">
                <span>{{ $t('detailProduct.addToCart') }}</span> <i class="bi bi-cart fs-5 ms-2"></i>
            </div>
            <!-- width height data -->
            <!-- <p class="fs-6 mt-1">
                larghezza: {{ props.product.width }} cm <br />
                altezza: {{ props.product.height }} cm
            </p> -->
        </div>
    </div>
    <!-- Component con recensione del prodotto dettaglio -->
    <Reviews :productId="props.product.documentId" />
</template>



<style scoped lang="scss">
// cotainer con img principale selezionata
.main-image-container {
    text-align: center;

    .main-image {
        max-height: 500px;
        border-radius: 5px;
    }
}

// container thumbnail con le immagini possibili da selezionare da mettere come principale visible
.thumbnail-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    // immagini selezionabili style
    .thumbnail {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border: 2px solid transparent;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;

        // effetti hover images
        &:hover {
            transform: scale(1.05);
            border-color: #aaa;
        }

        &.active {
            border-color: $color-primary;
        }
    }
}

// style colonna descrittiva
h2 {
    font-size: 2.7rem;
}

.price-block {
    font-family: $font-family-base;
}

// bottone modifica quantita da aggiungere al carrello 
.button-quantity {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 30%;
    font-size: 1.4rem;
    background-color: $color-gray-100;
    color: $color-black;
    padding: 8px 10px;

    border-radius: 5px;

    @media (max-width: $breakpoint-md) {
        width: 40%;
    }

    i {
        cursor: pointer;
        color: $color-black;

        &:hover {
            transform: scale(1.3);
        }
    }

    i.disabled {
        color: #ccc;
        pointer-events: none;
    }
}

// bottone aggiungi al carrello, COMBINATO CON btn-two + proprieta scss custom per questo
.button-add-product {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 90%;
    font-size: 1.3rem;
    font-weight: 600;
}
</style>