<template>
  <div class="user-bar">
    <div class="screen panel-item hidden-sm-and-down" @click="screen">
      <el-icon><FullScreen /></el-icon>
    </div>
    <div class="msg panel-item" @click="showMsg">
      <el-badge
        :hidden="msgList.length == 0"
        :value="msgList.length"
        class="badge"
        type="danger"
      >
        <el-icon><ChatDotRound /></el-icon>
      </el-badge>
      <el-drawer
        title="新消息"
        v-model="msg"
        :size="400"
        append-to-body
        destroy-on-close
        class="msg-drawer"
      >
        <el-container>
          <el-main class="nopadding">
            <el-scrollbar>
              <ul class="msg-list">
                <li v-for="item in msgList" v-bind:key="item.id">
                  <a :href="item.link" target="_blank">
                    <div class="msg-list__icon">
                      <el-badge is-dot type="danger">
                        <el-avatar :size="40" :src="item.avatar"></el-avatar>
                      </el-badge>
                    </div>
                    <div class="msg-list__main">
                      <h2>{{ item.title }}</h2>
                      <p>{{ item.describe }}</p>
                    </div>
                    <div class="msg-list__time">
                      <p>{{ item.time }}</p>
                    </div>
                  </a>
                </li>
                <el-empty
                  v-if="msgList.length == 0"
                  description="暂无新消息"
                  :image-size="100"
                ></el-empty>
              </ul>
            </el-scrollbar>
          </el-main>
          <el-footer>
            <el-button type="primary">消息中心</el-button>
            <el-button>全部设为已读</el-button>
          </el-footer>
        </el-container>
      </el-drawer>
    </div>
    <el-dropdown
      class="user panel-item"
      trigger="click"
      @command="handleCommand"
    >
      <div class="user-avatar">
        <el-avatar :size="30">{{user!=null?user.userName.substring(0,1):""}}</el-avatar>
        <label>{{user.userName}}</label>
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="uc">帐号信息</el-dropdown-item>
          <el-dropdown-item command="clearCache">清除缓存</el-dropdown-item>
          <el-dropdown-item divided command="outLogin">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from "vue";
  import { ElMessage,ElMessageBox } from "element-plus";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/store/modules/user"
  import tool from "@/utils/tool";
  import { FullScreen, ChatDotRound, ArrowDown } from "@element-plus/icons-vue";
  const router = useRouter();
  const userStore = useUserStore();
  const user=userStore.getUser();
  const msgList = reactive([
    {
      id: 1,
      type: "user",
      avatar: "img/avatar.jpg",
      title: "Feiyt",
      describe: "如果喜欢就点个星星支持一下哦",
      link: "https://github.com/feiyit/soaui",
      time: "5分钟前",
    },
    {
      id: 2,
      type: "user",
      avatar: "img/avatar2.gif",
      title: "Tyland",
      describe: "点进去Gitee获取最新开源版本",
      link: "https://github.com/feiyit/soaui",
      time: "14分钟前",
    },
  ]);
  const msg = ref(false);
  const screen = () => {
    tool.fullscreen.enterFullscreen(document.documentElement);
  };
  const showMsg = () => {
    msg.value = true;
  };

  const handleCommand = (command: string | number | object) => {
    if (command == "uc") {
      router.push({ path: "/usercenter" });
    }
    if (command == "clearCache") {
      ElMessageBox.confirm(
        "清除缓存会将系统初始化，包括登录状态、主题、语言设置等，是否继续？",
        "提示",
        {
          type: "info",
        }
      )
        .then(() => {
          tool.localService.clear();
          userStore.clearUser();
          router.push({ path: "/login" });
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch(() => {
          //取消
        });
    }
    if (command == "outLogin") {
      ElMessageBox.confirm("确认是否退出当前用户？", "提示", {
        type: "warning",
        confirmButtonText: "退出",
        confirmButtonClass: "el-button--danger",
        cancelButtonText: '取消',
      })
        .then(() => {
          tool.localService.clear();
          userStore.clearUser();
          router.push("/login")
        })
        .catch(() => {
          //取消退出
        });
    }
  };
</script>

<style scoped>
  .user-bar {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .user-bar .panel-item {
    padding: 0 10px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .user-bar .panel-item i {
    font-size: 16px;
  }
  .user-bar .panel-item:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .user-bar .user-avatar {
    height: 49px;
    display: flex;
    align-items: center;
  }
  .user-bar .user-avatar label {
    display: inline-block;
    margin-left: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  .msg-list li {
    border-top: 1px solid #eee;
  }
  .msg-list li a {
    display: flex;
    padding: 20px;
  }
  .msg-list li a:hover {
    background: #ecf5ff;
  }
  .msg-list__icon {
    width: 40px;
    margin-right: 15px;
  }
  .msg-list__main {
    flex: 1;
  }
  .msg-list__main h2 {
    font-size: 15px;
    font-weight: normal;
    color: #333;
  }
  .msg-list__main p {
    font-size: 12px;
    color: #999;
    line-height: 1.8;
    margin-top: 5px;
  }
  .msg-list__time {
    width: 100px;
    text-align: right;
    color: #999;
  }

  .dark .msg-list__main h2 {
    color: #d0d0d0;
  }
  .dark .msg-list li {
    border-top: 1px solid #363636;
  }
  .dark .msg-list li a:hover {
    background: #383838;
  }
</style>
