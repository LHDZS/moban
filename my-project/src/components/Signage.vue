<template>
    <div class="Signage" v-if="SiShowHide" :style="{height:height/2.5 + 'px'}">
        <div class="Cbody">
            <div class="Sbody">
                <img class="Sbimg" :style="{height:height/2.5 + 'px'}" :src="images" alt="" ondragstart='return false;'>
                <img :class="ifimg ? 'Simg' : 'Simg2'" :src="img" alt="" ondragstart='return false;'>
                <div :class="ifimg ? 'Sbdiv1' : 'Sbdiv2'">
                    <span class="Sspan" :style="{color:colorz}">{{names}}</span>
                </div>
                <div id="icon-div" class="icondiv" style="display:none"></div>
                </img>
            </div>
        </div>    
        <!-- logo -->
        <Imageupload ref="Image" :Iyincang="logoyincang" v-on:queren="queren" v-on:guanbi="guanbi"></Imageupload>
        <Imageupload :Iyincang="beijingyincang" v-on:queren="beijingqueren" v-on:guanbi="guanbi"></Imageupload>
        <div class="Sright">
            <!-- 侧边栏 操作系统 -->
            <div class="Sdianzhao"><i></i><span>店招设置</span></div>
            <div class="Swcaozuo" v-if="Sitype">
                <span class="Span" style="margin-top:0px">模块配置：</span>
                <div class="SwLunbo" style="width:140px">
                    <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                    <div class="YesNo">
                        <span class="Yes" :class="SiynMK ? 'pitch' : '' "  @click="SiYesMK()">是</span>
                        <span class="No" :class="!SiynMK ? 'pitch' : '' "  @click="SiNoMK()">否</span>
                    </div>
                </div>
            </div>
            <div class="Sfengge">
                <span class="fengge">选择风格：</span>
                <el-radio v-model="radio" label="2" @change="dianzhao">大店招</el-radio>
                <el-radio v-model="radio" label="1" @change="dianzhao">小店招</el-radio>
            </div>
            <div class="Sshangcheng">
                <span class="shangchengname">商城名称：</span>
                <el-input class="shurukuang" v-model="input" @change="gaibian" :maxlength="8" placeholder="最多可输入8个字"></el-input>
            </div>
            <div class="Sshangcheng">
                <span class="scnamecolor">颜色修改：</span>
                <el-color-picker class="yanse" v-model="colorz" @change="color"></el-color-picker>
            </div>
            <div class="Sshangcheng">
                <span class="sctpgaodu">图片高度：</span>
                <el-input-number v-model="height" size="mini" controls-position="right" @change="handleChange" :min="260" :max="1000" label="描述文字"></el-input-number>
            </div>
            <div class="Simages">
                <span class="Simageslogo">添加Logo：</span>
                <div class="Stupian" @click="tupian">
                    <img class="Stuimg" :src="img" alt="" ondragstart='return false;'>
                    <span class="Stuspan">+修改图片</span>
                    </div>
            </div>
            <div class="Simages">
                <span class="Simagesbeijing">添加背景：</span>
                <div class="Stupian" @click="tupian2">
                    <img class="Stuimg" :src="images" alt="" ondragstart='return false;'>
                    <span class="Stuspan">+修改图片</span>
                </div>
            </div>
            <div>
                
            </div>
            <!-- <div class="array"></div> -->
        </div>
    </div>
</template>

<script>
import Imageupload from "../components/comm/Imageupload"
import {http,Www1,BackEnd} from '../assets/BaseApi'

export default {
  name:'Signage',
  components: {
      Imageupload
  },
  props: {
        Sitype: Boolean,
        img: String,
        images: String,
        height: Number,
        ifimg: Boolean,
        SiynMK: Boolean,
        SiShowHide: Boolean,
        names: String,
        colorz: String,
        radio: String
  },
  data () {
      return {
          type:'',
          input:'',
          bol: false,
          beijingyincang:false,
          logoyincang:false,
      }
  },
  watch: {
      
  },
  methods: {
    dianzhao (e) {
        if (e == 1) {
            this.ifimg = true
            this.height = 300
            this.$emit("gaodu",this.height)
            this.$emit("yangshi",this.ifimg,'1')
        }else if(e == 2) {
            this.ifimg = false
            this.height = 400
            this.$emit("gaodu",this.height)
            this.$emit("yangshi",this.ifimg,'2')
        }
    },
    SiYesMK () {
        this.SiynMK = true
        var Show = true
        this.$emit('SiShowHide',Show)
    },
    SiNoMK () {
        this.SiynMK = false
        var Hide = false
        this.$emit('SiShowHide',Hide)
    },
    guanbi () {
      this.logoyincang = false
      this.beijingyincang = false
    },
    tupian () {
        this.logoyincang = true
    },
    queren (id) {
      this.logoyincang = false
      this.img = http + id.value
      this.$emit("logo",this.img)
    },
    tupian2 () {
      this.beijingyincang = true
    },
    color(c) {
        this.$emit("color",c)
    },
    beijingqueren (id) {
      this.beijingyincang = false
      this.images = http + id.value
      this.$emit("beijing",this.images)
    },
    gaibian (event) {
        this.names = event || '店招名称'
        this.$emit("name",this.names)
    },
    handleChange(value) {
        this.height = value
        this.$emit("gaodu",this.height)
    }
  }
}
</script>

<style>
    .Signage {
        width: 100%;
        margin-bottom: 3px;
        background-color: #ccc;
    }
    .Cbody{
        width: 100%;
        height: 100%;
    }
    .Cbody:hover {
        cursor: move;
        border-left: 1px dashed #409EFF;
        border-right: 1px dashed #409EFF;
        border-top: 1px solid #409EFF;
        border-bottom: 1px solid #409EFF;
    }
    .Sbody {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .Sbimg {
        width: 100%;
    }
    .Simg {
        display: inline-block;
        width: 50px;
        height: 50px;
        position: absolute;
        left: 13px;
        bottom: 13px;
    }
    .Simg2 {
        display: inline-block;
        width: 50px;
        height: 50px;
        position: absolute;
        left: 42%;
        bottom: 33%;
        border-radius: 50%;
    }
    .Sspan {
        display: inline-block;
        text-align: center;
        font-size: 18px;
        color: #fff;
    }
    .Sbdiv1 {
        position: absolute;
        left: 70px;
        bottom: 25px;
    }
    .Sbdiv2 {
        position: absolute;
        left: 0px;
        bottom: 10%;
        display: inline-block;
        text-align: center;
        width: 100%;
    }
    .Sright {
        display: none;
        font-size: 14px;
        color: #666;
        width: 599px;
        height: 440px;
        cursor: default;
        position: fixed;
        left: 34%;
        top: 8px;
        padding: 28px 17px 15px 17px;
        text-align: left;
        background: #f8f8f8;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        z-index: 1999;
        overflow: auto;
    }
    .Sright::-webkit-scrollbar {display:none}
    .Sdianzhao {
        width: 100%;
        display: block;
        height: 30px;
        margin-bottom: 25px;
    }
    .Sdianzhao i {
        display: inline-block;
        width: 4px;
        height: 12px;
        background-color: #ad0018;
        margin-top: 9px;
        float: left;
    }
    .Sdianzhao span {
        font-size: 18px;
        color: #ad0018;
        margin-left: 8px;
        float: left;
    }
    .Sfengge {
        margin-bottom: 20px;
    }
    .Sfengge span {
        font-size: 16px;
    }
    .Sfengge .fengge {
        margin-right: 15px;
    }
    .Sshangcheng {
        width: 100%;
        height: 52px;
        line-height: 52px;
    }
    .Sshangcheng .shangchengname {
        font-size: 16px;
        margin-right: 15px;
    }
    .Sshangcheng .shurukuang {
        width: 273px;
        height: 38px;
    }
    .Sshangcheng .yanse {
        margin-top: 10px;
        margin-left: 4px;
        float: left;
    }
    .Sshangcheng .scnamecolor {
        font-size: 16px;
        margin-right: 15px;
        float: left;
    }
    .Sshangcheng .sctpgaodu {
        font-size: 16px;
        margin-right: 19px;
        float: left;
    }
    .Simages {
        width: 100%;
        height: 120px;
        line-height: 120px;
        margin-bottom: 10px;
    }
    .Simages .Simageslogo {
        font-size: 16px;
        margin-right: 17px;
        float: left;
    }
    .Simages .Simagesbeijing {
        font-size: 16px;
        margin-right: 21px;
        float: left;
    }
    .Simages .Stupian {
        display: inline-block;
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 120px;
        background-color: #eee;
        color: #7560f7;
        font-size: 16px;
    }
    

</style>
