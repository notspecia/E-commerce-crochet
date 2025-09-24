<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useReviewsStore } from '../../stores/review';
import Loader from '../Loader/Loader.vue';



/* PROPS */
const props = defineProps<{ productId: string }>();


/* PINIA STORES reviews + user */
// const userStore = useUserStore();
const reviewsStore = useReviewsStore();


/* REF for POST review */
// const newComment = ref('');
// const newRating = ref<number | null>(null);


/* FUNCTIONS */
// const submitReview = async () => {
//     if (!userStore.isLogged) {
//         alert("Devi essere loggato per inviare una recensione");
//         return;
//     }

//     if (!newComment.value || !newRating.value) {
//         alert("Compila tutti i campi");
//         return;
//     }

//     await reviewsStore.postReview({
//         titleProduct: 'Recensione',
//         productDocumentId: props.productId,
//         rating: newRating.value,
//         comment: newComment.value,
//         originLang: 'it',
//     }, userStore.jwt!);

//     newComment.value = '';
//     newRating.value = null;

//     await reviewsStore.fetchReviews(props.productId);
// };

/* ON MOUNTED */
onMounted(() => {
    reviewsStore.fetchReviews(props.productId);
});

/* WATCH */
// watch(() => props.productId, (newId) => reviewsStore.fetchReviews(newId));

/* Computed */
// const reviews = reviewsStore.stateReviews.reviews;
// const isLoading = reviewsStore.stateReviews.isLoading;
</script>



<template>
    <div class="reviews-container mt-5">
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
                <p class="review-user mb-1">{{ review.email }} -
                    <span v-for="star in review.rating" :key="star">⭐</span>
                </p>
                <p class="review-content mb-1"> {{ review.comment }}</p>
                <p class="review-date">{{ new Date(review.publishedAt).toLocaleDateString() }}</p>
                <hr v-if="reviewsStore.stateReviews.reviews.length - 1 !== index" />
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
    max-height: 300px; // altezza fissa, scrollabile
    color: $color-white;
    overflow-y: auto;
    padding: 20px;
    border: 2px solid $color-gray-200;
    border-radius: 8px;

    .review-item {

        .review-user {
            font-weight: bold;
        }

        .review-content {}

        .review-date {
            font-size: 0.8rem;
            color: $color-gray-600;
        }
    }
}
</style>