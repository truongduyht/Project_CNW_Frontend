<template>
  <div class="">
    <h2 class="text-center">Welcome Back {{ profile?._HoTen }}</h2>
    <img
      style="width: 500px; margin-left: 300px"
      src="../../../../public/images/logoHome/ảnh2.jpg"
      alt=""
    />
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

import { authenticationStore } from "../../../stores/authenticationStore";
const authentication = authenticationStore();
const profile = ref({});
const isLogin = ref(false);

watchEffect(() => {
  profile.value = authentication.getUser();
  isLogin.value = authentication.getStateLogin();
});
</script>

<style scoped></style>
