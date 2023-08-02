import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {

    const user = useStorage("userInfo", null);

    const getUser = () => {
        return user.value
    }

    const setUser=(param: object)=>{
        user.value=param
    }

    return {
        user,
        getUser,
        setUser
    }
})