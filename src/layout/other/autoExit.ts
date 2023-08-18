import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import tool from "@/utils/tool";

export function useAutoLogout() {
  const router = useRouter();
  const userStore = useUserStore();
  const timeoutDuration = 30 * 60 * 1000; // 设定的超时时长，单位为毫秒
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // 超时时执行的操作，这里我们跳转到登录页面
      ElMessageBox.alert(
        "用户长时间无操作，为保证账户安全，系统已自动登出。",
        "提示",
        {
          showClose: false,
          confirmButtonText: "确定",
          callback: () => {
            tool.localService.clear();
            userStore.clearUser();
            router.push("/login");
          },
        }
      );
    }, timeoutDuration);
  };

  const cancelTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const handleUserInteraction = () => {
    resetTimeout();
  };

  onMounted(() => {
    // 初始化时启动计时器
    resetTimeout();

    // 监听用户交互事件
    window.addEventListener("mousemove", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
  });

  onUnmounted(() => {
    // 组件卸载时清除计时器和事件监听
    cancelTimeout();
    window.removeEventListener("mousemove", handleUserInteraction);
    window.removeEventListener("keydown", handleUserInteraction);
  });
}
