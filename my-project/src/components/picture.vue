<template>
    <div class="pictureque">
        <div class="Piarr" v-if="photos.display">
            <div class="Cbody">
                <div class="Pdiv" v-if="photos.colstyle == 1">
                    <img :class="photos.class" v-for="(item,index) in photos.img" :key="index" :style="{height:photos.height/2.5+'px'}" :src="item.tpimg" alt="">
                    <div class="clear"></div> 
                </div>
                <div class="Pdiv" v-if="photos.colstyle == 2">
                    <img class="Pimg32" v-for="(item,index) in photos.img" :key="index" :style="{height:photos.height/2.5/3-3+'px'}" :src="item.tpimg" alt="">
                </div>
                <div class="Pdiv" v-if="photos.colstyle == 3">
                    <div class="Pfl Pimg4" :style="{height:photos.height/2.5+'px'}">
                        <img class="Pimage" v-for="(item,index) in photos.img" :key="index" v-if="index < 2" :style="{height:photos.height/2.5/2-2+'px'}" :src="item.tpimg" alt="">
                    </div>
                    <div class="Pfr Pimg4" :style="{height:photos.height/2.5+'px'}" v-for="(item,index) in photos.img" :key="index" v-if="index == 2">
                        <img class="Pimage" :src="item.tpimg" :style="{height:photos.height/2.5+'px'}" alt="">
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="Pdiv" v-if="photos.colstyle == 4">
                    <div class="Pimg56" >
                        <img v-if="index < 4" class="Pimg5 PI5l" :style="{height:photos.height/2.5/2-2+'px'}" v-for="(item,index) in photos.img" :key="index" :src="item.tpimg" alt="">
                    </div>
                    <img class="Pimg6" v-if="index == 4" :style="{height:photos.height/2.5+'px'}" v-for="(item,index) in photos.img" :key="index" :src="item.tpimg" alt="">
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
            <!-- 添加图片 -->
            <Imageupload :Iyincang="imgyincang" v-on:queren="tupiantianjia" v-on:guanbi="guanbi"></Imageupload>
            <Danyemian :Dyincang="Dyincang" :items="Singlepage" v-on:Dxqguanbi="Dxqguanbi" v-on:Dchoose="Dxuanzele"></Danyemian>
            <Xiangqing :yincang="yincang" :optione="ArrClassify" :Totalpages="Totalpages" :perpage="perpage" :items="particulars" :currentPage="currentPage" v-on:xqguanbi="xqguanbi" v-on:choose="xuanzele" v-on:xuanzhong="xuanzhong" v-on:paging="paging" v-on:sousuo="sousuo"></Xiangqing>
            <Fenleiye :Fyincang="Fyincang" :items="ArrClassify" v-on:Fxqguanbi="Fxqguanbi" v-on:Fchoose="Fxuanzele"></Fenleiye>
            <Yingxiaohd :Yyincang="Yxiangqing" v-on:Yxqguanbi="Yxqguanbi" v-on:Ychoose="Yxuanzele"></Yingxiaohd>
            <div class="Pright">
                <!-- 选择器 -->
                <div class="Sdianzhao"><i></i><span>图片设置{{Pindex}}</span></div>
                <div class="Swcaozuo">
                    <span class="Span" style="margin-top:0px">模块配置：</span>
                    <div class="SwLunbo" style="width:140px">
                        <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                        <div class="YesNo">
                            <span class="Yes" :class="photos.PiynMK ? 'pitch' : '' "  @click="PiYesMK()">是</span>
                            <span class="No" :class="!photos.PiynMK ? 'pitch' : '' "  @click="PiNoMK()">否</span>
                        </div>
                    </div>
                </div>
                <div class="Pfengge">
                    <span class="Span">排列风格：</span>
                    <div class="Pfenggexuanze">
                        <div class="Pigeshu" v-for="(item,index) in tupians" :key="index" @click="geshu(item.id,item.name,index)">
                            <div class="Pfdiv" :class="photos.colindex == index ? 'pitchimg' : ''">
                                <img class="Pfgimg" :src="item.img" alt="">
                                <img class="Pfduigou" v-if="photos.colindex == index" src="http://www1.xiaoniren.cn/js/plugins/ueditor/dialogs/image/images/success.png" alt="">
                            </div>
                            <span>{{item.pap}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="Span">模块高度：</span>
                    <el-input-number v-model="photos.height" controls-position="right" size="mini" @change="handleChange" :min="100" :max="1600"></el-input-number>
                </div>
                <div class="Ptupianquyu" v-for="(tem,ind) in photos.img" :key="ind" @click="xuanze(ind)">
                    <div class="PTleft">
                        <span class="Span">添加图片：</span>
                        <div class="Stupian" @click="tjtp(ind)">
                            <img class="Stuimg" :src="tem.tpimg" alt="">
                            <span class="Stuspan">修改{{ind}}图</span>
                        </div>
                    </div>
                    <div class="PTright">
                        <span class="Spann">页面：</span><el-cascader class="Picinput" :options="options" :clearable="true" @change="change" :show-all-levels="false"></el-cascader>
                    </div>
                </div>
                <!-- 商品详情小页面 -->
            </div>
        </div>
    </div>
</template>

<script>
import Xiangqing from '../components/comm/xiangqing'
import Imageupload from "../components/comm/Imageupload"
import Yingxiaohd from "../components/comm/yingxiaohuodong"
import Danyemian from "../components/comm/danyemian"
import Fenleiye from "../components/comm/fenleiye"
import {http,TemplatePage,Www1,BackEnd} from '../assets/BaseApi'

export default {
    name:'Picture',
    components: {
        Xiangqing,
        Imageupload,
        Danyemian,
        Fenleiye,
        Yingxiaohd
    },
    props: {
        Pindex: Number,
        Pitype:Boolean,
        picigs:Array,
        options:Array,
        MerchantId: Number,
        ArrClassify:Array,
        // 详情
        Arrparticular:Array,
        // 单页
        Singlepage:Array,
        // 
        Totalpages:Number,
        particulars:Array,
        currentPage:Number,
        perpage:Number,
        // 
        photos: Object
    },
    data () {
        return {
            PiynMK:true,
            tpimg:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',
            tupianzz:true,
            // 图片点击index
            index:null,
            page:'',
            // 分类数组
            tupians: [
                {name:'Pimg', id:'1',pap:'一竖',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804789786.jpg'},
                {name:'Pimg2',id:'2',pap:'二竖',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804847298.jpg'},
                {name:'Pimg3',id:'3',pap:'三竖',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804889866.jpg'},
                {name:'Pimg32',id:'3',pap:'三横',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804942010.jpg'},
                {name:'Pimg4',id:'3',pap:'左二右一',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804989598.jpg'},
                {name:'Pimg5',id:'5',pap:'左四右一',img:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254805042465.jpg'},
            ],
            type:'',
            imgyincang: false,
            Fyincang: false,
            Dyincang: false,
            yincang: false,
            // 营销活动
            Yxiangqing:false,
        }
    },
    mounted:function () {
        
    },
    methods: {
        Dxqguanbi (e) {
            this.Dyincang = false
        },
        Dxuanzele (id) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.photos.img[this.index].page = a + id ? a + id : this.photos.img[this.index].page
            this.$emit("tupian",this.photos.img,this.Pindex)
        },
        Fxqguanbi (e) {
            this.Fyincang = false
        },
        Fxuanzele (id) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.photos.img[this.index].page = a + id ? a + id : this.photos.img[this.index].page
            this.$emit("tupian",this.photos.img,this.Pindex)
            console.log('分类选择'+this.Pindex)
        },
        // 营销活动
        Yxqguanbi (e) {
            this.Yxiangqing = false
        },
        // 营销活动
        Yxuanzele (id) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.photos.img[this.index].page = a + id ? a + id : this.photos.img[this.index].page
            this.$emit("tupian",this.photos.img,this.Pindex)
            console.log(this.photos)
        },
        PiYesMK (i) {
            this.PiynMK = true
            this.photos.PiynMK = true
            this.$emit('PiShowHide',true,this.Pindex)
        },
        PiNoMK (i) {
            this.PiynMK = false
            this.photos.PiynMK = false
            this.$emit('PiShowHide',false,this.Pindex)
        },
        tjtp (ind) {
            this.imgyincang = true
            this.index = ind
        },
        guanbi () {
           this.imgyincang = false
        },
        tupiantianjia (id) {
            this.imgyincang = false
            this.photos.img[this.index].tpimg = http + id.value
            this.$emit("tupian",this.photos.img,this.Pindex)
            console.log('图片添加'+this.Pindex)
        },
        handleChange(value) {
            this.photos.Pheight = value
            this.$emit("Picheight",value,this.Pindex)
        },
        // 选择商品ID
        xuanzele (e) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.photos.img[this.index].page = a + e ? a + e : this.photos.img[this.index].page
            this.$emit("tupian",this.photos.img,this.Pindex)
            console.log('选择商品'+this.Pindex)
        },
        // 赋值id
        xuanze (ind) {
            this.index = ind
        },
        // 选择地址
        change(value) {
            console.log(value[0])
            this.page = value[0] || 'page'
            this.photos.img[this.index].page = value[0] || 'page'
            this.$emit("tupian",this.photos.img,this.Pindex)
            
            if (value[0] == "goodsInfo?id=") {
                this.yincang = true
            }else if (value[0] == "article?id=") {
                this.Dyincang = true
            }else if (value[0] == "categoryInfo?id=" || value[0] == "categoryScrollDetail?id=" || value[0] == "categoryInfoTopScroll?id=") {
                this.Fyincang = true
            }else if (value[0] == "discount?type=") {
                this.Yxiangqing = true
                console.log('营销活动')
            }
        },
        xqguanbi (e) {
            this.yincang = false
        },
        // 个数
        geshu (id,name,index) {
            this.photos.colindex = index
            this.$emit('clas',name,this.Pindex)
            if (name == 'Pimg4') {
                this.photos.colstyle = 3
                this.$emit('geshi',3,this.Pindex,index)
            }else if(name == 'Pimg5'){
                this.photos.colstyle = 4
                this.$emit('geshi',4,this.Pindex,index)
            }else if(name == 'Pimg32') {
                this.photos.colstyle = 2
                this.$emit('geshi',2,this.Pindex,index)
            }else{
                this.photos.colstyle = 1
                this.photos.class = name
                this.$emit('geshi',1,this.Pindex,index)
            }
            for (var i=0;i<id;i++) {
                let img = {tpimg:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',page:'page'}
                if (!this.photos.img[i]) {
                    this.photos.img.push(img)
                }
                this.$emit("tupian",this.photos.img,this.Pindex)
            }
            this.photos.img.length = id
            
        },
        xuanzhong (e) {
            this.$emit('xuanzhong', e)
        },
        paging (e) {
            this.$emit('paging', e)
        },
        sousuo (e) {
            this.$emit('sousuo', e)
        }
    }
}
</script>

<style>
    .pictureque {
        width: 100%;
    }
    .Cbody{
        width: 100%;
        height: 100%;
    }
    .Pfl {
        float: left;
    }
    .Pfr {
        float: right;
    }
    .PI5l {
        padding-bottom: 4px;
        padding-right: 4px;
    }
    .PI5l:nth-of-type(even) {
        padding-right: 0px;
    }
    .PI5l:nth-child(3) {
        padding-bottom: 0px;
    }
    .PI5l:nth-child(4) {
        padding-bottom: 0px;
    }
    .Cbody:hover {
        cursor: move;
        border-left: 1px dashed #409EFF;
        border-right: 1px dashed #409EFF;
        border-top: 1px solid #409EFF;
        border-bottom: 1px solid #409EFF;
    }
    .Pimage {
        display: inline-block;
        width: 100%;
    }
    .Pimage:nth-child(2) {
        padding-top: 0px;
    }
    .Pimg4:nth-child(2) {
        padding-left: 4px;
    }
    .Pimg {
        display: inline-block;
        width: 100%;
        float: left;
    }
    .Pimg2 {
        display: inline-block;
        width: 49.2%;
        float: left;
    }
    .Pimg2:nth-child(2) {
        padding-left:4px; 
    }
    .Pimg3 {
        display: inline-block;
        width: 32.3%;
        margin-left: 4px;
        box-sizing: border-box;
        float: left;
    }
    .Pimg3:nth-child(1) {
        margin-left: 0px;
    }
    .Pimg32 {
        display: inline-block;
        width: 100%;
    }
    .Pimg32:nth-last-child(1) {
        margin-bottom: -4px;
    }
    .Pimg4 {
        display: inline-block;
        width: 49.1%;
    }
    .Pimg5 {
        display: inline-block;
        width: 48%;
        float: left;
    }
    .Pimg6 {
        display: inline-block;
        width: 31.8%;
        float: right;
    }
    .Pimg56 {
        display: inline-block;
        width: 68%;
        float: left;
    }
    .Pdiv {
        padding: 1px 2px;
        box-sizing: border-box;
    }
    .Picinput {
        width: 200px;
        height: 40px;
    }
    .Pright {
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
        background: #f8f8f8;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        z-index: 1999;
        text-align: left;
        overflow: auto;
    }
    .Pright::-webkit-scrollbar {display:none}
    .Pfengge {
        width: 100%;
        height: 300px;
    }
    .Span{
        font-size: 16px;
        margin-right: 15px;
        float: left;
    }
    .Spann {
        font-size: 16px;
    }
    .Pfenggexuanze {
        width: 400px;
        height: 280px;
        float: left;
    }
    .Pigeshu {
        width: 120px;
        height: 143px;
        margin-right: 13px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        float: left;
    } 
    .Pfgimg {
        display: inline-block;
        width: 120px;
        height: 110px;
    }
    .Pfdiv {
        width: 100%;
        position: relative;
        border: 2px solid #ccc;
    }
    .pitchimg {
        width: 100%;
        border: 2px solid #1094fa;
    }
    .Pfduigou {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .Ptupianquyu {
        height: 140px;
        line-height: 130px;
        background-color: #fff;
        padding: 5px;
        box-sizing: border-box;
        margin: 10px;
        margin-left: 0px;
    }
    .PTleft {
        width: 50%;
        height: 100%;
        float: left;
    }
    .PTright {
        width: 50%;
        height: 100%;
        float: right;
    }
    .PTright .el-cascader--mini .el-input__inner {
        width: 205px;
    }
    .Stupian {
        display: inline-block;
        width: 120px;
        height: 120px;
        text-align: center;
        background-color: #eee;
        color: #7560f7;
        font-size: 16px;
        cursor: pointer;
        position: relative;
    }
    
</style>
