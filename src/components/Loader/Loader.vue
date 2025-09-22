<script setup lang="ts">
</script>



<template>
    <div className="loader-overlay">
        <div className="spinner-border loader-spinner mt-5" role="status">
            <span className="visually-hidden">Caricamento...</span>
        </div>
    </div>
</template>



<style scoped lang="scss">
.loader-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.loader-spinner {
    width: 3rem;
    height: 3rem;
    color: $color-primary;
}
</style>