<script setup lang="ts">
import { onMounted } from 'vue';
import { useReviewsStore } from '../../stores/review';
import Loader from '../Loader/Loader.vue';


/* PROPS */
const props = defineProps<{ productId: string }>();

/* PINIA STORES reviews */
const reviewsStore = useReviewsStore();

/* ON MOUNTED */
onMounted(() => {
    reviewsStore.fetchReviews(props.productId);
});
</script>


<template>
    <div class="reviews-container">
        <h3 class="mb-4 fs-3 text-center">Customer Reviews</h3>

        <!-- Loading delle recensioni -->
        <Loader v-if="reviewsStore.stateReviews.isLoading" />
        <!-- in caso non esistano recensioni sul prodotto [] vuoto -->
        <p v-else-if="reviewsStore.stateReviews.reviews.length === 0">Nessuna recensione presente</p>
        <!-- errore caricamento recensioni -->
        <p v-else-if="reviewsStore.stateReviews.error" class="text-danger">{{ reviewsStore.stateReviews.error }}</p>

        <!-- render con successo delle recensioni -->
        <div v-else class="reviews-list">
            <div v-for="(review, index) in reviewsStore.stateReviews.reviews" :key="index" class="review-item mb-4">
                <p class="review-user mb-1">{{ review.email }}
                    -
                    <img v-for="star in review.rating" src="/images/star-rate.png" :key="star" />
                </p>
                <p class="review-content mb-1"> {{ review.comment }}</p>
                <p class="review-date">{{ new Date(review.publishedAt).toLocaleDateString() }}</p>
            </div>
        </div>

        <!-- Form nuova recensione -->
        <!-- <div v-if="userStore.isLogged" class="new-review mt-3">
            <textarea v-model="newComment" placeholder="Scrivi la tua recensione"></textarea>
            <input type="number" v-model.number="newRating" min="1" max="5" placeholder="Voto da 1 a 5" />
            <button @click="submitReview">Invia recensione</button>
        </div>
        <div v-else class="mt-3">
            <p>Devi essere loggato per inviare recensioni.</p>
        </div> -->
    </div>
</template>


<style lang="scss">
// container nella colonna descrittiva con tutte le recensioni overflow hidden scrollabili
.reviews-container {
    margin-top: 6.5rem;
    background-color: rgba($color-primary, 0.05); // leggero tono caldo sullo sfondo
    border: 1px solid rgba($color-primary, 0.1);
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

    .review-item {
        background-color: $color-white;
        padding: 1rem 1.2rem;

        border-radius: 10px;
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