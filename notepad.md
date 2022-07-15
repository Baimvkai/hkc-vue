## 安装node
1. 去[官网](http://nodejs.cn/)下载node
2. 正常安装, 不需要自动安装所需项目
3. 安装完成, 通过检测版本 node -v 查看是否安装成功
4. 如果显示报错, 则是环境变量出现问题, 需要在控制面板 - 系统 - 高级系统设置 - 环境变量 => 配置环境
> 如果还不行的话, 那么我们就卸载重装, 直到它自动配上环境(安装过程第四个就是配置环境变量)

## 安装vue/cli
+ 在系统变量中安装Vue脚手架工具vue-cli
    - npm install -g @vue/cli
+ 卸载
    - npm uninstall -g @vue/cli
+ 步骤如下: 
    1. 全局安装vue/cli: npm install -g @vue/cli
    2. 如果不行装淘宝镜像: npm install -g cnpm --registry=https://registry.npmmirror.com
    3. 然后再: cnpm install -g @vue/cli
    4. 然后通过检测版本: vue -V  查看是否安装成功
    5. vue/cli 安装完成
    6. 创建项目: vue create 项目名字
        + 不默认(default)安装, 选择第三个自定义安装(变蓝色)
        + 用空格选中以下选项, 然后回车
            - Choose Vue version (vue2)
            - Babel
            - Router
            - Vuex
            - CSS Pre-processors
        + 后面除了选择less以外  可以一路回车 (不把配置写进 project.json, 每次都手动配置)
    7. 进入项目目录, 运行项目
        + cd 项目名称
        + npm run serve
    8. 在浏览器打开 localhost:端口号

## 安装 [vant](https://youzan.github.io/vant/v2/) 
+ 安装vant: npm i vant@latest-v2 -S
+ 安装按需导入vant组件插件 cnpm i babel-plugin-import -D
+ 报错就用这个: cnpm babel-plugin-import --save-dev
``` 
  <!-- 在babel.config.js文件添加以下代码 -->
  module.exports = {
    plugins: [
      ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }, 'vant']
    ]
  }

<!-- 在main.js写入以下代码 -->
  <!-- 导入vant框架的组件 -->
  import { Button } from 'vant'
  <!-- 全局注册 -->
  Vue.use(Button)

<!-- 测试Button组件 -->
  <van-button type="info">信息按钮</van-button>
```

## 配置px自动转换rem
+ 安装 postcss-pxtorem、lib-flexible插件
    - 安装: npm i postcss-pxtorem lib-flexible --save-dev
    - 或淘宝镜像安装: cnpm i postcss-pxtorem lib-flexible --save-dev
+ 在项目根目录创建postcss.config.js文件，写入一下内容
    ```
    module.exports = {
        plugins: {
        autoprefixer: {
            browsers: ['Android >= 4.0', 'iOS >= 8'],
        },
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*']
        },
        }
    }
    ```
+ 在main.js导入lib-flexible.js
  - 导入: import 'lib-flexible/flexible'
> 页面布局时，需要在iphone6标准屏幕进行布局，这样才可以适配所有屏幕

### MacOs权限问题
+ 运行无权限: sudo chmod 777 项目文件夹/node_modules/.bin/vue-cli-service
+ 无保存权限: sudo chown -R 用户名(我的是Jans) 需要操作的文件夹路径
### 复活项目: 
+ 重新下载依赖: npm i 
+ 运行项目: npm run serve
+ 如果出现: PostCSS plugin postcss-pxtorem requires PostCSS 8. 则是版本问题
    - 重新安装: npm i postcss-pxtorem@5.1.1
    - 再重新运行项目即可
