<script setup lang="ts">
import { onMounted } from 'vue';
import { useReviewsStore } from '@/stores/review';
import Loader from './Loader.vue';
import ModalReview from '@/components/ModalReview.vue';

/* PROPS */
const props = defineProps<{
    productId: string
}>();

/* STORE PINIA reviews */
const reviewsStore = useReviewsStore();

/* ONMOUNTED */
onMounted(() => {
    reviewsStore.fetchReviews(props.productId);
});
</script>


<!-- TODO DA RIFARE ASPETTARE GRAFICA DIETRO -->
<template>
    <h3 class="header title-line">
        <span>Customer Reviews</span>
    </h3>

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
                    <img v-for="n in review.rating" :key="`star-${review.id}-${n}`"
                        src="@/assets/images/star-rate.png" />
                </p>
                <p class="review-content">{{ review.comment }}</p>
                <p class="review-date">
                    {{ new Intl.DateTimeFormat('it-IT').format(new Date(review.publishedAt)) }}
                </p>
            </div>
        </div>
    </div>

    <!-- Pulsante aggiungi recensione -->
    <ModalReview class="mb-5" />
</template>


<style lang="scss">
h3.title-line {
    display: flex;
    align-items: center;
    gap: 1rem;

    &::after {
        content: "";
        flex: 1;
        height: 2px;
        background: linear-gradient(to right, black 65%, rgb(117, 117, 117));
        border-radius: 20px;
    }

    span {
        white-space: nowrap;
    }
}

// container nella colonna descrittiva con tutte le recensioni overflow hidden scrollabili
.reviews-container {
    padding: 1.3rem;

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