<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useToast } from "vue-toastification";
import Service from "../../../../service/api";

const confirmLoading = ref(false);

const props = defineProps({
  isShowModalAddStaff: Boolean,
  closeModalAddStaff: Function,
});
const dataUser = ref({
  HoTen: "",
  DiaChi: "",
  SoDienThoai: "",
  Password: "",
});

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
  return true;
};

const handleSucces = async () => {
  const validated = validate();

  if (!validated) {
    return;
  }
  confirmLoading.value = true;
  const res = await Service.create_Staff(dataUser.value);
  confirmLoading.value = false;

  if (res && res.data.EC === 0 && res.data.DT._id) {
    useToast().success(res.data.EM);
    handleCancel();
  } else {
    useToast().success(res.data.EM);
  }
};

const handleCancel = async () => {
  dataUser.value = "";
  props.closeModalAddStaff();
};
</script>
<template>
  <div>
    <a-modal
      class="fs-1"
      :open="isShowModalAddStaff"
      :confirm-loading="confirmLoading"
      @ok="handleSucces"
      title="Thêm nhân viên"
      @cancel="handleCancel"
      okText="Thêm nhân viên"
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
        </form>
      </div>
    </a-modal>
  </div>
</template>

<style></style>
