<script lang="ts" setup>
  import { computed } from "vue";

  const props = defineProps({
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#7782aa",
    },
    size: {
      type: Number,
      default: 1,
    },
  });

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :style="{width:size+'em',height:size+'em'}">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
