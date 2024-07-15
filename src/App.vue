<template>
  <router-view />
  <!-- 渲染当前路由匹配的组件 -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif; /* 页面全局字体样式 */
  -webkit-font-smoothing: antialiased; /* 提升字体渲染的平滑度，适用于WebKit浏览器 */
  -moz-osx-font-smoothing: grayscale; /* 提升字体渲染的平滑度，适用于Mac OS X平台 */
  text-align: center; /* 将页面文本内容居中对齐 */
  color: #2c3e50; /* 页面文本颜色 */
}

nav {
  padding: 30px; /* 导航栏上下内边距 */
}

nav a {
  font-weight: bold; /* 导航链接字体加粗 */
  color: #2c3e50; /* 导航链接默认颜色 */
}

nav a.router-link-exact-active {
  color: #42b983; /* 当前激活导航链接的颜色 */
}
</style>
