<script setup lang="ts">

/* PROPS */
defineProps<{
    show: boolean
}>();

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
        <div class="modal" tabindex="-1" role="dialog" aria-modal="true">
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

<style scoped lang="scss"></style>