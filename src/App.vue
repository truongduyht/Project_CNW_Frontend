<script setup>
import { onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Service from "./service/api";
import { authenticationStore } from "./stores/authenticationStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authenticaiton = authenticationStore();

const handleFetchProfilePinia = async () => {
  const res = await Service.fetchProfile_AUTHENTICATION();
  authenticaiton.setLoading(false);
  console.log("fetchProfile", res);
  if (res && res.data.EC === 0) {
    authenticaiton.setUserAndLogin(res.data.DT);
    authenticaiton.setIsLogin(true);
  }
};

onMounted(() => {
  handleFetchProfilePinia();
});
</script>

<template>
  <div>
    <component :is="$route.meta.layout">
      <router-view />
    </component>
  </div>
</template>

<style></style>
