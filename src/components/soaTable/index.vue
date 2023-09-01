<template>
  <div
    class="soaTable"
    :style="{ height: _height }"
    ref="soaTableMain"
    v-loading="loading"
  >
    <div class="soaTable-table" :style="{ height: _table_height }">
      <el-table
        v-bind="$attrs"
        :data="tableData"
        :row-key="rowKey"
        :key="toggleIndex"
        ref="soaTable"
        :height="height == 'auto' ? null : '100%'"
      >
        <slot></slot>
        <template v-for="(item, index) in userColumn" :key="index">
          <el-table-column
            v-if="!item.hide"
            :column-key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :filters="item.filters"
            :show-overflow-tooltip="item.showOverflowTooltip"
          >
            <template #default="scope">
              <slot :name="item.prop" v-bind="scope">
                {{ scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
        <el-table-column min-width="1"></el-table-column>
        <template #empty>
          <el-empty :description="emptyText" :image-size="100"></el-empty>
        </template>
      </el-table>
    </div>
    <div class="soaTable-page">
      <div class="soaTable-pagination">
        <el-pagination
          v-if="!hidePage"
          background
          small
          :layout="paginationLayout"
          :total="total"
          :page-size="soaPageSize"
          :page-sizes="pageSizes"
          v-model:currentPage="currentPage"
          @current-change="paginationChange"
          @update:page-size="pageSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  import config from "@/config/table";
  const loading = ref(false);
  const total = ref(100);
  const currentPage = ref(1);
  const emptyText = ref("暂无数据");
  const toggleIndex = ref(0);
  const tableData = ref([]);
  const userColumn = ref([]);

  const props = defineProps({
    apiObj: { type: Object, default: () => {} },
    params: { type: Object, default: () => ({}) },
    data: { type: Object, default: () => {} },
    column: { type: Object, default: () => {} },
    rowKey: { type: String, default: "" },
    pageSize: { type: Number, default: config.pageSize },
    pageSizes: { type: Array, default: config.pageSizes },
    hidePage: {
      type: Boolean,
      default: false,
    },
    height: { type: [String, Number], default: "100%" },
    paginationLayout: { type: String, default: config.paginationLayout },
  });
  const _height = computed(() =>
    Number(props.height) ? Number(props.height) + "px" : props.height
  );
  const _table_height = computed(() =>
    props.hidePage ? "100%" : "calc(100% - 50px)"
  );

  const tableParams = ref({});
  let soaPageSize = props.pageSize;

  const init = async () => {
    loading.value = true;
    let reqData = {
      [config.request.page]: currentPage.value,
      [config.request.limit]: soaPageSize,
    };
    if (props.hidePage) {
      delete reqData[config.request.page];
      delete reqData[config.request.pageSize];
    }
    Object.assign(reqData, tableParams.value);
    const res = await props.apiObj.get(reqData);
    if (res.code === 200) {
      total.value = parseInt(res.data.totalItems);
      tableData.value = res.data.items;
    } else {
      ElMessageBox.alert(res.message, "提示", { type: "error" });
    }
    loading.value = false;
  };

  const upData = (params, page = 1) => {
    currentPage.value = page;
    Object.assign(tableParams.value, params || {});
    init();
  };

  const refresh = () => {
    init();
  };

  const paginationChange = () => {
    init();
  };

  const pageSizeChange = (size) => {
    soaPageSize = size;
    init();
  };

  const pageSizesChange = (sizes) => {
    props.pageSizes = sizes;
  };

  const handleCurrentChange = (currentPage) => {
    tableParams.value.page = currentPage;
    init();
  };

  const handleSizeChange = (pageSize) => {
    tableParams.value.pageSize = pageSize;
    init();
  };

  watch(
    () => props.data,
    () => {
      tableData.value = props.data;
      total.value = props.data.length;
    },
    {
      immediate: true,
    }
  );

  watch(
    () => props.column,
    () => {
      userColumn.value = props.column;
    },
    {
      immediate: true,
    }
  );

  watch(
    () => props.apiObj,
    (value) => {
      if (props.apiObj) {
        tableParams.value = props.params;
        refresh();
      }
    },
    {
      immediate: true,
    }
  );

  defineExpose({
    refresh,
    upData,
  });
</script>
<style scoped>
  .soaTable-table {
    height: calc(100% - 50px);
  }
  .soaTable-page {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  }
  .soaTable-do {
    white-space: nowrap;
  }
  .soaTable:deep(.el-table__footer) .cell {
    font-weight: bold;
  }
  .soaTable:deep(.el-table__body-wrapper) .el-scrollbar__bar.is-horizontal {
    height: 6px;
    border-radius: 12px;
  }
  .soaTable:deep(.el-table__body-wrapper) .el-scrollbar__bar.is-vertical {
    width: 6px;
    border-radius: 12px;
  }
</style>
