<script setup lang="ts">
import { reactive } from 'vue';
import type MessageContact from '@/models/MessageContact.model';

/* STATE FORM */
const messageContact = reactive<MessageContact>({
    name: '',
    email: '',
    message: '',
    error: ''
});

/* SUBMIT */
const onSubmit = () => {
    if (!messageContact.email.trim() || !messageContact.message.trim()) {
        messageContact.error = 'Compilare email e messaggio.';
        return;
    }

    messageContact.error = '';

    // TODO: invio reale
    console.log('Dati form:', {
        name: messageContact.name.trim(),
        email: messageContact.email.trim(),
        message: messageContact.message.trim()
    });
};
</script>

<template>
    <section class="contact-section">
        <h2 class="mb-4 mt-5">Invia una richiesta rapida</h2>

        <form class="row g-3" @submit.prevent="onSubmit" novalidate>

            <!-- Name -->
            <div class="col-md-6">
                <label for="name" class="form-label">Nome</label>
                <input id="name" type="text" v-model="messageContact.name" class="form-control"
                    placeholder="Inserisci il tuo nome" />
            </div>

            <!-- Email -->
            <div class="col-md-6">
                <label for="email" class="form-label">Email *</label>
                <input id="email" type="email" v-model="messageContact.email" class="form-control"
                    placeholder="nome@example.com" required />
            </div>

            <!-- Message -->
            <div class="col-12">
                <label for="message" class="form-label">Messaggio *</label>
                <textarea id="message" v-model="messageContact.message" class="form-control" rows="4"
                    placeholder="Scrivi la tua richiesta qui..." required></textarea>
            </div>

            <!-- Error -->
            <div v-if="messageContact.error" class="col-12">
                <p class="text-danger fw-semibold">{{ messageContact.error }}</p>
            </div>

            <!-- Submit button -->
            <div class="col-12 mt-5">
                <button type="submit" class="btn btn-primary w-100">
                    Invia
                </button>
            </div>
        </form>
    </section>
</template>

<style scoped lang="scss"></style>
