<template>
  <div class="login">
    <!-- 顶部导航 -->
    <div class="navbar">
      <van-nav-bar right-text="先逛一逛" @click-right="gostate">
        <!-- 插槽 -->
        <template #left>
          <div class="brand">
            <div class="logo">
              <img 
                class="auto-img"
                src="../assets/icons/home_active.png" 
                alt=""
              />
            </div>
            <div class="name">Luckin Coffee</div>
          </div>
        </template>
      </van-nav-bar>
    </div>
    
    <!-- 欢迎回来 -->
    <div class="welcome">
      <h3>欢迎回来!</h3>
      <p>Please login to your accounts</p>
    </div>

    <!-- 登录功能-->
    <div class="form-login">
      <van-form>
        <van-field
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          autocomplete="off"
        />
        <van-field
          v-model="userInfo.password"
          :type="isLoginIptType ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码必须为数字开头"
          :right-icon="isLoginIptType ? 'closed-eye' : 'eye-o'"
          @click-right-icon="toggleLoginIptType"
        />

        <div class="forget">忘记密码?</div>

        <div style="margin: 16px">
          <van-button round block type="info"
            color="#0b34ba" @click="login">登录</van-button>
        </div>

        <div style="margin: 16px">
          <van-button 
            class="register" 
            round block type="default" @click='toggleisShow'>
            注册
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 注册弹出层 -->
    <div class="popup">
      <van-popup  closeable v-model="isShow" position="bottom" :style="{ height: '50%' }">
        <div class="title">
          <div>注册</div>
          
        </div>

        <div class="form-register">
          <van-form>
            <van-field
              v-model="userResigterInfo.phone"
              name="手机号"
              label="手机号"
              placeholder="11位手机号"
              autocomplete="off"
            />

             <van-field
              v-model="userResigterInfo.password"
              :type="isRegisterIptType ? 'password' : 'text'"
              name="密码"
              label="密码"
              placeholder="密码需要字母数字和其他符号"
              :right-icon="isRegisterIptType ? 'closed-eye' : 'eye-o'"
              @click-right-icon="toggleRegisterIptType"
            />

             <van-field
              v-model="userResigterInfo.nickName"
              type="text"
              name="昵称"
              label="昵称"
              placeholder="昵称, 长度为4-8位"
            />

            <div style="margin: 16px">
              <van-button round block type="info"
                color="#0b34ba" @click="register">注册</van-button>
            </div>
          </van-form>
        </div>
      </van-popup>
      
    </div>
  </div>
</template>

<script>
import { Form } from 'vant';
    //导入less样式
    import '../assets/less/login.less';
    //导入表单验证脚本
    import {validForm} from '../assets/js/validForm';

    export default {
        
        //数据对象
        data(){
          return {
            // 登录的数据
            userInfo:{
              phone:"",
              password:""
            },
            // 注册的数据
            userResigterInfo:{
              phone: "",
              password: "",
              nickName: ""
            },
            // 决定弹出层是否显示
            isShow: false,
            // 切换登陆界面密码框的类型 true隐藏密码 fault显示密码
            isLoginIptType: true,
            isRegisterIptType: true,

            // 登录是否有商品id
            pid: ""
          };
        },
        created(){
          this.pid = this.$route.query.pid
        },
        //事件函数集合
        methods:{
          // 切换显示隐藏弹出层
          toggleisShow(){
            // 显示弹出层
            this.isShow = true;
          },
          // 切换隐藏密码的方法（登录）
          toggleLoginIptType(){
            this.isLoginIptType = !this.isLoginIptType;
          },
          // 切换隐藏密码的方法（注册）
          toggleRegisterIptType(){
            this.isRegisterIptType = !this.isRegisterIptType;
          },
          // 登录
          login(){

            // 开启提示框
            this.$toast.loading({
              message: "登陆中",
              forbidClick: true,
              duration: 0
            })

            // 1.表单验证 => 创建一个对象，里面是需要验证的内容和正则规则
            let obj = {
              phone:{
                // 要验证的数据：用户输入的手机号
                value: this.userInfo.phone,
                // 验证的格式：符合正则表达式
                regExp: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
                // 如果验证不通过，提示信息
                errmsg: '手机号码格式不正确'
              },
              // 密码强度验证
              password: {
                // 要验证的数据：用户输入的密码
                value:this.userInfo.password,
                // 验证的格式：符合正则表达式
                regExp:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
                // 如果验证不通过，提示信息
                errmsg: '密码格式不正确'
              }
            }
            // 2.调用验证表单的方法
            let isPass = validForm.valid(obj);

            // 3.如果验证通过，注册账号
            if(isPass){
            
              // 声明一个对象，复制注册信息
              let userInfo = Object.assign({}, this.userInfo);
              userInfo.appkey = this.appkey;

              this.axios({
                url: "/login",
                method: "POST",
                data: userInfo
              })
              // 登录成功
              .then(res => {
                
                // 登录成功，保存令牌
                if(res.data.code == 200){
                  localStorage.setItem("_tk", res.data.token);

                  // 关闭吐司
                  this.$toast.success('登录成功');
                  console.log(res);
                  
                  // 登录成功，返回上一页 
                  this.$router.go("-1")

                  // 如果有pid，则是商品详情跳转过来
                  if(this.pid){
                    this.$router.replace({
                      name: 'Detail',
                      query: {pid:this.pid}
                    })
                  }else{
                    this.$router.push('/')
                  }
                }else{
                  this.$toast.fail('登陆失败');
                  console.log(res);

                }
              })
              // 登陆失败
              .catch(err => {
                // 关闭吐司
                this.$toast.clear();                
                console.log(err)
              })
            }

            
          },

          //注册
          register(){
            // 1.创建
            let userInfoObj = {
              phone:{
                value: this.userResigterInfo.phone,
                regExp: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
                errmsg: '手机号码格式不正确'
              },
              password:{
                value:this.userResigterInfo.password,
                regExp:/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
                errmsg: '密码格式不正确'
              },
              nickName:{
                value: this.userResigterInfo.nickName,
                regExp:/^[a-zA-Z0-9_-]{4,8}$/,
                errmsg: '用户名不符合规范'
              }
            }

            // 2. 调用验证表单的方法
            let isPass = validForm.valid(userInfoObj);

            // 3.如果验证通过，注册账号
            if(isPass){
              // 声明一个对象，复制注册信息
              let userResigterInfo = Object.assign({}, this.userResigterInfo);
              userResigterInfo.appkey = this.appkey;
              

              this.axios({
                url: "/register",
                method: "POST",
                // get请求params，post请求data
                //post请求，请求参数需要以URL参数的形式传递
                // 请求参数=值&请求参数=值&请求参数=值
                data: userResigterInfo
                })
                .then(res =>{
                  this.$toast.success();
                  console.log(res);
                })
                .catch(err =>{
                  this.$toast.clear();
                  console.log(err)
                })
              
            }
          },

          //先逛一逛
          gostate(){
            this.$router.push("/home")
          }
        }
    };
</script>
