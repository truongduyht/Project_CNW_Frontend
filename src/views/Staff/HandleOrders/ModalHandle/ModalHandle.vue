<script setup>
import { onMounted, ref, watchEffect } from "vue";
import moment from "moment";
import { toast } from "vue3-toastify";
import Service from "../../../../service/api";

const props = defineProps({
  closeModalUpdate: Function,
  fetchData: Function,
  isShowModalUpdate: Boolean,
  dataModalUpdate: Object,
});

const _id = ref("");
const DayRefund = ref(null);

const Status = ref(0);
const SoDienThoai = ref("");
const DayOrder = ref(null);
const HoTen = ref("");

watchEffect(() => {
  _id.value = props?.dataModalUpdate?._id;
  Status.value = props?.dataModalUpdate?.Status;
  SoDienThoai.value = props?.dataModalUpdate?.IdUser?.SoDienThoai;
  DayOrder.value = props?.dataModalUpdate?.DayOrder;
  HoTen.value = props?.dataModalUpdate?.IdUser?.HoTen;
});

const validate = () => {
  if (!_id.value) {
    toast.error("Không có đơn sách");
    return false;
  }

  if (!Status.value) {
    toast.error("Chưa cập nhật trạng thái đơn sách!!!");
    return false;
  }

  if (!DayRefund.value) {
    toast.error("Chưa cập nhật ngày giao đơn sách!!!");
    return false;
  }
  return true;
};

const handleCancel = () => {
  props.closeModalUpdate();
};

const handleOk = async () => {
  const validateForm = validate();
  if (!validateForm) {
    return;
  }
  const dataUpdate = {
    IdOrder: _id.value,
    Status: Status.value,
    DayRefund: DayRefund.value,
  };

  const res = await Service.update_Order(dataUpdate);
  if (res && res.data.EC === 0) {
    toast.success(res.data.EM);
    props.fetchData();
    handleCancel();
  } else {
    toast.error(res.data.EM);
  }
};

const handleChange = (value) => {
  Status.value = value;
  console.log(`selected ${value}`);
};

// Chọn ngay Giao hàng dự kiên
const onChangeDate_Nhan = (data) => {
  DayRefund.value = data?.$d;
  console.log("onChangeDate_Nhan", data?.$d);
};

const onChangeDate_Tra = (data) => {
  DayRefund.value = data?.$d;
  console.log("onChangeDate_Tra", data?.$d);
};
</script>

<template>
  <div>
    <a-modal
      :open="isShowModalUpdate"
      title="Cập nhật trạng thái đơn mượn"
      @ok="handleOk"
      @cancel="handleCancel"
      :style="{ top: '10px' }"
      :width="700"
    >
      <form>
        <div>
          <div class="my-2">Mã đơn hàng : {{ _id }}</div>
          <div class="my-2">Tên người mượn: {{ HoTen }}</div>
          <div class="my-2">
            Ngày đặt hàng : {{ moment(DayOrder).format("DD/MM/YYYY") }}
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <div>
            <div>Cập nhật trạng thái</div>
            <a-select
              ref="select"
              :value="Status"
              style="width: 220px"
              @change="handleChange"
            >
              <a-select-option value="0">Chưa gửi</a-select-option>
              <a-select-option value="1">Đã gửi</a-select-option>
              <a-select-option value="2">Đã trả</a-select-option>
              <a-select-option value="3">Đơn sách bị hủy</a-select-option>
            </a-select>
          </div>

          <div v-if="Status === '1'">
            <div>Chọn ngày dự nhận đơn</div>
            <div>
              <a-date-picker @change="onChangeDate_Nhan" format="DD/MM/YYYY" />
            </div>
          </div>

          <div v-if="Status === '2'">
            <div>Ngày trả</div>
            <div>
              <a-date-picker @change="onChangeDate_Tra" format="DD/MM/YYYY" />
            </div>
          </div>

          <div v-if="Status === '3'">
            <div>Hủy đơn</div>
            <div>
              <a-date-picker @change="onChangeDate_Nhan" format="DD/MM/YYYY" />
            </div>
          </div>
        </div>
      </form>
    </a-modal>
  </div>
</template>

<style></style>
