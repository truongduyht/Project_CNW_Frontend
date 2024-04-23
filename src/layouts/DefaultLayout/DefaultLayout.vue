<script setup>
import Header from "../../views/Auth/Header/Header.vue";
</script>

<template>
  <div>
    <Header />
    <div>
      <slot></slot>
    </div>
    <footer></footer>
  </div>
</template>
