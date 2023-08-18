<template>
  <div class="m-container">
    <div class="mcard mt3 p5">
      <el-alert
        title="扩展了Element Plus图标库,可以在@/icons/svg文件夹中新增自己的SVG图标组件. 建议前往阿里iconfont下载SVG图标 https://www.iconfont.cn"
        type="success"
        class="mb5"
      ></el-alert>
      <el-row :gutter="0" class="box">
        <el-col :span="4" v-for="(icon, index) in icons" :key="index">
          <div class="icon-box">
            <svg-icon :name="icon" :size="1.5" />
            <p>{{ icon }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const icons = ["biaodan","component","dashboard"];
</script>
<style scoped>
	.box {border-top: 1px solid #eee;border-left: 1px solid #eee;}
	.icon-box {height:120px;text-align: center;background: #fff;border-bottom: 1px solid #eee;border-right: 1px solid #eee;color: #666;padding:30px 10px;}
	.icon-box i {font-size: 26px;transition: color .15s linear;}
	.icon-box p {color: #999;margin-top: 15px;transition: color .15s linear;}
	.icon-box:hover i, .icon-box:hover p {color: #5cb6ff;}
</style>