<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { InputNumber, Upload } from "ant-design-vue";
import Service from "../../../../service/api.js";
import { toast } from "vue3-toastify";

const props = defineProps({
  closeModalDelete: Function,
  fetchData: Function,
  isShowModalDelete: Boolean,
  dataModalDelete: Object,
});

const id = ref("");
const TenNXB = ref("");
const confirmLoading = ref(false);

// Goi API thanh cong xóa dữ liệu và đóng đi
const handleClose = () => {
  props.closeModalDelete();
};

watchEffect(() => {
  id.value = props.dataModalDelete._id;
  TenNXB.value = props.dataModalDelete.TenNXB;
});

// Xử lí submit FORM
const handleSucces = async () => {
  const res = await Service.delete_Publish({ id: id.value });
  if (res && res.data.EC === 0) {
    toast.success(res.data.EM);
    handleClose();
    props.fetchData();
  } else {
    toast.error(res.data.EM);
  }
};
</script>

<template>
  <div>
    <a-modal
      :open="isShowModalDelete"
      title="Xóa Nhà Xuất Bản"
      @ok="handleSucces"
      okText="Xóa nhà xuất bản"
      @cancel="handleClose"
      :style="{ top: '10px' }"
      okType="danger"
    >
      <div>
        <div>
          Bạn có chắc chắn muốn xóa :
          {{ TenNXB || "" }}
        </div>
        <div>Hành động không thể hoàn tác !!!</div>
      </div>
    </a-modal>
  </div>
</template>
