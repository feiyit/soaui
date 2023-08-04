<script lang="ts" setup>
  import { ref, computed, nextTick } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useKeepAliveStore } from "@/store/modules/keepAlive";
  import dynamicRouter from "@/router/dynamic";
  import userbar from "./components/userbar.vue";
  import navmenu from "./components/navmenu.vue";
  import topbar from './components/topbar.vue';
  import tags from './components/tags.vue';

  const route = useRoute();
  const router = useRouter();
  const keepAliveStore = useKeepAliveStore();

  const filterUrl = (map) => {
    var newMap = [];
    map &&
      map.forEach((item) => {
        item.meta = item.meta ? item.meta : {};
        //处理隐藏
        if (item.meta.hidden || item.meta.type == "button") {
          return false;
        }
        //处理http
        if (item.meta.type == "iframe") {
          item.path = `/i/${item.name}`;
        }
        //递归循环
        if (item.children && item.children.length > 0) {
          item.children = filterUrl(item.children);
        }
        newMap.push(item);
      });
    return newMap;
  };

  const nextMenu = ref([]);
  const active = ref("");
  const menuIsCollapse = ref(false);
  const pmenu = ref({});

  const showMenu = (route) => {
    pmenu.value = route;
    nextMenu.value = filterUrl(route.children);
    if ((!route.children || route.children.length == 0) && route.component) {
      router.push({ path: route.path });
    }
  };

  const breadcrumbs = ref([]);
  const getBreadcrumb = () => {
    breadcrumbs.value = route.matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
  };

  const showThis = () => {
    pmenu.value = router.currentRoute.value.meta.breadcrumb
      ? router.currentRoute.value.meta.breadcrumb[0]
      : {};
    nextMenu.value = filterUrl(pmenu.value.children);
    nextTick(() => {
      active.value =
        router.currentRoute.value.meta.active ||
        router.currentRoute.value.fullPath;
    });
  };

  const menu = computed(() => {
    return filterUrl(dynamicRouter);
  });

  const key = computed(() => {
    return route.path;
  });

  getBreadcrumb();

  showThis();
</script>
<template>
  <header class="adminui-header">
    <div class="adminui-header-left">
      <div class="logo-bar">
        <img class="logo" src="@/assets/login/logo.png" />
        <span>SOAUI</span>
      </div>
      <ul class="nav">
        <li
          v-for="item in menu"
          :key="item"
          :class="pmenu.path == item.path ? 'active' : ''"
          @click="showMenu(item)"
        >
          <el-icon>
            <component :is="item.meta.icon || 'el-icon-menu'" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </li>
      </ul>
    </div>
    <div class="adminui-header-right">
      <userbar></userbar>
    </div>
  </header>
  <section class="aminui-wrapper">
    <div
      v-if="nextMenu.length > 0 || !pmenu.component"
      :class="menuIsCollapse ? 'aminui-side isCollapse' : 'aminui-side'"
    >
      <div v-if="!menuIsCollapse" class="adminui-side-top">
        <h2>{{ pmenu?.meta?.title }}</h2>
      </div>
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <el-menu
            :default-active="active"
            router
            :collapse="menuIsCollapse"
            :unique-opened="false"
          >
            <navmenu :menus="nextMenu"></navmenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="adminui-side-bottom">
        <el-icon>
          <Expand v-if="menuIsCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
    <div class="aminui-body el-container">
      <topbar></topbar>
      <tags></tags>
      <div class="adminui-main" id="adminui-main">
        <router-view v-slot="{ Component }">
          <keep-alive :include="keepAliveStore.keepLiveRoute">
            <component
              :is="Component"
              :key="key"
              v-if="keepAliveStore.routeShow"
            />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .aminui-wrapper {
    height: calc(100% - 58px);
  }
</style>
