import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useSettingsStore = defineStore("setting", () => {
  const device = useStorage("device", "desktop");

  const layoutTags = useStorage("LAYOUT_TAGS", true);

  const breadcrumb = useStorage("LAYOUT_BREADCRUMB", true);

  const menuIsCollapse = ref(false);

  const resetDevice = () => {
    device.value = "desktop";
  };

  const setTags = () => {
    layoutTags.value = !layoutTags.value;
  };

  const setBreadcrumb = () => {
    breadcrumb.value = !breadcrumb.value;
  };

  return {
    device,
    resetDevice,
    menuIsCollapse,
    layoutTags,
    setTags,
    breadcrumb,
    setBreadcrumb,
  };
});
