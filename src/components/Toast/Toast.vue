<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

interface Props {
    type?: 'success' | 'danger' | 'info' | 'warning';
    duration?: number; // ms
}

const props = defineProps<Props>();

const visible = ref(true);

const closeToast = () => {
    visible.value = false;
};

onMounted(() => {
    if (props.duration) {
        setTimeout(() => (visible.value = false), props.duration);
    }
});
</script>



<template>
    <div v-if="visible" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;">
        <div class="toast align-items-center border-0 show" :class="`text-bg-${type}`" role="alert">
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
    min-width: 250px;
}
</style>
