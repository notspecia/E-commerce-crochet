<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import type Login from '@/models/Login.model';


/* PINIA STORE USER and CART and TOAST */
const userStore = useUserStore();

/* USEROUTER */
const router = useRouter();

/* REACTIVE */
const credentials = reactive<Login>({
    identifier: '',
    password: '',
});

/* FUNCTIONS */
const submitLogin = async () => {
    // chiama lo store per tentare il login con le credenziali passate
    await userStore.fetchAuthUser(false, credentials);
};

/* WATCH */
// if fields get touch reset the error in pinia state user
watch(
    () => [credentials.identifier, credentials.password],
    () => {
        if (userStore.stateUser.error) userStore.clearError();
    }
);

/* ONMOUNTED */
onMounted(() => {
    if (userStore.isLoggedIn) {
        router.push('/');
    }
}); 
</script>



<template>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <form class="card card-form py-4 px-5" @submit.prevent="submitLogin">
            <div class="mb-4">
                <RouterLink to="/">
                    <img src="@/assets/logos/header-logo.png" alt="logo sito" class="logo">
                </RouterLink>
                <h2 class="text-center">Login</h2>
            </div>
            <!-- username or email -->
            <div class="form-floating mb-4">
                <input type="text" id="username" name="username" v-model="credentials.identifier" class="form-control"
                    placeholder="" aria-label="username or email input field" required />
                <label for="username">Username or Email</label>
            </div>
            <!-- password -->
            <div class="form-floating mb-3">
                <input type="password" id="password" name="password" v-model="credentials.password" class="form-control"
                    placeholder="" aria-label="password input field" required />
                <label for="password">Password</label>
            </div>
            <!-- errore -->
            <p v-if="userStore.stateUser.error" class="text-danger mb-4 text-center fs-6">
                {{ userStore.stateUser.error }}
            </p>
            <!-- DISCLAIMER -->
            <div id="privacyHint" class="form-text hint mb-2 text-center">
                I tuoi dati sono protetti e non saranno condivisi con nessuno.
            </div>
            <!-- submit button -->
            <button type="submit" class="btn btn-two d-inline-block mx-auto w-100 fs-5">Accedi</button>
            <!-- redirect a register -->
            <p class="link-account mt-2" @click="() => { router.push('/register'); userStore.stateUser.error = '' }">
                Non hai un account? Registrati subito!
            </p>
        </form>
    </div>
</template>



<style scoped lang="scss"></style>