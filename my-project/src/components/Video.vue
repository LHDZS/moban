<template>
    <div class="Video" v-if="ViHideShow">
        <div class="Cbody">
            <div :style="{height:Videoheight/2.5+'px'}">
                <img class="Stuimg" :src="Videoimg" alt="">
            </div>
        </div>
        <Imageupload :Iyincang="imgyincang" v-on:queren="tupiantianjia" v-on:guanbi="guanbi"></Imageupload>
        <div class="Vright">
            <div class="Sdianzhao"><i></i><span>视频设置</span></div>
            <div class="Swcaozuo" v-if="Vitype">
                <span class="Span" style="margin-top:0px">模块配置：</span>
                <div class="SwLunbo" style="width:140px">
                    <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                    <div class="YesNo">
                        <span class="Yes" :class="ViynMK ? 'pitch' : '' "  @click="ViYesMK()">是</span>
                        <span class="No" :class="!ViynMK ? 'pitch' : '' "  @click="ViNoMK()">否</span>
                    </div>
                </div>
            </div>
            <div class="Sshangcheng">
                <span class="sctpgaodu">视频高度：</span>
                <el-input-number v-model="Videoheight" size="mini" controls-position="right" @change="ViHeight" :min="160" :max="500" label="描述文字"></el-input-number>
            </div>
            <div class="Sshangcheng" :id="Vred ? 'Video' : ''">
                <span class="shangchengname">视频地址：</span>
                <el-input class="shurukuang" v-model="Vinput" @change="VideoSite" :clearable="true" placeholder="请输入网址"></el-input>
                <span v-if="Vred" class="Vispan">请输入正确地址</span>
            </div>
            <div class="Ssimages">
                <span class="Simagesbeijing">添加背景：</span>
                <div class="Sstupian" @click="tupian2">
                    <img class="Stuimg" :src="Videoimg" alt="" ondragstart='return false;'>
                    <span class="Stuspan">+修改图片</span>
                </div>
            </div>
            <div>   
            </div>
        </div>
    </div>
</template>

<script>
import Imageupload from "../components/comm/Imageupload"
import {http,TemplatePage,Www1,BackEnd} from '../assets/BaseApi'

export default {
    name:'Video',
    props:{
        Videoheight:Number,
        Videoimg: String,
        Vitype: Boolean,
        ViHideShow: Boolean,
        ViynMK: Boolean,
        Vinput: String,
    },
    components: {
        Imageupload,
    },
    data () {
        return {
            Vred: false,
            imgyincang: false
        }
    },
    mounted:function() {

    },
    methods: {
        ViYesMK () {
            this.ViynMK = true
            var Show = true
            this.$emit('ViShowHide',Show)
        },
        ViNoMK () {
            this.ViynMK = false
            var Hide = false
            this.$emit('ViShowHide',Hide)
        },
        ViHeight(value) {
            this.Videoheight = value
            this.$emit("Viheight",value)
        },
        VideoSite (event) {
            var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
            if (!event.match(reg)) {
                return this.Vred = true
            }
            this.Vred = false
            this.Vinput = event
            this.$emit("VideoSite",this.Vinput)
        },
        tupian2 () {
            this.imgyincang = true
        },
        tupiantianjia (id) {
            this.imgyincang = false
            this.Videoimg = http + id.value
            this.$emit("Videobj",this.Videoimg)
        },
        guanbi () {
           this.imgyincang = false
        },
    }
}
</script>

<style>
    .Video {
        width: 100%;
        position: relative;
    }
    .Vright {
        display: none;
        font-size: 14px;
        color: #666;
        width: 599px;
        height: 350px;
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
    .Ssimages {
        width: 100%;
        height: 120px;
        line-height: 120px;
        margin-top: 10px;
    }
    .Ssimages .Simageslogo {
        font-size: 16px;
        margin-right: 17px;
        float: left;
    }
    .Ssimages .Simagesbeijing {
        font-size: 16px;
        margin-right: 21px;
        float: left;
    }
    .Sstupian {
        display: inline-block;
        width: 240px;
        height: 120px;
        text-align: center;
        line-height: 120px;
        background-color: #eee;
        color: #7560f7;
        font-size: 16px;
        position: relative;
        cursor: pointer;
    }
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
    #Video .el-input__inner {
        border: 1px solid #ca0000;
    }
    #Video .Vispan {
        font-size: 12px;
        color: #ca0000;
    }
    .Sshangcheng .sctpgaodu {
        font-size: 16px;
        margin-right: 19px;
        float: left;
    }
</style>
