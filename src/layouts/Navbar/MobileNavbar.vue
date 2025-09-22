<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineEmits } from 'vue'
import { useI18n } from 'vue-i18n';
import DropdownLanguages from '../../components/DropdownLanguages/DropdownLanguages.vue';


/* I18N LANG */
const { locale } = useI18n(); // rendiamolo reattivo per il cambio lingua


/* EMITS */
// emits an event to the father "Navbar" to close the mobile menu
const emit = defineEmits(['close', 'setLanguage']);
</script>



<template>
    <aside class="mobile-menu">
        <!-- close icon per chiudere menu-->
        <i class="bi bi-x-lg fs-2" @click="$emit('close')" />
        <!-- lista verticale con i link delle pagine rotte -->
        <ul class="mobile-nav-list">
            <li class="nav-link">
                <RouterLink to="/" @click="$emit('close')">{{ $t('navbar.home') }}</RouterLink>
            </li>
            <li class="nav-link">
                <RouterLink to="/products" @click="$emit('close')">{{ $t('navbar.products') }}</RouterLink>
            </li>
            <li class="nav-link">
                <RouterLink to="/FAQ" @click="$emit('close')">{{ $t('navbar.faq') }}</RouterLink>
            </li>
            <li class="nav-link">
                <RouterLink to="/contacts" @click="$emit('close')">{{ $t('navbar.contacts') }}</RouterLink>
            </li>
        </ul>
        <div class="nav-item dropdown">
            <img :src="`images/flags/${locale}.svg`" alt="lingua attiva" class="flag me-1" />
            <a class="nav-link dropdown-toggle d-inline-block" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{ $t('fullName') }}
            </a>
            <!-- dropdown menu per settare la lingua del sito -->
            <DropdownLanguages @setLanguage="lang => emit('setLanguage', lang)" />
        </div>
    </aside>
</template>



<style scoped lang="scss">
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 260px;
    height: 100vh;
    color: $color-gray-900;
    background: $body-bg;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

//container  lista verticale con i link delle pagine rotte
.mobile-nav-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 500px;
    font-size: 1.1rem;
    padding: 0;
}

// toggle per cambiare lingua MOBILE
.dropdown {
    display: flex;
    align-items: center;
}
</style>
