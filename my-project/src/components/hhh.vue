<template>
  <div id="app">
    <div class="TiTle">
        <el-button type="info" @click="shouye" size="mini" >首页</el-button>
        <el-button type="info" @click="fenleia" size="mini" >分类</el-button>
        <el-button type="info" @click="shangpin" size="mini" >商品</el-button>
        <div class="righttwo">
          <el-color-picker v-model="color1"></el-color-picker>
          <div class="array"></div>
        </div>
    </div>
    <div class="shouye" v-if="tab == 1">
      <Title v-on:titl="titls" v-bind:dats="name" keep-alive></Title>
      <swipe v-on:indicatorposition="heidian" v-on:autoplay="lunbo" v-on:speed="speed" keep-alive></swipe>
      <Navigation v-on:naviga="navigas"></Navigation>
      <Preferential v-on:youhui="youhui"></Preferential>
      <div :is="item.component" 
      v-for="(item, index) in items" 
      :key="index"
      @click="shanchu()" 
      :index="index"
      :items="items" 
      v-on:biaoti="biaot"
      v-on:fenlei="fenlei"
      v-on:digital="digital"
      v-on:duoxuan="duoxuan"
      ></div>
      <div class="bottom">
        <button @click="add('Column')">添加商品分组</button>
        <button @click="tijiao()" class="tijiao">提交</button>
        <div class="array"></div>
      </div>
      <div class="tabBar">
        <div class="tabdiv" v-for="(item,key) in tabBar.list" :key="key">
          <img class="tabimg" :src="item.iconPath" alt="">
          <span class="tabspan">{{item.text}}</span>
        </div>
      </div>
    
    </div>
    <div class="classification" v-if="tab == 2">
      <Titletwo></Titletwo>
      <Tabshu v-if="is == 1"></Tabshu>
      <Tabheng v-if="is == 2"></Tabheng>
      <div class="yangshi">
        <el-button type="primary" plain @click="yangshiyi()" :autofocus='true'>样式一</el-button>
        <el-button type="primary" plain @click="yangshier()">样式二</el-button>
      </div>
    </div>
    <div class="commodity" v-if="tab == 3">
      <Title v-bind:dats="namesan"></Title>
      <Theselector v-if="iz == 1"></Theselector>
      <Module v-if="iz == 1"></Module>
      <Moduletwo v-if="iz == 2"></Moduletwo>
      <Modulethree v-if="iz == 3"></Modulethree>
      <div class="yangshi">
        <el-button type="primary" plain @click="yangshitwoyi()" :autofocus='true'>分类一</el-button>
        <el-button type="primary" plain @click="yangshitwoer()">分类二</el-button>
        <el-button type="primary" plain @click="yangshitwosan()">分类三</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from './components/Title'
import Titletwo from './components/Title_two'
import Column from './components/Column'
import Navigation from './components/Navigation'
import Preferential from './components/Preferential'
import Tabshu from './components/Tab_shu'
import Tabheng from './components/Tab_heng'
import Swipe from './components/swipe'
import Theselector from './components/Theselector'
import Module from './components/Module'
import Moduletwo from './components/Module_two'
import Modulethree from './components/Module_three'

export default {
  name: 'App',
  components: {
    Title,
    Titletwo,
    Navigation,
    Preferential,
    Column,
    Tabshu,
    Tabheng,
    Swipe,
    Theselector,
    Module,
    Moduletwo,
    Modulethree
  },
  data () {
    return {
        items: [{component:'Column'}],
        src: 'https://www.xiaoniren.cn',
        tabBar:{
          color: "#999",
          selectedColor: "#d53b33",
          backgroundColor: "#fff",
          borderStyle: "",
          list: [
              {
                  pagePath: "pages/index",
                  text: "首页",
                  iconPath: require(`./assets/shouye.png`),
                  selectedIconPath: "./image/home-active.png"
              },
              {
                  pagePath: "pages/categoryEqually",
                  text: "分类",
                  iconPath: require(`./assets/fenlei.png`),
                  selectedIconPath: "./image/category-active.png"
              },
              {
                  pagePath: "pages/library",
                  text: "购物车",
                  iconPath: require(`./assets/gouwu.png`),
                  selectedIconPath: "./image/lib-active.png"
              },
              {
                  pagePath: "pages/member",
                  text: "我的",
                  iconPath: require(`./assets/wode.png`),
                  selectedIconPath: "./image/member-active.png"
              }
          ]
      },
      list: [],
      arr: [],
      tab: 1,
      is: 1,
      iz: 2,
      name: '店铺首页',
      nametwo: '商品分类',
      namesan: '商品列表',
      // 轮播数据
      shuffling: true,
      point: true,
      speeds: 3000,
      // 商品列表数据
      shale:[],
      moren: {"tag": "\u6807\u98980","flag": 1,"num": 5,"style": ["long"]},
      // 设置默认值
      shuliang:6,
      yangshi:["long","long"],
      flag:[1,2,3,4],
      tag:'商品栏',
      // 导航
      navigaz: [
            {icon:require(`./assets/dianhua.png`),
            name:'成功案例',
            page: "article?id=889"},
            {icon:require(`./assets/kefu.png`),
            name:'公司介绍',
            page: "article?id=888"},
            {icon:require(`./assets/xiaoxi.png`),
            name:'留言薄',
            page: "gbook"},
            {icon:require(`./assets/dianhua.png`),
            name:'地图导航',
            page: "map"}
      ],
      key:[0],
      // tab选择地址
      commodity: 'categorySearch',
      classify: 'categoryInfoTopScroll',
      // 颜色选择器
      color1: null
    }
  },
  updated:function () { 
    // localStorage.setItem('data',JSON.stringify(this.$data));
    
    this.name = JSON.parse(localStorage.getItem('title'))
    // console.log(this.name)
    // this.$data = JSON.parse(localStorage.getItem('data'))
  },
  beforeMount: function () {
    this.name = '哈哈哈'
    this.name = JSON.parse(localStorage.getItem('title'))
  },
  mounted:function () {
    this.name = '哈哈哈'
    this.name = JSON.parse(localStorage.getItem('title'))
  },
  methods: {
    // 样式按钮 
    yangshiyi () {
      this.is = 1
      this.commodity = 'category'
    },
    yangshier () {
      this.is = 2
      this.commodity = 'categorySearch'
    },
    yangshitwoyi () {
      this.iz = 1
      this.classify = 'categoryInfo'
    },
    yangshitwoer () {
      this.iz = 2
      this.classify = 'categoryScrollDetail'
    },
    yangshitwosan () {
      this.iz = 3
      this.classify = 'categoryInfoTopScroll'
    },
    shouye() {
      this.tab = 1
    },
    fenleia () {
      this.tab = 2
    },
    shangpin () {
      this.tab = 3
    },
    // 商品栏样式储存
    fenlei(p,index) {
      if(!this.shale[index]){
        this.shale[index] = {}
      }
      this.shale[index].style = p
    },
    // 商品显示数量储存
    digital(v,index) {  
      if(!this.shale[index]){
        this.shale[index] = {}
      }
      this.shale[index].num = v
    },
    // 商品标签储存
    duoxuan (y,index) {
      if(!this.shale[index]){
        this.shale[index] = {}
      }
      this.shale[index].flag = y
    },
    // 商品标题储存
    biaot(s,index) {
      if(!this.shale[index]){
        this.shale[index] = {}
      }
      this.shale[index].tag = s
    },
    // 页面名字储存
    titls(e) {
      console.log(e)
      this.name = e

      localStorage.setItem('title',JSON.stringify(e));

      
      // this.list['title'] = e;
    },
    // 优惠券储存
    youhui(i) {
      // console.log(i)
      if (this.arr.length < 4) {
        this.arr.push(i)
      }else{
        // for (var j=0;j<this.arr.length;j++) {
          //   console.log(this.arr[j])
          //   console.log(i)
          //   // var bol = true;
          //   // if (bol) {
          //     // if (this.arr[j] == i) {
          //     //   return
          //     // }else{
          //     //   this.arr[j] = i;
          //     // }
          //   // }else{
          //   //   return
          //   // }
        // }
        return
      }
      this.list['prefer'] = this.arr;
    },
    // 轮播图是否轮播储存
    lunbo (e) {
      this.shuffling = e
    },
    // 轮播小点是否显示储存
    heidian (e) {
      this.point = e
    },
    // 轮播速度
    speed(value) {
      this.speeds = value
    },
    // 导航栏九宫格
    navigas(val) {
      this.navigaz = val
    },
    // 提交
    tijiao() {
      // 商品列表
      for (var key in this.key) {
        if (!this.shale[key]) {
          this.shale[key] = {}
        }
        this.shale[key].style = this.shale[key].style ? this.shale[key].style : this.yangshi
        this.shale[key].tag = this.shale[key].tag ? this.shale[key].tag : this.tag
        this.shale[key].flag = this.shale[key].flag ? this.shale[key].flag : this.flag
        this.shale[key].num = this.shale[key].num ? this.shale[key].num : this.shuliang
        
      }
      this.list['flag'] = this.shale
      
      // 轮播图
      this.list['swiper'] = {}
      this.list['swiper']['loop'] = this.shuffling
      this.list['swiper']['dots'] = this.point
      this.list['swiper']['interval'] = this.speeds
      // 导航栏
      this.list['menu'] = this.navigaz
       console.log(this.list)
      //  标题
      this.list['title'] = this.name
      // tab选择
      this.list['router'] = {}
      this.list['router']['category'] = this.classify
      this.list['router']['categoryDetail'] = this.commodity
    },
    // 添加商品分组
    add(component) {
      this.items.push({
        'component': Column
      })
      this.key = []
      for (var key in this.items) {
        this.key.push(key)
      }

      console.log(this.key)
      console.log(this.items)
    },
    shanchu(index){
        this.$refs.child.$emit('shanchu') // 方法1
        this.$refs.child.shanchu(index) // 方法2
    },
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
  width: 320px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  -webkit-box-shadow: 0 0 0 1px #c5c5c5;
  box-shadow: 0 0 0 1px #c5c5c5;
  padding-bottom: auto;
  margin-bottom: 24px;
}
.shouye {
  position: relative;
}
.TiTle {
  border: 0px solid #fff;
  padding: 10px 0;
  position: relative;
}
.tabBar {
  width: 100%;
  height: 50px;
  background-color: #000;
  display: flex;
}
.tabdiv {
  flex: 1;
}
.tabimg {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.tabspan {
  display: block;
  font-size: 10px;
  color: #fff;
}
.bottom {
  font-size: 14px;
  color: #666;
  width: 270px;
  position: fixed;
  left: 68%;
  bottom: 10px;
  padding: 12px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  z-index: 9999;
}
input {
  text-indent:1em;
  color: #999;
  border-radius: 5px;
  border:1px solid #DBDBDB;
}
.array {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent #d1d1d1 transparent transparent;
  position: absolute;
  left: -8px;
  top: 8px;
}
.array::after {
  content: "";
 width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent #f8f8f8 transparent transparent;
  position: absolute;
  left: 2px;
  top: -6px;
}
// 商品分类
.classification {
  position: relative;
}
.yangshi {
  position: absolute;
  top: 100px;
  right: -310px;
}
// 商品列表
.commodity {
  position: relative;
}
// input组件
.el-input-number--mini .el-input__inner {
    padding-left: 22px;
    padding-right: 35px;
}
.righttwo {
  font-size: 14px;
  color: #666;
  width: 260px;
  position: absolute;
  right: -310px;
  top: 0px;
  padding: 0px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
}
</style>
