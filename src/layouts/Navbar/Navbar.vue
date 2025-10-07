<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useUserStore } from '../../stores/user';
import { useI18n } from 'vue-i18n';
import { languages } from '../../utils/costants';
import MobileNavbar from './MobileNavbar.vue';
import DropdownLanguages from '../../components/DropdownLanguages/DropdownLanguages.vue';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm.vue';
import DropdownUser from '../../components/DropdownUser/DropdownUser.vue';


/* I18N LANG */
const { locale } = useI18n(); // rendiamolo reattivo per il cambio lingua


/* USEROUTER + USEROUTE */
const router = useRouter();
const route = useRoute();


/* CART e USER PINIA STATE */
const cartStore = useCartStore();
const userStore = useUserStore();


/* REF */
const menuIsOpen = ref<boolean>(false); // stato per gestire l'apertura/chiusura del menu mobile (se dispositivo mobile) 
const showModalLogout = ref<boolean>(false); // stato per gestire l'apertura/chiusura del modal di conferma logout


/* COMPUTED */
// computed per mostrare/nascondere la navbar in diverse route.name
const showNavbar = computed(() => {
    return !['checkout', 'login', 'register', 'privacy-policy'].includes(route.name as string);
});

// computed per ottenere l'oggetto lingua selezionata in base al codice lingua (locale)
const selectedLang = computed(() => languages.find(lang => lang.code === locale.value));


/* FUNCTIONS */
// funzione setter lingua passando la stringa della linuga selezionata e cambio il locale di i18n
const setLanguage = (lang: string): void => {
    locale.value = lang; // cambio la lingua in tutta l'applicazione (attiva watch in product.ts)
}

// funzione per gestire il toggle del menu mobile passato come props al componente MobileNavbar tramie @emit
const toggleMenu = (): void => {
    menuIsOpen.value = !menuIsOpen.value;
}

// funzione per chiudere il menu mobile e il carrello quando si clicca sullo sfondo nero (overlay)
const handleOverlayClick = (): void => {
    if (cartStore.cartIsOpen) {
        cartStore.toggleCart(); // chiude il carrello
    } else {
        toggleMenu();  // chiude il menu mobile
    }
}

// funzioni per gestire il logout dell'utente tramite il modal di conferma (da passare come @emits al componente ModalConfirm)
const confirmLogout = (): void => {
    userStore.logoutUser();
    showModalLogout.value = false;
}
const closeModal = (): void => {
    showModalLogout.value = false;
}

// handle user function in base alla computed se è loggato (esci) se non lo è (redirect a register)
const handleUser = (): void => {
    if (userStore.isLoggedIn) {
        showModalLogout.value = true; // mostra il modal di conferma logout
    } else {
        router.push(`/login`); // redirect a login
    }
}


/* WATCH */
// watch effect di controllo per il menu mobile e il carrello, per aggiungere/rimuovere la classe no-scroll al body sull overlay
watchEffect(() => {
    if (menuIsOpen.value || cartStore.cartIsOpen || showModalLogout.value) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }
});
</script>



<template>
    <!-- sfondo nero dietro il menu a tendina (quando aperto menu a tendina mobile ) -->
    <div v-if="menuIsOpen || cartStore.cartIsOpen" class="overlay" @click="handleOverlayClick" />

    <header class="mb-5 pt-3" v-if="showNavbar">
        <!-- 
        hamburger icon per aprire menus, renderizzata sotto un brk specifico! 1 sezione (mobile) +
        componente mobile navbar con la tendina hamburger clicckato, passato booleano come props per montare il componente con animazione
        -->
        <i class="bi bi-list fs-1 hamburger" @click="toggleMenu" />
        <transition name="slide-left">
            <MobileNavbar v-if="menuIsOpen" @close="toggleMenu" @setLanguage="setLanguage"
                :selectedLang="selectedLang" />
        </transition>

        <!-- immagine logo con click render alla HOME "/" + linka voci del sito 2 sezione -->
        <nav class="nav-left">
            <RouterLink to="/">
                <img src="/images/logos/giogi-mascotte-logo.png" alt="logo sito" class="logo">
            </RouterLink>
            <!-- nav lista con i link, spostata in menu a tendina per i mobile -->
            <ul class="nav-list">
                <li class="nav-link">
                    <RouterLink to="/">{{ $t('navbar.home') }}</RouterLink>
                </li>
                <li class="nav-link">
                    <RouterLink to="/products">{{ $t('navbar.products') }}</RouterLink>
                </li>
                <li class="nav-link">
                    <RouterLink to="/FAQ">{{ $t('navbar.faq') }}</RouterLink>
                </li>
                <li class="nav-link">
                    <RouterLink to="/contacts">{{ $t('navbar.contacts') }}</RouterLink>
                </li>
            </ul>
        </nav>

        <!-- sezione a destra per gestione dei prodotti con carrello e select con lingua differente -->
        <div class="nav-right">
            <div class="nav-item dropdown dropdown-center">
                <img v-if="selectedLang" :src="`/images/${selectedLang.flag}`" :alt="selectedLang.label"
                    class="flag me-1" :key="selectedLang.code" />
                <a class="nav-link dropdown-toggle d-inline-block" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ selectedLang?.label }}
                </a>
                <!-- dropdown menu per settare la lingua del sito -->
                <DropdownLanguages @setLanguage="setLanguage" />
            </div>

            <!-- Gestione utente -->
            <div class="position-relative">
                <!-- Utente non loggato -->
                <i v-if="!userStore.isLoggedIn" class="bi bi-person-add fs-3 user" @click="handleUser"
                    title="Accedi o registrati"></i>
                <!-- Utente loggato -->
                <DropdownUser v-else @handleUser="handleUser" />
            </div>

            <!-- Modale di conferma per logout passati slot tempaltes della modale -->
            <ModalConfirm :show="showModalLogout" @close="closeModal">
                <template #header>
                    <h5 class="modal-title">Vuoi davvero uscire?</h5>
                </template>
                <template #default>
                    <p>Sei sicuro di voler disconnetterti dal tuo account?</p>
                </template>
                <template #footer>
                    <button type="button" class="btn btn-secondary" @click="closeModal">Chiudi</button>
                    <button type="button" class="btn btn-custom-primary" @click="confirmLogout">Conferma</button>
                </template>
            </ModalConfirm>

            <!-- toggle icon per aprire carrello dal padre navbar + 
            componente cart con i prodotti dell'utente con animazione slide -->
            <div class="position-relative" @click="cartStore.toggleCart">
                <span v-if="cartStore.cartCount > 0" class="cart-items">{{ cartStore.cartCount }}</span>
                <i class="bi bi-cart fs-3 cart"></i>
            </div>

        </div>
    </header>
</template>



<style scoped lang="scss">
// contenitore padre navabr principale
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    font-size: 1.2rem;
    padding: 0 20px;
}

// immagine logo della navabr
.logo {
    width: 120px;
    height: 120px;
    cursor: pointer;
}

// hamburger icon per aprire il menu mobile
.hamburger {
    display: none; // nascosta per brk > 992px
    cursor: pointer;

    @media (max-width: $breakpoint-lg) {
        display: block; // visibile per brk <= 992px (mobile)
    }
}

// proprietà comuni di display per le 2 sezioni navbar 
.nav-left,
.nav-right,
.nav-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    cursor: pointer;
}

.nav-list {
    @media (max-width: $breakpoint-lg) {
        display: none; // nascosta per brk <= 992px (mobile), sarà visibile con hamburger + tendina
    }
}

// toggle per cambiare lingua (nascondo il dropdown per brk < 992px)
.dropdown {
    display: flex; // visibile per brk > 992px (desktop tablet)
    align-items: center;

    @media (max-width: $breakpoint-lg) {
        display: none; // nascosto per brk < 992px
    }
}

// effetti animazione sul cart prodotti icon
i.cart,
i.user {
    display: inline-block; // 🔑 così transform funziona SEMPRE
    transition: all 0.2s ease-in-out;

    &:hover {
        color: $color-primary ;
        animation: shake 0.4s ease-in-out;
    }
}

.btn-custom-primary {
    background-color: $color-primary;
    border: none;

    &:hover {
        background-color: darken($color-primary, 10%);
    }
}

// bollino per il numero di prodotti nel carrello
.cart-items {
    position: absolute;
    top: -2px;
    right: -12px;
    font-family: $font-family-base;
    font-size: 0.8rem;
    font-weight: $font-weight-bold;
    background-color: $color-primary;
    color: $color-black;
    padding: 0px 5px;
    border-radius: 100%;
}
</style>