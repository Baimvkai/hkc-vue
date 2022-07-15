<template>
    <div class="main">

        <!-- 显示内容的路由 -->
        <div>
            <router-view></router-view>
        </div>

        <!-- 底部标签页 -->
        <div class="tabBar">
            <van-tabbar 
                v-model="active" 
                active-color="#0b34ba" 
                inactive-color="#000"
                route
            >
               
                <van-tabbar-item 
                    v-for="(item,index) in tabBarData" 
                    v-bind:key="index" 
                    :name="item.name" 
                    :to="item.path"
                    replace
                >
                    <!-- 底部按钮表达式 -->
                    <span>{{item.title}}</span>

                    <!-- 通过插槽自定义图标 -->
                    <template #icon="props">
                        <img :src="props.active ? item.activeImg : item.inactiveImg" />
                    </template>
                </van-tabbar-item>
                
            </van-tabbar>
        </div>


    </div>
</template>

<script>
    export default {
        // 页面初始数据
        data(){
            return {
                // 底部导航焦点
                active: 0,
                // 定义底部导航栏
                tabBarData: [{
                    // 按钮名称
                    title: "首页",
                    // 选中时图标链接
                    activeImg: require("../assets/icons/home_active.png"),
                    // 未选中的图标链接
                    inactiveImg: require("../assets/icons/home.png"),
                    // 标签名称
                    name: "Home",
                    // 要跳转到到路由的路径
                    path: "/main/home",
                },{
                    title: "菜单",
                    // 选中时图标链接
                    activeImg: require("../assets/icons/menu_active.png"),
                    // 未选中的图标链接
                    inactiveImg: require("../assets/icons/menu.png"),
                    // 标签名称
                    name: "Menu",
                    // 要跳转到到路由的路径
                    path: "/main/menu",
                    
                },{
                    title: "购物袋",
                    // 选中时图标链接
                    activeImg: require("../assets/icons/shopbag_active.png"),
                    // 未选中的图标链接
                    inactiveImg: require("../assets/icons/shopbag.png"),
                    // 标签名称
                    name: "Shopbag",
                    // 要跳转到到路由的路径
                    path: "/main/shopbag",
                },{
                    title: "我的",
                    // 选中时图标链接
                    activeImg: require("../assets/icons/my_active.png"),
                    // 未选中的图标链接
                    inactiveImg: require("../assets/icons/my.png"),
                    // 标签名称
                    name: "My",
                    // 要跳转到到路由的路径
                    path: "/main/my",

                }]
            }
        }
    }
</script>

<style lang="less" scoped>

</style>