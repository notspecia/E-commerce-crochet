<script setup lang="ts">

const platforms = [
    { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/tuapagina', icon: 'bi-facebook' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/tuapagina', icon: 'bi-instagram' },
    { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/tuacanale', icon: 'bi-youtube' },
    { id: 'vinted', name: 'Vinted', url: 'https://www.vinted.it', icon: 'bi-bag' } // fallback per Vinted
];
</script>

<template>
    <section class="contacts-page">
        <h3 class="contacts-title">Per rimanere in contatto — puoi contattarci qui</h3>

        <div class="social-row" role="navigation" aria-label="link social">
            <a v-for="p in platforms" :key="p.id" :href="p.url" class="social-link" :aria-label="p.name" target="_blank"
                rel="noopener noreferrer">
                <i :class="['bi', p.icon]" aria-hidden="true"></i>
            </a>
        </div>
    </section>
</template>

<style scoped lang="scss">
/* base sizes — cambia se hai variabili globali */
:root {
    --icon-size: 28px;
    --icon-gap: 1rem;
}

/* container */
.contacts-page {
    width: 100%;
    max-width: 760px;
    /* limita lo spazio per evitare gap estremo con space-between */
    margin: 0 auto;
    padding: 1rem 0;
}

/* titolo */
.contacts-title {
    margin-bottom: 0.75rem;
    font-weight: 600;
    font-size: 1.125rem;
}

/* riga icone: su desktop le icone si "spaziano" con space-between
   su schermi piccoli centrate con gap */
.social-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--icon-gap);
    width: 100%;
    /* limita la larghezza effettiva per evitare spazi enormi tra le icone */
    max-width: 420px;
}

/* singolo link icona: nessun background bianco, solo icona */
.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: calc(var(--icon-size) * 1.8);
    height: calc(var(--icon-size) * 1.8);
    text-decoration: none;
    color: inherit;
    transition: transform .12s ease, color .12s ease;
    font-size: var(--icon-size);
}

.social-link:focus,
.social-link:hover {
    transform: translateY(-3px);
    color: var(--bs-primary, #0d6efd);
    /* usa la var Bootstrap se presente */
}

/* responsive: schermi piccoli */
@media (max-width: 575.98px) {
    :root {
        --icon-size: 22px;
        --icon-gap: 0.5rem;
    }

    .social-row {
        justify-content: center;
        max-width: 100%;
    }

    .social-link {
        width: calc(var(--icon-size) * 2);
        height: calc(var(--icon-size) * 2);
    }
}

/* schermi grandi: icone leggermente più grandi */
@media (min-width: 992px) {
    :root {
        --icon-size: 32px;
        --icon-gap: 1.25rem;
    }
}
</style>
