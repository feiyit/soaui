<template>
  <div class="m-container">
    <div class="mcard mt3 p10">
      <el-row>
        <el-col :span="12">
          <soaEcharts height="300px" :option="option"></soaEcharts>
        </el-col>
        <el-col :span="12">
          <soaEcharts height="300px" :option="option2"></soaEcharts>
        </el-col>
      </el-row>
    </div>
    <div class="mcard mt3 p10">
      <el-row>
        <el-col :span="12">
          <soaEcharts height="300px" :option="option3"></soaEcharts>
        </el-col>
        <el-col :span="12">
          <soaEcharts height="300px" :option="option4"></soaEcharts>
        </el-col>
      </el-row>
    </div>
    <div class="mcard mt3 p10">
      <el-row>
        <el-col :span="12">
          <soaEcharts height="300px" :option="option5"></soaEcharts>
        </el-col>
        <el-col :span="12">
          <soaEcharts height="300px" :option="option6"></soaEcharts>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import soaEcharts from "@/components/soaEcharts/index.vue";
  const option = {
    title: {
      text: "Bar Demo",
      subtext: "基础柱状图",
    },
    grid: {
      top: "80px",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        barWidth: "15px",
      },
      {
        data: [110, 180, 120, 120, 60, 90, 110],
        type: "bar",
        barWidth: "15px",
      },
    ],
  };

  const option2 = {
    title: {
      text: "Line Demo",
      subtext: "基础折线图",
    },
    grid: {
      top: "80px",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "line",
      },
      {
        data: [110, 180, 120, 120, 60, 90, 110],
        type: "line",
      },
    ],
  };

  const option3 = {
    title: {
      text: "Pie Demo",
      subtext: "基础饼图",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        label: false,
        data: [
          { value: 1048, name: "搜索引擎" },
          { value: 735, name: "直接访问" },
          { value: 580, name: "邮件营销" },
          { value: 484, name: "联盟广告" },
          { value: 300, name: "视频广告" },
        ],
      },
    ],
  };

  const option4 = {
    title: {
      text: "Radar Demo",
      subtext: "基础雷达(属性)图",
    },
    tooltip: {
      trigger: "item",
    },
    radar: {
      radius: 100,
      center: ["50%", "55%"],
      indicator: [
        { name: "销售", max: 100 },
        { name: "管理", max: 100 },
        { name: "信息技术", max: 100 },
        { name: "客服", max: 100 },
        { name: "研发", max: 100 },
        { name: "市场", max: 100 },
      ],
    },
    series: [
      {
        name: "SCUI",
        type: "radar",
        areaStyle: {},
        data: [
          {
            value: [74, 90, 95, 65, 80, 31],
          },
        ],
      },
    ],
  };

  const option5 = {
    title: {
      text: "Kline Demo",
      subtext: "基础K线图",
    },
    grid: {
      top: "80px",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      data: [
        "2017-10-23",
        "2017-10-24",
        "2017-10-25",
        "2017-10-26",
        "2017-10-27",
        "2017-10-28",
        "2017-10-29",
        "2017-10-30",
      ],
    },
    yAxis: {
      scale: true,
    },
    series: [
      {
        type: "k",
        data: [
          [2213.19, 2199.31, 2191.85, 2224.63],
          [2203.89, 2177.91, 2173.86, 2210.58],
          [2170.78, 2174.12, 2161.14, 2179.65],
          [2179.05, 2205.5, 2179.05, 2222.81],
          [2212.5, 2231.17, 2212.5, 2236.07],
          [2227.86, 2235.57, 2219.44, 2240.26],
          [2242.39, 2246.3, 2235.42, 2255.21],
          [2246.96, 2232.97, 2221.38, 2247.86],
        ],
      },
    ],
  };

  const option6 = {
    title: {
      text: "Gauge Demo",
      subtext: "基础仪表盘",
    },
    series: [
      {
        center: ["50%", "60%"],
        type: "gauge",
        anchor: {
          show: true,
          showAbove: true,
          size: 20,
          itemStyle: {
            borderWidth: 5,
          },
        },
        progress: {
          show: true,
        },
        data: [
          {
            value: 70,
          },
        ],
      },
    ],
  };
</script>
