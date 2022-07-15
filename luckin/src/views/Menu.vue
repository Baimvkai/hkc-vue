<template>
  <div class="menu">
    <!-- 顶部搜索栏 begin -->
    <div class="search">
      <van-search shape="round" placeholder="请输入商品名称" @focus="searchFocus"/>
    </div>
    <!-- 顶部搜索栏 end -->

    <!-- 分类按钮 begin -->
    <div class="product-options">
      <div
        class="option-items"
        v-for="(item, index) in productOption"
        :key="index"
        @click="toggleMenuIndex(index, item.type)"
      >
        <div class="icon">
          <img
            class="auto-img"
            :src="menuIndex == index ? item.activeIcon : item.inactiveIcon"
            alt=""
          />
        </div>
        <div :class="menuIndex == index ? 'text' : ''">{{ item.title }}</div>
      </div>
    </div>
    <!-- 分类按钮 end -->

    <!-- 分类商品展示 begin -->
    <div class="product-container">
      <div
        v-for="(item, index) in productData"
        :key="index"
        class="product-item"
        @click="goProductDetail(item.pid)"
      >
        <div class="left">
          <div class="image">
            <img class="auto-img" :src="item.smallImg" alt="" />
          </div>
          <div class="text">
            <div class="zh">{{ item.name }}</div>
            <div class="en">{{ item.enname }}</div>
          </div>
        </div>
        <div class="price">￥{{ item.price }}</div>
      </div>
    </div>
    <!-- 分类商品展示 end -->
  </div>
</template>

<script>
import "../assets/less/menu.less";
export default {
  data() {
    return {
      // 当前商品分类的索引
      menuIndex: 0,
      // 定义
      productOption: [
        {
          title: "推荐",
          activeIcon: require("../assets/icons/icons_21.gif"),
          inactiveIcon: require("../assets/icons/icons_09.gif"),
        },
        {
          title: "拿铁",
          activeIcon: require("../assets/icons/icons_19.gif"),
          inactiveIcon: require("../assets/icons/icons_05.gif"),
        },
        {
          title: "咖啡",
          activeIcon: require("../assets/icons/icons_18.gif"),
          inactiveIcon: require("../assets/icons/icons_03.gif"),
        },
        {
          title: "瑞纳冰",
          activeIcon: require("../assets/icons/icons_20.gif"),
          inactiveIcon: require("../assets/icons/icons_07.gif"),
        },
      ],
      productData: [],
    };
  },
  created() {
    this.getProductType();
  },
  methods: {
    goProductDetail(pid) {
      // 跳转到商品详情页面
      this.$router.push({
        name: "Detail",
        query: { pid },
      });
    },
    toggleMenuIndex(index, type) {
      this.menuIndex = index;
      console.log("当前要获取的商品类型是 => ",type);

      this.getProductByType(type);
    },
    getProductType() {
      this.axios({
        url: "/type",
        methods: "GET",
        params: {
          appkey: this.appkey,
        },
      })
        .then((res) => {
          if (res.data.code == 400) {
            console.log(res.data.result);
            let data = res.data.result;
            data.unshift({
              type: "isHot",
              typeDesc: "推荐",
            });

            // [{推荐},{拿铁},{咖啡},{瑞纳冰},{水果茶}]
            // console.log(data);

            // 对商品分类的原数据 productOption 进行处理
            // [{推荐},{拿铁},{咖啡},{瑞纳冰}]
            this.productOption.map((v) => {
              // 遍历data
              for (var val of data) {
                // 用data的每一项 和 v每一项比较
                if (val.typeDesc == v.title) {
                  // 把data的type，赋值给 productOption 的type
                  v.type = val.type;
                  break;
                }
              }
            });
            // 进入页面，获取商品分类之后，根据当前的索引(0)，获取当前分类的商品数据
            let type = this.productOption[this.menuIndex].type;
            // 默认获取热卖推荐的商品数据
            this.getProductByType(type);
            // console.log("商品分类数据 =>",this.productOption);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProductByType(type) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      // 请求参数
      let params = {
        appkey: this.appkey,
      };

      // 根据类型的不同， 请求参数也不同
      if (type == "isHot") {
        (params.key = type), (params.value = 1);
      } else {
        (params.key = "type"), (params.value = type);
      }

      this.axios({
        url: "/typeProducts",
        methods: "GET",
        params,
      })
        .then((res) => {
          this.$toast.clear();
          if (res.data.code == 500) {
            this.productData = res.data.result;
            // console.log("当前分类商品数据 =>",res);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(err);
        });
    },
    //搜索栏获取焦点
     searchFocus() {
       this.$router.push({name: 'Search'});
     } 
  },
};
</script>
