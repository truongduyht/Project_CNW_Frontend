<script setup>
import { ref } from "vue";
import Service from "../../../../service/api.js";
import { useToast } from "vue-toastification";
import { toast } from "vue3-toastify";

const props = defineProps({
  closeModalAdd: Function,
  isShowModalAdd: Boolean,
});

const dataPublish = ref({
  TenNXB: "",
  DiaChi: "",
});

const validate = () => {
  if (!dataPublish.value.TenNXB) {
    toast.error("Nhập thiếu tên nhà xuất bản!!!");
    return false;
  }
  if (!dataPublish.value.DiaChi) {
    toast.error("Nhập thiếu địa chỉ!!!");
    return false;
  }
  return true;
};

// Goi API thanh cong xóa dữ liệu và đóng đi
const handleSucces = async () => {
  const validated = validate();

  if (!validated) {
    return;
  }

  const res = await Service.create_Publish(dataPublish.value);
  if (res && res.data.EC === 0 && res.data.DT._id) {
    useToast().success(res.data.EM);
    handleCancel();
  } else {
    useToast().success(res.data.EM);
  }
};

const handleCancel = async () => {
  dataPublish.value = "";
  props.closeModalAdd();
};
</script>

<template>
  <div>
    <a-modal
      :open="isShowModalAdd"
      title="Thêm nhà xuất bản mới"
      @ok="handleSucces"
      @cancel="handleCancel"
      :style="{ top: '10px' }"
    >
      <form>
        <div class="mb-3">
          <label class="form-label">Nhập Tên Nhà Xuất Bản</label>
          <input
            v-model="dataPublish.TenNXB"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Địa Chỉ</label>
          <input
            v-model="dataPublish.DiaChi"
            type="text"
            class="form-control"
          />
        </div>
      </form>
    </a-modal>
  </div>
</template>
