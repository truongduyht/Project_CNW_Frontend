<script setup>
import { IconRotateClockwise, IconTrash } from "@tabler/icons-vue";
import { IconEdit } from "@tabler/icons-vue";
import { onMounted, ref, watch } from "vue";
import { computed } from "vue";
import axios from "axios";

import ModalAddBook from "./ModalBook/ModalAddBook.vue";
import ModalUpdateBook from "./ModalBook/ModalUpdateBook.vue";
import ModalDeleteBook from "./ModalBook/ModalDeleteBook.vue";

import Service from "../../../service/api";

const isShowModalAdd = ref(false);
const isShowModalUpdate = ref(false);
const dataModalUpdate = ref({});
const isShowModalDelete = ref(false);
const dataModalDelete = ref({});

const listBook = ref([]);
const current = ref(1);
const pageSize = ref(5);
const total = ref(0);

const pagination = computed(() => ({
  current: current.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  pageSizeOptions: ["5", "10", "15"],
}));

// MODAL UPDATE BOOK
const handleUpdate = async (data) => {
  console.log(data);
  isShowModalUpdate.value = true;
  dataModalUpdate.value = data;
};
const closeModalUpdate = () => {
  isShowModalUpdate.value = false;
};

// MODAL DELETE BOOK
const handleDelete = async (data) => {
  isShowModalDelete.value = true;
  dataModalDelete.value = data;
};
const closeModalDelete = (data) => {
  isShowModalDelete.value = false;
};

// MODAL ADD BOOK
const handleAddBook = async () => {
  isShowModalAdd.value = true;
};
const closeModalAdd = () => {
  isShowModalAdd.value = false;
};

const columns = [
  {
    title: "Ảnh",
    dataIndex: "AnhSach",
    key: "AnhSach",
  },
  {
    title: "Tên Sách",
    dataIndex: "TenSach",
    key: "TenSach",
  },
  {
    title: "Nhà Xuất Bản",
    dataIndex: ["MaNXB", "TenNXB"],
    key: "TenNXB",
  },
  {
    title: "Thể Loại ",
    dataIndex: "TheLoai",
    key: "TheLoai",
  },
  {
    title: "Giá ",
    dataIndex: "DonGia",
    key: "DonGia",
  },
  {
    title: "Số Quyển",
    dataIndex: "SoQuyen",
    key: "SoQuyen",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];

const handleTableChange = (data) => {
  if (data) {
    current.value = data.current;
    pageSize.value = data.pageSize;
    total.value = data.total;
  }
};

// Xử lí Gọi API và phân trang

const fetchData = async () => {
  const data = await Service.readPanigate_Book(
    `?page=${+current.value}&limit=${+pageSize.value}&sort=-createdAt`
  );

  if (data && data.data.EC === 0 && data.data.DT.pagination.length > 0) {
    listBook.value = data.data.DT.pagination;
    total.value = data.data.DT?.meta?.total;
    console.log(listBook);
  }
};

onMounted(() => {
  fetchData();
});

watch(
  [current, pageSize],
  () => {
    fetchData();
  },
  { immediate: true }
);
</script>

<template>
  <div class="CRUD">
    <div class="d-flex justify-content-between pb-4 my-2">
      <button
        @click="handleAddBook"
        class="btn btn-primary border border-primary"
      >
        Thêm Sách
      </button>
    </div>
    <a-table
      :dataSource="listBook"
      :columns="columns"
      bordered
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <!-- Ảnh -->
        <template v-if="column.key === 'AnhSach'">
          <div>
            <img
              class="border rounded"
              height="100"
              width="100"
              :src="record?.AnhSach"
              alt="notFound"
            />
          </div>
        </template>

        <!-- Action -->
        <template v-if="column.key === 'action'">
          <div class="d-flex">
            <div class="poiter">
              <IconEdit
                @click="() => handleUpdate(record)"
                :style="{ color: 'blue' }"
              />
            </div>
            <div class="mx-3 poiter">
              <IconTrash
                @click="() => handleDelete(record)"
                :style="{ color: 'red' }"
              />
            </div>
          </div>
        </template>
      </template>
    </a-table>

    <ModalAddBook
      :isShowModalAdd="isShowModalAdd"
      :closeModalAdd="closeModalAdd"
      :fetchData="fetchData"
    />

    <ModalUpdateBook
      :isShowModalUpdate="isShowModalUpdate"
      :closeModalUpdate="closeModalUpdate"
      :dataModalUpdate="dataModalUpdate"
      :fetchData="fetchData"
    />
    <ModalDeleteBook
      :isShowModalDelete="isShowModalDelete"
      :closeModalDelete="closeModalDelete"
      :dataModalDelete="dataModalDelete"
      :fetchData="fetchData"
    />
  </div>
</template>

<style setup>
.poiter {
  cursor: pointer;
}
</style>
