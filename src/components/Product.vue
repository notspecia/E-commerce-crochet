<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { API_BASE_URL } from '@/utils/costants';
import { goTopPage } from '@/utils/utils';
import { useCartStore } from '@/stores/cart';
import type Product from '@/models/Product.model';
import MarkdownIt from 'markdown-it';


/* PROPS TS */
const props = defineProps<{
    product: Product;
}>();

/* CART e USER e TOAST PINIA STATE */
const cartStore = useCartStore();

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
    await cartStore.addToCart(props.product, quantity.value);
    quantity.value = 1; // reset quantity after adding to cart
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
            <h2 class="header my-1">{{ props.product.title }}</h2>
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
            <div class="button-add-product btn-one" @click="handleAddToCart">
                <i class="bi bi-cart fs-4"></i>
                <span>{{ $t('detailProduct.addToCart') }}</span>
            </div>
            <!-- width height data -->
            <!-- <p class="fs-6 mt-1">
                larghezza: {{ props.product.width }} cm <br />
                altezza: {{ props.product.height }} cm
            </p> -->
        </div>
    </div>
</template>



<style scoped lang="scss">
.row {
    margin-bottom: 7rem;

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
                border-color: $color-primary-900;
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
        gap: 0.7rem;
        width: 90%;
        font-size: 1.3rem;
        font-family: $font-family-hand;
        font-weight: $font-weight-normal;
        border-radius: 5px;
        border-top-left-radius: 25px;
        border-bottom-right-radius: 25px;
    }
}
</style>