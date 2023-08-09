import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {

    const user = useStorage("USER_INFO", null);

    const getUser = () => {
      return user.value;
    };

    const setUser = (param: object) => {
      user.value = param;
    };

    const clearUser = () => {
      user.value = null;
    };

    return {
      user,
      getUser,
      setUser,
      clearUser,
    };
})