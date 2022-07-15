<template>
    <div class="like">
      <van-nav-bar
        title="我的收藏"
        left-text="返回"
        left-arrow
        fixed
        @click-left="back"
      />

      <div class="bg"></div>

      <div class="clearfix" v-if="likeProduct.length > 0">
          <div class="like-item" v-for="(item,index) in likeProduct" :key="index" >
            <div class="product-item" >
                <div class="img" @click="goDetail(item.pid)">
                    <img class="auto-img" :src="item.smallImg" alt="">
                </div>

                <div class="pro-name">{{item.name}}</div>
                <div class="pro-enname">{{item.enname}}</div>
                <div class="bottom">
                    <div class="pro-price">￥{{item.price}}</div>
                    <div class="delete" @click="removeLikeProduct(item.pid,index)">
                        <van-icon name="delete" />
                    </div>
                </div>
            </div>
          </div>
      </div>
      <div v-else>
          <van-empty description="没有收藏商品" />
      </div>
    </div>
</template>

<script>
    import "../assets/less/like.less";
    export default {
        data(){
            return{
                likeProduct: [],
                
            }
        },
        created(){
            //获取收藏商品
            this.getLikeProduct();
        },
        methods:{
            back() {
                this.$router.go(-1);
            },
            //获取收藏商品
            getLikeProduct() {
            let tokenString = localStorage.getItem("_tk");

            if (!tokenString) {
                //跳回登录页面
                this.$toast("请先登录");
                return this.$router.push({ name: "Login" });
            }

            this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0,
            });

            this.axios({
                method: "GET",
                url: "/findAllLike",
                params: {
                appkey: this.appkey,
                tokenString,
                },
            })
                .then((result) => {
                this.$toast.clear();
                
                if (result.data.code == 700) {
                    //token检验无效,则跳到登录页面
                    this.$router.push({ name: "Login" });
                } else if (result.data.code == 2000) {
                    this.likeProduct = result.data.result;
                    // console.log("收藏商品数据 =>",this.likeProduct);
                }
                })
                .catch((err) => {
                this.$toast.clear();
                
                });
            },
            // 查看商品详情
            goDetail(pid) {
                this.$router.push({name: 'Detail', params: {pid}});
            },

            //删除收藏商品
            removeLikeProduct(pid, index) {
            //获取token
                let tokenString = localStorage.getItem('_tk');
                // 
                if (!tokenString) {
                //跳回登录页面
                this.$toast('请先登录');
                return this.$router.push({name: 'Login'});
                }

                this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                duration: 0
                });

                //发起收藏商品请求
                this.axios({
                method: 'POST',
                url: '/notlike',
                data: {
                    appkey: this.appkey,
                    pid,
                    tokenString
                }
                }).then(result => {
                this.$toast.clear();
                
                if (result.data.code == 700) {
                    //token检验无效,则跳到登录页面
                    this.$router.push({name: 'Login'});
                } else if (result.data.code == 900) {
                    this.$toast('删除成功');
                    this.likeProduct.splice(index, 1);
                } else {
                    this.$toast('删除失败');
                }

                
                }).catch(err => {
                this.$toast.clear();
                
                })
            },
            // 移除收藏
            remove(){
                this.$emit('remove');
            }
        }
    }
</script>

<style lang="less" scoped>

</style>