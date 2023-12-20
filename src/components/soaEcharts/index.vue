<template>
    <div ref="soaEcharts" :style="{ height: height, width: width }"></div>
  </template>
  <script lang="ts" setup>
    import {
      ref,
      watch,
      computed,
      onMounted,
      nextTick,
      onActivated,
      onDeactivated,
    } from "vue";
    import * as echarts from "echarts";
    import T from "./theme.ts";
    echarts.registerTheme("T", T);
    const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);
    const props = defineProps({
      height: { type: String, default: "100%" },
      width: { type: String, default: "100%" },
      nodata: { type: Boolean, default: false },
      option: { type: Object, default: () => {} },
    });
    const myChart = ref(null);
    const soaEcharts = ref(null);
    const isActivat = ref(false);
  
    const draw = () => {
      let chart = echarts.init(soaEcharts.value, "T");
      chart.setOption(myOptions.value);
      myChart.value = chart;
      window.addEventListener("resize", () => myChart.value.resize());
    };
    const myOptions = computed(() => {
      return props.option || {};
    });
    watch(
      props.option,
      (e) => {
        unwarp(myChart.value).setOption(e);
      },
      {
        deep: true,
      }
    );
    onActivated(() => {
      if (!isActivat.value) {
        nextTick(() => {
          myChart.value.resize();
        });
      }
    });
  
    onDeactivated(() => {
      isActivat.value = false;
    });
    onMounted(() => {
      isActivat.value = true;
      nextTick(() => {
        draw();
      });
    });
  </script>
  