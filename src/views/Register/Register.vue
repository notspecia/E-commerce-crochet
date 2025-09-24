<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import GoBack from '../../components/GoBack/GoBack.vue';


/* USEROUTER */
const router = useRouter();


/* PINIA STORE USER */
const userStore = useUserStore();


/* REACTIVE */
const credentials = reactive({
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
};
</script>



<template>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <form class="card py-4 px-5" @submit.prevent="submitRegister">
            <h2 class="text-center mb-4">Register</h2>
            <!-- Username -->
            <div class="my-3">
                <label class="form-label" for="username">Username</label>
                <input type="text" id="username" name="username" v-model="credentials.username" class="form-control"
                    placeholder="Inserisci il tuo username" aria-label="username input field" />
                <div id="usernameHelp" class="form-text hint">We'll never share your username with
                    anyone else.
                </div>
            </div>

            <!-- Email -->
            <div class="my-3">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" name="email" v-model="credentials.email" class="form-control"
                    placeholder="Inserisci la tua email" aria-label="email input field" />
                <div id="emailHelp" class="form-text hint">We'll never share your email with
                    anyone else.
                </div>
            </div>

            <!-- Password -->
            <div class="my-3">
                <label class="form-label" for="password">Password</label>
                <input type="password" id="password" name="password" v-model="credentials.password" class="form-control"
                    placeholder="Inserisci la password" aria-label="password input field" />
                <div id="passwordHelp" class="form-text hint">We'll never share your passowrd with
                    anyone else.
                </div>
            </div>
            <!-- Pulsante -->
            <button type="submit" class="btn d-inline-block mx-auto mt-5 w-75 fs-5">
                Registrati
            </button>
            <!-- Errore -->
            <p v-if="userStore.stateUser.error" class="text-danger mt-3 text-center fs-6">
                {{ userStore.stateUser.error }}
            </p>
            <!-- Redirect sehai gia account + pulizia errori -->
            <p class="link-login mt-4" @click="() => { router.push('/login'); userStore.stateUser.error = '' }">
                Hai Già un account? accedi!
            </p>
        </form>
    </div>
</template>



<style scoped lang="scss">
.card {
    width: 600px; // width assouluta con px > sm
    font-size: 1.1rem;
    color: $color-black;
    border-radius: 12px;
    background-color: $color-gray-100;
    box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.1);

    @media (max-width: $breakpoint-sm) {
        width: 80%; // width in % sotto il brk < sm
    }

    input {
        background-color: $color-gray-200;
        color: $color-black;
    }

    .hint {
        color: $color-gray-700 ;
    }

    button {
        background: $gradient-secondary;
        transition: all 0.3 ease-in-out;

        &:hover {
            transform: scale(1.03);
            color: $color-white;
        }
    }

    .link-login {
        display: inline-block;
        width: fit-content;
        color: $color-primary;
        text-decoration: underline;
        margin: 0 auto;
        cursor: pointer;
    }
}
</style>