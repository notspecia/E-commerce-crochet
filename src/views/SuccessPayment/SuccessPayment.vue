<script setup lang="ts">

</script>


<template>
    <div class="conatiner-success-payment">
        <!-- Immagine centrale -->
        <img class="success-image mb-4" src="/images/lucky-success.jpg" alt="Successo pagamento" />
        <!-- Messaggio di conferma -->
        <h2 class="mb-2 fs-1">Pagamento completato</h2>
        <p class="lead">
            Grazie per il tuo ordine. Riceverai aggiornamenti tramite email non appena l’ordine verrà elaborato.
        </p>
        <!-- Bottone per tornare alla Home -->
        <router-link to="/" class="btn btn-one mt-4">
            Torna alla Home
        </router-link>
    </div>
</template>


<style scoped lang="scss">
.conatiner-success-payment {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Immagine di successo pagamento
    .success-image {
        width: 400px;

        @media (max-width: $breakpoint-lg) {
            width: 250px;
        }
    }
}
</style>
