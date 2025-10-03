<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useUserStore } from '../../stores/user';
import { useToastStore } from '../../stores/toast';
import { useRouter } from 'vue-router';
import type Register from '../../models/Register.model';



/* PINIA STORE USER */
const userStore = useUserStore();
const toastStore = useToastStore();

/* USEROUTER */
const router = useRouter();


/* REACTIVE */
const credentials = reactive<Register>({
    username: '',
    email: '',
    password: '',
});


/* FUNCTIONS */
const submitRegister = async () => {
    // validazione minima lato frontend se errata blocca submit e fetch
    if (!credentials.username || !credentials.email || !credentials.password) {
        userStore.stateUser.error = "Inserisci i campi!";
        return;
    }
    // chiama lo store per tentare il register con le credenziali nuove passate
    await userStore.fetchAuthUser(true, credentials);

    // render toast di successo al completamento del register
    if (!userStore.stateUser.error) {
        toastStore.addToast("light", "Registrazione effettuata con successo!");
    }
};


/* ONMOUNTED */
onMounted(() => {
    if (userStore.isLoggedIn) {
        router.push('/');
    }
}); 
</script>


<template>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <form class="card card-form py-4 px-5" @submit.prevent="submitRegister">
            <div class="mb-4">
                <RouterLink to="/">
                    <img src="/images/logos/giogi-mascotte-logo.png" alt="logo sito" class="logo">
                </RouterLink>
                <h2 class="text-center">Register a new account!</h2>
            </div>
            <!-- Username -->
            <div class="form-floating mb-4">
                <input type="text" id="username" name="username" v-model="credentials.username" class="form-control"
                    placeholder=" " aria-label="username input field" />
                <label for="username">Username</label>
            </div>
            <!-- Email -->
            <div class="form-floating mb-4">
                <input type="email" id="email" name="email" v-model="credentials.email" class="form-control"
                    placeholder=" " aria-label="email input field" />
                <label for="email">Email</label>
            </div>
            <!-- Password -->
            <div class="form-floating mb-3">
                <input type="password" id="password" name="password" v-model="credentials.password" class="form-control"
                    placeholder=" " aria-label="password input field" autocomplete="new-password" />
                <label for="password">Password</label>
            </div>
            <!-- Errore -->
            <p v-if="userStore.stateUser.error" class="text-danger mb-4 text-center fs-6">
                {{ userStore.stateUser.error }}
            </p>
            <!-- Disclaimer unico -->
            <div id="privacyHint" class="form-text hint mb-2 text-center">
                I tuoi dati sono protetti e non saranno condivisi con nessuno.
            </div>
            <!-- Pulsante -->
            <button type="submit" class="btn d-inline-block mx-auto w-100 fs-5">
                Registrati
            </button>
            <!-- Redirect a login -->
            <p class="link-account mt-2" @click="() => { router.push('/login'); userStore.stateUser.error = '' }">
                Hai già un account? Accedi!
            </p>
        </form>
    </div>
</template>


<style scoped lang="scss"></style>