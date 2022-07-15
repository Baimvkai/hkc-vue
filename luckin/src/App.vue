<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less">
  //预设样式
  .auto-img{
    width: 100%;
    height: auto;
    display: block;  
  }
  body{
    background-color: #f7f8fa;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #646566;
  }
  .clearfix::after{
    content: "";
    display: block;
    clear: both;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }

  .one-text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
