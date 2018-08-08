<style>
.tabbar {
  width: 100%;
  position: relative;
}
.tabbar_title {
  width: 100%;
  display: flex;
}
.tabbar_item {
  flex: 1;
  font-size: 10px;
}
.Tabright {
  display: none;
  font-size: 14px;
  color: #666;
  width: 595px;
  cursor: default;
  position: fixed;
  left: 32%;
  top: 8px;
  padding: 28px 17px 15px 17px;
  text-align: left;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  z-index: 1999;
}
.Tabmodule {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
}
.Tabname {
  font-size: 16px;
  margin-right: 21px;
  float: left;
}
.tab_item {
  width: 79%;
  height: 60px;
  float: right;
}
.tabbar_item_img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.tabimg {
  width: 33.333%;
  height: 20px;
  float: left;
}
.tabbar_name {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.my-enter-active, .my-leave-active {
  transition: opacity .5s
}
.my-enter, .my-leave-active {
  opacity: 0

}
#tabshow {
  width: 50%;
  min-height: 100px;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  float: right;
}
.tab_right_div {
  height: 60px;
  line-height: 50px;
}
.tab_div {
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  /* margin: 35px 0px; */
}
</style>

<template>
  <div class="tabbar">
    <div class="Cbody">
      <div class="tabbar_title">
        <div class="tabbar_item" v-for="(item,key) in bararr" :key="key">
          <div>
            <img v-if="item.display" v-on:mouseenter="dataDetails(key)" v-on:mouseleave="hiddenDetail(key)" class="tabbar_item_img" :src="item.img" alt="" ondragstart="return false" draggable="false">
            <img v-if="!item.display" v-on:mouseenter="dataDetails(key)" v-on:mouseleave="hiddenDetail(key)" class="tabbar_item_img" :src="item.endimg" alt="" ondragstart="return false" draggable="false">
          </div>
          <div class="tabbar_name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="Tabright">
      <div class="Sdianzhao"><i></i><span>TabBar设置</span></div>
        <div class="Tabmodule">
            <span class="Tabname">TabBar配置：</span>
            <div class="tab_item" v-for="(link,index) in imagearr" :key="index">
              <el-radio v-model="radio1" :label="index" @change="tabcilck(index,link.images)" border>{{link.name}}</el-radio>
              <transition name="my">
                <div v-show="linkindx == index" id="tabshow" transition="my">
                  <div class="tab_right_div" v-for="(item,key) in tabcolor[index]" :key="key">
                      <div class="tab_div" @click="ColorSele(index,key)" :style="{backgroundColor:item}"></div>
                  </div>
                </div>
              </transition>
            </div>
            <div class="clear"></div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabBar',
  components: {
    
  },
  props: {
      
  },
  data() {
      return {
        tabBar: {
            color: '#999',
            selectedColor: '#d53b33',
            backgroundColor: '#fff',
            borderStyle: '',
            list: [
                {
                    pagePath: 'pages/index',
                    text: '首页',
                    iconPath: './image/home.png',
                    selectedIconPath: './image/home-active.png'
                },
                {
                    pagePath: 'pages/category',
                    text: '分类',
                    iconPath: './image/category.png',
                    selectedIconPath: './image/category-active.png'
                },
                {
                    pagePath: 'pages/library',
                    text: '购物车',
                    iconPath: './image/lib.png',
                    selectedIconPath: './image/lib-active.png'
                },
                {
                    pagePath: 'pages/member',
                    text: '我的',
                    iconPath: './image/member.png',
                    selectedIconPath: './image/member-active.png'
                },
            ]
        },
        tabcolor:[
          [
            '#9ae825',
            '#24d4d8',
            '#a4579d',
            '#f5c250'
          ],
          [
            '#22d9c1',
            '#1296db',
            '#d81e06',
            '#ea986c'
          ],
          [
            '#22d9c1',
            '#60c222',
            '#284bcb',
            '#ea986c'
          ],
          [
            '#92d837',
            '#1296db',
            '#d81e06',
            '#d4237a'
          ],
        ],
        ColorSelect:[
          [
            [
              'home_page_l.png',
              'classify3_ql.png',
              'shoppingtrolley1_ql.png',
              'personal_l.png'
            ],
            [
              'home_page_sl.png',
              'classify3_Lan.png',
              'shoppingtrolley1_Lan.png',
              'personal_sl.png'
            ],
            [
              'home_page_purple.png',
              'classify3_Z.png',
              'shoppingtrolley1_Z.png',
              'personal_purple.png'
            ],
            [
              'home_page_h.png',
              'classify3_C.png',
              'shoppingtrolley1_C.png',
              'personal_h.png'
            ]
          ],
          [
            [
              'home_page1_l.png',
              'classify2_H1.png',
              'shoppingtrolley2_H1.png',
              'personal1_l.png'
            ],
            [
              'home_page1_lan.png',
              'classify2_H2.png',
              'shoppingtrolley2_H2.png',
              'personal1_lan.png'
            ],
            [
              'home_page1_red.png',
              'classify2_H3.png',
              'shoppingtrolley2_H3.png',
              'personal1_red.png'
            ],
            [
              'home_page1_h.png',
              'classify2_H4.png',
              'shoppingtrolley2_H4.png',
              'personal1_h.png'
            ]
          ],
          [
            [
              'home_page2_l.png',
              'classify3_H1.png',
              'shoppingtrolley3_H1.png',
              'personal2_l.png'
            ],
            [
              'home_page2_ql.png',
              'classify3_H2.png',
              'shoppingtrolley3_H2.png',
              'personal2_ql.png'
            ],
            [
              'home_page2_lan.png',
              'classify3_H3.png',
              'shoppingtrolley3_H3.png',
              'personal2_lan.png'
            ],
            [
              'home_page2_c.png',
              'classify3_H4.png',
              'shoppingtrolley3_H4.png',
              'personal2_c.png'
            ]
          ],
          [
            [
              'home_page3_l.png',
              'classify4_H1.png',
              'shoppingtrolley4_H2.png',
              'personal3_l.png'
            ],
            [
              'home_page3_lan.png',
              'classify4_H2.png',
              'shoppingtrolley4_H1.png',
              'personal3_lan.png'
            ],
            [
              'home_page3_red.png',
              'classify4_H3.png',
              'shoppingtrolley4_H3.png',
              'personal3_red.png'
            ],
            [
              'home_page3_f.png',
              'classify4_H4.png',
              'shoppingtrolley4_H4.png',
              'personal3_f.png'
            ]
          ],
        ],
        imagearr:[
          {
            name:'样式一',
            img:'../static/img/tab1.jpg',
            images:[
              'home_page.png',
              'classify1_H.png',
              'shoppingtrolley1_H.png',
              'personal.png'
            ]
          },
          {
            name:'样式二',
            img:'../static/img/tab1.jpg',
            images:[
              'home_page1.png',
              'classify2_H.png',
              'shoppingtrolley2_H.png',
              'personal1.png'
            ]
          },
          {
            name:'样式三',
            img:'../static/img/tab1.jpg',
            images:[
              'home_page2.png',
              'classify3_H.png',
              'shoppingtrolley3_H.png',
              'personal2.png'
            ]
          },
          {
            name:'样式四',
            img:'../static/img/tab1.jpg',
            images:[
              'home_page3.png',
              'classify4_H.png',
              'shoppingtrolley4_H.png',
              'personal3.png'
            ]
          }
        ],
        bararr:[
          {
            img:'../static/img/home_page.png',
            endimg:'../static/img/home_page_l.png',
            name:'首页',
            display:true
          },
          {
            img:'../static/img/classify1_H.png',
            endimg:'../static/img/classify3_ql.png',
            name:'分类',
            display:true
          },
          {
            img:'../static/img/shoppingtrolley1_H.png',
            endimg:'../static/img/shoppingtrolley1_ql.png',
            name:'购物车',
            display:true
          },
          {
            img:'../static/img/personal.png',
            endimg:'../static/img/personal_l.png',
            name:'我的',
            display:true
          }
        ],
        radio1:null,
        linkindx: null
      }
  },
  methods: {
    tabcilck(i,e) {
      this.linkindx = i
      var url = '../static/img/'
      var site = './static/img/'
      this.bararr[0].img = url + e[0]
      this.bararr[1].img = url + e[1]
      this.bararr[2].img = url + e[2]
      this.bararr[3].img = url + e[3]
      this.bararr[0].endimg = url + this.ColorSelect[i][0][0]
      this.bararr[1].endimg = url + this.ColorSelect[i][0][1]
      this.bararr[2].endimg = url + this.ColorSelect[i][0][2]
      this.bararr[3].endimg = url + this.ColorSelect[i][0][3]
      this.tabBar.list[0].iconPath = site + e[0]
      this.tabBar.list[1].iconPath = site + e[1]
      this.tabBar.list[2].iconPath = site + e[2]
      this.tabBar.list[3].iconPath = site + e[3]
      this.tabBar.list[0].selectedIconPath = site + this.ColorSelect[i][0][0]
      this.tabBar.list[1].selectedIconPath = site + this.ColorSelect[i][0][1]
      this.tabBar.list[2].selectedIconPath = site + this.ColorSelect[i][0][2]
      this.tabBar.list[3].selectedIconPath = site + this.ColorSelect[i][0][3]
      this.$emit('tabbar',this.tabBar)
    },
    ColorSele (e,i) {
      var url = '../static/img/'
      var site = './static/img/'
      this.bararr[0].endimg = url + this.ColorSelect[e][i][0]
      this.bararr[1].endimg = url + this.ColorSelect[e][i][1]
      this.bararr[2].endimg = url + this.ColorSelect[e][i][2]
      this.bararr[3].endimg = url + this.ColorSelect[e][i][3]
      this.tabBar.list[0].selectedIconPath = site + this.ColorSelect[e][i][0]
      this.tabBar.list[1].selectedIconPath = site + this.ColorSelect[e][i][1]
      this.tabBar.list[2].selectedIconPath = site + this.ColorSelect[e][i][2]
      this.tabBar.list[3].selectedIconPath = site + this.ColorSelect[e][i][3]
      this.$emit('tabbar',this.tabBar)
    },
    dataDetails(i) {
        this.bararr[i].display = false
    },
    hiddenDetail(i) {
      this.bararr[i].display = true
    },
  },
// transition(my) {

  
//   enter(el) {
//     el.textContent = 'enter'
//   },
//   afterEnter(el) {
//     el.textContent = 'afterEnter'
//   },
//   enterCancelled(el) {
//     // handle cancellation
//   },

  
//   leave(el) {
//     el.textContent = 'leave'
//   },
//   afterLeave(el) {
//     el.textContent = 'afterLeave'
//   },
//   leaveCancelled(el) {
//     // handle cancellation
//   }
// }
}
</script>
