<script setup>
import { IconShoppingCart } from "@tabler/icons-vue";
import { computed, ref, watch, watchEffect } from "vue";
import Service from "../../../service/api";
import { authenticationStore } from "../../../stores/authenticationStore";

const profile = ref({});
const data = ref([]);

const fetchData = async () => {
  try {
    const res = await Service.readPanigation_Cart(
      `?IdUser=${profile?.value?._id}`
    );

    if (res && res.data.EC === 0) {
      data.value = res.data.DT;
    }
  } catch (error) {
    console.log("error", error);
  }
};

watchEffect(() => {
  const authentication = authenticationStore();
  profile.value = authentication.getUser();
  fetchData();
});

const numberItem = ref(0);

watch(
  () => data.value,
  () => {
    numberItem.value = data.value.length;
  }
);
</script>

<template>
  <div class="mx-4 cart">
    <router-link to="/cart"
      ><IconShoppingCart style="color: white"
    /></router-link>
  </div>
</template>

<style scoped>
.cart {
  position: relative;
}
.numberCart {
  position: absolute;
  top: -13px;
  right: -2px;
}
</style>
