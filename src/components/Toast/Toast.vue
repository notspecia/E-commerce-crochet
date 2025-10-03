<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

/* PROPS */
const props = defineProps<{
    type: string;
    duration?: number;
}>();

/* REF */
const visible = ref<boolean>(true);

/* FUNCTIONS */
const closeToast = (): void => {
    visible.value = false;
};

/* ONMOUNTED */
// se è stata passata una durata come props chiudo il toast dopo quel tempo
onMounted(() => {
    if (props.duration) {
        setTimeout(() => (visible.value = false), props.duration);
    }
});
</script>



<template>
    <div v-if="visible" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;">
        <div class="toast align-items-center fs-6 p-2 border-0 show" :class="`text-bg-${type}`" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <slot name="body">Messaggio di default</slot>
                </div>
                <button type="button" class="btn-close me-2 m-auto" @click="closeToast" />
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.toast {
    min-width: 300px;
}
</style>
