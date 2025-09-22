<script setup lang="ts">
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';


/* USEROUTER */
const router = useRouter();


/* CART PINIA STATE */
const cartStore = useCartStore();
</script>



<template>
  <h1 class="mb-3">soft crochet by giogi</h1>
  <h2>{{ $t('home.subtitle') }}</h2>
  <div class="text-center mt-5">
    <button class="cta-btn btn" @click="() => router.push(`/products`)">{{ $t('home.CTA') }}</button>
  </div>
  <!-- video crochet creazione di giogis -->
  <video class="hero-video" autoplay="true" controls loop poster="/images/logos/giogi-mascotte-logo.png">
    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
    <!-- fallback testo se il video non parte errore da gestire per ogni lingua -->
    Il tuo browser non supporta il video.
  </video>
</template>



<style scoped lang="scss">
h1 {
  color: $color-primary;
  font-size: 4.5rem;
  letter-spacing: 0.1rem;
  text-align: center;
  margin-top: 10vh;
}

h2 {
  font-size: 1.7rem;
  text-align: center;
}

// CTA button
.cta-btn {
  background-color: #fe8551;
  color: $color-white;
  font-family: $font-family-base;
  font-weight: $font-weight-bold;
  font-size: 1.2rem;
  padding: 0.9rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: $color-primary;
    transform: scale(1.05);
  }
}

// video sotto il button CTA
.hero-video {
  display: block;
  width: 60%;
  aspect-ratio: 16 / 9;
  margin: 60px auto 0;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); // ombra morbida
  object-fit: cover; // x copertina img

  @media (max-width: $breakpoint-md) {
    width: 90%;
    display: block;
  }
}
</style>