import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

//导入vant组件
import {
  Button,
  Badge,
  NavBar,
  Toast,
  Form,
  Field,
  Icon,
  Popup,
  Tabbar, 
  TabbarItem,
  Search,
  Swipe, 
  SwipeItem,
  SubmitBar,
  Checkbox, 
  CheckboxGroup,
  Stepper,
  GoodsAction, 
  GoodsActionIcon, 
  GoodsActionButton,
  Card,
  Dialog,
  SwipeCell,
  RadioGroup, 
  Radio,
  Cell, 
  CellGroup,
  Uploader,
  Empty,
  AddressList,
  AddressEdit,
  Tab, 
  Tabs,
  List,
} from 'vant';


//注册vant组件
Vue
.use(Button)
.use(Badge)
.use(Toast)
.use(NavBar)
.use(Form)
.use(Field)
.use(Icon)
.use(Popup)
.use(VueAxios, axios)
.use(Tabbar)
.use(TabbarItem)
.use(Search)
.use(Swipe)
.use(SwipeItem)
.use(Checkbox)
.use(CheckboxGroup)
.use(SubmitBar)
.use(Stepper)
.use(GoodsAction)
.use(GoodsActionButton)
.use(GoodsActionIcon)
.use(SwipeCell)
.use(Dialog)
.use(Card)
.use(Radio)
.use(RadioGroup)
.use(Cell)
.use(CellGroup)
.use(Uploader)
.use(Empty)
.use(AddressList)
.use(AddressEdit)
.use(Tab)
.use(Tabs)
.use(List);



// 把appkey添加到vue的原型中
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="

// 配置请求基础路径
axios.defaults.baseURL = "http://www.kangliuyong.com:10002";

// 配置post请求的axios拦截器 => 再发起请求前执行的代码（格式化请求参数）
axios.interceptors.request.use(config =>{
  // console.log("拦截器 =>", config);

  if(config.method == "post"){
      // 格式请求参数
      var paramsString = "";
      for(var key in config.data){
        // 字符串拼接
        paramsString += `${key}=${config.data[key]}&`;
      }
      // 裁切最后一个&符号
      paramsString = paramsString.slice(0, -1);

      // 最终拼接完的结果 赋值给config
      config.data = paramsString;
  }

  // 拦截器必须返回 config
  return config;
})


//定义全局过滤器
//保留小数
Vue.filter('decimal', (v, n = 2) => {
  return v.toFixed(n);
})

//格式化日期
Vue.filter('formatDate', (v, format) => {

  // 
  // 

  //创建日期对象
  let date = new Date(v);

  //格式化年份
  let year = date.getFullYear().toString();
  // 
  if (/(y+)/.test(format)){
    //获取匹配组的内容
    var content = RegExp.$1;
    // 
    format = format.replace(content, year.slice(year.length - content.length));
  }

  // 

  //格式化月份、日份、时、分、秒
  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  // 

  for (let key in o) {
    //创建动态正则表达式
    let reg = new RegExp(`(${key}+)`);
    // 

    if (reg.test(format)) {
      //获取组匹配的内容
      let groupContent = RegExp.$1;
      // 

      format = format.replace(groupContent, o[key] >= 10 ? o[key] : groupContent.length == 2 ? '0' + o[key] : o[key]);
      // 
    }
    
  }

  return format;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
