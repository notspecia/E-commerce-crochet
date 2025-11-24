<script setup lang="ts">
import { platforms } from '../../utils/costants';
</script>


<template>
    <section>
        <h2 class="text text-center">
            Per richiedere <span>prodotti personalizzati</span> & <span>informazioni:</span>
        </h2>
        <!-- for of constant socials link and icon url -->
        <div class="social-row" role="navigation" aria-label="link social">
            <a v-for="p in platforms" :key="p.id" :href="p.url" class="social-link" :aria-label="p.name" target="_blank"
                rel="noopener noreferrer">
                <i :class="['bi', p.icon]" aria-hidden="true"></i>
            </a>
        </div>
    </section>
</template>


<style scoped lang="scss">
h2 span {
    color: $color-primary;
    text-decoration: underline;
}

.social-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 25vh;

    // icons style
    .social-link {
        font-size: 2.7rem;
        color: $color-white;

        &:hover {
            color: $color-primary;
            animation: shake 0.4s ease-in-out;
        }
    }

    // layout mobile: in colonna
    @media (max-width: $breakpoint-md) {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        margin-top: 5rem;
    }
}
</style>
