<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';


/* USEROUTER + USEROUTE */
const router = useRouter();
const route = useRoute();


/* COMPUTED */
// computed per mostrare/nascondere il footer in alcune route della pagina
const showFooter = computed(() => {
    return !['products', 'ProductDetail', 'login', 'register', 'privacy-policy'].includes(route.name as string);
})
</script>



<template>
    <footer class="footer fs-6 text-center text-lg-start mt-5" v-if="showFooter">
        <div class="container p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <!-- Copyright -->
            <div class="mb-3 mb-md-0">
                <span>© 2025, Crochet Giogi</span>
            </div>
            <!-- Links -->
            <div>
                <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
            </div>
        </div>
    </footer>
</template>



<style scoped lang="scss">
.footer {
    position: relative;
    left: 0;
    bottom: 0;
    z-index: 4;
    background: $color-third;
    color: $color-fifth;
    font-size: 0.9rem;

    .footer-link {
        color: $color-primary; // arancio volpe
        text-decoration: none;

        &:hover {
            color: $color-fourth; // verde salvia tenue
            text-decoration: underline;
        }
    }
}
</style>