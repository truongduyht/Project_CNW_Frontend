<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import { Modal, InputNumber, Upload } from "ant-design-vue";
import Service from "../../../../service/api.js";

const props = defineProps({
  closeModalUpdate: Function,
  fetchData: Function,
  isShowModalUpdate: Boolean,
  dataModalUpdate: Object,
});

const dataUpdate = ref({
  id: "",
  TenSach: "",
  MaNXB: "",
  TheLoai: "",
  TacGia: "",
  NamXB: "",
  AnhSach: "",
  DonGia: 0,
  SoQuyen: 0,
});
const listPublish = ref([]);

const confirmLoading = ref(false);
const imagePage = ref("");
watchEffect(() => {
  dataUpdate.value.id = props.dataModalUpdate._id || "";
  dataUpdate.value.MaNXB = props.dataModalUpdate.MaNXB || "";
  dataUpdate.value.TacGia = props.dataModalUpdate.TacGia || "";
  dataUpdate.value.DonGia = props.dataModalUpdate.DonGia || "";
  dataUpdate.value.SoQuyen = props.dataModalUpdate.SoQuyen || "";
  dataUpdate.value.TheLoai = props.dataModalUpdate.TheLoai || "";
  dataUpdate.value.TenSach = props.dataModalUpdate.TenSach || "";
  dataUpdate.value.NamXB = props.dataModalUpdate.NamXB || "";
  imagePage.value = props.dataModalUpdate.AnhSach || "";
});

// Xử lí hình ảnh
const handleChangeImage = (info) => {
  const file = info.file.originFileObj;
  dataUpdate.value.AnhSach = file;
};
const handleClose = () => {
  props.closeModalUpdate();
};

const fetchData = async () => {
  const data = await Service.getAll_Publish();
  if (data && data.data.EC === 1) {
    listPublish.value = data.data.DT;
  }
};
onMounted(() => {
  fetchData();
});
const handleSuccess = async () => {
  confirmLoading.value = true;

  try {
    const updateData = {
      id: dataUpdate.value.id,
      TenSach: dataUpdate.value.TenSach,
      MaNXB: dataUpdate.value.MaNXB,
      TacGia: dataUpdate.value.TacGia,
      DonGia: dataUpdate.value.DonGia,
      SoQuyen: dataUpdate.value.SoQuyen,
      NamXB: dataUpdate.value.NamXB,
      TheLoai: dataUpdate.value.TheLoai,
      AnhSach: dataUpdate.value.AnhSach,
    };
    console.log("--------trước", updateData);
    const res = await Service.update_Book(updateData);

    if (res && res.data && res.data.EC === 0) {
      toast.success("Cập nhật nhà xuất bản thành công.");
      props.fetchData();
      handleClose();
      console.log("---------sau", res);
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
      :open="isShowModalUpdate"
      title="Cập nhật  sách "
      @ok="handleSuccess"
      @cancel="closeModalUpdate"
      :style="{ top: '10px' }"
      :width="900"
    >
      <form>
        <div class="mb-3">
          <label class="form-label">Nhập tên sách</label>
          <input
            v-model="dataUpdate.TenSach"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Tác Giả </label>
          <input v-model="dataUpdate.TacGia" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Nhà Xuất Bản</label>
          <a-select
            ref="select"
            v-model="dataUpdate.MaNXB"
            style="width: 853px"
          >
            <a-select-option
              v-for="item in listPublish"
              :value="item._id"
              :key="item._id"
            >
              {{ item.TenNXB }}</a-select-option
            >
          </a-select>
        </div>

        <div class="mt-3 row">
          <div class="col-6">
            <label class="form-label">Năm Xuất Bản</label>
            <input
              v-model="dataUpdate.NamXB"
              type="text"
              class="form-control"
            />
            <label class="form-label">Số lượng sách</label>
            <input
              v-model="dataUpdate.SoQuyen"
              type="text"
              class="form-control"
            />
          </div>
          <div class="col-6">
            <label class="form-label">Thể loại</label>
            <select v-model="dataUpdate.TheLoai" class="form-select">
              <option value="kinh tế">Kinh tế</option>
              <option value="tôn giáo">Tôn giáo</option>
              <option value="tiểu thuyết">Tiểu thuyết</option>
              <option value="truyện ngắn">Truyện ngắn</option>
              <option value="truyện cười">Truyện cười</option>
              <option value="sức khỏe">Sức khỏe</option>
            </select>

            <label class="form-label">Đơn Giá</label>
            <input
              v-model="dataUpdate.DonGia"
              type="text"
              class="form-control"
            />
          </div>
        </div>
      </form>
    </a-modal>
  </div>
</template>
