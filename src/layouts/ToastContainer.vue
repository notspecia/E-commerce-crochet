<script setup lang="ts">
import { useToastStore } from '@/stores/toast';
import Toast from '@/components/Toast.vue';

/* PINIA STORE TOAST */
const toastStore = useToastStore();
</script>


<template>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;">
        <!-- cycling toast insert into the global store to show into App default -->
        <Toast v-for="toast in toastStore.toasts" :key="toast.id" :type="toast.type" :duration="toast.duration"
            @close="toastStore.removeToast(toast.id)">
            <template #body>{{ toast.message }}</template>
        </Toast>
    </div>
</template>


<style scoped lang="scss"></style>