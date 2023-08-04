import { ref } from "vue";
import { defineStore } from "pinia";
import { type RouteLocationNormalized } from "vue-router";
export type TagView = Partial<RouteLocationNormalized>;
export const useViewTagsStore = defineStore("view-tags", () => {
  const viewTags = ref<TagView[]>([]);

  const pushViewTags = (route: TagView) => {
    let index = viewTags.value.findIndex(
      (item) => item.fullPath === route.fullPath
    );
    if (index !== -1) {
      // 防止 query 参数丢失
      viewTags.value[index].fullPath !== route.fullPath &&
        (viewTags.value[index] = { ...route });
    } else {
      // 添加新的 visitedView
      viewTags.value.push({ ...route });
    }
  };

  const removeViewTags = (route: TagView) => {
    viewTags.value.forEach((item, index) => {
      if (item.fullPath === route.fullPath) {
        viewTags.value.splice(index, 1);
      }
    });
  };

  const updateViewTags = (route: TagView) => {
    viewTags.value.forEach((item) => {
      if (item.fullPath == route.fullPath) {
        item = Object.assign(item, route);
      }
    });
  };

  const updateViewTagsTitle = (title = "") => {
    const nowFullPath = location.hash.substring(1);
    viewTags.value.forEach((item) => {
      if (item.fullPath == nowFullPath) {
        item.meta.title = title;
      }
    });
  };

  const clearViewTags = () => {
    viewTags.value = [];
  };

  return {
    viewTags,
    pushViewTags,
    removeViewTags,
    updateViewTags,
    updateViewTagsTitle,
    clearViewTags,
  };
});
