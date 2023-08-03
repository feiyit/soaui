<template>
    <div>
      <h5>{{ msg }}</h5>
      <div @click="goLogin">go -Login</div>
      <div class="greetings">
        <h1 class="green">{{ appStore.count }}</h1>
        <h1 class="green">{{ appStore.getNum }}</h1>
        <h1 class="green">{{ appStore.getListCount }}</h1>
      </div>
      <hr>
      <div>
        <h1>{{settingStore.device}}</h1>
      </div>
      <div>
        <div><el-button type="primary" @click="addCount">增加Count</el-button></div>
        <div style="margin-top:50px"><el-button type="primary" @click="changeDevice">改变Device值</el-button></div>
         <div style="margin-top:50px"><el-button type="primary" @click="resetDevice">重置Device值</el-button></div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAppStore } from "@/store/modules/app";
  import { useSettingsStore } from "@/store/modules/setting";
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
      state.count = 10
    });
  };
  
  
  const changeDevice = () => {
    settingStore.$patch((state) => {
      state.device = "desktop-010101"
    });
  };
  
  const resetDevice = () => {
    settingStore.resetDevice()
  };
  
  
  const msg = ref("我是Home.vue");
  </script>