<template>
    <div class="classification">
      <div class="TiTle">
            <router-link to="/"><el-button type="info" size="mini">首页</el-button></router-link>
            <router-link to="/classification"><el-button type="info" size="mini">分类</el-button></router-link>
            <router-link to="/commodity"><el-button type="info" size="mini" >商品</el-button></router-link>
        </div>  
        <Titletwo></Titletwo>
        <Tabshu v-if="is == 1"></Tabshu>
        <Tabheng v-if="is == 2"></Tabheng>
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
.TiTle {
  border: 0px solid #fff;
  padding: 10px 0;
  position: relative;
}
// 商品分类
.classification {
  position: relative;
  -webkit-box-shadow: 0 0 0 1px #c5c5c5;
  box-shadow: 0 0 0 1px #c5c5c5;
}
.yangshi {
  position: absolute;
  top: 130px;
  right: -310px;
}
// input组件
.el-input-number--mini .el-input__inner {
    padding-left: 22px;
    padding-right: 35px;
}
</style>
