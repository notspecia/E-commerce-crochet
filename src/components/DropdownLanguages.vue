<script setup lang="ts">
import { defineEmits } from 'vue';
import { languages } from '@/utils/costants';


/* EMIT */
const emit = defineEmits(['setLanguage']);

/* FUNCTIONS */
// funzione per emettere l'evento setLanguage con la lingua selezionata
const setLanguage = (lang: string): void => {
    emit('setLanguage', lang);
}
</script>


<template>
    <ul class="dropdown-menu">
        <li v-for="lang in languages" :key="lang.code" class="dropdown-item" @click="setLanguage(lang.code)">
            <img :src="`images/${lang.flag}`" :alt="lang.label" class="flag" :key="lang.code" />
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