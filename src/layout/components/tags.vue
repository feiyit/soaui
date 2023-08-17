<template>
  <div class="adminui-tags">
    <ul ref="tagRefs">
      <li
        v-for="tag in tagList"
        v-bind:key="tag"
        :class="[isActive(tag) ? '' : '', tag.meta.affix ? 'affix' : '']"
        @contextmenu.prevent="openContextMenu($event, tag)"
      >
        <router-link :to="tag">
          <el-icon v-if="tag.meta && tag.meta.icon">
            <component :is="tag.meta.icon || 'el-icon-menu'" />
          </el-icon>
          <span>{{ tag.meta.title }}</span>
          <el-icon
            v-if="!tag.meta.affix"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <Close />
          </el-icon>
        </router-link>
      </li>
    </ul>
  </div>

  <transition name="el-zoom-in-top">
    <ul
      v-if="contextMenuVisible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
      id="contextmenu"
    >
      <li @click="refreshTab()">
        <el-icon><Refresh /></el-icon>
        刷新
      </li>
      <hr />
      <li
        @click="closeTabs()"
        :class="contextMenuItem.meta.affix ? 'disabled' : ''"
      >
        <el-icon><Close /></el-icon>
        关闭标签
      </li>
      <li @click="closeOtherTabs()">
        <el-icon><FolderDelete /></el-icon>
        关闭其他标签
      </li>
      <hr />
      <li @click="maximize()">
        <el-icon><FullScreen /></el-icon>
        最大化
      </li>
      <li @click="openWindow()">
        <el-icon><CopyDocument /></el-icon>
        在新的窗口中打开
      </li>
    </ul>
  </transition>
</template>
<script lang="ts" setup>
  import { ref, onMounted, watch,nextTick } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useViewTagsStore } from "@/store/modules/viewTags";
  import { useKeepAliveStore } from "@/store/modules/keepAlive";
  import { useIframeStore } from "@/store/modules/iframe";
  import dynamicRouter from "@/router/dynamic";
  const route = useRoute();
  const router = useRouter();
  const viewTagsStore = useViewTagsStore();
  const keepAliveStore = useKeepAliveStore();
  const iframeStore = useIframeStore();

  const tagList = ref([]);
  tagList.value=viewTagsStore.viewTags;
  const contextMenuVisible = ref(false);
  const contextMenuItem = ref(null);
  const left = ref(0);
  const top = ref(0);
  const tipDisplayed = ref(false);
  const tagRefs = ref<any>(null);
  const fullPath = ref(String);
  fullPath.value = router.currentRoute.value.fullPath;

  //查找树
  const treeFind = (tree, func) => {
    for (const data of tree) {
      if (func(data)) return data;
      if (data.children) {
        const res = treeFind(data.children, func);
        if (res) return res;
      }
    }
    return null;
  };
  //增加tag
  const addViewTags = (route) => {
    if (route.name && !route.meta.fullpage) {
      viewTagsStore.pushViewTags(route);
      keepAliveStore.pushKeepLive(route.name);
    }
  };
  //高亮tag
  const isActive = (route) => {
    return route.fullPath === fullPath.value;
  };
  //关闭tag
  const closeSelectedTag = (tag, autoPushLatestView = true) => {
    const nowTagIndex = tagList.value.findIndex(
      (item) => item.fullPath == tag.fullPath
    );
    viewTagsStore.removeViewTags(tag);
    iframeStore.removeIframeList(tag);
    keepAliveStore.removeKeepLive(tag.name);
    if (autoPushLatestView) {
      const leftView = tagList.value[nowTagIndex - 1];
      if (leftView) {
        router.push(leftView);
      } else {
        router.push("/");
      }
    }
  };
  //tag右键
  const openContextMenu = (e, tag) => {
    contextMenuItem.value = tag;
    contextMenuVisible.value = true;
    left.value = e.clientX + 1;
    top.value = e.clientY + 1;

    //FIX 右键菜单边缘化位置处理
    nextTick(() => {
      let sp = document.getElementById("contextmenu");
      if (document.body.offsetWidth - e.clientX < sp.offsetWidth) {
        left.value = document.body.offsetWidth - sp.offsetWidth + 1;
        top.value = e.clientY + 1;
      }
    });
  };
  const closeMenu = () => {
    contextMenuItem.value = null;
    contextMenuVisible.value = false;
  };
  //TAB 刷新
  const refreshTab = () => {
    contextMenuVisible.value = false;
    const nowTag = contextMenuItem.value;
    //判断是否当前路由，否的话跳转
    if (fullPath.value !== nowTag.fullPath) {
      router.push({ path: nowTag.fullPath, query: nowTag.query });
    }
    iframeStore.refreshIframe(nowTag);
    setTimeout(() => {
      keepAliveStore.removeKeepLive(nowTag.name);
      keepAliveStore.setRouteShow(false);
      nextTick(() => {
        keepAliveStore.pushKeepLive(nowTag.name);
        keepAliveStore.setRouteShow(true);
      });
    }, 0);
  };
  //TAB 关闭
  const closeTabs = () => {
    var nowTag = contextMenuItem.value;
    if (!nowTag.meta.affix) {
      closeSelectedTag(nowTag);
      contextMenuVisible.value = false;
    }
  };
  //TAB 关闭其他
  const closeOtherTabs = () => {
    var nowTag = contextMenuItem.value;
    //判断是否当前路由，否的话跳转
    if (fullPath.value != nowTag.fullPath) {
      router.push({ path: nowTag.fullPath, query: nowTag.query });
    }
    var tags = [...tagList.value];
    tags.forEach((tag) => {
      if ((tag.meta && tag.meta.affix) || nowTag.fullPath == tag.fullPath) {
        return true;
      } else {
        closeSelectedTag(tag, false);
      }
    });
    contextMenuVisible.value = false;
  };
  //TAB 最大化
  const maximize = () => {
    var nowTag = contextMenuItem.value;
    contextMenuVisible.value = false;
    //判断是否当前路由，否的话跳转
    if (fullPath.value != nowTag.fullPath) {
      router.push({ path: nowTag.fullPath, query: nowTag.query });
    }
    document.getElementById("app").classList.add("main-maximize");
  };
  //新窗口打开
  const openWindow = () => {
    var nowTag = contextMenuItem.value;
    var url = nowTag.href || "/";
    if (!nowTag.meta.affix) {
      closeSelectedTag(nowTag);
    }
    window.open(url);
    contextMenuVisible.value = false;
  };
  //横向滚动
  const scrollInit = () => {
    const scrollDiv = tagRefs.value;
    scrollDiv.addEventListener("mousewheel", handler, false) ||
      scrollDiv.addEventListener("DOMMouseScroll", handler, false);
    function handler(event) {
      const detail = event.wheelDelta || event.detail;
      //火狐上滚键值-3 下滚键值3，其他内核上滚键值120 下滚键值-120
      const moveForwardStep = 1;
      const moveBackStep = -1;
      let step = 0;
      if (detail == 3 || (detail < 0 && detail != -3)) {
        step = moveForwardStep * 50;
      } else {
        step = moveBackStep * 50;
      }
      scrollDiv.scrollLeft += step;
    }
  };

  const init = () => {
    const dashboardRoute = treeFind(
      dynamicRouter,
      (node) => node.path == "/dashboard"
    );
    if (dashboardRoute) {
      dashboardRoute.fullPath = dashboardRoute.path;
      addViewTags(dashboardRoute);
      addViewTags(router.currentRoute.value);
    }
  };

  watch(
    route,
    (e) => {
      addViewTags(e);
    },
    {
      deep: true,
    }
  );
  watch(contextMenuVisible, (value) => {
    if (value) {
      document.body.addEventListener("click", closeMenu);
    } else {
      document.body.removeEventListener("click", closeMenu);
    }
  });
  onMounted(() => {
    scrollInit();
    init();
  });
</script>
<style>
  .contextmenu {
    position: fixed;
    width: 200px;
    margin: 0;
    border-radius: 0px;
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 3000;
    list-style-type: none;
    padding: 10px 0;
  }
  .contextmenu hr {
    margin: 5px 0;
    border: none;
    height: 1px;
    font-size: 0px;
    background-color: var(--el-border-color-light);
  }
  .contextmenu li {
    display: flex;
    align-items: center;
    margin: 0;
    cursor: pointer;
    line-height: 30px;
    padding: 0 17px;
    color: #606266;
  }
  .contextmenu li i {
    font-size: 14px;
    margin-right: 10px;
  }
  .contextmenu li:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
  }
  .contextmenu li.disabled {
    cursor: not-allowed;
    color: #bbb;
    background: transparent;
  }

  .tags-tip {
    padding: 5px;
  }
  .tags-tip p {
    margin-bottom: 10px;
  }

  .dark .contextmenu li {
    color: var(--el-text-color-primary);
  }
</style>
