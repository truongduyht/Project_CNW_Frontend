<script setup>
import { ref, onMounted } from "vue";
import { InputNumber, Upload } from "ant-design-vue";
import Service from "../../../../service/api.js";
import { toast } from "vue3-toastify";
import axios from "axios";

const props = defineProps({
  closeModalAdd: Function,
  isShowModalAdd: Boolean,
  fetchData: Function,
});

const listPublish = ref([]);

const TenSach = ref("");
const TacGia = ref("");
const DonGia = ref(0);
const SoQuyen = ref(0);
const TheLoai = ref("");
const NamXB = ref("");
const AnhSach = ref("");
const MaNXB = ref("");

const confirmLoading = ref(false);

// Xử lí hình ảnh
const handleChangeImage = (info) => {
  const file = info.file.originFileObj;
  AnhSach.value = file;
};

// Xử lí chọn thể loại
const handleChangeSelectType = (value) => {
  TheLoai.value = value;
};
const handleChangeSelectMaNXB = (value) => {
  MaNXB.value = value;
};

// Price
const handlePrice = (data) => {
  DonGia.value = data;
};

// Soluong
const handleSoLuong = (data) => {
  SoQuyen.value = data;
};

// Goi API thanh cong xóa dữ liệu và đóng đi
const handleClose = () => {
  TenSach.value = "";
  DonGia.value = 0;
  SoQuyen.value = 0;
  TacGia.value = "";
  NamXB.value = "";
  AnhSach.value = "";
  TheLoai.value = "";
  MaNXB.value = "";
  props.closeModalAdd();
  props.fetchData();
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
console.log(listPublish);
// const res = Service.getAll_Publish();

// Xử lí submit FORM
const handleSucces = async () => {
  // Gọi API create Book

  try {
    const formData = new FormData();
    formData.append("TenSach", TenSach.value);
    formData.append("NamXB", NamXB.value);
    formData.append("DonGia", parseInt(DonGia.value, 10));
    formData.append("SoQuyen", parseInt(SoQuyen.value, 10));
    formData.append("TheLoai", TheLoai.value);
    formData.append("TacGia", TacGia.value);
    formData.append("MaNXB", MaNXB.value);
    formData.append("AnhSach", AnhSach.value);

    confirmLoading.value = true;
    const res = await Service.create_Book(formData);
    confirmLoading.value = false;

    if (res && res.data && res.data.EC === 0) {
      toast.success("Tạo sách thành công");
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
      :open="isShowModalAdd"
      title="Thêm sách "
      :confirm-loading="confirmLoading"
      @ok="handleSucces"
      @cancel="handleClose"
      :style="{ top: '10px' }"
    >
      <form>
        <div class="mb-3">
          <label class="form-label">Nhập tên sách</label>
          <input v-model="TenSach" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Tác giả</label>
          <input v-model="TacGia" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Nhà Xuất Bản</label>
          <a-select
            ref="select"
            v-model="MaNXB"
            style="width: 468px"
            @focus="focus"
            @change="handleChangeSelectMaNXB"
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
        <div class="mb-3 row">
          <div class="col-6">
            <label class="form-label">Năm xuất bản</label>
            <input v-model="NamXB" type="text" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label">Thể loại</label>
            <a-select
              ref="select"
              style="width: 220px"
              v-model="TheLoai"
              :value="TheLoai"
              @change="handleChangeSelectType"
            >
              <a-select-option value="kinh tế">Kinh tế</a-select-option>
              <a-select-option value="tôn giáo">Tôn giáo</a-select-option>
              <a-select-option value="tiểu thuyết">Tiểu thuyết</a-select-option>
              <a-select-option value="truyện ngắn">Truyện ngắn</a-select-option>
              <a-select-option value="truyện cười">Truyện cười</a-select-option>
              <a-select-option value="sức khỏe">Sức khỏe</a-select-option>
            </a-select>
          </div>
        </div>

        <div class="mt-3 row">
          <div class="col">
            <Upload
              v-model="AnhSach"
              @change="handleChangeImage"
              list-type="picture-card"
              :max-count="1"
            >
              <div>
                <div class="ant-upload-text">Upload</div>
              </div>
            </Upload>
          </div>
          <div class="col">
            <label class="form-label">Giá </label>

            <a-input-number
              class="w-100"
              v-model="DonGia"
              :value="DonGia"
              @change="handlePrice"
            />
            <label class="form-label">Số lượng sách</label>
            <InputNumber
              class="w-100"
              @change="handleSoLuong"
              :value="SoQuyen"
              v-model="SoQuyen"
            />
          </div>
        </div>
      </form>
    </a-modal>
  </div>
</template>
