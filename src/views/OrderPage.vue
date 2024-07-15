<!-- OrderPage.vue -->
<template>
  <div class="order-container">
    <h2>下单页面</h2>
    <!-- 商品选择下拉框 -->
    <el-select
      v-model="selectedProduct"
      placeholder="请选择商品"
      @change="fetchProductStock"
    >
      <!-- 循环渲染商品选项 -->
      <el-option
        v-for="product in products"
        :key="product.id"
        :label="product.name"
        :value="product.id"
      ></el-option>
    </el-select>
    <!-- 显示当前商品库存和描述 -->
    <p v-if="selectedProduct">
      当前库存：{{ currentStock }}<br />商品描述：{{ description }}
    </p>
    <!-- 数量输入框 -->
    <el-input
      v-model="quantity"
      type="number"
      :min="1"
      :max="currentStock"
      placeholder="数量"
    ></el-input>
    <!-- 下单按钮 -->
    <el-button type="primary" @click="placeOrder">购买</el-button>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      selectedProduct: "", // 当前选中的商品
      products: [], // 商品列表
      currentStock: 0, // 当前商品库存
      description: "", // 商品描述
      quantity: 1, // 购买数量，默认为1
    };
  },
  computed: {
    ...mapState(["userId"]), // 将 Vuex 的 state 中的 userId 映射为本地计算属性
  },
  mounted() {
    this.fetchProducts(); // 组件挂载时获取商品列表
  },
  methods: {
    // 获取商品列表
    fetchProducts() {
      axios
        .get("http://localhost:8080/orders/products")
        .then((response) => {
          this.products = response.data; // 将获取到的商品列表存储到本地数据中
        })
        .catch((error) => {
          console.error("获取商品列表失败：", error); // 打印获取商品列表失败的错误信息
        });
    },
    // 获取选中商品的库存信息和描述
    fetchProductStock() {
      if (this.selectedProduct) {
        axios
          .get(`http://localhost:8080/orders/products/${this.selectedProduct}`)
          .then((response) => {
            this.currentStock = response.data.stock; // 更新当前商品库存信息
            this.description = response.data.description; // 更新商品描述信息
          })
          .catch((error) => {
            console.error("获取商品库存失败：", error); // 打印获取商品库存失败的错误信息
          });
      }
    },
    // 下单方法
    placeOrder() {
      console.log("UserId:", this.userId); // 打印调试信息，确保 userId 存在
      if (this.userId) {
        // 发起下单请求
        axios
          .post("http://localhost:8080/orders/create", null, {
            params: {
              userId: this.userId,
              productId: this.selectedProduct,
              quantity: this.quantity,
            },
          })
          .then(() => {
            this.$message.success("下单成功！"); // 提示下单成功
          })
          .catch((error) => {
            console.error("下单失败：", error); // 打印下单失败的错误信息
            this.$message.error("库存不足，下单失败！"); // 提示库存不足，下单失败
          });
      } else {
        this.$message.error("用户未登录，下单失败！"); // 提示用户未登录，下单失败
      }
    },
  },
};
</script>

<style scoped>
.order-container {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
