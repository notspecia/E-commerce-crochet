<script setup lang="ts">
import { useRouter } from 'vue-router';

/* USEROUTER */
const router = useRouter();
// const route = useRoute();

// Check for success query parameter against order completion from stripe
// const success = route.query.success === 'true'
</script>


<template>
  <!-- H1 FOR SEO FRIENDLY -->
  <h1 class="visually-hidden">Giogi Crochet pupazzi uncinetto</h1>
  <div class="header">
    <!-- mobile -->
    <img src="/images/giogi-header-mobile.png" alt="Giogi Crochet – logo del sito" class="header-mobile" />
    <!-- desktop -->
    <div class="header-desktop">
      <img src="/images/giogi-header-desktop-label.png" class="label" alt="Testo hero" />
      <img src="/images/giogi-header-desktop-figure.png" class="figure" alt="Figura persona con animale" />
    </div>
  </div>

  <h2 class="mt-5">{{ $t('home.subtitle') }}</h2>
  <div class="text-center mt-5">
    <button class="btn btn-one" @click="() => router.push(`/products`)">{{ $t('home.CTA') }}</button>
  </div>
  <!-- video crochet creazione di giogis -->
  <!-- <video class="hero-video" autoplay="true" controls loop poster="/images/logos/giogi-mascotte-logo.png" muted>
    <source src="https://www.pexels.com/download/video/5899752/" type="video/mp4" />
    TODO fallback testo se il video non parte errore da gestire per ogni lingua
  Il tuo browser non supporta il video.
  </video> -->
</template>


<style scoped lang="scss">
// header immagini hero MOBILE
.header-mobile {
  width: 80vw;
  display: block;
  margin: 0 auto;

  @media (min-width: $breakpoint-sm) {
    display: none;
  }
}

// header immagini hero DESKTOP
.header-desktop {
  display: none;

  @media (min-width: $breakpoint-sm) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 0 auto;
    width: 33vw;

    img {
      width: 100%;
      height: auto;

      // &.label {}

      &.figure {
        width: 30%;
      }
    }
  }
}


h2 {
  font-size: 1.7rem;
  font-family: $font-family-hand;
  text-align: center;

  @media (max-width: $breakpoint-lg) {
    font-size: 1.4rem;
  }
}

// // video sotto il button CTA
// .hero-video {
//   display: block;
//   width: 60%;
//   aspect-ratio: 16 / 9;
//   margin: 60px auto 0;
//   border-radius: 10px;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); // ombra morbida
//   object-fit: cover; // x copertina img

//   @media (max-width: $breakpoint-md) {
//     width: 90%;
//     display: block;
//   }
// }</style>