<template>
  <div class="m-container">
    <div class="mcard mt3 p10">
      <el-row>
        <el-col :span="6">
          <el-statistic title="Daily active users" :value="268500" />
        </el-col>
        <el-col :span="6">
          <el-statistic :value="138">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Ratio of men to women
                <el-icon style="margin-left: 4px" :size="12">
                  <Male />
                </el-icon>
              </div>
            </template>
            <template #suffix>/100</template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="Total Transactions" :value="172000" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="Feedback number" :value="562">
            <template #suffix>
              <el-icon style="vertical-align: -0.125em">
                <ChatLineRound />
              </el-icon>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </div>
    <el-row class="mt3" :gutter="10">
      <el-col :span="16">
        <div class="mcard p2 h140">
          <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>项目进度</span>
              </div>
            </template>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="avatar" label="Avatar" width="80">
                <template #default="scope">
                  <el-avatar :src="scope.row.avatar" />
                </template>
              </el-table-column>
              <el-table-column prop="date" label="Date" width="180" />
              <el-table-column prop="name" label="Name" width="180" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="mcard p2 h140">
          <el-card class="box-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>最新消息</span>
              </div>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :hollow="activity.hollow"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="mcard mt3 p10 mb5">
        <svg-icon name="lock" color="#59f881" :size="1.5"  class="ml10" /><svg-icon name="link" :size="2"  class="ml10" />
        <el-button type="primary" plain @click="fullpage" class="ml10">fullpage</el-button>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAppStore } from "@/store/modules/app";
  import { useSettingsStore } from "@/store/modules/setting";
  import tool from "@/utils/tool";
  import config from "@/config";
  import api from "@/api";
  const router = useRouter();
  const appStore = useAppStore();
  const settingStore = useSettingsStore();

  const fullpage = () => {
    router.push("/other/fullpage");
  };
  const tableData = [
  {
    avatar:'/src/assets/image/1.svg',
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar:'/src/assets/image/2.svg',
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar:'/src/assets/image/3.svg',
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar:'/src/assets/image/4.svg',
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

  const activities= [
    {
      content: "Custom icon",
      timestamp: "2018-04-12 20:46",
      size: "large",
      type: "primary",
      icon: "MoreFilled",
    },
    {
      content: "Custom color",
      timestamp: "2018-04-03 20:46",
      color: "#0bbd87",
    },
    {
      content: "Custom size",
      timestamp: "2018-04-03 20:46",
      size: "large",
    },
    {
      content: "Custom hollow",
      timestamp: "2018-04-03 20:46",
      type: "primary",
      hollow: true,
    },
    {
      content: "Default node",
      timestamp: "2018-04-03 20:46",
    },
  ];
</script>
<style scoped>
  .box-card {
    border: none;
  }
</style>
