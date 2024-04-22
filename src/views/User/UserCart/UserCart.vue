<script setup>
import { IconMoodSmileBeam } from "@tabler/icons-vue";
import { IconTrash } from "@tabler/icons-vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { reactive } from "vue";
import { string } from "vue-types";
import { useRoute, useRouter } from "vue-router";
import Service from "../../../service/api";
import { authenticationStore } from "../../../stores/authenticationStore";
import { message } from "ant-design-vue";
import { toast } from "vue3-toastify";

const authentication = authenticationStore();

const profile = ref({});
const IdUser = ref("");
const router = useRouter();
const currentStep = ref(0);
const cart = ref([]);
const isLogin = ref(false);

const HoTen = ref("");
const SoDienThoai = ref(0);
const DiaChi = ref("");

const getProfilePinia = () => {
  const authentication = authenticationStore();
  profile.value = authentication?.getUser();
  isLogin.value = authentication?.getStateLogin();
  return { profile, isLogin };
};

const fetchData = async () => {
  try {
    const res = await Service.readPanigation_Cart(
      `?IdUser=${profile.value._id}`
    );
    if (res && res.data.EC === 0) {
      cart.value = res.data.DT;
    }
  } catch (error) {
    console.log("error", error);
  }
};

watch(() => {
  profile.value = authentication.getUser();
  HoTen.value = profile.value._HoTen;
  SoDienThoai.value = profile.value._SoDienThoai;
  fetchData();
});

const totalSumPrice = computed(() => {
  if (cart.value.length > 0) {
    return cart.value.reduce((total, item) => {
      return (total += item.Quantity * item.IdBook.DonGia);
    }, 0);
  } else {
    return 0;
  }
});

const handleDeleteBook = async (data) => {
  const res = await Service.deleteItem_Cart({
    IdCart: data._id,
  });

  fetchData();
};

// Xử lí current 0
const handleStepsFirst = async () => {
  currentStep.value = 1;
};

const validate = (HoTen, SoDienThoai, DiaChi) => {
  if (!HoTen) {
    toast.error("Thiếu họ tên!!!");
    return false;
  }
  if (!SoDienThoai) {
    toast.error("Thiếu số điện thoại!!!");
    return false;
  }
  if (!DiaChi) {
    toast.error("Thiếu địa chỉ !!!");
    return false;
  }
  return true;
};

// Xử lí current 1
const handleStepsSecond = async () => {
  try {
    const DataUpdateReader = {
      IdUser: profile.value._id,
      HoTen: HoTen.value,
      SoDienThoai: SoDienThoai.value,
      DiaChi: DiaChi.value,
    };

    const DataOrder = cart.value.map((item) => {
      return {
        IdBook: item.IdBook._id,
        Quantity: item.Quantity,
        IdCart: item._id,
        Price: item.IdBook.DonGia,
      };
    });

    if (DataUpdateReader && DataOrder.length > 0) {
      // Validate

      const validateForm = validate(
        DataUpdateReader.HoTen,
        DataUpdateReader.SoDienThoai,
        DataUpdateReader.DiaChi
      );
      if (!validateForm) {
        return;
      }

      const apiOrder = await Service.create_Order({
        DataUpdateReader,
        DataOrder,
      });

      console.log("apiOrder", apiOrder);

      if (apiOrder && apiOrder.data.EC === 0) {
        message.success("Đặt hàng thành công");
        currentStep.value = 2;
        fetchData();
      } else {
        toast.error(apiOrder.data.EM);
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Xử lí current 2
const handleStepsThird = async () => {
  router.push("/order");
};

const handleUpdateNumbetApi = async (IdCart, Quantity) => {
  const res = await Service.updateNumBer_Cart({
    IdCart: IdCart,
    Quantity: Quantity,
  });

  fetchData();
};

// Thay đổi input number
const handleUpdateNumber = (item, newQuantity) => {
  handleUpdateNumbetApi(item._id, newQuantity);
};
</script>

<template>
  <div class="min-vh-100 border bg-light">
    <div class="row m-5">
      <a-steps
        :current="currentStep"
        size="small"
        :items="[
          {
            title: 'Đơn mượn sách',
          },
          {
            title: 'Mượn sách',
          },
          {
            title: 'Thành công',
          },
        ]"
      ></a-steps>
    </div>

    <div>
      <div v-if="cart <= 0 && currentStep < 2">
        <a-empty />
      </div>
      <div v-else>
        <div class="row m-5" style="min-height: 22vh" v-if="currentStep === 0">
          <div class="col-lg-8">
            <div
              class="d-flex flex-wrap justify-content-between align-items-center border mb-4 rounded bg-white"
              v-for="item in cart"
              :key="item._id"
            >
              <div class="image-container">
                <img
                  :src="item?.IdBook?.AnhSach"
                  alt="notFound"
                  class="centered-image ps-2"
                />
              </div>
              <div class="nameWidth">{{ item?.IdBook?.TenSach }}</div>
              <div>
                {{ item?.IdBook?.DonGia?.toLocaleString("vi-VN") || 0 }} đ
              </div>
              <div>
                <a-input
                  :value="item?.Quantity"
                  @update:value="
                    (newQuantity) => handleUpdateNumber(item, newQuantity)
                  "
                />
              </div>
              <div>
                Tổng :
                {{
                  (item?.IdBook?.DonGia * item?.Quantity).toLocaleString(
                    "vi-VN"
                  ) || 0
                }}đ
              </div>
              <div>
                <IconTrash
                  class="poiter mx-3"
                  style="color: red"
                  @click="() => handleDeleteBook(item)"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="bg-white rounded p-4 border">
              <div class="d-flex justify-content-between align-items-center">
                <div>Tổng tiền</div>
                <div class="price fs-3">
                  {{ totalSumPrice?.toLocaleString("vi-VN") || 0 }} đ
                </div>
              </div>
              <hr />
              <div class="text-center">
                <button
                  class="px-5 border btn btn-primary text-white"
                  @click="handleStepsFirst"
                >
                  Xác nhận mượn
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row m-5" style="min-height: 22vh" v-if="currentStep === 1">
          <div class="col-lg-8">
            <div
              class="d-flex flex-wrap justify-content-around align-items-center border mb-4 rounded bg-white"
              v-for="item in cart"
              :key="item._id"
            >
              <div class="image-container">
                <img
                  :src="item?.IdBook?.AnhSach"
                  alt="notFound"
                  class="centered-image"
                />
              </div>
              <div class="nameWidth">{{ item?.IdBook?.TenSach }}</div>
              <div>
                {{ item?.IdBook?.DonGia.toLocaleString("vi-VN") || 0 }} đ
              </div>
              <div>
                <a-input-number
                  :value="item?.Quantity"
                  :min="1"
                  :max="100"
                  :disabled="true"
                />
              </div>
              <div>
                {{
                  (item.IdBook?.DonGia * item.Quantity).toLocaleString(
                    "vi-VN"
                  ) || 0
                }}đ
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bg-white rounded p-4 border">
              <div class="mb-3">
                <label for="" class="form-label">Họ và tên</label>
                <input v-model="HoTen" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Số điện thoại</label>
                <input v-model="SoDienThoai" type="text" class="form-control" />
              </div>
              <div class="form-floating mb-3">
                <textarea
                  rows="3"
                  placeholder="Nhập đia chỉ giao hàng"
                  v-model="DiaChi"
                  class="w-100 rounded"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="text-dark">Thanh toán khi nhận sách</div>
              </div>
              <hr />
              <div class="d-flex justify-content-around align-items-center">
                <div>Tổng tiền</div>
                <div class="price fs-3">
                  {{ totalSumPrice?.toLocaleString("vi-VN") || 0 }} đ
                </div>
              </div>
              <hr />
              <div class="text-center">
                <button
                  class="px-5 btn btn-primary text-white"
                  @click="handleStepsSecond"
                >
                  Đặt mượn sách
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row m-5" style="min-height: 22vh" v-if="currentStep === 2">
          <a-result title="Chúc mừng bạn đã đặt hàng thành công ">
            <template #icon>
              <IconMoodSmileBeam
                :style="{ height: '100px', width: '100px', color: 'blue' }"
              />
            </template>
            <template #extra>
              <a-button type="primary" @click="handleStepsThird"
                >Xem lịch sử</a-button
              >
            </template>
          </a-result>
        </div>
      </div>
    </div>
  </div>
</template>

<style setup>
.image-container {
  width: 100px; /* Độ rộng của khung chứa */
  height: 140px; /* Độ cao của khung chứa */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
}

.centered-image {
  object-fit: cover; /* Điều chỉnh để hình ảnh không bị méo hoặc lệch */
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.poiter {
  cursor: pointer;
}

.nameWidth {
  width: 320px;
}
</style>
