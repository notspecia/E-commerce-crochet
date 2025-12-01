<script setup lang="ts">
import { onMounted } from 'vue';
import { useReviewsStore } from '@/stores/review';
import Loader from './Loader.vue';

const props = defineProps<{ productId: string }>();
const reviewsStore = useReviewsStore();

onMounted(() => {
    reviewsStore.fetchReviews(props.productId);
});
</script>


<!-- TODO DA RIFARE ASPETTARE GRAFICA DIETRO -->
<template>
    <h3 class="mt-5 pt-5 fs-3">Customer Reviews</h3>

    <div class="reviews-container">

        <!-- Caricamento -->
        <Loader v-if="reviewsStore.stateReviews.isLoading" />

        <!-- Errore -->
        <p v-else-if="reviewsStore.stateReviews.error" class="text-danger">
            {{ reviewsStore.stateReviews.error }}
        </p>

        <!-- Nessuna recensione -->
        <p v-else-if="reviewsStore.stateReviews.reviews.length === 0">
            Nessuna recensione presente
        </p>

        <!-- Recensioni -->
        <div v-else class="reviews-list">
            <div v-for="review in reviewsStore.stateReviews.reviews" :key="review.id" class="review-item mb-4">

                <p class="review-user mb-1">
                    {{ review.email }} –
                    <img v-for="n in review.rating" :key="`star-${review.id}-${n}`" src="/images/star-rate.png" />
                </p>

                <p class="review-content">{{ review.comment }}</p>

                <p class="review-date">
                    {{ new Intl.DateTimeFormat('it-IT').format(new Date(review.publishedAt)) }}
                </p>
            </div>
        </div>

        <!-- Pulsante aggiungi recensione -->
        <button class="btn btn-primary mt-3" @click="$emit('write-review')">
            Scrivi una recensione
        </button>

    </div>
</template>


<style lang="scss">
// container nella colonna descrittiva con tutte le recensioni overflow hidden scrollabili
.reviews-container {
    // background-color: rgba($color-primary, 0.05); // leggero tono caldo sullo sfondo
    // border: 1px solid rgba($color-primary, 0.1);
    border-radius: 12px;
    padding: 1.3rem;
    max-height: 350px;
    overflow-y: auto;

    h3 {
        font-weight: $font-weight-bold;
    }

    p {
        color: $color-gray-900;
    }

    // card item recensione singola
    .review-item {
        background-color: $color-white;
        padding: 1rem 1.2rem;

        border-radius: 5px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        .review-user {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-weight: 600;
            color: $color-gray-900;

            img {
                width: 16px;
                height: 16px;
            }
        }

        .review-content {
            margin: 0.4rem 0;
            line-height: 1.5;
            font-size: 1rem;
            color: $color-gray-800;
        }

        .review-date {
            font-size: 0.85rem;
            color: $color-gray-600;
        }
    }

    .reviews-list {
        display: flex;
        flex-direction: column;
    }

    .text-danger {
        color: red;
    }
}
</style>