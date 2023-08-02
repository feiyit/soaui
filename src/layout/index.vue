<template>
  <div>
    <header class="adminui-header">
      <div class="adminui-header-left">
        <div class="logo-bar">
          <img class="logo" src="@/assets/login/logo.png" />
          <span>SOAUI</span>
        </div>
        <ul class="nav">
          <li>
            <span>首页</span>
          </li>
        </ul>
      </div>
      <div class="adminui-header-right">
        <userbar></userbar>
      </div>
    </header>
    <section class="aminui-wrapper"></section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../store/modules/app";
import { useSettingsStore } from "../store/modules/setting";
import userbar from './components/userbar.vue';
const router = useRouter();
const appStore = useAppStore();
const settingStore = useSettingsStore();

interface State {
  msg: string;
}

const goLogin = () => {
  router.push({ path: "/login" });
};

const addCount = () => {
  appStore.$patch((state) => {
    state.count = 10;
  });
};

const changeDevice = () => {
  settingStore.$patch((state) => {
    state.device = "desktop-010101";
  });
};

const resetDevice = () => {
  settingStore.resetDevice();
};

const msg = ref("我是Home.vue");
</script>