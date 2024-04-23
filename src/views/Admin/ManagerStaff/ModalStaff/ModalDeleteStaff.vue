<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { InputNumber, Upload } from "ant-design-vue";
import Service from "../../../../service/api.js";
import { toast } from "vue3-toastify";

const props = defineProps({
  isShowModalDeleteStaff: Boolean,
  closeModalDeleteStaff: Function,
  fetchData: Function,
  dataModalDelete: Object,
});

const _id = ref("");
const HoTen = ref("");
const confirmLoading = ref(false);

// Goi API thanh cong xóa dữ liệu và đóng đi
const handleClose = () => {
  props.closeModalDeleteStaff();
};

watchEffect(() => {
  _id.value = props.dataModalDelete._id;
  HoTen.value = props.dataModalDelete.HoTen;
});

// Xử lí submit FORM
const handleSucces = async () => {
  const res = await Service.delete_Staff({ id: _id.value });
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
      :open="isShowModalDeleteStaff"
      title="Xóa nhân viên"
      @ok="handleSucces"
      okText="Xóa sách"
      @cancel="handleClose"
      :style="{ top: '10px' }"
      okType="danger"
    >
      <div>
        <div>
          Bạn có chắc chắn muốn xóa nhân viên:
          {{ HoTen || "" }}
        </div>
        <div>Hành động không thể hoàn tác !!!</div>
      </div>
    </a-modal>
  </div>
</template>
