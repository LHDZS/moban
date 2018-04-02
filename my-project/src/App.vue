<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
#app {
  // width: 100%;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  margin-left: 50px;
  width: 320px;
  // -webkit-box-sizing: border-box;
  // -moz-box-sizing: border-box;
  // box-sizing: border-box;
  // background: #fff;
  // padding-bottom: auto;
  // margin-bottom: 24px;
}
</style>
