<script setup>
import { IconTrash } from "@tabler/icons-vue";
import { IconEdit } from "@tabler/icons-vue";
import { onMounted, ref, watch } from "vue";
import { computed } from "vue";
import axios from "axios";

import ModalAddPublish from "./ModalPublish/ModalAddPublish.vue";
import ModalUpdatePublish from "./ModalPublish/ModalUpdatePublish.vue";
import ModalDeletePublish from "./ModalPublish/ModalDeletePublish.vue";

import Service from "../../../service/api";

const isShowModalAdd = ref(false);
const isShowModalUpdate = ref(false);
const dataModalUpdate = ref({});
const isShowModalDelete = ref(false);
const dataModalDelete = ref({});

const listPublish = ref([]);
const current = ref(1);
const pageSize = ref(5);
const total = ref(0);

// MODAL UPDATE Publish
const handleUpdate = async (data) => {
  isShowModalUpdate.value = true;
  dataModalUpdate.value = data;
};
const closeModalUpdate = () => {
  isShowModalUpdate.value = false;
};

// MODAL DELETE Publish
const handleDelete = async (data) => {
  isShowModalDelete.value = true;
  dataModalDelete.value = data;
};
const closeModalDelete = (data) => {
  isShowModalDelete.value = false;
};

// MODAL ADD Publish
const handleAddPublish = async () => {
  isShowModalAdd.value = true;
};
const closeModalAdd = () => {
  isShowModalAdd.value = false;
};

const columns = [
  {
    title: "Tên Nhà Xuất Bản",
    dataIndex: "TenNXB",
    key: "TenNXB",
  },
  {
    title: "Địa Chỉ",
    dataIndex: "DiaChi",
    key: "DiaChi",
  },
  //   {
  //     title: "Ngày Thêm",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //   },
  {
    title: "Thao tác",
    key: "action",
  },
];

const fetchData = async () => {
  const data = await Service.readPanigation_Publish(
    `?page=${+current.value}&limit=${+pageSize.value}`
  );

  if (data && data.data.EC === 0 && data.data.DT.pagination.length > 0) {
    listPublish.value = data.data.DT.pagination;
    total.value = data.data.DT?.meta?.total;
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
        @click="handleAddPublish"
        class="btn btn-primary border border-primary"
      >
        Thêm Nhà Xuất Bản
      </button>
    </div>
    <a-table :dataSource="listPublish" :columns="columns">
      <template #bodyCell="{ column, record }">
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
    <ModalAddPublish
      :isShowModalAdd="isShowModalAdd"
      :closeModalAdd="closeModalAdd"
      :fetchData="fetchData"
    />
    <ModalUpdatePublish
      :isShowModalUpdate="isShowModalUpdate"
      :closeModalUpdate="closeModalUpdate"
      :dataModalUpdate="dataModalUpdate"
      :fetchData="fetchData"
    />
    <ModalDeletePublish
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
