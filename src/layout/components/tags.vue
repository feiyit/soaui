<template>
  <div class="adminui-tags">
    <ul ref="tags">
      <li
        v-for="tag in tagList"
        v-bind:key="tag"
        :class="[isActive(tag) ? 'active' : '', tag.meta.affix ? 'affix' : '']"
        @contextmenu.prevent="openContextMenu($event, tag)"
      >
        <router-link :to="tag">
          <span>{{ tag.meta.title }}</span>
          <el-icon
            v-if="!tag.meta.affix"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <el-icon-close />
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
        <el-icon><el-icon-refresh /></el-icon>
        刷新
      </li>
      <hr />
      <li
        @click="closeTabs()"
        :class="contextMenuItem.meta.affix ? 'disabled' : ''"
      >
        <el-icon><el-icon-close /></el-icon>
        关闭标签
      </li>
      <li @click="closeOtherTabs()">
        <el-icon><el-icon-folder-delete /></el-icon>
        关闭其他标签
      </li>
      <hr />
      <li @click="maximize()">
        <el-icon><el-icon-full-screen /></el-icon>
        最大化
      </li>
      <li @click="openWindow()">
        <el-icon><el-icon-copy-document /></el-icon>
        在新的窗口中打开
      </li>
    </ul>
  </transition>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  const route = useRoute();
  const router = useRouter();

  const tagList = ref([]);
  const contextMenuVisible = ref(false);
  const contextMenuItem = ref(null);
  const left = ref(0);
  const top = ref(0);
  const tipDisplayed = ref(false);

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
  const addViewTags = (route) => {
    if (route.name && !route.meta.fullpage) {
      this.$store.commit("pushViewTags", route);
      this.$store.commit("pushKeepLive", route.name);
    }
  };
  const isActive = (route) => {
    return route.fullPath === router.currentRoute.value.fullPath;
  };
  const closeSelectedTag = (tag, autoPushLatestView = true) => {
    const nowTagIndex = tagList.value.findIndex(
      (item) => item.fullPath == tag.fullPath
    );
    this.$store.commit("removeViewTags", tag);
    this.$store.commit("removeIframeList", tag);
    this.$store.commit("removeKeepLive", tag.name);
    if (autoPushLatestView && isActive(tag)) {
      const leftView = tagList.value[nowTagIndex - 1];
      if (leftView) {
        router.push(leftView);
      } else {
        router.push("/");
      }
    }
  };
  const closeMenu = () => {
    contextMenuItem.value = null;
    contextMenuVisible.value = false;
  };
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
