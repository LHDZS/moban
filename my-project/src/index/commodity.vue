<template>
    <div class="commodity">
        <div class="TiTle">
            <router-link to="/"><el-button type="info" size="mini">首页</el-button></router-link>
            <router-link to="/classification"><el-button type="info" size="mini">分类</el-button></router-link>
            <router-link to="/commodity"><el-button type="info" size="mini" >商品</el-button></router-link>
        </div>
        <Titlethree v-bind:dats="namesan"></Titlethree>
        <Theselector v-if="iz == 1"></Theselector>
        <Module v-if="iz == 1"></Module>
        <Moduletwo v-if="iz == 2"></Moduletwo>
        <Modulethree v-if="iz == 3"></Modulethree>
        <div class="yangshi">
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
.TiTle {
  border: 0px solid #fff;
  padding: 10px 0;
  text-align: center;
  position: relative;
}
.clear{ clear:both} 
.yangshi {
  position: absolute;
  top: 130px;
  right: -310px;
}
// 商品列表
.commodity {
  position: relative;
  -webkit-box-shadow: 0 0 0 1px #c5c5c5;
  box-shadow: 0 0 0 1px #c5c5c5;
}
// input组件
.el-input-number--mini .el-input__inner {
    padding-left: 22px;
    padding-right: 35px;
}
</style>