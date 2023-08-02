import { type Ref, ref } from "vue"
import { defineStore } from "pinia"

export const useAppStore = defineStore('app', {
    /**
     * 存储全局状态
     * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
     * 和 TS 类型推导
    */
    state: () => {
        return {
            count: 0,
            list: [1, 2, 3, 4]
        }
    },
    /**
     * 用来封装计算属性 有缓存功能  类似于computed
     */
    getters: {
        getNum(state) {
            return state.count + 1
        },
        getListCount:(state) => state.list.length,
    },
    /**
     * 编辑业务逻辑  类似于methods
     */
    actions: {

    }

})
