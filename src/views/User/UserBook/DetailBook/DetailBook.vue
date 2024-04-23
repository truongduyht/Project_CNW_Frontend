<script setup>
import { IconPlus } from "@tabler/icons-vue";
import { IconMinus } from "@tabler/icons-vue";
import { LeftSquareOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import { authenticationStore } from "../../../../stores/authenticationStore";

import Service from "../../../../service/api";

const router = useRouter();
const IdBook = ref(useRoute().params.id);
const authenticaiton = authenticationStore();
const profile = ref({});
const bookDetail = ref({});

watchEffect(() => {
  profile.value = authenticaiton.getUser();
});
const fetchData = async () => {
  const data = await Service.read_Book({ id: IdBook.value });

  if (data && data.data.EC === 0) {
    bookDetail.value = data.data.DT;
  }
};
watchEffect(() => {
  fetchData();
});

const value = ref(5);
const numberBook = ref(1);

const handleMinusNumber = () => {
  if (numberBook.value > 1) {
    numberBook.value -= 1;
  }
};

const handlePlusNumber = () => {
  numberBook.value += 1;
};

// Xử lí thêm vào vỏ hàng

const handleAddCart = async () => {
  const Cart = {
    IdUser: profile.value._id,
    IdBook: bookDetail.value._id,
    Quantity: numberBook.value,
  };
  console.log(Cart);
  const res = await Service.create_Cart(Cart);
  if (res && res.data && res.data.EC === 0) {
    message.success("Thêm vỏ hàng thành công");
  } else {
    message.success(res.data.EM);
  }
};
</script>
<template>
  <div class="min-vh-75 border bg-secondary-subtle">
    <div class="bodyBookDetail positon-relative">
      <div class="ms-4 mt-2">
        <router-link to="/books">
          <button
            class="position-absolute mx-2 btn btn-back"
            @click="handleBackIcon"
          >
            Back
          </button>
        </router-link>
      </div>
      <div class="row">
        <div class="col-5">
          <div class="image-container">
            <img
              :src="bookDetail?.AnhSach"
              alt="notFound"
              class="centered-image"
            />
          </div>
        </div>
        <div class="col-7 py-4 px-4">
          <div class="w-100 h-100 d-flex flex-column justify-content-between">
            <div>
              <div>
                <h4 class="text-dark">
                  {{ bookDetail?.TenSach }}
                </h4>
              </div>
              <div class="mb-2">
                Tác giả :
                <span class="">{{ bookDetail?.TacGia }}</span>
              </div>

              <div class="mb-2">
                Năm xuất bản:
                <span>
                  {{ bookDetail?.NamXB }}
                </span>
              </div>
            </div>
            <div class="p-3 bg-light fs-3 price">
              {{ bookDetail?.DonGia?.toLocaleString("vi-VN") || 0 }} vnd
            </div>
            <div class="d-flex">
              <div>Số lượng</div>
              <div class="d-flex mx-5 gap-3">
                <div class="poiter">
                  <IconMinus @click="handleMinusNumber" />
                </div>
                <div>{{ numberBook }}</div>
                <div class="poiter"><IconPlus @click="handlePlusNumber" /></div>
              </div>
            </div>
            <div class="d-flex">
              <div>
                <button class="btn btn_addCart" @click="handleAddCart">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price {
  color: rgb(0, 0, 0);
  font-weight: 600;
}
.bodyBookDetail {
  background-color: white;
  margin: 50px 80px;
  padding: 15px 0;
}

.image-container {
  width: 400px; /* Độ rộng của khung chứa */
  height: 400px; /* Độ cao của khung chứa */
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-image {
  object-fit: cover; /* Điều chỉnh để hình ảnh không bị méo hoặc lệch */
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.btn_addCart {
  background-color: #ffffff;
  border: 1px solid rgb(0, 0, 0);
  color: #000000;
}

.btn_addCart:hover {
  background-color: #000000;
  color: rgb(255, 255, 255);
}

.btn-back {
  background-color: #ffffff;
  border: 1px solid #000000;
  color: #000000;
}

.btn-back:hover {
  background-color: #000000;
  color: rgb(255, 255, 255);
}

.poiter {
  cursor: pointer;
}
</style>
