import { ref } from "vue";
import { defineStore } from "pinia";
import { type RouteLocationNormalized } from "vue-router";
export type TagView = Partial<RouteLocationNormalized>;
export const useIframeStore = defineStore("iframe", () => {
  const iframeList = ref<TagView[]>([]);
  const setIframeList = (route: TagView) => {
    iframeList.value = [];
    iframeList.value.push(route);
  };
  const pushIframeList = (route: TagView) => {
    let target = iframeList.value.find((item) => item.path === route.path);
    if (!target) {
      iframeList.value.push(route);
    }
  };
  const removeIframeList = (route: TagView) => {
    iframeList.value.forEach((item, index) => {
      if (item.path === route.path) {
        iframeList.value.splice(index, 1);
      }
    });
  };
  const refreshIframe = (route: TagView) => {
    iframeList.value.forEach((item) => {
      if (item.path == route.path) {
        var url = route.meta.url;
        item.meta.url = "";
        setTimeout(function () {
          item.meta.url = url;
        }, 200);
      }
    });
  };
  const clearIframeList = () => {
    iframeList.value = [];
  };

  return {
    iframeList,
    setIframeList,
    pushIframeList,
    removeIframeList,
    refreshIframe,
    clearIframeList,
  };
});
