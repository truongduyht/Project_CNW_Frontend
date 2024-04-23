import { createRouter, createWebHistory } from "vue-router";

import AdminLayout from "../layouts/AdminLayout/AdminLayout.vue";
import AdminHome from "../views/Admin/Home/AdminHome.vue";
import HomeManagerSraff from "../views/Admin/ManagerStaff/HomeManagerSraff.vue";
import HomeManagerUser from "../views/Admin/ManagerUser/HomeManagerUser.vue";
import HomeManagerRevenue from "../views/Admin/ManagerRevenue/HomeManagerRevenue.vue";
import HomeManagerPublish from "../views/Admin/ManagerPublish/HomeManagerPublish.vue";

import StaffLayout from "../layouts/StaffLayout/StaffLayout.vue";
import StaffHome from "../views/Staff/StaffHome/StaffHome.vue";
import HandleOrder from "../views/Staff/HandleOrders/HandleOrder.vue";
import HomeManagerBook from "../views/Staff/ManagerBook/HomeManagerBook.vue";

import UserBook from "../views/User/UserBook/UserBook.vue";
import DetailBook from "../views/User/UserBook/DetailBook/DetailBook.vue";
import UserCart from "../views/User/UserCart/UserCart.vue";
import UserOrder from "../views/User/UserOrder/UserOrder.vue";
import UserProfile from "../views/User/UserProfile/UserProfile.vue";

import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout.vue";
import HomeDefault from "../views/Auth/HomeDefault/HomeDefault.vue";
import Demo from "../views/Auth/Demo/Demo.vue";
const routes = [
  //Admin
  {
    path: "/admin-home",
    component: AdminHome,
    meta: {
      layout: AdminLayout,
    },
  },

  {
    path: "/admin-managerStaff",
    component: HomeManagerSraff,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin-managerPublish",
    component: HomeManagerPublish,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin-managerUser",
    component: HomeManagerUser,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin-managerRevenue",
    component: HomeManagerRevenue,
    meta: {
      layout: AdminLayout,
    },
  },
  // Staff
  {
    path: "/staff-home",
    component: StaffHome,
    meta: {
      layout: StaffLayout,
    },
  },
  {
    path: "/staff-order",
    component: HandleOrder,
    meta: {
      layout: StaffLayout,
    },
  },
  {
    path: "/staff-book",
    component: HomeManagerBook,
    meta: {
      layout: StaffLayout,
    },
  },
  //User
  {
    path: "/books",
    component: UserBook,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/books/:id",
    component: DetailBook,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/cart",
    component: UserCart,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/order",
    component: UserOrder,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/profile",
    component: UserProfile,
    meta: {
      layout: DefaultLayout,
    },
  },

  //Home Default
  {
    path: "/",
    component: HomeDefault,
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: "/demo",
    component: Demo,
    meta: {
      layout: DefaultLayout,
    },
  },
  // {
  //   path: "/:slug",
  //   component: NotFound,
  //   meta: {
  //     layout: DefaultLayout,
  //   },
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
