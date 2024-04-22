<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { toast } from "vue3-toastify";
import Service from "../../../service/api";
import { useRouter } from "vue-router";
import { authenticationStore } from "../../../stores/authenticationStore";
const confirmLoading = ref(false);
const router = useRouter();

const authenticaiton = authenticationStore();

const props = defineProps({
  isShowModalLogin: Boolean,
  closeModalLogin: Function,
});

const dataLoginUser = ref({
  SoDienThoai: "",
  Password: "",
});

const validate = () => {
  if (!dataLoginUser.value.SoDienThoai) {
    toast.error("Nhập thiếu số điện thoại !!!");
    return false;
  }
  if (!dataLoginUser.value.Password) {
    toast.error("Nhập thiếu Password!!!");
    return false;
  }

  return true;
};

const handleCancel = () => {
  dataLoginUser.value = {};
  props.closeModalLogin();
};

const handleSucces = async () => {
  const validated = validate();
  if (!validated) {
    return;
  }
  const res = await Service.login_AUTHENTICATION(dataLoginUser.value);
  if (res && res.data.EC === 0 && res.data.DT.token) {
    useToast().success(res.data.EM);
    handleCancel();

    authenticaiton.setUserAndLogin(res.data.DT.tokentData);

    if (res.data.DT.tokentData.Role === "admin") {
      router.push("/admin-home");
    } else if (res.data.DT.tokentData.Role === "nhan_vien") {
      router.push("/staff-home");
    } else {
      router.push("/");
    }
  } else {
    useToast().success(res.data.EM);
  }
};
</script>

<template>
  <div>
    <a-modal
      :open="isShowModalLogin"
      :confirm-loading="confirmLoading"
      @ok="handleSucces"
      @cancel="handleCancel"
      title="Đăng nhập"
      okText="Đăng nhập"
    >
      <div class=" ">
        <form>
          <div class="my-3">
            <label class="label">Số Điện Thoại</label>
            <input
              v-model="dataLoginUser.SoDienThoai"
              type="text"
              class="form-control"
            />
          </div>
          <div class="my-3">
            <label class="label">Password</label>
            <input
              v-model="dataLoginUser.Password"
              type="password"
              class="form-control"
            />
          </div>
        </form>
      </div>
    </a-modal>
  </div>
</template>
