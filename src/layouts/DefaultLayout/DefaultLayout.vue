<script setup>
import Header from "../../views/Auth/Header/Header.vue";
import Footer from "../../views/Auth/Footer/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <div>
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>
