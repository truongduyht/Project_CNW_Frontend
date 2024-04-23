import { ref, watchEffect } from "vue";
import { authenticationStore } from "../../stores/authenticationStore";

const profile = ref({});
const isLogin = ref(false);

const getProfilePinia = () => {
  const authentication = authenticationStore();
  profile.value = authentication?.getUser();
  isLogin.value = authentication?.getStateLogin();
  return { profile, isLogin };
};

export default getProfilePinia;
