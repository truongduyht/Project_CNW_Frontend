<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useToast } from "vue-toastification";
import Service from "../../../service/api";

const confirmLoading = ref(false);

const props = defineProps({
  isShowModalRegister: Boolean,
  closeModalRegister: Function,
});
const dataUser = ref({
  HoTen: "",
  DiaChi: "",
  SoDienThoai: "",
  Password: "",
});
const confirmPassword = ref("");

const validate = () => {
  if (!dataUser.value.HoTen) {
    toast.error("Nhập thiếu họ tên!!!");
    return false;
  }
  if (!dataUser.value.SoDienThoai) {
    toast.error("Nhập thiếu số điện thoại!!!");
    return false;
  }
  if (!dataUser.value.DiaChi) {
    toast.error("Nhập thiếu địa chỉ!!!");
    return false;
  }
  if (!dataUser.value.Password) {
    toast.error("Nhập thiếu password!!!");
    return false;
  }
  if (!confirmPassword.value) {
    toast.error("Nhập thiếu ConfirmPassword !!!");
    return false;
  }
  if (dataUser.value.Password !== confirmPassword.value) {
    toast.error("Mật khẩu và xác nhận mật khẩu không khớp !!!");
    return false;
  }
  return true;
};

const handleSucces = async () => {
  const validated = validate();

  if (!validated) {
    return;
  }

  const res = await Service.register_AUTHENTICATION(dataUser.value);
  if (res && res.data.EC === 0 && res.data.DT._id) {
    useToast().success(res.data.EM);
    handleCancel();
  } else {
    useToast().success(res.data.EM);
  }
};

const handleCancel = async () => {
  dataUser.value = "";
  confirmPassword.value = "";
  props.closeModalRegister();
};
</script>
<template>
  <div>
    <a-modal
      class="fs-1"
      :open="isShowModalRegister"
      :confirm-loading="confirmLoading"
      @ok="handleSucces"
      title="Đăng ký"
      @cancel="handleCancel"
      okText="Đăng ký"
    >
      <div class=" ">
        <form>
          <div class="my-3">
            <label class="label">Họ và tên</label>
            <input v-model="dataUser.HoTen" type="text" class="form-control" />
          </div>
          <div class="my-3">
            <label class="label">Số điện thoại</label>
            <input
              v-model="dataUser.SoDienThoai"
              type="text"
              class="form-control"
            />
          </div>
          <div class="my-3">
            <label class="label">Địa chỉ</label>
            <input v-model="dataUser.DiaChi" type="text" class="form-control" />
          </div>
          <div class="my-3">
            <label class="label">Password</label>
            <input
              v-model="dataUser.Password"
              type="password"
              class="form-control"
            />
          </div>
          <div class="my-3">
            <label class="label">Nhập lại Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              class="form-control"
            />
          </div>
        </form>
      </div>
    </a-modal>
  </div>
</template>

<style></style>
