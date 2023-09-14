import * as crypto from "crypto-js";

interface StorageService {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
}

const sessionService: StorageService = {
  set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove(key: string): void {
    sessionStorage.removeItem(key);
  },
  clear(): void {
    sessionStorage.clear();
  },
};

const localService: StorageService = {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  clear(): void {
    localStorage.clear();
  },
};

interface FullscreenFunction {
  enterFullscreen(element: HTMLElement): void;
  exitFullscreen(): void;
  isFullscreen(): boolean;
}
const fullscreen: FullscreenFunction = {
  enterFullscreen(element: HTMLElement): void {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // Internet Explorer
      element.msRequestFullscreen();
    }
  },
  exitFullscreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // Internet Explorer
      document.msExitFullscreen();
    }
  },
  isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  },
};

function objCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function objKeySort(arys: any) {
  let newkey = Object.keys(arys).sort();
  let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  let resStr = "";
  for (const key in newObj) {
    if (newObj[key]) {
      resStr += key + newObj[key];
    }
  }
  return resStr;
}

function dateFormat(date: Date, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
  const o: Record<string, number> = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k].toString()
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
}

function groupSeparator(num: string) {
  num = num + "";
  if (!num.includes(".")) {
    num += ".";
  }
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ",";
    })
    .replace(/\.$/, "");
}

interface EncryptionService {
  md5(input: string): string;
  base64Encode(input: string): string;
  base64Decode(input: string): string;
  aesEncrypt(input: string, key: string, iv: string): string;
  aesDecrypt(input: string, key: string, iv: string): string;
}
const encryptionService: EncryptionService = {
  md5(input: string): string {
    return crypto.MD5(input).toString();
  },
  base64Encode(input: string): string {
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(input));
  },
  base64Decode(input: string): string {
    return crypto.enc.Base64.parse(input).toString(crypto.enc.Utf8);
  },
  aesEncrypt(input: string, key: string, iv: string): string {
    const encrypted = crypto.AES.encrypt(input, key, { iv }).toString();
    return encrypted;
  },
  aesDecrypt(input: string, key: string, iv: string): string {
    const decrypted = crypto.AES.decrypt(input, key, { iv }).toString(
      crypto.enc.Utf8
    );
    return decrypted;
  },
};

const tool = {
  sessionService,
  localService,
  fullscreen,
  objCopy,
  dateFormat,
  groupSeparator,
  encryptionService,
};

export default tool;
