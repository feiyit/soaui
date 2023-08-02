import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core";

export const useSettingsStore  = defineStore("setting", () => {
    const device = useStorage("device", "desktop");

    const resetDevice = ()=>{
        device.value="desktop"
    }
    
    return {
        device,
        resetDevice
    }
})