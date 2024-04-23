<script setup>
import { IconShoppingCart, IconUserSquareRounded } from "@tabler/icons-vue";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

import Service from "../../../service/api";

import Cart_Header from "../CartHeader/CartHeader.vue";

import ModalLogin from "../login/ModalLogin.vue";
import ModalRegister from "../Register/ModalRegister.vue";

import { authenticationStore } from "../../../stores/authenticationStore";
const router = useRouter();
const authentication = authenticationStore();
const profile = ref({});
const isLogin = ref(false);

watchEffect(() => {
  profile.value = authentication.getUser();
  isLogin.value = authentication.getStateLogin();
});

const handleLogout = async () => {
  const res = await Service.logout_AUTHENTICATION();
  if (res && res.data.EC === 0) {
    router.push("/");
    toast.success(res.data.EM);
    authentication.logout();
  } else {
    toast.success(res.data.EM);
  }
};

const isShowModalLogin = ref(false);
const isShowModalRegister = ref(false);

const OpenModalLogin = () => {
  isShowModalLogin.value = true;
};
const closeModalLogin = () => {
  isShowModalLogin.value = false;
};

const OpenModalRegister = () => {
  isShowModalRegister.value = true;
};
const closeModalRegister = () => {
  isShowModalRegister.value = false;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-header">
    <div class="container text-white">
      <a class="navbar-brand text-white" href="/">
        <img
          height="50"
          width="50"
          class="border rounded"
          src="https://i.pinimg.com/236x/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.jpg"
          alt=""
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <router-link
              v-if="isLogin === true"
              class="nav-link text-white"
              to="/books"
              >Sách</router-link
            >
            <router-link
              v-else
              class="nav-link text-white"
              to=""
              @click="OpenModalLogin"
              >Sách</router-link
            >
          </li>
          <li class="nav-item mx-3">
            <router-link
              class="nav-link active text-white"
              aria-current="page"
              to="/demo"
              >Giới thiệu</router-link
            >
          </li>
        </ul>
        <div class="d-flex">
          <Cart_Header v-if="isLogin === true" />

          <a-dropdown-button v-if="isLogin === true">
            {{ profile?._HoTen || "" }}
            <template #overlay>
              <a-menu class="text-decoration-none">
                <router-link class="text-decoration-none" to="/profile"
                  ><a-menu-item key="1"> Hồ sơ. </a-menu-item></router-link
                >
                <router-link class="text-decoration-none" to="/order">
                  <a-menu-item key="3">
                    Đơn sách đã mượn.
                  </a-menu-item></router-link
                >
                <a-menu-item key="4">
                  <router-link
                    class="text-decoration-none"
                    to="/"
                    @click="handleLogout"
                    >Đăng xuất</router-link
                  >
                </a-menu-item>
              </a-menu>
            </template>
            <template #icon
              ><IconUserSquareRounded style="margin-bottom: 3px"
            /></template>
          </a-dropdown-button>

          <a-dropdown-button v-else>
            Tài khoản
            <template #overlay>
              <a-menu>
                <a-menu-item key="1"
                  ><div class="text-center">
                    <button
                      @click="OpenModalLogin"
                      class="px-5 btn btn-primary m-auto"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </a-menu-item>

                <a-menu-item key="2">
                  <div>
                    Chưa có tài khoản ?
                    <span class="text-warning" @click="OpenModalRegister"
                      >Đăng ký</span
                    >
                    ngay
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
            <template #icon
              ><IconUserSquareRounded style="margin-bottom: 3px"
            /></template>
          </a-dropdown-button>
        </div>
      </div>
    </div>

    <ModalLogin
      :isShowModalLogin="isShowModalLogin"
      :closeModalLogin="closeModalLogin"
    />

    <ModalRegister
      :isShowModalRegister="isShowModalRegister"
      :closeModalRegister="closeModalRegister"
    />
  </nav>
</template>

<style scoped>
.bg-header {
  background: black;
}
</style>
