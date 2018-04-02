<template>
    <div class="home" @click="hai">
        <div class="TiTle">
        <router-link to="/"><el-button type="info" size="mini">首页</el-button></router-link>
        <router-link to="/classification"><el-button type="info" size="mini">分类</el-button></router-link>
        <router-link to="/commodity"><el-button type="info" size="mini" >商品</el-button></router-link>
        <div class="righttwo">
          <el-color-picker v-model="color2"></el-color-picker>
          <div class="array"></div>
        </div>
        </div>
    <div class="shouye" @scroll="woshishi">
      <Title class="arr" v-on:titl="titls" :color="color2" :showhide="titsh"></Title>
      <swipe class="arr"
      v-on:indicatorposition="heidian" 
      v-on:autoplay="lunbo" 
      v-on:speed="speed" 
      :showhide="swsh"
      :sudu="spe"
      :auto="poi"
      :indi="shuff"
      ></swipe>
      <Navigation class="arr" v-on:naviga="navigas" :mune="navigaz" :showhide="navsh"></Navigation>
      <Preferential v-on:youhui="youhui" :color="color1"></Preferential>
      <div class="columns">
        <div class="arr"
        :is="item.component"
        v-for="(item, index) in items"
        :showhide="colsh"
        :key="index"
        :index="index"
        :items="items"
        :color="color1"
        :item="moren"
        v-on:delChange="delEle"
        v-on:biaoti="biaot"
        v-on:fenlei="fenlei"
        v-on:digital="digital"
        v-on:duoxuan="duoxuan"
        ></div>
        <div :class="bottomFixed == true ? 'boFixed' : 'bottom'">
          <el-button @click="add('Column')">添加商品分组</el-button>
          <div class="array"></div>
        </div>
      </div>
      <div class="Hright">
        <el-button @click="tijiao()" class="tijiao" type="primary" round>提交</el-button>
        <!-- <div class="array"></div> -->
      </div>
      <div class="tabBar">
        <div class="tabdiv" v-for="(item,key) in tabBar.list" :key="key">
          <img class="tabimg" :src="item.iconPath" alt="">
          <span class="tabspan">{{item.text}}</span>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import Title from '../components/Title'
import Column from '../components/Column'
import Navigation from '../components/Navigation'
import Preferential from '../components/Preferential'
import Swipe from '../components/swipe'
import eventBus from '../assets/eventBus'

export default {
  name:'home',
  components: {
    Title,
    Navigation,
    Preferential,
    Column,
    Swipe,
  },
  data () {
    return {
        items: [{component:'Column'}],
        src: 'https://www.xiaoniren.cn',
        delBol: false,
        bottomFixed: false,
        tabBar:{
          color: "#999",
          selectedColor: "#d53b33",
          backgroundColor: "#fff",
          borderStyle: "",
          list: [
              {
                  pagePath: "pages/index",
                  text: "首页",
                  iconPath: require(`../assets/shouye.png`),
                  selectedIconPath: "../image/home-active.png"
              },
              {
                  pagePath: "pages/categoryEqually",
                  text: "分类",
                  iconPath: require(`../assets/fenlei.png`),
                  selectedIconPath: "../image/category-active.png"
              },
              {
                  pagePath: "pages/library",
                  text: "购物车",
                  iconPath: require(`../assets/gouwu.png`),
                  selectedIconPath: "../image/lib-active.png"
              },
              {
                  pagePath: "pages/member",
                  text: "我的",
                  iconPath: require(`../assets/wode.png`),
                  selectedIconPath: "../image/member-active.png"
              }
          ]
        },
        list:[],
        listee: {
          "flag":[
            {
              tag: '商品栏',
              style: ["long","long"],
              flag: '1,2,3,4',
              num: 6
            }
          ],
          "menu":[
              {
                name: "\u6210\u529f\u6848\u4f8b",
                icon: "/upload/wechatpage/icon/201801/15166940712843.png",
                page: "article?id=889"
            },
            {
                name: "\u516c\u53f8\u4ecb\u7ecd",
                icon: "/upload/wechatpage/icon/201801/15166940532650.png",
                page: "article?id=888"
            },
            {
                name: "\u7559\u8a00\u7c3f",
                icon: "/img/weapp_img/menu_icon/icon_gbook.png",
                page: "gbook"
            },
            {   
                name: "\u5730\u56fe\u5bfc\u822a",
                icon: "/img/weapp_img/menu_icon/icon_map.png",
                page: "map"
            }
          ],
          "swiper":{
            dots: true,
            loop: true,
            interval: 3000,
          },
          "router":{
            category: "categoryInfoTopScroll",
            categoryDetail: "categorySearch"
          },
          "items":[{component:'Column'}],
          "backgroundColor":"#000",
          "title":"首页默认"
        },
        arr: [],
        // 首页title
        name: '首页默认',
        titsh: true,
        // 轮播数据
        shuff: true,
        poi: true,
        spe: 3000,
        swsh: false,
        // 商品列表数据
        shale:[],
        // 商品默认值
        moren: {"tag": "商品栏","flag": [1,2,3,4],"num": 6,"style": ["long","long"]},
        // 设置默认值
        shuliang:6,
        yangshi:["long","long"],
        flag:[1,2,3,4],
        tag:'商品栏',
        colsh: false,
        // 导航
        navigaz: [
              {icon:require(`../assets/dianhua.png`),
              name:'联系我们',
              page: "article?id=889"},
              {icon:require(`../assets/kefu.png`),
              name:'公司介绍',
              page: "article?id=888"},
              {icon:require(`../assets/xiaoxi.png`),
              name:'留言薄',
              page: "gbook"},
              {icon:require(`../assets/dianhua.png`),
              name:'地图导航',
              page: "map"}
        ],
        navsh:false,
        // key:[0],
        // tab选择地址
        commodity: 'categorySearch',
        classify: 'categoryInfoTopScroll',
        // 颜色选择器
        color1: null,
        color2: '#000',
        http: 'http://www1.xiaoniren.cn'
    }
  },
  created: function () {
    this.ajax()
  },
  mounted:function () {
    this.shale.push(this.moren)
    //   兄弟组件传值
    // 商品
      eventBus.$on("myFun",(message)=>{
            this.classify = message
      })
    //   分类
      eventBus.$on("myRun",(message)=>{
            this.commodity = message
      })
      // console.log(this.items)
      this.ajax()
      window.addEventListener('scroll', this.woshishi)
  },
  methods: {
    woshishi (e) {

      if (document.documentElement.scrollTop > 600) {
        this.bottomFixed = true
      }else {
        this.bottomFixed = false
      }
    },
    swipedj (e) {
      var sp = document.getElementById('swipe')
      console.log(sp)
      console.log(e.target)
      if(sp){
        console.log(1)
          if(!sp.contains(event.target)){
            console.log(2)
            e.target.style.border = ''
          }else {
            console.log(3)
            e.target.style.border = '5px solid red'
          }
      }
    },
    hai (e) {
      var Arr = document.getElementsByClassName("arr")

      for (var index = 0; index < Arr.length; index++) {
        if(Arr[index]){
          if(!Arr[index].contains(e.target)){
            if (index == 0) {
              this.titsh = false
            }else if (index == 1) {
              this.swsh = false;
            }else if(index == 2) {
              this.navsh = false;
            }else if(index <= 3) {
              this.colsh = false
            }
          }else{
            if (index == 0) {
              this.titsh = true
            }else if (index == 1) {
              this.swsh = true;
            }else if(index == 2) {
              this.navsh = true;
            }else if(index >= 3) {
              this.colsh = true
            }
          }
        }
      }
    },
    ajax () {
      var _this = this
      this.$ajax.get(this.http + '/weapp-config/setting')
      .then(function (res) {
          // 取值
          console.log(res)
          var data = res.data.ext.ext
          console.log(data)
          _this.name = data.title || _this.name
          _this.color2 = data.backgroundColor || _this.color2
          _this.shuff = data.swiper.loop ? data.swiper.loop : false
          _this.poi = data.swiper.dots ? data.swiper.loop : false
          _this.spe = data.swiper.interval || _this.spe
          // if (data.flag) {
          //   for (var key in data.flag ) {
          //     _this.moren.push(data.flag[key])
          //   }
          // }
          _this.items = data.items || _this.items
          _this.shale = data.flag || _this.shale
          // _this.moren = data.flag[0] || _this.moren
          _this.navigaz = data.menu || _this.navigaz
          _this.commodity = data.router.categoryDetail || _this.commodity
          _this.classify = data.router.category || _this.classify

          console.log(_this.moren)
          console.log('get请求数据成功')
      })
      .catch(function (err) {
          console.log(err)
          console.log('失败了')
      });
    },
    // 删除时触发 替换value值为2的元素
    delEle(index){
      console.log(index)
      this.delBol = true
      this.shale.splice(index, 1, undefined)
      console.log(this.shale)
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
      console.log('title',index)
      if(!this.shale[index]){
        this.shale[index] = {}
      }
      this.shale[index].tag = s
    },
    // 页面名字储存
    titls(e) {
      console.log(e)
      this.name = e
    },
    // 优惠券储存
    youhui(i) {
      // console.log(i)
      if (this.arr.length < 4) {
        this.arr.push(i)
      }else{
        return
      }
      this.list['prefer'] = this.arr;
    },
    // 轮播图是否轮播储存
    lunbo (e) {
      this.shuff = e
    },
    // 轮播小点是否显示储存
    heidian (e) {
      this.poi = e
    },
    // 轮播速度
    speed(value) {
      this.spe = value
    },
    // 导航栏九宫格
    navigas(val) {
      this.navigaz = val
    },
    // 提交
    tijiao() {
      let _this = this
      let normal = {
        tag: '商品栏',
        style: ["long","long"],
        flag: '1,2,3,4',
        num: 6
      }
      normal = this.moren
      console.log('======')
      console.log(normal)
      // 商品列表
      let shale = this.shale.filter( item => {
        return item != undefined
      })
      if(!this.delBol && shale.length == 0){
        this.shale.push(normal)
        this.list['flag'] = shale
      }else{
        for(let i = 0; i < shale.length; i++){
          if(JSON.stringify(shale[i]) == '{}'){
            shale.splice(i, 1, normal)
          }else {
            shale[i].style = shale[i].style || normal.style
            shale[i].flag = shale[i].flag.toString() || normal.flag
            shale[i].num = shale[i].num || normal.num
            shale[i].tag = shale[i].tag || normal.tag
          }
        }
      }
      
      console.log(shale)
      this.listee.flag = shale
      console.log('=========')
      
      // 轮播图
      this.listee.swiper.loop = this.shuff
      this.listee.swiper.dots = this.poi
      this.listee.swiper.interval = this.spe
      // 导航栏
      this.listee.menu = this.navigaz
      //  标题
      this.listee.title = this.name
      // 颜色
      this.listee.backgroundColor = this.color2

      // tab选择
      this.listee.router.category = this.classify
      this.listee.router.categoryDetail = this.commodity

      // items 储存
      // this.listee.items = []
      let datas = []
      for (var key in this.items) {
        if (this.items[key] != 2) {
          datas.push(this.items[key])
        }
        this.listee.items = datas
      }
      
      // this.listee.items = this.items

      console.log(this.listee)
      this.$ajax.post('http://www1.xiaoniren.cn/weapp-config/setting', this.listee)
      .then(function (res) {
          console.log(res.data.ext)
          _this.$message({
            showClose: true,
            message: '提交数据成功',
            type: 'success'
          });
      })
      .catch(function (err) {
          console.log(err);
          _this.$message({
            showClose: true,
            message: '提交数据失败',
            type: 'error'
          });
      });
    },
    // 添加商品分组
    add(component) {
      let normal = {
        tag: '商品栏',
        style: ["long","long"],
        flag: '1,2,3,4',
        num: 6
      }
      this.items.push({
        'component': "Column"
      })
      this.delBol = false
      this.shale.push(normal)
    },
  }
}
</script>

<style lang="less">
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 320px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  padding-bottom: auto;
  margin-bottom: 24px;
  -webkit-box-shadow: 0 0 0 1px #c5c5c5;
  box-shadow: 0 0 0 1px #c5c5c5;
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
.columns {
  position: relative;
  width: 100%;
  height: 100%;
}
.boFixed {
  font-size: 14px;
  color: #666;
  width: 270px;
  position: fixed;
  left: 456px;
  top: 65px;
  padding: 12px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  z-index: 1999;
}
.bottom {
  font-size: 14px;
  color: #666;
  width: 270px;
  position: absolute;
  left: 347px;
  top: 240px;
  padding: 12px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  z-index: 1999;
}
.Hright {
  font-size: 14px;
  color: #666;
  width: 100px;
  position: fixed;
  right: 50px;
  top: 50%;
  padding: 12px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  z-index: 1999;
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