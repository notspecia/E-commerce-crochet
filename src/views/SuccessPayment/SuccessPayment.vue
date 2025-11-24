<script setup lang="ts">

</script>


<template>
    <div class="success-container container d-flex flex-column align-items-center justify-content-center text-center">

        <!-- Immagine centrale -->
        <img class="success-image mb-4"
            src="https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0"
            alt="Successo pagamento" />

        <!-- Messaggio di conferma -->
        <h2 class="mb-3">Pagamento completato</h2>
        <p class="lead description">
            Grazie per il tuo ordine. Riceverai aggiornamenti tramite email non appena l’ordine verrà elaborato.
        </p>

        <!-- Bottone per tornare alla Home -->
        <router-link to="/" class="btn btn-primary mt-4">
            Torna alla Home
        </router-link>
    </div>
</template>


<style scoped lang="scss">
.success-container {
    min-height: 70vh;
    padding-top: 4rem;

    .success-image {
        width: 180px;
        height: 180px;
        object-fit: contain;
        opacity: 0.9;
    }

    .description {
        max-width: 420px;
        margin: 0 auto;
        color: #444;
    }
}
</style>
