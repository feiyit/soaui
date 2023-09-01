<template>
  <div class="m-container">
    <div class="mcard mt3 p5">
      <el-alert
        title="点击原型加号进行数据添加"
        type="success"
        class="mb5"
      ></el-alert>
      <soaFormTable
        v-model="formData.attr"
        :addTemplate="addTemplate"
        style="width: 100%"
      >
        <el-table-column prop="name" label="名称">
          <template #default="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
            <template #default="scope">
                <el-select v-model="scope.row.sex" placeholder="sex">
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
            </template>
          </el-table-column>
        <el-table-column prop="name" label="值">
          <template #default="scope">
            <el-input
              v-model="scope.row.value"
              placeholder="请输入值"
            ></el-input>
          </template>
        </el-table-column>
      </soaFormTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from "vue";
  import soaFormTable from "@/components/soaFormTable/index.vue";

  const formData = ref({
    id: 0,
    attr: [{ name: '张三',sex:"1", value: "SOAUI很棒" }],
  });
  const addTemplate = { name: undefined,sex:undefined, value: undefined };
  const sexOptions=[{label:"男",value:"1"},{label:"女",value:"2"}];
</script>
