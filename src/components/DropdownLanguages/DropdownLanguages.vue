<script setup lang="ts">
import { defineEmits } from 'vue';


/* EMIT */
const emit = defineEmits(['setLanguage']);


/* ARRAY statico LINGUE CON BANDIERE + LABEL */
const languages = [
    { code: 'it', label: 'Italiano', flag: '/flags/it.svg' },
    { code: 'en', label: 'English', flag: '/flags/en.svg' },
    { code: 'fr', label: 'Français', flag: '/flags/fr.svg' },
    { code: 'es', label: 'Español', flag: '/flags/es.svg' },
    { code: 'de', label: 'Deutsch', flag: '/flags/de.svg' },
];


/* FUNCTIONS */
// funzione per emettere l'evento setLanguage con la lingua selezionata
const setLanguage = (lang: string): void => {
    emit('setLanguage', lang);
}
</script>



<template>
    <ul class="dropdown-menu mt-3">
        <li v-for="lang in languages" :key="lang.code" class="dropdown-item" @click="setLanguage(lang.code)">
            <img :src="`images/${lang.flag}`" :alt="lang.label" class="flag" />
            {{ lang.label }}
        </li>
    </ul>
</template>



<style scoped lang="scss">
.dropdown-item {
    display: flex;
    gap: 8px;
    color: $color-gray-900;
    align-items: center;
}
</style>