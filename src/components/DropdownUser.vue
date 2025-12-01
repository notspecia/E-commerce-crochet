<script setup lang="ts">
import { useUserStore } from '@/stores/user';

/* USER PINIA STATE */
const userStore = useUserStore();

/* EMIT */
const emit = defineEmits(['handleUser']);

/* FUNCTIONS */
// funzione per emettere l'evento di handle dell'utente (logout)
const handleUser = (): void => {
    emit('handleUser');
}
</script>


<template>
    <div class="dropdown-center">
        <i class="bi bi-person fs-3 dropdown-toggle" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false"
            title="Account"></i>
        <ul class="dropdown-menu" aria-labelledby="userMenu">
            <li class="dropdown-item disabled mb-3 d-flex flex-column gap-1 fw-bold">
                <span class="username">{{ userStore.stateUser.user?.username }} <i class="bi bi-person"></i> </span>
                <span class="email">{{ userStore.stateUser.user?.email }}</span>
            </li>
            <li>
                <RouterLink class="dropdown-item" to="/orders">I miei ordini</RouterLink>
            </li>
            <li>
                <hr class="dropdown-divider">
                <button class="dropdown-item text-danger" @click="handleUser">
                    Esci
                </button>
            </li>
        </ul>
    </div>
</template>


<style lang="scss">
.username {
    font-size: 1.15rem;
    color: $color-black;
}

.email {
    font-size: 0.75rem;
    color: $color-gray-500;
}
</style>