<script setup>
import { IconUserSquareRounded } from "@tabler/icons-vue";
import { onMounted, ref, warn, watch, watchEffect } from "vue";
import { authenticationStore } from "../../stores/authenticationStore";
import Service from "../../service/api";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import {
  ClockCircleOutlined,
  BookOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref(false);
const selectedKeys = ref(["1"]);
const router = useRouter();

const profileStaff = ref({});

onMounted(() => {
  profileStaff.value = authenticationStore().getUser();
});

watch(
  () => authenticationStore().getLoading,
  (loading) => {
    const authen = authenticationStore();
    const profile = authen.getUser();
    profileStaff.value = authen.getUser();
    if (loading != true && profile._Role !== "nhan_vien") {
      router.push("/");
    }
  }
);

const handleLogout = async () => {
  const res = await Service.logout_AUTHENTICATION();
  if (res && res.data.EC === 0) {
    router.push("/");
    toast.success(res.data.EM);
    const authentication = authenticationStore();
    authentication.logout();
  } else {
    toast.success(res.data.EM);
  }
};
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <HomeOutlined />
          <span>Home</span>
          <router-link to="/staff-home"></router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <ClockCircleOutlined />
          <span>Xử lý đơn sách</span>
          <router-link to="/staff-order"></router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <BookOutlined />
          <span>Quản lý sách</span>
          <router-link to="/staff-book"></router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <div @click="handleLogout">
            <LogoutOutlined />
            <span>Log out</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="d-flex justify-content-between mx-5">
          <div></div>
          <div>
            <a-dropdown-button>
              {{ profileStaff?._HoTen }}

              <template #icon
                ><IconUserSquareRounded style="margin-bottom: 3px"
              /></template>
            </a-dropdown-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 10px 0"> </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '80vh' }"
        >
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme=""] .site-layout .site-layout-background {
  background: #141414;
}
</style>
