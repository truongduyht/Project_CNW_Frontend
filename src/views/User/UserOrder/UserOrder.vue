<script setup>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import Service from "../../../service/api";
import { authenticationStore } from "../../../stores/authenticationStore";
import moment from "moment";
import { IconBackspace } from "@tabler/icons-vue";
import { toast } from "vue3-toastify";

const type = ref(0);
const activeKey = ref(["1"]);
const profile = ref({});
const orderAll = ref([]);

// Tab
const handleTabChange = (key) => {
  type.value = key;
};

// Gọi API

const fetchData = async () => {
  try {
    const res = await Service.read_Order(
      `IdUser=${profile.value._id}&type=${type.value}&sort=-updatedAt`
    );

    if (res && res.data.EC === 0) {
      orderAll.value = res.data.DT;
    }
  } catch (error) {
    console.log("error", error);
  }
};

watch(
  [type],
  () => {
    fetchData();
  },
  { immediate: true }
);

watchEffect(() => {
  const authentication = authenticationStore();
  profile.value = authentication.getUser();
  fetchData();
});

const hanleColumn_Date_Gh = () => {
  if (type.value == 1) {
    return "Ngày nhận sách.";
  } else if (type.value == 2) {
    return "Ngày trả sách.";
  } else if (type.value == 3) {
    return "Ngày hủy đơn mượn sách.";
  } else {
    return null;
  }
};

const columns = ref([
  {
    title: "Đơn Mượn Sách",
    dataIndex: ["OrderDetail", "IdOrder"],
    key: "Đơn Mượn Sách",
  },

  {
    title: "Tổng tiền",
    dataIndex: "OrderDetail",
    key: "Tổng tiền",
  },

  {
    title: "Ngày Mượn Sách",
    dataIndex: "DayOrder",
    key: "DayOrder",
  },
  {
    title: hanleColumn_Date_Gh,
    dataIndex: "DayRefund",
    key: "DayRefund",
  },
  {
    title: "Trạng Thái",
    dataIndex: "Status",
    key: "Status",
  },
  {
    title: "Xem Chi Tiết",
    dataIndex: "OrderDetail",
    key: "OrderDetail",
  },
  {
    title: "Action",
    key: "action",
  },
]);

const getStatusText = (Status) => {
  if (Status == 0) {
    return "Chưa gửi";
  } else if (Status == 1) {
    return "Đã gửi";
  } else if (Status == 2) {
    return "Đã trả";
  } else {
    return "Bị hủy";
  }
};

const handleDeleteOrder = async (data) => {
  const res = await Service.delete_Order({ IdOrder: data._id });
  if (res && res.data && res.data.EC === 0) {
    toast.success(res.data.EM);
    fetchData();
  } else {
    toast.success(res.data.EM);
  }
};
</script>

<template>
  <div class="min-vh-100 p-5">
    <p>Lịch sử đặt hàng</p>
    <div>
      <a-tabs v-model="activeKey" @change="handleTabChange">
        <a-tab-pane key="0" tab="Đơn sách chưa gửi"> </a-tab-pane>
        <a-tab-pane key="1" tab="Đơn sách đã nhận"> </a-tab-pane>
        <a-tab-pane key="2" tab="Đơn sách đã trả"> </a-tab-pane>
        <a-tab-pane key="3" tab="Đơn sách bị hủy"> </a-tab-pane>
      </a-tabs>
    </div>

    <div>
      <a-table :dataSource="orderAll" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'Đơn Mượn Sách'">
            <div class="d-flex">
              <div v-for="item in record?.OrderDetail" :key="item._id">
                <img
                  class="pe-1"
                  :src="item?.IdBook?.AnhSach"
                  alt="notFound"
                  width="80"
                  height="80"
                />
              </div>
            </div>
          </template>

          <template v-if="column.key === 'Tổng tiền'">
            <div class="d-flex">
              {{
                record?.OrderDetail?.reduce((total, item) => {
                  return (total += +item?.Quantity * +item?.IdBook?.DonGia);
                }, 0).toLocaleString("vi-VN") || 0
              }}
              đ
            </div>
          </template>

          <template v-if="column.key === 'DayOrder'">
            <div>
              {{
                record?.DayOrder &&
                moment(record?.DayOrder).format("DD/MM/YYYY")
              }}
            </div>
          </template>

          <template v-if="column.key === 'DayRefund'">
            <div>
              {{
                record?.DayRefund &&
                moment(record?.DayRefund).format("DD/MM/YYYY")
              }}
            </div>
          </template>

          <template v-if="column.key === 'Status'">
            <div>
              {{ getStatusText(record?.Status) }}
            </div>
          </template>

          <template v-if="column.key === 'OrderDetail'">
            <a-collapse>
              <a-collapse-panel key="1" header="Chi tiết đơn hàng">
                <div
                  v-for="item in record?.OrderDetail"
                  :key="item._id"
                  class="d-flex justify-content-between"
                >
                  <div>{{ item?.IdBook?.TenSach }}</div>
                  <div class="">{{ item?.IdBook?.DonGia }} đ</div>
                  <div class="text-warning">x{{ item?.Quantity }}</div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </template>

          <template v-if="column.key === 'action'">
            <div class="d-flex" v-if="type == 0">
              <div class="poiter">
                <IconBackspace
                  @click="() => handleDeleteOrder(record)"
                  :style="{ color: 'red' }"
                />
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </div>

    <div></div>
  </div>
</template>

<style></style>
