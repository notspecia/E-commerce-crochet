<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { PostMessageContact } from '@/apis/MessageContact.api';
import { useToastStore } from '@/stores/toast';
import type MessageContact from '@/models/MessageContact.model';


/* STATE PINIA TOAST */
const toastStore = useToastStore();

/* STATE FORM */
const messageContact = reactive<MessageContact>({
    name: '',
    email: '',
    message: '',
});

/* REF */
const error = ref<null | string>(null);
const isLoading = ref<boolean>(false);

/* FUNCTIONS */
const submitMessage = async () => {
    // start the request send message
    isLoading.value = true;
    await PostMessageContact(messageContact);
    isLoading.value = false;
    // add to display toast success send message
    toastStore.addToast(
        'light',
        `messaggio inviato con successo! ti risponderemo alla tua email: ${messageContact.email} il prima possibile!`,
        15000
    );
    // reset datas reactive object
    Object.assign(messageContact, { name: '', email: '', message: '' });
};

/* WATCH */
// if fields get touch reset the error in pinia state user
watch(
    () => [messageContact.name, messageContact.email, messageContact.message],
    () => {
        if (error.value) error.value = '';
    }
);
</script>


<template>
    <h2 class="mb-4">Invia una richiesta rapida</h2>

    <form class="row g-3 pb-5" @submit.prevent="submitMessage">
        <!-- name user -->
        <div class="col-md-6">
            <label for="name" class="form-label">Nome</label>
            <input id="name" type="text" v-model="messageContact.name" class="form-control"
                placeholder="Inserisci il tuo nome" aria-label="name input field" required />
        </div>
        <!-- email -->
        <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input id="email" type="email" v-model="messageContact.email" class="form-control"
                placeholder="nome@example.com" aria-label="email input field" required />
        </div>
        <!-- messaggio text area -->
        <div class="col-12">
            <label for="message" class="form-label">Messaggio</label>
            <textarea id="message" v-model="messageContact.message" class="form-control" rows="4"
                placeholder="Scrivi la tua richiesta qui..." aria-label="text area message description"
                required></textarea>
        </div>
        <!-- TODO- DA GESTIRE Error -->
        <div v-if="error" class="col-12">
            <p class="text-danger fw-semibold">{{ error }}</p>
        </div>
        <!-- submit form send message -->
        <div class="col-12 mt-5">
            <button type="submit" class="btn btn-one w-25" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ isLoading ? 'Processing...' : 'Send message' }}
            </button>
        </div>
    </form>
</template>


<style scoped lang="scss"></style>