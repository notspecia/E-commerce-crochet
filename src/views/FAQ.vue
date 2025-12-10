<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';


/* 
I18N LANG
- t() → traduce una singola stringa (string)
- tm() → traduce e restituisce oggetti o array (translate messages) 
*/
const { tm } = useI18n();

// rendiamo le costanti con le stringhe shipping + items accordion reactive al cambio lingua
const shipping = computed(() => tm('FAQ.shipping')); // Prende array shipping tradotti
const items = computed(() => tm('FAQ.items')); // TODO Prende array items accordions tradotti
</script>



<template>
    <section class="w-75 mx-auto">
        <h2 class="header text-center mb-5">FAQ & Shipping</h2>

        <!-- DISCLAIMER TRADOTTI DA i18n -->
        <template v-for="line in shipping">
            <p v-html="line"></p>
        </template>

        <!-- ACCORDION ITEMS FAQ -->
        <div class="accordion" id="accordionExample">
            <div v-for="(item, index) in items" :key="index" class="accordion-item mt-4">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#collapse${index}`" aria-expanded="false"
                        :aria-controls="`#collapse${index}`">
                        <span v-html="item.question"></span>
                    </button>
                </h2>
                <div :id="'collapse' + index" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <hr class="mx-3 my-0">
                    <div class="accordion-body fs-6" v-html="item.answer"></div>
                </div>
            </div>
        </div>
    </section>
</template>



<style scoped lang="scss">
p {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 30px;

    :deep(strong) {
        color: $color-primary-800;
        font-weight: $font-weight-bold;
    }
}

.accordion {
    margin-top: 90px;
    --bs-accordion-color: black; // colore testo sempre nero
    --bs-accordion-btn-color: black;
    --bs-accordion-btn-bg: white;
    --bs-accordion-active-color: black; // colore testo attivo
    --bs-accordion-active-bg: white; // sfondo attivo
    --bs-accordion-bg: white; // sfondo default
    --bs-accordion-btn-focus-box-shadow: none;

    .accordion-item:has(.accordion-button:not(.collapsed)) {
        border: 2px solid $color-black;
        box-shadow: 6px 2px 12px 0 #ffffff;
    }


    // accordion header contenuto qui e modificato
    .accordion-header {
        font-family: $font-family-base; // Cambia font
        font-size: 1rem; // Cambia dimensione
        padding: 5px 0;
    }

    .accordion-button:not(.collapsed) {
        border: none;
    }
}
</style>