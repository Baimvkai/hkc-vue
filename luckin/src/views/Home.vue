<template>
  <div class="home">
    <!-- 顶部导航栏 begin -->
    <div class="navbar">
      <van-nav-bar>
        <template #left>
          <div class="home-nav">
            <div class="t1" v-if="isAfternood">下午好</div>
            <div class="t1" v-else>上午好</div>
            <div class="t2">{{ userInfo.nickName }}</div>
          </div>
        </template>
        <template #right>
          <van-search shape="round" placeholder="请输入商品名称" @focus="searchFocus"/>
        </template>
      </van-nav-bar>
    </div>
    <!-- 顶部导航栏 end -->

    <!-- 轮播图 begin -->
    <div class="banner">
      <van-swipe @change="onChange">
        <van-swipe-item
          v-for="(item, index) in bannerData"
          :key="index"
          @click="goProductDetail(item.pid)"
        >
          <img class="" :src="item.bannerImg" />
        </van-swipe-item>
        <template #indicator>
          <div class="indicator">
            <div
              v-for="(item, index) in bannerData"
              :key="index"
              class="bullte"
              :class="current == index ? 'active' : ''"
            ></div>
          </div>
        </template>
      </van-swipe>
    </div>
    <!-- 轮播图 end -->

    <!-- 热卖推荐 begin -->
    <div class="hot">
      <div>热卖推荐</div>
    </div>
    <!-- 热卖推荐 end -->

    <!-- 产品 begin -->
    <div class="product">
      <div
        v-for="(item, index) in productData"
        :key="index"
        class="item"
        @click="goProductDetail(item.pid)"
      >
        <div class="top">
          <img class="auto-img" :src="item.smallImg" alt="" />
          <span>hot</span>
        </div>

        <div class="middle">
          <div class="zh">{{ item.name }}</div>
          <div class="en">{{ item.enname }}</div>
        </div>
        <div class="price">￥{{ item.price }}</div>
      </div>
    </div>
    <!-- 产品 end -->
  </div>
</template>

<script>
import "../assets/less/home.less";
export default {
  data() {
    return {
      // 当前轮播图的索引
      current: 0,
      // 轮播图数据
      bannerData: [],
      // 热卖商品数据
      productData: [],
      // 用户信息
      userInfo: {},
      // 当前24小时制时间
      time: 0,
      // 当前时间是否属于下午
      isAfternood: true
    };
  },
  created() {
    // 获取当前时段（上午/下午）
    this.getStatusByTime();
    // 获取轮播图数据
    this.getBannerData();
    // 获取热卖商品数据
    this.getProductData();
    // 查询用户信息
    this.getUserInfo();
  },
  // 事件对象的集合
  methods: {
    // 判断上午还是下午
    getStatusByTime(){
      // 获取当前24小时制时间
      var myTime = new Date;
      this.time = myTime.getHours();
      // console.log("当前时间 =>", this.time);
      if(this.time < 12){
        this.isAfternood = false;
      }
    },
    goProductDetail(pid) {
      // 跳转到商品详情页面
      this.$router.push({
        name: "Detail",
        // params: {pid} 刷新页面，数据丢失
        query: { pid }, // 不会丢失数据
      });
    },
    /* 轮播图索引发生变化执行的函数 */
    onChange(index) {
      this.current = index;
    },
    getBannerData() {
      // 加载数据
      this.$toast.loading({
        message: "加载中...",
        forbidClick: "true",
        duration: 0,
      });

      // 发起请求
      this.axios({
        url: "/banner",
        method: "GET",
        params: {
          appkey: this.appkey,
        },
      })
        .then((res) => {
          this.$toast.clear();

          if (res.data.code == 300) {
            this.bannerData = res.data.result;
            console.log("轮播图数据 =>", res.data.result);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    // 获取商品数据
    getProductData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: "true",
        duration: 0,
      });
      // 发起请求
      this.axios({
        url: "/typeProducts",
        method: "GET",
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((res) => {
          this.$toast.clear();
          // 商品获取成功
          if (res.data.code == 500) {
            this.productData = res.data.result;
            // console.log("热卖推荐数据 =>", res.data.result);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("_tk");

      if (!tokenString) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == "A001") {
            this.userInfo = result.data.result[0];
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //搜索栏获取焦点
    searchFocus() {
      this.$router.push({ name: "Search" });
    },
  },
};
</script>