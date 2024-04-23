import { defineStore } from "pinia";

export const authenticationStore = defineStore("authenticaiton", {
  state: () => ({
    _user: {
      _id: "",
      _HoTen: "",
      _DiaChi: "",
      _SoDienThoai: "",
      _Role: "",
    },
    _loading: true,
    _isLogin: false,
  }),

  getters: {
    getUserData(state) {
      return state._user;
    },
    getLoading(state) {
      return state._loading;
    },
    getState(state) {
      return state;
    },
  },

  actions: {
    getUser() {
      return this._user;
    },
    getStateLogin() {
      return this._isLogin;
    },
    setIsLogin(state) {
      this._isLogin = state;
    },

    setLoading(state) {
      this._loading = state;
    },

    logout() {
      this._user = {
        _id: "",
        _HoTen: "",
        _DiaChi: "",
        _SoDienThoai: "",
        _Role: "",
      };
      this._isLogin = false;
    },

    setUserAndLogin(tokenData) {
      // Parse the tokenData to extract user information
      const { Id, HoTen, SoDienThoai, DiaChi, Role } = tokenData;

      // Set the user information in the store
      this._user._id = Id;
      this._user._HoTen = HoTen;
      this._user._SoDienThoai = SoDienThoai;
      this._user._DiaChi = DiaChi;
      this._user._Role = Role;

      // Set isLogin to true to indicate that the user is logged in
      this._isLogin = true;
    },
  },
});
