<template>
    <div class="detail">
        <!-- 顶部导航栏 begin -->
        <div class="navbar">
            <van-nav-bar
              title="商品详情"
              left-text="返回"
              left-arrow
              @click-left="back"
              fixed
              
            />
        </div>
        <!-- 顶部导航栏 end -->

        <!-- 商品信息 begin -->
        <div class="productInfo">
            <div class="img">
                <img class="auto-img" :src="detail.large_img" alt="">
            </div>

            <!-- 商品数据 -->
            <div class="detailInfo">
                <!-- 标题 -->
                <div class="title">
                    <div>
                        <span>{{detail.name}}</span>
                        <span class="price">￥{{detail.price}}</span>
                    </div>
                    <div class="en">
                        {{detail.enname}}
                    </div>
                </div>
                <!-- 规格 -->
                <div class="rule">
                    <div 
                      class="item" 
                      v-for="(item,index) in detail.rules"
                      :key="index">
                        <div class="desc">{{item.title}}</div>
                        <ul>
                            <li 
                              v-for="(choice,value) in item.rule" 
                              :class="{active: item.ruleIndex == value}" 
                              :key="value"
                              @click="toggleruleIndex(item,value)"
                            >
                                {{choice}}
                            </li>
                        </ul>
                    </div>

                </div>
                <!-- 数量 -->
                <div class="number">
                    <div>选择数量</div>
                    <div class="count">
                        <van-stepper 
                          theme="round" 
                          v-model="count"
                          button-size="20px"
                        />
                    </div>
                </div> 
                <!-- 描述 -->
                <div class="content">
                    <div class="describe">
                        商品描述    
                    </div>
                    <ul>
                        <li
                          v-for="(item,index) in detail.desc"
                          :key="index"
                        >{{index+1}}、{{detail.desc[index]}}</li>
                        
                    </ul>
                </div>
            </div>
            <!-- 商品导航 -->
            <div class="good-action">
                <van-goods-action>
                    <van-goods-action-icon :color="shopbagCount ? '#0b34ba':'#666'" icon="bag" text="购物袋" :badge="shopbagCount" @click="goShopbag"/>
                    <van-goods-action-icon :color="isLike ? '#0b34ba':'#666'" icon="like" :text="isLike ? '已收藏':'未收藏'" @click="likeProduct"/>
                    <van-goods-action-button 
                        color="#6a91ec" 
                        type="warning" 
                        text="加入购物车" 
                        @click="inShopbag" />
                    <van-goods-action-button 
                        color="#0b34ba" 
                        type="danger" 
                        text="立即购买" />
                </van-goods-action>
            </div>

        </div>

    </div>
</template>

<script>
    import "../assets/less/detail.less"
    export default {
        data(){
            return{
                // 商品数量
                count: 1,
                // 存放商品信息
                detail: {},
                pid: "",
                // 存放购物袋信息
                shopbagInfo: "",
                // 是否收藏
                isLike: false,
                // 购物车商品数量
                shopbagCount: "",
                // 作为传递给购物袋的规格参数
                rule: ""
            };
        },
        created(){
            // console.log("商品pid =>",this.$route.params.pid);
            var pid = this.$route.params.pid || this.$route.query.pid;
            this.pid = this.$route.params.pid || this.$route.query.pid;
            // 进入详情页面，需要用商品id 获取商品数据
            this.getProductDetailByPid(pid);

            // 进入页面，查询当前的商品是否有被收藏
            this.queryLikeProduct();

            // 进入页面，查看当前购物车商品总数量
            this.getshopbagCount();
            
        },
        // 事件对象集合
        methods: {
            // 返回上一个页面
            back(){
                this.$router.go(-1);
            },
            // 切换商品规格
            toggleruleIndex(item,value){
                // 改变索引号以实现切换商品规格
                item.ruleIndex = value
                
                // console.log(item.ruleIndex);
            },
            // 通过商品id获取商品详情的方法
            getProductDetailByPid(pid){
                this.$toast.loading({
                    message: "加载中...",
                    forbidClick: true,
                    duration: 0
                })

                this.axios({
                    url: "/productDetail",
                    method: "GET",
                    params: {
                        appkey:this.appkey,
                        pid
                    }
                })
                .then(res=>{ 
                    this.$toast.clear();
                    if(res.data.code == 600){
                        // console.log("商品详情 =>", res.data.result[0]);
                        // 把返回的值赋值给data
                        let data = res.data.result[0];
                        // 1. 商品描述（desc）字段，需要切割成数组（长度为3的数组）
                        data.desc = data.desc.split('\n');
                        console.log(data);
                        // 2. 新建一个配置数组，对象数组[{},{},{},{}]
                        let rules = [];
                        // 要配置的规格
                        let ruleData = ["cream","milk","sugar","tem"];
                        // 3. 遍历四个规格
                        ruleData.map((v)=>{
                            // 每一个规格都是一个对象
                            let o = {};
                            o.title = data[v+"_desc"];
                            o.ruleIndex = 0;
                            // 配置项
                            o.rule = [];

                            let ruleStr = data[v].split("/");
                            ruleStr.map((val)=>{
                                if(val != ""){
                                    o.rule.push(val)
                                }
                            });

                            if(o.rule.length != 0){
                                rules.push(o);
                            }
                        });
                        data.rules = rules;
                        this.detail = data;
                        // console.log("全局变量detail =>",this.detail);
                    }
                })
                .catch(err=>{
                    this.$toast.clear();
                    console.log("err =>", err);
                })
                
            },
            // 收藏商品的方法
            likeProduct(){
                // 1.判断是否有登录（登录就收藏，没登录则跳转到登录界面）
                let tokenString = localStorage.getItem("_tk");

                // 如果没有token，则跳转到登录页面
                if(!tokenString){
                    this.$toast("还未登录，请先登录");
                    this.$router.push({
                        name: "Login",
                        query: {pid:this.pid}
                    })
                    return false;
                }

                // 如果登录了，查看当前商品是否被收藏过
                // 如果没有被收藏，则收藏商品
                if(!this.isLike){
                    this.axios({
                        url: "/like",
                        method: "POST",
                        data: {
                            appkey: this.appkey,
                            pid: this.pid,
                            tokenString,
                        }
                    })
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code == 700){
                            this.$toast("请重新登录");
                            // token过期或者token被篡改，需要重新登录
                            this.$router.push({
                                name:"Login"
                            })
                        }
                        else if(res.data.code == 800){
                            this.isLike = true
                        }
                    })

                }
                // 如果收藏过，取消收藏
                else{
                    this.axios({
                        url: "/notlike",
                        method: "POST",
                        data: {
                            appkey: this.appkey,
                            pid: this.pid,
                            tokenString,
                        }
                    })
                    .then(res=>{
                        console.log(res);
                        if(res.data.code == 900){
                            this.isLike = false
                        }
                    });
                }
            },

            // 在收藏商品之前，先判断当前商品是否被收藏过
            queryLikeProduct(pid){
                // 或企业token，查看是否登录
                let tokenString = localStorage.getItem("_tk")
                // 如果没有登录，不用查询是否被收藏
                if(!tokenString){
                    return false;
                }

                this.axios({
                    url:"/findlike",
                    method: "GET",
                    params: {
                        appkey: this.appkey,
                        pid: this.pid,
                        tokenString
                    }
                })
                .then(res =>{
                    console.log("查询收藏商品接口 =>",res.data);
                    
                    if(res.data.result.length){
                        // 当前商品有被收藏过
                        this.isLike = true;
                    }else{
                        // 没被收藏过
                        this.isLike = false;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            },

            // 加入购物袋的方法
            inShopbag(){
                // 1.判断是否有登录（登录就添加购物袋，没登录则跳转到登录界面）
                let tokenString = localStorage.getItem("_tk");

                // 如果没有token，则跳转到登录页面
                if(!tokenString){
                    this.$toast("还未登录，请先登录");
                    this.$router.push({
                        name: "Login",
                        query: {pid:this.pid}
                    })
                    return false;
                }
                // 登录了则添加到购物袋
                else{
                    // 循环遍历商品每一项规格
                    for(let i=this.detail.rules.length - 1; i >= 0; i--){
                        // 获取当前规格的索引号 
                        let index = this.detail.rules[i].ruleIndex;

                        // 根据获取到的索引号打印当前规格
                        // console.log(this.detail.rules[i].rule[index]);

                        // 拼接字符串获得传递参数
                        if(i){
                            this.rule = this.rule + this.detail.rules[i].rule[index] + "/";
                        }
                        else{
                            this.rule += this.detail.rules[i].rule[index];
                        }
                        
                    }
                    // 打印拼接的字符串
                    // console.log(this.rule);
                    this.axios({
                        url: "/addShopcart",
                        method: "POST",
                        data: {
                            pid: this.pid,
                            count: this.count,
                            rule: this.rule,
                            appkey: this.appkey,
                            tokenString
                        }
                    })
                    .then(res=>{
                        // console.log("添加购物袋 =>", res);
                        if(res.data.code == 3000){
                            this.shopbagInfo = res.data;    
                            this.$toast.success("添加购物车成功");
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }

            },
            // 前往购物袋的方法
            goShopbag(){
                this.$router.push({
                    name:"Shopbag"
                })
            },
            // 统计购物袋有几件商品
            getshopbagCount(){

                let tokenString = localStorage.getItem("_tk");
                this.axios({
                    url:"shopcartCount",
                    method: "GET",
                    params: {
                        appkey: this.appkey,
                        tokenString
                    }
                })
                .then(res=>{
                    console.log("购物袋商品总数量",res);
                    this.shopbagCount = res.data.result;
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>