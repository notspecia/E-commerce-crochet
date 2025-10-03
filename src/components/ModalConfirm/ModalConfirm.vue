<script setup lang="ts">

/* PROPS */
defineProps<{ show: boolean }>();

/* EMITS */
const emit = defineEmits(['close']);

/* FUNCTIONS */
// funzione per emettere gli eventi di chiusura tramite X LABEL
const onClose = (): void => {
    emit('close');
}
</script>


<template>
    <div v-if="show">
        <div class="modal-backdrop custom-backdrop" />
        <div class="modal fade show" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog">
                <div class="modal-content text-black">
                    <div class="modal-header">
                        <slot name="header" />
                        <button type="button" class="btn-close" @click="onClose"></button>
                    </div>
                    <div class="modal-body">
                        <slot />
                    </div>
                    <div class="modal-footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.custom-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7); // filtro scuro

}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-content {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
}
</style>