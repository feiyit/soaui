<template>
  <div class="login_bg">
    <el-row>
      <el-col :span="8" class="offset-2 mt-12" style="text-align:center;">
        <img src="@/assets/login/logo.png" style="height: 60px; width: auto"
      /></el-col>
      <el-col :span="16" class="offset-6 mt-14"></el-col>
    </el-row>
    <div class="content">
      <div class="title mb-25">登录</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="用户名"
            type="text"
            tabindex="1"
            :prefix-icon="UserFilled"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password" class="mt-12">
          <el-input
            v-model.trim="loginForm.password"
            placeholder="密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <div class="btn remember mt-8 mb-8">
          <el-checkbox v-model="loginForm.remember" label="记住账号" size="large" />
          
        </div>
        <div class="btn mt-10">
          <el-button :loading="loading" type="primary" size="large" round @click="handleLogin">
            登 录
          </el-button>
        </div>
        <div class="btn mt-8">
          <el-button plain type="primary" size="large" round>
            手机号码登录
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="footer mt-20">版权XXX</div>
  </div>
</template>

<script lang="ts" setup>
import { ref,reactive } from "vue";
import { useRouter } from "vue-router";
import { UserFilled,Lock } from '@element-plus/icons-vue'
import { useUserStore } from "@/store/modules/user"
const loginForm = reactive({
  username: "admin",
  password: "12345678",
  remember: false,
});
const loginFormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" },
  ],
};
const router = useRouter();
const userStore = useUserStore();
const loading = ref(false)
const handleLogin=()=>{
  loading.value=true;
  userStore.setUser({id:1,userName:"鸿星"});
  setTimeout(() => {
    loading.value=false
    router.push({ path: "/" });
  }, 2000);
}
</script>
<style scoped>
.login_bg {
  width: 100%;
  height: 100%;
  background: #fff;
  background: url("@/assets/login/login_bg.png");
  background-size: auto;
  background-size: cover;
}
.content {
  height: 600px;
  width: 510px;
  max-height: 620px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px 60px;
  margin: 3% auto 0;
}
.content .title {
  font-size: 1.5rem;
  font-weight: bold;
}
:deep(.el-input__wrapper) {
    height: 50px;
}
:deep(.el-input__wrapper){
  border-radius: 30px;
}
.btn {
  text-align: center;
}
.btn .el-button {
  width: 70%;
  padding:20px;
}
.remember{
  text-align: right;
}
.footer {
  text-align: center;
  color: #ffffff;
}
:deep(.el-icon){
  font-size: 20px;
}
</style>