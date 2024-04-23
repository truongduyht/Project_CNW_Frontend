import axios from "./customize-axios.js";

// MODULE Book
const create_Book = async (rawData) => {
  console.log("---------FE", rawData);
  return axios.post("/api/book/create", rawData);
};

const update_Book = async (rawData) => {
  console.log("---------FE update", rawData);
  return axios.put("/api/book/update", rawData);
};

const delete_Book = async (rawData) => {
  return axios.delete("/api/book/delete", { data: rawData });
};

const readPanigate_Book = async (rawData = "") => {
  return axios.get(`/api/book/readPanigate${rawData}`);
};

const read_Book = async (rawData) => {
  return axios.get(`/api/book/read?id=${rawData.id}`);
};

// MODULE Staff
const create_Staff = async (rawData) => {
  return axios.post("/api/staff/create", rawData);
};

const delete_Staff = async (rawData) => {
  return axios.delete("/api/staff/delete", { data: rawData });
};

const readPanigation_Staff = async (rawData = "") => {
  return axios.get(`/api/staff/readPanigation${rawData}`);
};

//MODULE Publish
const readPanigation_Publish = async (rawData) => {
  console.log(rawData);
  return axios.get(`/api/publish/readPanigation${rawData}`);
};

const update_Publish = async (rawData) => {
  console.log(rawData);
  return axios.put(`/api/publish/update`, rawData);
};

const getAll_Publish = async () => {
  return axios.get(`/api/publish/getallpublish`);
};

const delete_Publish = async (rawData) => {
  console.log(rawData);
  return axios.delete(`/api/publish/delete`, { data: rawData });
};

const create_Publish = async (rawData) => {
  console.log(rawData);
  return axios.post(`/api/publish/create`, rawData);
};
const read_Publish = async (rawData) => {
  return axios.get(`/api/publish/read?${rawData}`);
};

// MODULE User
const update_User = async (rawData) => {
  return axios.put("/api/reader/update", rawData);
};

const readPanigation_User = async (rawData) => {
  return axios.get(`/api/reader/readPanigation${rawData}`);
};

// // MODULE Cart
const readPanigation_Cart = async (rawData) => {
  console.log(rawData);
  return axios.get(`/api/cart/readPanigation${rawData}`);
};

const updateNumBer_Cart = async (rawData) => {
  return axios.put(`/api/cart/update`, rawData);
};

const deleteItem_Cart = async (rawData) => {
  console.log(rawData);
  return axios.delete(`/api/cart/delete`, { data: rawData });
};

const create_Cart = async (rawData) => {
  return axios.post(`/api/cart/create`, rawData);
};
// MODULE Order
const create_Order = async (rawData) => {
  console.log(rawData);
  return axios.post(`/api/order/create`, rawData);
};

const update_Order = async (rawData) => {
  console.log(rawData);
  return axios.put(`/api/order/update`, rawData);
};

const readPanigation_Order = async (rawData) => {
  return axios.get(`/api/order/readPanigation${rawData}`);
};

const read_Order = async (rawData) => {
  return axios.get(`/api/order/read?${rawData}`);
};

const delete_Order = async (rawData) => {
  return axios.delete(`/api/order/delete`, { data: rawData });
};

const revenue_Order = async () => {
  return axios.get(`/api/order/revenue`);
};

// MODULE Authencation
const register_AUTHENTICATION = async (rawData) => {
  return axios.post("/api/auth/register", rawData);
};
const login_AUTHENTICATION = async (rawData) => {
  return axios.post("/api/auth/login", rawData);
};
const logout_AUTHENTICATION = async (rawData) => {
  return axios.get("/api/auth/logout");
};
const fetchProfile_AUTHENTICATION = async () => {
  return axios.get("/api/auth/profile");
};

export default {
  login_AUTHENTICATION,
  logout_AUTHENTICATION,
  fetchProfile_AUTHENTICATION,
  register_AUTHENTICATION,
  readPanigation_User,
  update_User,
  create_Staff,
  delete_Staff,
  readPanigation_Staff,
  readPanigation_Publish,
  create_Publish,
  update_Publish,
  getAll_Publish,
  create_Book,
  update_Book,
  delete_Book,
  read_Book,
  delete_Publish,
  readPanigate_Book,
  create_Cart,
  deleteItem_Cart,
  updateNumBer_Cart,
  readPanigation_Cart,
  create_Order,
  read_Order,
  delete_Order,
  update_Order,
  readPanigation_Order,
  revenue_Order,
};
