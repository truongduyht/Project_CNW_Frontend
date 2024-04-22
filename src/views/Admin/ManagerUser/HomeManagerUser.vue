<script setup>
import { onMounted, ref, watch } from "vue";
import Service from "../../../service/api";
import moment from "moment";

const listReader = ref([]);
const current = ref(1);
const pageSize = ref(5);
const total = ref(0);

const fetchData = async () => {
  const data = await Service.readPanigation_User(
    `?page=${+current.value}&limit=${+pageSize.value}`
  );

  if (data && data.data.EC === 0 && data.data.DT.pagination.length > 0) {
    listReader.value = data.data.DT.pagination;
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

const columns = [
  {
    title: "Họ tên",
    dataIndex: "HoTen",
    key: "HoTen",
  },
  {
    title: "Số điện thoại",
    dataIndex: "SoDienThoai",
    key: "SoDienThoai",
  },
  {
    title: "Ngày tạo tài khoản",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];
</script>

<template>
  <div>
    <div class="d-flex gap-2">
      <p>Manager User :</p>
      <p>
        <b class="text-warning">{{ total || 0 }}</b> Người Dùng
      </p>
    </div>
    <div>
      <a-table :dataSource="listReader" :columns="columns" />
    </div>
  </div>
</template>

<style></style>
