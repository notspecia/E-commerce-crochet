<script setup lang="ts">
</script>


<template>
    <!-- BOTTONE per tornare indietro alla pagina prodotti -->
    <div class="btn-back mb-5" @click="$router.back()">
        <i class="bi bi-chevron-left me-2"></i>
        <span>{{ $t('global.goBack') }}</span>
    </div>
</template>


<style lang="scss">
.btn-back {
    display: inline-flex;
    align-items: center;
    background-color: #f4f4f483;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: $font-family-hand;
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 50px;
    transition: all 0.3s ease;

    i {
        font-size: 1.2rem;
        font-weight: bold;
        transition: transform 0.3s ease;
    }

    &:hover {
        background-color: #e0e0e0a6;
        color: $color-gray-900;
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

        i {
            transform: translateX(-2px);
        }
    }
}
</style>