<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { InputNumber, Upload } from "ant-design-vue";
import Service from "../../../../service/api.js";
import { toast } from "vue3-toastify";

const props = defineProps({
  closeModalUpdate: Function,
  fetchData: Function,
  isShowModalUpdate: Boolean,
  dataModalUpdate: Object,
});

const dataUpdate = ref({
  id: "",
  TenSach: "",
  DonGia: 0,
  SoQuyen: 0,
  NamXB: "",
  TheLoai: "",
  TacGia: "",
  TenNXB: "",
  AnhSach: "",
});
const confirmLoading = ref(false);

const imagePage = ref("");

watchEffect(() => {
  dataUpdate.value.id = props.dataModalUpdate._id || "";
  dataUpdate.value.TenSach = props.dataModalUpdate.TenSach || "";
  dataUpdate.value.TheLoai = props.dataModalUpdate.TheLoai || "";
  dataUpdate.value.DonGia = props.dataModalUpdate.DonGia || "";
  dataUpdate.value.SoQuyen = props.dataModalUpdate.SoQuyen || "";
  dataUpdate.value.NamXB = props.dataModalUpdate.NamXB || "";
  dataUpdate.value.TacGia = props.dataModalUpdate.TacGia || "";
  dataUpdate.value.TenNXB = props.dataModalUpdate.TenNXB || "";
  dataUpdate.value.AnhSach = props.dataModalUpdate.AnhSach || "";
  // Cập nhật các biến ref khác tương tự ở đây
  imagePage.value = props.dataModalUpdate.AnhSach || "";
});

// Xử lí hình ảnh
const handleChangeImage = (info) => {
  const file = info.file.originFileObj;
  dataUpdate.value.AnhSach = file;
};

// Goi API thanh cong xóa dữ liệu và đóng đi
const handleClose = () => {
  props.closeModalUpdate();
};

// Xử lí submit FORM
const handleSucces = async () => {
  try {
    const formData = new FormData();
    formData.append("id", dataUpdate.value.id);
    formData.append("TenSach", dataUpdate.value.TenSach);
    formData.append("DonGia", parseInt(dataUpdate.value.DonGia, 10));
    formData.append("SoQuyen", parseInt(dataUpdate.value.SoQuyen, 10));
    formData.append("NamXB", dataUpdate.value.NamXB);
    formData.append("TacGia", dataUpdate.value.TacGia);
    formData.append("TheLoai", dataUpdate.value.TheLoai);
    formData.append("TenNXB", dataUpdate.value.TenNXB);
    formData.append("AnhSach", dataUpdate.value.AnhSach);
    confirmLoading.value = true;
    const res = await Service.update_Book(formData);
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
      title="Cập nhật sách "
      @ok="handleSucces"
      @cancel="closeModalUpdate"
      :style="{ top: '10px' }"
      :width="900"
    >
      <form>
        <div class="d-none">
          <input v-model="dataUpdate.id" />
        </div>
        <div class="mb-3">
          <label class="form-label">Nhập tên sách</label>
          <input
            v-model="dataUpdate.TenSach"
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Tác giả</label>
          <input v-model="dataUpdate.TacGia" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Nhà xuất bản</label>
          <input v-model="dataUpdate.TenNXB" type="text" class="form-control" />
        </div>
        <div class="mb-3 row">
          <div class="col-6">
            <label class="form-label">Năm xuất bản</label>
            <input v-model="dataUpdate.NamXB" class="form-control" />
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
          </div>
        </div>

        <div class="mt-3 row">
          <div class="col mt-3">
            <div class="d-flex">
              <div
                class="border mx-3 rounded d-flex justify-content-center align-items-center"
              >
                <img :src="imagePage" height="100" width="100" alt="notFound" />
              </div>

              <Upload
                v-model="AnhSach"
                @change="handleChangeImage"
                list-type="picture-card"
                :max-count="1"
                :multiple="false"
              >
                <div>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </div>
          </div>
          <div class="col">
            <label class="form-label">Giá</label>
            <input
              v-model="dataUpdate.DonGia"
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
        </div>
      </form>
    </a-modal>
  </div>
</template>
