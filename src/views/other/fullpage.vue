<template>
  <el-container>
    <el-header>
      <el-page-header content="FullPage" @back="goBack" />
    </el-header>
    <el-main>
      <el-empty description="FullPageMain"></el-empty>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  const goBack = () => {
    router.go(-1);
  };
</script>
