<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useReviewsStore } from '@/stores/review';
import { useProductStore } from '@/stores/product';
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast';
import { useI18n } from 'vue-i18n';
import type Review from '@/models/Review.model'


/* PROPS */
defineProps<{
    show: boolean
}>();

/* I18N LANG */
const { locale } = useI18n(); // recupero per settare la lingua di origine della recensione

/* ROUTER */
const router = useRouter();

/* EMITS */
const emit = defineEmits(['close']);

/* PINIA STORE review, product, user, toast */
const reviewStore = useReviewsStore();
const productStore = useProductStore();
const userStore = useUserStore();
const toastStore = useToastStore();

/* REACTIVE */
const reviewData = reactive<Review>({
    productDocumentId: productStore.stateProduct.product?.documentId || '',
    titleProduct: productStore.stateProduct.product?.title || '',
    email: userStore.stateUser.user?.email,
    rating: 0,
    comment: '',
    originLang: locale.value,
    approved: false
});

/* FUNCTIONS */
// REVIEW CHECK LOGIN
const onWriteReview = (): void => {
    if (!userStore.isLoggedIn) {
        router.push('/register');
        toastStore.addToast("light", "Devi essere registrato per poter effettuare un ordine!");
    }
};

// funzione per emettere gli eventi di chiusura tramite X LABEL
const onClose = (): void => {
    emit('close');
}

// invio della recensione
const submitReview = async () => {
    console.log(reviewData);
    await reviewStore.createReview(reviewData);
}
</script>


<template>
    <!-- sfondo nero dietro la modale recensione -->
    <div v-if="show" class="overlay" />

    <div v-if="show">
        <div class="modal-backdrop custom-backdrop" role="dialog" aria-modal="true" tabindex="-1" />
        <div class="modal" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog">
                <div class="modal-content text-black">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reviewModalLabel">Scrivi una recensione</h5>
                        <button type="button" class="btn-close" @click="onClose"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitReview">
                            <div class="modal-body">
                                <!-- Email -->
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" :value="reviewData.email" readonly />
                                </div>

                                <!-- Rating -->
                                <div class="mb-3">
                                    <label class="form-label">Voto</label>
                                    <div class="star-rating">
                                        <span v-for="star in 5" :key="star" class="star"
                                            :class="{ active: star <= reviewData.rating }"
                                            @click="reviewData.rating = star">
                                            ★
                                        </span>
                                    </div>
                                </div>
                                <!-- Comment -->
                                <div class=" mb-3">
                                    <label class="form-label">Commento</label>
                                    <textarea v-model="reviewData.comment" class="form-control" rows="4"
                                        required></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onClose">
                            Annulla
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Invia recensione
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-backdrop {
    width: 100%;
    height: 100%;
}

.modal-dialog {
    max-width: none !important;
}

.modal-content {
    width: 43vw;

    @media (max-width: $breakpoint-md) {
        width: 90vw
    }

    .star-rating {
        font-size: 1.75rem;
    }

    .star {
        cursor: pointer;
        color: #ccc;
        margin-right: 4px;
    }

    .star.active {
        color: #f5c518;
    }
}
</style>
