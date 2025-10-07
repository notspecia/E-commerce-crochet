import { defineStore } from "pinia";
import { ref } from "vue";
import type Toast from "../models/Toast.model";


export const useToastStore = defineStore("toast", () => {

    /* --------------STATE---------------- */
    // state reactive of the object whit array of toasts
    const toasts = ref<Toast[]>([]);

    // counter for unique id of toasts
    let idCounter = 0;


    /* ------------ACTIONS------------- */
    const addToast = (type: Toast["type"], message: string, duration = 4000) => {
        const id = ++idCounter;
        toasts.value.push({ id, type, message, duration });
        // auto-remove after duration passed (ms) from the ref array of toasts
        setTimeout(() => removeToast(id), duration);
    };

    // function to remove a toast by id
    const removeToast = (id: number) => {
        toasts.value = toasts.value.filter((t) => t.id !== id);
    };


    return {
        toasts,
        addToast,
        removeToast,
    };
});