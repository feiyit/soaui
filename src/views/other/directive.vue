<template>
  <el-main>
    <el-card shadow="never" header="v-auth 高精度权限控制">
      <el-button v-auth="'user.add'" type="primary">
        v-auth="'user.add'"
      </el-button>
      <el-button v-auths="['user.no', 'user.add']" type="primary">
        v-auths="['user.no','user.add']"
      </el-button>

      <el-alert
        title="v-auth指令 是$AUTH的语法糖, 原先需要使用v-if来判断是否有权限, 判断单项权限，如果满足就判断有权限"
        style="margin-top: 20px"
      ></el-alert>
      <el-alert
        title="v-auths指令 传入数组,有一项满足就判断有权限"
        style="margin-top: 20px"
      ></el-alert>
    </el-card>
  </el-main>
</template>
<script lang="ts" setup>
  import { reactive, ref, inject } from "vue";
  const tool = inject("TOOL");
  const addStorage = () => {
    tool.sessionService.set("aaaa", 111111);
  };
  const getStorage = () => {
    const v = tool.sessionService.get("aaaa");
    console.log(v);
  };
</script>
