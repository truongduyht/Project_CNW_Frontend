<script setup>
import { authenticationStore } from "../../../stores/authenticationStore";
import ModalUpdateUser from "./ModalUpdateUser/ModalUpdateUser.vue";

const isShowModalUpdate = ref(false);
const dataModalUpdate = ref({});

const handleUpdate = async (data) => {
  isShowModalUpdate.value = true;
  dataModalUpdate.value = data;
};
const closeModalUpdate = () => {
  isShowModalUpdate.value = false;
};
</script>

<template>
  <div>
    <div class="profile d-flex justify-content-center">
      <div class="row w-100">
        <div
          class="col-lg border border-danger border-3 border-start-0 border-top-0 border-bottom-0"
        >
          <div
            class="d-flex flex-column justify-content-around align-items-center h-75"
          >
            <div class="border border-2 border-danger w-25"></div>
            <div class="title fs-1">Hồ Sơ</div>
            <div>
              <div>
                Họ và tên: {{ authenticationStore()?.getUser()?._HoTen || "" }}
              </div>
              <div class="">
                Số điện thoại:
                {{ authenticationStore()?.getUser()?._SoDienThoai || "" }}
              </div>
              <div class="">
                Địa Chỉ:
                {{ authenticationStore()?.getUser()?._DiaChi || "" }}
              </div>
            </div>
            <div>
              <button
                class="btn btn-sm border border-primary"
                @click="() => handleUpdate()"
              ></button>
              <ModalUpdateUser
                :isShowModalUpdate="isShowModalUpdate"
                :closeModalUpdate="closeModalUpdate"
                :dataModalUpdate="dataModalUpdate"
                :fetchData="fetchData"
              />
            </div>
          </div>
        </div>
        <div class="col-lg">
          <div
            class="d-flex justify-content-center text-center align-items-center"
          >
            <img class="rounded-4" src="/public/images/profile.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  min-height: 80vh;
  padding: 100px;
}

.title {
  font-weight: 700;
  font-size: 25px;
}
</style>
