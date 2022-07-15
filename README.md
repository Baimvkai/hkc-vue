### 第一章开发工具
1. vscode 进行开发  
2. 左边侧边栏 - 选择最后一个图标
    + chinese   (vscode的汉化插件)
    + live server   (快速启动html)
        + alt + l + o  快捷键
    + Vetur    (vue语法高亮)
    + vue vscode snippets   (快速 .vue模版)  
# 第二章 vue基础
###  [vue简介](https://cn.vuejs.org)
+ javascript框架
+ 简化Dom操作
+ 响应式数据驱动 (页面由数据生成)   
    + 视图响应式框架 bootstrap
    + 数据响应式框架 vue
### 第一个vue程序
+ [官方文档](https://cn.vuejs.org)
+ 导入开发版本的Vue.js
+ 创建Vue实例对象，设置el属性和data属性
+ 使用简洁的模板语法把数据渲染到页面上
### el: 挂载点
1. vue实例的作用范围: el命中的元素内部
    + 外部无法使用
    + 后代可以使用
2. 可以使用其他的css选择器, 但建议使用唯一的id选择器
3. 可以使用其他的html标签, 只能支持双标签, 除了html和body
#### data: 数据对象
1. 页面的初始数据
    + 对象、数组, 以字符串形式直接展示
    + 可以用 数组[下标] 或 对象.属性 语法, 获取属性值
    + 对象的.语法
    + 数组的索引语法
### vue指令
1. 内容绑定、事件绑定
    + v-text: 设置标签的文本值 (textContent, innerText)
        ```
        <!-- html:  -->
        <h2 v-text="msg">test</h2> // 里面的文本会被覆盖
        <h2 v-text="msg+'支持表达式'">test</h2> // 支持表达式
        
        <!-- js -->
        data: {
            msg: "hello Vue"
        },
        ```
    + v-html: 设置标签的innerHTML
        ```
        <!-- html:  -->
        <p v-html="content"></p> // 标签可以被解析, 同innerHTML
        <p v-text="content"></p> // 标签不可以被解析, 同textContent
        
        <!-- js -->
        data: {
            content: "<i>粤嵌程序员</i>"
        },
        ```
    + v-on: 为元素绑定事件
        ```
        <!-- html:  --> 
        <input type="button" value="按钮" v-on:事件名="方法">
        <input type="button" value="按钮" v-on:click="doIt">

        <input type="button" value="按钮" @事件名="方法">
        <input type="button" value="按钮" @click="doIt">
        
        <h2 @click="changeCourse">{{course}}</h2>
        
        <!-- js -- >
        // vue实例中的数据
        data: {
            course: "web前端开发"
        },
        // 事件方法的集合 methods[ˈmɛθədz]
        methods: {
            // 触发事件
            doIt: function(){
                console.log("做it");
            }
            // 通过事件改变元素的值 
            changeCourse: function(){
                // this指向vue实例, 属性是实例的属性, 方法是实例的方法
                // console.log(this)
                this.course = "ui视觉设计"
            }
        }
        ```
2. 显示切换、属性绑定
    + v-show: 根据表达式的真假, 切换元素的显示隐藏
        + true显示, false隐藏
        + 支持表达式
        + 指令后面的内容, 最终都会解析成boolean类型
        + 本质是修改元素的 display:none; 样式
    ```
    <!-- html: -->
    <div id="app">
        <button @click="changeIsShow">按钮</button>
        <p v-show="true">可见</p>
        <p v-show="isShow">可见</p>
        <p v-show="age>=18">付费内容</p>
    </div>

    <!-- js: -->
    // 页面初始数据
    data: {
        isShow: true,
        age: 16
    },
    // 事件方法的集合
    methods: {
        // 切换显示状态
        changeIsShow: function(){
            this.isShow=!this.isShow;
        }
    }
    ```
    + v-if: 根据表达式的真假, 切换元素的显示隐藏
        + true显示, false隐藏
        + 支持表达式
        + 指令后面的内容, 最终都会解析成boolean类型
        + 本质是操作元素自身, 元素的添加和移除
    ```
    <!-- html: -->
    <div id="app">
        <button @click="changeIsShow">按钮</button>
        <p v-if="true">可见</p>
        <p v-if="isShow">可见</p>
        <p v-if="age>=18">付费内容</p>
    </div>

    <!-- js: -->
    // 页面初始数据
    data: {
        isShow: true,
        age: 16
    },
    // 事件方法的集合
    methods: {
        // 切换显示状态
        changeIsShow: function(){
            this.isShow=!this.isShow;
        }
    }
    ```   
    + v-bind: 设置元素的属性
        + v-bind:属性名 = "表达式" 
        + 可简写为 :属性名 = "表达式" 
    ```
    <!-- css -->
    .active{
        border: 1px solid red;
    }
    img{
        width: 120px;
    }

    <!-- html -->
    <!-- 设置元素属性 -->
    <img v-bind:src="imgSrc" v-bind:title="title">
    <!-- 简写为  -->
    <img :src="imgSrc" :title="title">
    <br>
    <button @click="toggleActive">切换高亮显示</button>
    <!-- 三目运算 -->
    <img :class="isActive ? 'active' : ''" :src="imgSrc" :title="title">
    <!-- 属性值是否生效取决于属性值的布尔值 [建议使用这种方式] -->
    <img :class="{active:isActive}" :src="imgSrc" :title="title">

    <!-- js -->
    // 页面初始数据
    data: {
        imgSrc: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
        title: "百度知道",
        isActive: true
    },
    // 事件方法的集合
    methods: {
        // 切换高亮显示
        toggleActive: function(){
            this.isActive = !this.isActive
        }
    } 
    ```
3. 列表循环, 表单元素绑定
    + v-for: 根据数据生成列表的结构
        + 把元素和它里面的内容, 按照列表的长度生成若干份
        + 语法: 
            - v-for="item in arr"
            - v-for="(item,index) in arr"
            - item,index 可以配合其他指令使用, 比如 v-bind v-text等
            - item如果是对象, 支持 .语法
            - 数组长度的更新会同步到页面上, 数据响应式
    + v-on: 传递自定义参数, 事件修饰符
        + 事件绑定的方法写成函数调用的形式, 可以传入自定义参数, 写法同函数传参
        + 事件修饰符: 触发事件时, 事件后面跟上 .修饰符 可以对事件进行限制:
            - .stop - 调用 event.stopPropagation()。
            - .prevent - 调用 event.preventDefault()。
            - .capture - 添加事件侦听器时使用 capture 模式。
            - .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
            - .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
            - .native - 监听组件根元素的原生事件。
            - .once - 只触发一次回调。
            - .left - (2.2.0) 只当点击鼠标左键时触发。
            - .right - (2.2.0) 只当点击鼠标右键时触发。
            - .middle - (2.2.0) 只当点击鼠标中键时触发。
            - .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
        + 语法: 
            - v-on:事件名.修饰符="事件处理函数(参数1, 参数2, ...)"
            - @事件名.修饰符="事件处理函数(参数1, 参数2, ...)"
    + v-model: 获取和设置**表单元素**的值(双向数据绑定) 
        + v-model指令的作用是便捷的设置和获取**表单元素**的值
        + 绑定的数据会和表单元素的值相关联
        + 绑定的数据和表单元素的值 双向数据绑定
        ```
        <!-- html -->
        <input type="button" value="修改msg" @click="setM">
        <input type="text" v-model="message" @keyup.13="getM">
        
        <!-- <h2 v-text="message"></h2> -->
        <h2>{{message}}</h2>

        <!-- js -->
        data: {
            message: "粤嵌"
        },
        methods:{
            getM: function(){
                alert(this.message)
            },
            setM: function(){
                this.message = "仲恺"
            }
        }
        ```


