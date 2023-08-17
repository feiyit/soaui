<template>
    <div>
      <h5>{{ msg }}</h5>
      <p><svg-icon name="lock" color="#59f881" size="1.5" /></p>
      <p><svg-icon name="link" size="2" /></p>
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
      <el-button type="primary" plain @click="fullpage">fullpage</el-button>
<hr>
      <el-button type="primary" plain @click="addStorage">Add LocalStorage</el-button> 
      <el-button type="primary" plain @click="getStorage">Get Storage</el-button>
      <el-button type="primary" plain @click="clearStorage">Clear Storage</el-button>
<hr>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAppStore } from "@/store/modules/app";
  import { useSettingsStore } from "@/store/modules/setting";
  import tool from "@/utils/tool";
  import api from "@/api";
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
  
  const fullpage=()=>{
    router.push('/other/fullpage');
  }
  
  const msg = ref("我是Home.vue");

  const addStorage=()=>{
    tool.localService.set("user","zhang mr");
  }

  const getStorage=()=>{
    const v=tool.localService.get("user");
    console.log(v);
  }

  const clearStorage=()=>{
    tool.localService.clear();
  }

console.log("api",api);
  </script>