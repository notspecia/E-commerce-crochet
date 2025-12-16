<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userEmail = userStore.email

const rating = ref(0)
const comment = ref('')

const submitReview = async () => {
    if (rating.value === 0) {
        alert('Seleziona un voto')
        return
    }

    const reviewData = {
        email: userEmail,
        rating: rating.value,
        comment: comment.value
    }

    try {
        console.log('Invio recensione:', reviewData)

        // TODO: chiamata reale al tuo store / API
        // await reviewsStore.createReview(...)

        // reset
        rating.value = 0
        comment.value = ''

        // chiusura modale Bootstrap 5
        const modalEl = document.getElementById('reviewModal')
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl)
            modal?.hide()
        }
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reviewModal">
        Scrivi una nuova recensione
    </button>

    <!-- Modal -->
    <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="submitReview">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reviewModalLabel">
                            Scrivi una recensione
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
                    </div>

                    <div class="modal-body">
                        <!-- Email -->
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" :value="userEmail" readonly />
                        </div>

                        <!-- Rating -->
                        <div class="mb-3">
                            <label class="form-label">Voto</label>
                            <div class="star-rating">
                                <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= rating }"
                                    @click="rating = star">
                                    ★
                                </span>
                            </div>
                        </div>

                        <!-- Comment -->
                        <div class="mb-3">
                            <label class="form-label">Commento</label>
                            <textarea v-model="comment" class="form-control" rows="4" required></textarea>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Annulla
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Invia recensione
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
</style>
