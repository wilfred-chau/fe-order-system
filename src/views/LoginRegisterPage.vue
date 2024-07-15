<!-- LoginRegisterPage.vue -->
<template>
  <div class="login-register-container">
    <!-- 登录注册容器 -->
    <el-tabs v-model="activeTab">
      <!-- Element Plus 的选项卡组件，用于切换登录和注册页面 -->
      <el-tab-pane label="登录" name="login">
        <!-- 登录页面选项卡 -->
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="80px"
        >
          <!-- 登录表单 -->
          <el-form-item label="用户名" prop="username">
            <!-- 用户名表单项 -->
            <el-input v-model="loginForm.username"></el-input>
            <!-- 用户名输入框 -->
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <!-- 密码表单项 -->
            <el-input type="password" v-model="loginForm.password"></el-input>
            <!-- 密码输入框 -->
          </el-form-item>
          <el-form-item>
            <!-- 表单项 -->
            <el-button type="primary" @click="login">登录</el-button>
            <!-- 登录按钮 -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <!-- 注册页面选项卡 -->
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          label-width="80px"
        >
          <!-- 注册表单 -->
          <el-form-item label="用户名" prop="username">
            <!-- 用户名表单项 -->
            <el-input v-model="registerForm.username"></el-input>
            <!-- 用户名输入框 -->
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <!-- 邮箱表单项 -->
            <el-input v-model="registerForm.email"></el-input>
            <!-- 邮箱输入框 -->
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <!-- 密码表单项 -->
            <el-input
              type="password"
              v-model="registerForm.password"
            ></el-input>
            <!-- 密码输入框 -->
          </el-form-item>
          <el-form-item>
            <!-- 表单项 -->
            <el-button type="primary" @click="register">注册</el-button>
            <!-- 注册按钮 -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      activeTab: "login", // 当前激活的选项卡，默认为登录页
      loginForm: {
        username: "", // 登录表单中的用户名
        password: "", // 登录表单中的密码
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ], // 登录表单验证规则：用户名必填
        password: [{ required: true, message: "请输入密码", trigger: "blur" }], // 登录表单验证规则：密码必填
      },
      registerForm: {
        username: "", // 注册表单中的用户名
        email: "", // 注册表单中的邮箱
        password: "", // 注册表单中的密码
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ], // 注册表单验证规则：用户名必填
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }, // 注册表单验证规则：邮箱必填
          {
            type: "email",
            message: "请输入有效的邮箱地址",
            trigger: ["blur", "change"],
          }, // 注册表单验证规则：邮箱格式验证
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }], // 注册表单验证规则：密码必填
      },
    };
  },
  methods: {
    ...mapMutations(["setUserId"]), // 将 Vuex 的 mutation 映射为本地方法

    // 登录方法
    login() {
      axios
        .post("http://localhost:8080/api/auth/login", this.loginForm)
        .then((response) => {
          const token = response.data.token; // 从后端返回的响应中获取 token 字段
          const userId = response.data.userId; // 从后端返回的响应中获取 userId 字段
          localStorage.setItem("token", token); // 将 token 存储到 localStorage
          this.setUserId(userId); // 将 userId 存储到 Vuex 中
          this.$router.push("/order"); // 跳转到订单页
        })
        .catch((error) => {
          console.error("登录失败：", error); // 打印登录失败的错误信息
          this.$message.error("用户名或密码错误"); // 提示用户名或密码错误
        });
    },

    // 注册方法
    register() {
      axios
        .post("http://localhost:8080/users", this.registerForm)
        .then(() => {
          this.$message.success("注册成功"); // 提示注册成功
        })
        .catch((error) => {
          console.error("注册失败：", error); // 打印注册失败的错误信息
          this.$message.error("注册失败，请重试"); // 提示注册失败，请重试
        });
    },
  },
};
</script>

<style scoped>
.login-register-container {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
