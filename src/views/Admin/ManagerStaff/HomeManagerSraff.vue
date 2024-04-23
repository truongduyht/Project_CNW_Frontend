<script setup>
import { IconRotateClockwise, IconTrash } from "@tabler/icons-vue";
import { IconEdit } from "@tabler/icons-vue";
import { onMounted, ref, watch } from "vue";
import { computed } from "vue";
import axios from "axios";

import ModalAddStaff from "./ModalStaff/ModalAddStaff.vue";
import ModalDeleteStaff from "./ModalStaff/ModalDeleteStaff.vue";

import Service from "../../../service/api";

const isShowModalAddStaff = ref(false);
const isShowModalDeleteStaff = ref(false);
const dataModalDelete = ref({});

const listStaff = ref([]);
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

// MODAL DELETE Staff
const handleDeleteStaff = async (data) => {
  isShowModalDeleteStaff.value = true;
  dataModalDelete.value = data;
};
const closeModalDeleteStaff = (data) => {
  isShowModalDeleteStaff.value = false;
};

// MODAL ADD Staff
const handleAddStaff = async () => {
  isShowModalAddStaff.value = true;
};
const closeModalAddStaff = () => {
  isShowModalAddStaff.value = false;
};
const columns = [
  {
    title: "Tên nhân viên",
    dataIndex: "HoTen",
    key: "HoTen",
  },
  {
    title: "Số điện thoại",
    dataIndex: "SoDienThoai",
    key: "SoDienThoai",
  },
  {
    title: "Địa chỉ",
    dataIndex: "DiaChi",
    key: "DiaChi",
  },
  {
    title: "Ngày thêm",
    dataIndex: "createdAt",
    key: "createdAt",
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
  const data = await Service.readPanigation_Staff(
    `?page=${+current.value}&limit=${+pageSize.value}&sort=-createdAt`
  );

  if (data && data.data.EC === 0 && data.data.DT.pagination.length > 0) {
    listStaff.value = data.data.DT.pagination;
    total.value = data.data.DT?.meta?.total;
    console.log(data.data);
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
        @click="handleAddStaff"
        class="btn btn-primary border border-primary"
      >
        Thêm Nhân Viên
      </button>
    </div>
    <a-table
      :dataSource="listStaff"
      :columns="columns"
      bordered
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <!-- Action -->
        <template v-if="column.key === 'action'">
          <div class="d-flex">
            <div class="mx-3 poiter">
              <IconTrash
                @click="() => handleDeleteStaff(record)"
                :style="{ color: 'red' }"
              />
            </div>
          </div>
        </template>
      </template>
    </a-table>

    <ModalAddStaff
      :isShowModalAddStaff="isShowModalAddStaff"
      :closeModalAddStaff="closeModalAddStaff"
      :fetchData="fetchData"
    />
    <ModalDeleteStaff
      :isShowModalDeleteStaff="isShowModalDeleteStaff"
      :closeModalDeleteStaff="closeModalDeleteStaff"
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
: {}: {}: any: { current: number; pageSize: number; total: number; }
