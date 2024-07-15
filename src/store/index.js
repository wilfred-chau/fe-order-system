import { createStore } from "vuex";

export default createStore({
  state: {
    userId: null, // Vuex 的状态，用于存储用户的唯一标识符
  },
  mutations: {
    // 修改 Vuex 状态的方法，用于设置 userId
    setUserId(state, userId) {
      state.userId = userId; // 将传入的 userId 更新到 state 中
    },
  },
  actions: {
    // 可以添加一些异步操作，如从服务器获取用户信息等
  },
  modules: {
    // 可以根据需要拆分模块
  },
});
