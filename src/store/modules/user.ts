import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core";
import tool from "@/utils/tool";
import config from "@/config";

export const useUserStore = defineStore("user", () => {
  const user = useStorage("USER_INFO", null);

  const getUser = () => {
    var sourceText = tool.encryptionService.aesDecrypt(
      user.value,
      config.AES_KEY
    );
    return JSON.parse(sourceText);
  };

  const setUser = (param: object) => {
    user.value = tool.encryptionService.aesEncrypt(
      JSON.stringify(param),
      config.AES_KEY
    );
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
});