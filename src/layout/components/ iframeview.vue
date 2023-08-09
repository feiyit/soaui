<template>
  <div
    v-show="router.currentRoute.value.meta.type == 'iframe'"
    class="iframe-pages"
  >
    <iframe
      v-for="item in iframeList"
      :key="item.meta.url"
      v-show="$route.meta.url == item.meta.url"
      :src="item.meta.url"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useIframeStore } from "@/store/modules/iframe";
  const route = useRoute();
  const router = useRouter();
  const iframeStore = useIframeStore();
  const iframeList = computed(() => {
    return iframeStore.iframeList();
  });
  const push = (route) => {
    if (route.meta.type == "iframe") {
      //   if (this.ismobile || !this.layoutTags) {
      //     this.$store.commit("setIframeList", route);
      //   } else {
      //     this.$store.commit("pushIframeList", route);
      //   }
      iframeStore.pushIframeList(route);
    } else {
      iframeStore.clearIframeList();
      //   if (this.ismobile || !this.layoutTags) {
      //     iframeStore.clearIframeList();
      //   }
    }
  };

  watch(
    route,
    (e) => {
      push(e);
    },
    {
      deep: true,
    }
  );
  onMounted(() => {
    push(router.currentRoute.value);
  });
</script>
<style scoped>
  .iframe-pages {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  iframe {
    border: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
