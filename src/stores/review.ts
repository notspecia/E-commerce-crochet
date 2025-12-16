import { defineStore } from 'pinia';
import qs from 'qs';
import { reactive } from 'vue';
import { API_BASE_URL } from '@/utils/costants';
import { GetReviews, PostReview } from '@/apis/Reviews.api';
import type Review from '@/models/Review.model';



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
    const createReview = async (review: Review, token: string): Promise<Review> => {
        try {
            const response = await PostReview(`${API_BASE_URL}/api/reviews`, review, token);
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