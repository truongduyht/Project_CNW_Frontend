<script setup>
import { IconStar, IconStarFilled } from "@tabler/icons-vue";
import { ref } from "vue";

const props = defineProps({
  name: String,
  price: Number,
  url: String,
});

const value = ref(4);
</script>

<template>
  <div class="border rounded border-black">
    <div class="cardImage text-center border rounded-top">
      <img
        :src="props?.url"
        alt="notFound"
        height="190"
        width="180"
        class="object-fit-cover"
      />
    </div>
    <div
      class="text-center border-top border-3 cardBody text-dark text-decoration-none"
    >
      <div class="text-decoration-none text-truncate overflow-hidden">
        {{ props?.name }}
      </div>
      <div class="red">{{ props?.price?.toLocaleString("vi-VN") }} đ</div>
    </div>
  </div>
</template>

<style>
.cardImage {
  background-color: #000000;
}

.cardBody {
  padding: 10px;
}
</style>
