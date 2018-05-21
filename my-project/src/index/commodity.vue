<template>
    <div class="commodity">
        <div class="CTiTle">
            <router-link to="/"><el-button type="info" size="mini">首页</el-button></router-link>
            <router-link to="/classification"><el-button type="info" size="mini">分类</el-button></router-link>
            <router-link to="/commodity"><el-button type="info" size="mini" >商品</el-button></router-link>
        </div>
        <div class="Hotop"></div>
        <div class="Homeimg" ref="mybox">
            <div class="shouye_wrap">
                <div class="shouye">
                    <Titlethree></Titlethree>
                    <Theselector v-if="iz == 1"></Theselector>
                    <Module v-if="iz == 1"></Module>
                    <Moduletwo v-if="iz == 2"></Moduletwo>
                    <Modulethree v-if="iz == 3"></Modulethree>
                </div>
            </div>
        </div>
        <div class="HoBottom"></div>
        <div class="Cyangshi">
            <el-button type="primary" plain @click="yangshitwoyi()" :autofocus='true'>分类一</el-button>
            <el-button type="primary" plain @click="yangshitwoer()">分类二</el-button>
            <el-button type="primary" plain @click="yangshitwosan()">分类三</el-button>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import Titlethree from '../components/Title_three'
import Theselector from '../components/Theselector'
import Module from '../components/Module'
import Moduletwo from '../components/Module_two'
import Modulethree from '../components/Module_three'
import eventBus from '../assets/eventBus'

export default {
    name:'commodity',
    components: {
        Titlethree,
        Theselector,
        Module,
        Moduletwo,
        Modulethree
    },
    data () {
        return {
            classify: 'categoryInfoTopScroll',
            namesan: '商品列表',
            iz: 2
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
        yangshitwoyi () {
            this.iz = 1
            this.classify = 'categoryInfo'
            eventBus.$emit("myFun",this.classify)
        },
        yangshitwoer () {
            this.iz = 2
            this.classify = 'categoryScrollDetail'
            eventBus.$emit("myFun",this.classify)
        },
        yangshitwosan () {
            this.iz = 3
            this.classify = 'categoryInfoTopScroll'
            eventBus .$emit("myFun",this.classify)
        },
    }
}
</script>

<style lang='less'>
.content {
  min-height: 250px;
} 
.CTiTle {
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
.clear{ clear:both} 
.Cyangshi {
  position: fixed;
  top: 130px;
  right: 30%;
}
// 商品列表
.commodity {
  width: 100%;
  position: relative;
}
// input组件
.el-input-number--mini .el-input__inner {
    padding-left: 22px;
    padding-right: 35px;
}
</style>