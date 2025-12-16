import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { useToastStore } from './toast';
import { API_BASE_URL } from '@/utils/costants';
import { GetReviews, PostReview } from '@/apis/Reviews.api';
import type Review from '@/models/Review.model';
import qs from 'qs';



export const useReviewsStore = defineStore('reviews', () => {

    /* IMPORTS PINIA USER and TOAST */
    const userStore = useUserStore();
    const toastStore = useToastStore();

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
            stateReviews.isLoading = true;
            // costruzione query string per filtrare le recensioni per productDocumentId
            const queryString = qs.stringify({
                filters: {
                    productDocumentId: { $eq: idDocument },
                    approved: { $eq: true }
                }
            });
            const response = await GetReviews(`${API_BASE_URL}/api/reviews?${queryString}`);
            stateReviews.reviews = response;
        } catch (error: any) {
            stateReviews.error = `${error}`;
        } finally {
            stateReviews.isLoading = false;
        };
    }

    // function for create review authenticated
    const createReview = async (review: Review): Promise<Review> => {
        try {
            const response = await PostReview(`${API_BASE_URL}/api/reviews`, review, userStore.stateUser.bearerToken);
            console.log(response);
            return response;
        } catch (error: any) {
            throw error;
        }
    };


    return {
        stateReviews,
        fetchReviews,
        createReview
    };
});