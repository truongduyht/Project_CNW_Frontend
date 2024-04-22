<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import Service from "../../../../service/api.js";
import { toast } from "vue3-toastify";

const props = defineProps({
  closeModalUpdate: Function,
  fetchData: Function,
  isShowModalUpdate: Boolean,
  dataModalUpdate: Object,
});

const dataUpdate = ref({
  IdUser: "",
  HoTen: "",
  SoDienThoai: "",
  DiaChi: "",
});
const confirmLoading = ref(false);

watchEffect(() => {
  dataUpdate.value.IdUser = props.dataModalUpdate._id || "";
  dataUpdate.value.HoTen = props.dataModalUpdate.HoTen || "";
  dataUpdate.value.SoDienThoai = props.dataModalUpdate.SoDienThoai || "";
  dataUpdate.value.DiaChi = props.dataModalUpdate.DiaChi || "";
});

// Goi API thanh cong xóa dữ liệu và đóng đi
const handleClose = () => {
  props.closeModalUpdate();
};

// Xử lí submit FORM
const handleSuccess = async () => {
  try {
    const formData = new FormData();
    formData.append("IdUser", dataUpdate.value.IdUser);
    formData.append("HoTen", dataUpdate.value.HoTen);
    formData.append("SoDienThoai", dataUpdate.value.SoDienThoai);
    formData.append("DiaChi", dataUpdate.value.DiaChi);
    confirmLoading.value = true;
    const res = await Service.update_User(formData);
    confirmLoading.value = false;
    if (res && res.data && res.data.EC === 0) {
      toast.success("Cập nhật sách thành công");
      props.fetchData();
      handleClose();
    } else {
      toast.error(res.data.EM);
    }
  } catch (error) {
    console.log("error >>> ", error);
    return;
  }
};
</script>

<template>
  <div>
    <a-modal
      :open="isShowModalUpdate"
      title="Cập thông tin cá nhân"
      @ok="handleSuccess"
      @cancel="closeModalUpdate"
      :style="{ top: '10px' }"
      :width="900"
    >
      <form>
        <div class="d-none">
          <input v-model="dataUpdate.IdUser" />
        </div>
        <div class="mb-3">
          <label class="form-label">Họ Tên</label>
          <input v-model="dataUpdate.HoTen" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Số Điện Thoại</label>
          <input
            v-model="dataUpdate.SoDienThoai"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Địa Chỉ</label>
          <input v-model="dataUpdate.DiaChi" type="text" class="form-control" />
        </div>
      </form>
    </a-modal>
  </div>
</template>
