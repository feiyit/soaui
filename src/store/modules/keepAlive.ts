import { ref } from "vue";
import { defineStore } from "pinia";
import { type RouteLocationNormalized } from "vue-router";
export type TagView = Partial<RouteLocationNormalized>;
export const useKeepAliveStore = defineStore("keep-alive", () => {
  const keepLiveRoute = ref<TagView[]>([]);
  const routeKey = ref(null);
  const routeShow = ref(true);

  const pushKeepLive = (component: TagView) => {
    if (!keepLiveRoute.value.includes(component)) {
      keepLiveRoute.value.push(component);
    }
  };
  const removeKeepLive = (component: TagView) => {
    var index = keepLiveRoute.value.indexOf(component);
    if (index !== -1) {
      keepLiveRoute.value.splice(index, 1);
    }
  };
  const clearKeepLive = () => {
    keepLiveRoute.value = [];
  };
  const setRouteKey = (key: any) => {
    routeKey.value = key;
  };
  const setRouteShow = (key: any) => {
    routeShow.value = key;
  };

  return {
    keepLiveRoute,
    routeKey,
    routeShow,
    pushKeepLive,
    removeKeepLive,
    clearKeepLive,
    setRouteKey,
    setRouteShow,
  };
});
