<script setup>
import { ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import { Modal } from "ant-design-vue";
import Service from "../../../../service/api.js";

const props = defineProps({
  closeModalUpdate: Function,
  fetchData: Function,
  isShowModalUpdate: Boolean,
  dataModalUpdate: Object,
});

const dataUpdate = ref({
  id: "",
  TenNXB: "",
  DiaChi: "",
});

const confirmLoading = ref(false);

watchEffect(() => {
  dataUpdate.value.id = props.dataModalUpdate._id || "";
  dataUpdate.value.TenNXB = props.dataModalUpdate.TenNXB || "";
  dataUpdate.value.DiaChi = props.dataModalUpdate.DiaChi || "";
});

const handleClose = () => {
  props.closeModalUpdate();
};

const handleSuccess = async () => {
  confirmLoading.value = true;

  try {
    const updateData = {
      id: dataUpdate.value.id,
      TenNXB: dataUpdate.value.TenNXB,
      DiaChi: dataUpdate.value.DiaChi,
    };

    const res = await Service.update_Publish(updateData);

    if (res && res.data && res.data.EC === 0) {
      toast.success("Cập nhật nhà xuất bản thành công.");
      props.fetchData();
      handleClose();
    } else {
      toast.error(res.data.EM);
    }
  } catch (error) {
    console.error("Error while updating publisher:", error);
    toast.error("Có lỗi xảy ra khi cập nhật.");
  } finally {
    confirmLoading.value = false;
  }
};
</script>

<template>
  <div>
    <a-modal
      :visible="isShowModalUpdate"
      title="Cập Nhật Nhà Xuất Bản"
      @ok="handleSuccess"
      @cancel="handleClose"
      :style="{ top: '10px' }"
      :width="900"
      :confirmLoading="confirmLoading"
    >
      <div>
        <div class="mb-3">
          <label class="form-label">Tên Nhà Xuất Bản</label>
          <input v-model="dataUpdate.TenNXB" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Địa Chỉ</label>
          <input v-model="dataUpdate.DiaChi" type="text" class="form-control" />
        </div>
      </div>
    </a-modal>
  </div>
</template>
