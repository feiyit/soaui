<template>
  <div class="soa-form-table">
    <el-table :data="data" ref="table" :key="toggleIndex" border stripe>
      <el-table-column type="index" width="50" fixed="left">
        <template #header>
          <el-button
            type="primary"
            v-show="isAdd"
            icon="Plus"
            size="small"
            circle
            @click="rowAdd"
          ></el-button>
        </template>
        <template #default="scope">
          <div class="soa-form-table-handle">
            <span>{{ scope.$index + 1 }}</span>
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              plain
              circle
              @click="rowDel(scope.row, scope.$index)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="" width="58" v-if="dragSort">
        <template #default>
          <el-tag class="move" style="cursor: move">
            <el-icon style="width: 1em; height: 1em"><DCaret /></el-icon>
          </el-tag>
        </template>
      </el-table-column>
      <slot></slot>
      <!-- <el-table-column min-width="1"></el-table-column> -->
      <template #empty>
        {{ placeholder }}
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from "vue";

  const props = defineProps({
    modelValue: { type: Array, default: () => [] },
    addTemplate: { type: Object, default: () => {} },
    placeholder: { type: String, default: "暂无数据" },
    dragSort: { type: Boolean, default: false },
    isAdd: { type: Boolean, default: true },
  });
  const data = ref([]);
  const toggleIndex = ref(0);

  const emit = defineEmits(["update:modelValue"]);

  watch(
    () => props.modelValue,
    () => {
      data.value = props.modelValue;
    },
    {
      immediate: true,
    }
  );

  watch(
    () => data,
    () => {
      emit("update:modelValue", data.value);
    },
    {
      deep: true,
    }
  );

  

  const rowAdd = () => {
    const temp = JSON.parse(JSON.stringify(props.addTemplate));
    data.value.push(temp);
  };

  const rowDel = (row, index) => {
    data.value.splice(index, 1);
  };
</script>
<style scoped>
  .soa-form-table .soa-form-table-handle {
    text-align: center;
  }
  .soa-form-table .soa-form-table-handle span {
    display: inline-block;
  }
  .soa-form-table .soa-form-table-handle button {
    display: none;
  }
  .soa-form-table .hover-row .soa-form-table-handle span {
    display: none;
  }
  .soa-form-table .hover-row .soa-form-table-handle button {
    display: inline-block;
  }
</style>
