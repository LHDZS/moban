<template>
    <div class="classification">
      <div class="ClaTiTle">
            <router-link to="/"><el-button type="info" size="mini">首页</el-button></router-link>
            <router-link to="/classification"><el-button type="info" size="mini">分类</el-button></router-link>
            <router-link to="/commodity"><el-button type="info" size="mini" >商品</el-button></router-link>
        </div>
        <div class="Hotop">
        </div>
        <div class="Homeimg" ref="mybox">
            <div class="shouye_wrap">
                <div class="Classhouye">
                    <Titletwo></Titletwo>
                    <div class="Class">
                        <Tabshu v-if="is == 1"></Tabshu>
                        <Tabheng v-if="is == 2"></Tabheng>
                    </div>
                </div>
            </div>
        </div>
        <div class="HoBottom"></div>    
        <div class="yangshi">
            <el-button type="primary" plain @click="yangshiyi()" :autofocus='true'>样式一</el-button>
            <el-button type="primary" plain @click="yangshier()">样式二</el-button>
        </div>
    </div>
</template>

<script>
import Titletwo from '../components/Title_two'
import Tabshu from '../components/Tab_shu'
import Tabheng from '../components/Tab_heng'
import eventBus from '../assets/eventBus'

export default {
    name:'classification',
    components: {
        Titletwo,
        Tabshu,
        Tabheng,
    },
    data () {
        return {
            commodity: 'categorySearch',
            is: 1
        }
    },
    mounted:function () {
        var doc = document.documentElement.clientHeight
        this.$refs.mybox.style.height = doc-200 + 'px'
        const that = this;
        window.onresize = function temp() {
            that.$refs.mybox.style.height = `${document.documentElement.clientHeight - 200}px`;
        };
    },
    methods: {
        // 样式按钮 
        yangshiyi () {
            this.is = 1
            this.commodity = 'category'
            eventBus.$emit("myRun",this.commodity)
        },
        yangshier () {
            this.is = 2
            this.commodity = 'categorySearch'
            eventBus.$emit("myRun",this.commodity)
        }
    }
}
</script>

<style lang='less'>
.content {
  min-height: 250px;
}
.Classhouye {
  height: 100%;  
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-box-shadow: 0 0 0 1px #c5c5c5;
  box-shadow: 0 0 0 1px #c5c5c5;
  position: relative;
}
.ClaTiTle {
  font-size: 14px;
  color: #666;
  width: 100%;
  height: 37px;
  line-height: 35px;
  position: fixed;
  right: 0;
  bottom: 0;
  min-height: 28px;
  background: #f8f8f8;
  border: 1px solid #d1d1d1;
  z-index: 1999;
  text-align: center;
}
.Class {
  overflow: auto;
  overflow-y: scroll;
}
// 商品分类
.classification {
  width: 100%;
  position: relative;
}
.yangshi {
  position: fixed;
  top: 130px;
  right: 30%;
}
// input组件
.el-input-number--mini .el-input__inner {
    padding-left: 22px;
    padding-right: 35px;
}
</style>
