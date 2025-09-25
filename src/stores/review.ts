import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { API_BASE_URL } from '../utils/costants';
import { GetReviews } from '../apis/Reviews.api';
import type Review from '../models/Review.model';



export const useReviewsStore = defineStore('reviews', () => {

    /* --------------STATE---------------- */
    // state reactive of the object whit array of reviews + bool loading and string error
    const stateReviews = reactive({
        reviews: [] as Review[],
        isLoading: false as boolean,
        error: null as null | string
    });


    /* ------------ACTIONS------------- */
    // function to fetch reviews by productDocumentId of a product
    const fetchReviews = async (idDocument: string): Promise<void> => {
        try {
            stateReviews.isLoading = true; // Imposta isLoading a true prima di iniziare il recupero
            const response = await GetReviews(`${API_BASE_URL}/api/reviews?filters[productDocumentId]`, idDocument);
            stateReviews.reviews = response.filter(review => review.approved === true); // filtraggio solo recensioni approvate nel backoffice
        } catch (error: any) {
            stateReviews.error = `${error}`;
        } finally {
            stateReviews.isLoading = false;
        };
    }

    return { stateReviews, fetchReviews };
});