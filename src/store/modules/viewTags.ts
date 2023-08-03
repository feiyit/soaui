import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();
export const useViewTagsStore = defineStore("view-tags", () => {
  const viewTags = ref([]);

  const pushViewTags = (route) => {
    let backPathIndex = viewTags.value.findIndex(
      (item) => item.fullPath == router.options.history.state.back
    );
    let target = viewTags.value.find(
      (item) => item.fullPath === route.fullPath
    );
    let isName = route.name;
    if (!target && isName) {
      if (backPathIndex == -1) {
        viewTags.value.push(route);
      } else {
        viewTags.value.splice(backPathIndex + 1, 0, route);
      }
    }
  };

  return {
    viewTags,
    pushViewTags,
  };
});
