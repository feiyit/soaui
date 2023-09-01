<template>
  <el-container>
    <div class="mcard mt3 p5 pb0 pt0">
      <el-header>
        <div class="left-panel">
          <el-button icon="Plus" type="primary" circle @click="addClick" />
        </div>
        <div class="right-panel">
          <el-input
            v-model="param.key"
            clearable
            placeholder="请输入关键字查询"
          ></el-input>
          <el-button icon="Search" type="primary" circle @click="search" />
        </div>
      </el-header>
      <soaTable
        ref="soaTableRef"
        :data="tableData"
        :column="column"
        row-key="id"
        @selection-change="selectionChange"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column type="selection" width="55" />
        <el-table-column fixed="right" label="操作" width="120" align="right">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              circle
              icon="Edit"
              @click="editClick(scope.row)"
            />
            <el-popconfirm
              title="确定要删除当前数据吗？"
              icon="InfoFilled"
              width="220"
              @confirm="delClick(scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="small" circle icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <template #status="scope">
          <el-tag round :type="scope.row.status ? 'success' : 'warning'">
            {{ scope.row.status ? "正常" : "关闭" }}
          </el-tag>
        </template>
      </soaTable>
    </div>
  </el-container>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import soaTable from "@/components/soaTable/index.vue";

  const selection = ref([]);
  const soaTableRef = ref(null);
  const param = ref({ key: undefined });
  const tableData = [
    {
      id: 1,
      number: "1001",
      name: "张三",
      sex: "男",
      status: true,
      address: "北京市海淀区",
      date: "2021-01-01",
    },
  ];

  const selectionChange = (v) => {
    selection.value = v;
  };

  const search = () => {
    soaTableRef.value.upData(param.value);
  };

  const addClick = () => {
    console.log("add");
  };

  const editClick = (row) => {
    console.log(row);
  };

  const delClick = async (row) => {
    console.log(row);
  };

  const column = [
    {
      label: "id",
      prop: "id",
      width: "200",
      sortable: true,
      hide: true,
    },
    { prop: "number", label: "编号", width: 100 },
    { prop: "name", label: "名称" },
    { prop: "sex", label: "性别", width: 100 },
    { prop: "status", label: "状态", width: 100 },
    { prop: "address", label: "地址", width: 100 },
    { prop: "date", label: "创建时间", width: 180 },
  ];
</script>
