/**
 * 全局代码错误捕捉
 * 比如 null.length 就会被捕捉到
 */
interface ErrorHandler {
  init(): void;
}

const errorHandler: ErrorHandler = {
  init(): void {
    window.addEventListener("error", this.handleGlobalError);
  },
  handleGlobalError(event: ErrorEvent): void {
    // 在这里处理错误，例如记录错误到服务器或展示错误信息给用户
    console.error("Global error:", event.error);
  },
};

export default errorHandler;
