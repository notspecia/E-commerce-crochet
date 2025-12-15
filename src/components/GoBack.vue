<script setup lang="ts">
</script>


<template>
    <!-- BOTTONE per tornare indietro alla pagina prodotti -->
    <div class="btn-back mb-5" @click="$router.back()">
        <i class="bi bi-chevron-left me-3"></i>
        <span>{{ $t('global.goBack') }}</span>
    </div>
</template>


<style lang="scss">
.btn-back {
    display: inline-block;
    background-color: #f4f4f4a4;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 50px;
    transition: color 0.3s ease;

    &:hover {
        color: $color-gray-900;
    }
}
</style>