<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '../../stores/user';
import GoBack from '../../components/GoBack/GoBack.vue';

/* PINIA STORE USER */
const userStore = useUserStore();

/* REACTIVE */
const credentials = reactive({
    identifier: '',
    password: '',
});

/* FUNCTIONS */
const submitLogin = async () => {

    // validazione minima lato frontend se errata blocca submit e fetch
    if (!credentials.identifier || !credentials.password) {
        userStore.stateUser.error = "Credenziali errate riprova!";
        return;
    }

    // chiama lo store per tentare il login con le credenziali passate
    await userStore.fetchAuthUser(false, credentials);
};
</script>



<template>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <form class="card py-4 px-5" @submit.prevent="submitLogin">
            <h2 class="text-center mb-4">Login</h2>
            <div class="my-3">
                <label class="form-label" for="emailOrUsername">Email or Username</label>
                <input type="text" id="emailOrUsername" name="identifier" v-model="credentials.identifier"
                    class="form-control" placeholder="Inserisci la tua email"
                    aria-label="email or username input field" />
                <div id="emailOrUsernameHelp" class="form-text hint">We'll never share your email or username
                    with anyone
                    else.</div>
            </div>
            <div class="my-3">
                <label class="form-label" for="password">Password</label>
                <input type="password" id="password" name="password" v-model="credentials.password" class="form-control"
                    placeholder="Inserisci la password" aria-label="password input field" />
                <div id="passwordHelp" class="form-text hint">We'll never share your passowrd with
                    anyone else.
                </div>
            </div>
            <button type="submit" class="btn d-inline-block mx-auto mt-5 w-75 fs-5">Accedi</button>
            <p v-if="userStore.stateUser.error" class="text-danger mt-1 text-center fs-6">{{ userStore.stateUser.error
                }}</p>
        </form>
    </div>
</template>



<style scoped lang="scss">
form.card {
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
}
</style>
