<script setup lang="ts">
</script>



<template>
    <!-- BOTTONE per tornare indietro alla pagina prodotti -->
    <span class="btn-back mb-5" @click="$router.back()">
        ← {{ $t('global.goBack') }}
    </span>
</template>



<style lang="scss">
.btn-back {
    display: block;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0;
    transition: color 0.3s ease;

    &:hover {
        color: $color-secondary;
    }
}
</style>