<template>
    <div class="Video" v-if="ViHideShow">
        <div class="Cbody">
            <div :style="{height:Videoheight/2.5+'px'}">
                <img class="Stuimg" src="http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253996504214.jpg" alt="">
            </div>
        </div>
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
            <div>   
            </div>
        </div>
    </div>
</template>

<script>
import {http,TemplatePage,Www1,BackEnd} from '../assets/BaseApi'

export default {
    name:'Video',
    props:{

    },
    data () {
        return {
            Videoheight:350,
            Vitype: true,
            ViHideShow: true,
            ViynMK: true,
            Vinput: 'http://',
            Vred: false
        }
    },
    mounted:function() {
        var getUrlStr =  function(name) {
    　　var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    　　var r = window.location.search.substr(1).match(reg);
        　　if(r != null) return unescape(r[2]);
        　　return null;
        }
        var id = getUrlStr ("id")
        var type = getUrlStr("type")

        this.VideoHttp(id,type)
    },
    methods: {
        VideoHttp (id,type) {
            var _this = this
            if (type == 'front') {
                this.type = Www1
            }else if (type == 'back'){
                this.type = BackEnd+id
            }
            this.$ajax.get(this.type)
            .then(function (res) {
                // 取值
                if (res.data.ext.extAppid == 0) {
                    var data = res.data.ext.ext
                    _this.Videoheight = data.video.height || _this.Videoheight
                    _this.Vinput = data.video.page || _this.Vinput
                    _this.ViynMK = data.video.display
                }else {
                    var data = res.data.ext.ext
                    _this.Videoheight = data.video.height || _this.Videoheight
                    _this.Vinput = data.video.page || _this.Vinput
                    _this.ViHideShow = data.video.display
                    _this.Vitype = data.video.display
                    console.log('视频请求子数据成功')
                }
            })
            .catch(function (err) {
                console.log(err)
                console.log('视频请求数据失败')
            });
        },
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
        height: 230px;
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
