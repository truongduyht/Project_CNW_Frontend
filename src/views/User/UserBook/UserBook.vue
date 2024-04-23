<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import CardBook from "./CartBook/CardBook.vue";
import Service from "../../../service/api";
import { Pagination } from "ant-design-vue";

const activeKey = ref("1");
const sort = ref("");
const type = ref("");

// Xử lí pagination
const books = ref([]);
const current = ref(1);
const pageSize = ref(8);
const total = ref(0);

const onChangePagination = (page, pageSize) => {
  current.value = +page;
};

const handlePageSize = (page, newSize) => {
  pageSize.value = newSize;
};

const caterory = ref([
  {
    id: 1,
    label: "Kinh tế",
    value: "kinh tế",
  },
  {
    id: 2,
    label: "Tôn giáo",
    value: "tôn giáo",
  },
  {
    id: 3,
    label: "Tiểu thuyết",
    value: "tiểu thuyết",
  },
  {
    id: 4,
    label: "Truyện ngắn",
    value: "truyện ngắn",
  },
  {
    id: 5,
    label: "Truyện cười",
    value: "truyện cười",
  },
  {
    id: 6,
    label: "Sức khỏe",
    value: "sức khỏe",
  },
]);

const handleSelectType = (data) => {
  type.value = data;
};

const handleTabChange = (key) => {
  sort.value = key;
};

// Gọi API lấy datas

const fetchData = async () => {
  const data = await Service.readPanigate_Book(
    `?page=${+current.value}&limit=${+pageSize.value}&type=${
      type.value || ""
    }&sort=${sort.value || "createdAt"}`
  );

  if (data && data.data.EC === 0 && data.data.DT.pagination.length > 0) {
    books.value = data.data.DT.pagination;
    total.value = data.data.DT?.meta?.total;
  }
};

watchEffect(() => {
  fetchData();
});
watch([current, pageSize, type, sort], () => {
  fetchData();
});

const handleRefetchIcon = () => {
  (current.value = 1),
    (pageSize.value = 8),
    (type.value = ""),
    (sort.value = "createdAt");
};
</script>

<template>
  <div>
    <div class="row min-vh-100 px-3">
      <div class="col-2 p-0">
        <div class="border-bottom w-100 text-center py-3">
          Bộ lọc tìm kiếm
          <span class="mx-2 poiter"
            ><RedoOutlined style="color: blue" @click="handleRefetchIcon"
          /></span>
        </div>
        <div class="w-75 m-auto">
          <div v-for="item in caterory" :key="item.id" class="my-4">
            <a-checkbox
              @click="() => handleSelectType(item.value)"
              :checked="item.value === type"
              >{{ item.label }}
            </a-checkbox>
          </div>
        </div>
      </div>

      <div class="col-10 border">
        <div class="p-3">
          <div>
            <a-tabs v-model="activeKey" @change="handleTabChange">
              <a-tab-pane key="createdAt" tab="Tất cả"> </a-tab-pane>
              <a-tab-pane key="-DonGia" tab="Giá cao đến thấp"> </a-tab-pane>
              <a-tab-pane key="DonGia" tab="Giá thấp đến cao"> </a-tab-pane>
            </a-tabs>
          </div>

          <div>
            <div class="row">
              <div
                class="col-lg-3 col-md-4 col-sm-6 my-3"
                v-for="book in books"
                :key="book.id"
              >
                <router-link
                  class="text-decoration-none"
                  :to="'/books/' + book?._id"
                >
                  <CardBook
                    class="m-auto"
                    :name="book.TenSach"
                    :price="book.DonGia"
                    :url="book.AnhSach"
                  />
                </router-link>
              </div>
            </div>
            <div class="text-center">
              <Pagination
                :current="current"
                :pageSize="pageSize"
                :total="total"
                :show-size-changer="true"
                :pageSizeOptions="['5', '8', '10', '15']"
                @change="onChangePagination"
                @showSizeChange="handlePageSize"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
