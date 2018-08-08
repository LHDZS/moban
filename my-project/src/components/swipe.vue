<template>
  <div class="swipe" v-if="SwipeShowHide">
      <div class="Cbody">
        <el-carousel height="141px" :autoplay='autoplay'
        :indicator-position="indicatorposition ? '' : 'none'"
        :interval='interval'>
            <el-carousel-item v-for="(tag,key) in list" :key="key">
                <img class="mtimgs" :src="tag.link" />
                <span class="mtname" v-if="Swtpname">{{tag.name}}</span>
            </el-carousel-item>
        </el-carousel>
      </div>
      <Danyemian :Dyincang="Dxiangqing" :items="Singlepage" v-on:Dxqguanbi="Dxqguanbi" v-on:Dchoose="Dxuanzele"></Danyemian>
      <Xiangqing :yincang="Swipexiangqing" :Totalpages="Totalpages" :items="particulars" :perpage="perpage" :currentPage="currentPage" :optione="ArrClassify" v-on:xqguanbi="xiangqingguanbi" v-on:choose="Swipexuanzele" v-on:xuanzhong="xuanzhong" v-on:paging="paging" v-on:sousuo="sousuo"></Xiangqing>
      <Imageupload :Iyincang="Swipezhezhao" v-on:queren="Swipequeren" v-on:guanbi="Swipeguanbi"></Imageupload>
      <Fenleiye :Fyincang="Fxiangqing" :items="ArrClassify" v-on:Fxqguanbi="Fxqguanbi" v-on:Fchoose="Fxuanzele"></Fenleiye>
      <Yingxiaohd :Yyincang="Yxiangqing" v-on:Yxqguanbi="Yxqguanbi" v-on:Ychoose="Yxuanzele"></Yingxiaohd>
      <div class="SWright">
          <div class="Sdianzhao"><i></i><span>轮播设置</span></div>
          <div class="Swcaozuo" v-if="Swtype">
            <span class="Span" style="margin-top:0px">模块配置：</span>
            <div class="SwLunbo" style="width:140px">
                <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                <div class="YesNo">
                    <span class="Yes" :class="SwynMK ? 'pitch' : '' "  @click="SwYesMK()">是</span>
                    <span class="No" :class="!SwynMK ? 'pitch' : '' "  @click="SwNoMK()">否</span>
                </div>
            </div>
          </div>
          <div class="Swcaozuo">
              <span class="Span">排列风格：</span>
              <div class="SwLunbo"><span class="YesNoLb">是否自动轮播</span>
                    <div class="YesNo">
                        <span class="Yes" :class="Swyn == 1 ? 'pitch' : ''" @click="SwYes()">是</span><span class="No" :class="Swyn==2 ? 'pitch' : ''" @click="SwNo()">否</span>
                    </div>
              </div>
              <div class="SwDian"><span class="YesNoLb">显示隐藏轮播点</span>
                    <div class="YesNo">
                        <span class="Yes" :class="Swynd == 1 ? 'pitch' : ''" @click="SwYesD()">显示</span><span class="No" :class="Swynd==2 ? 'pitch' : ''" @click="SwNoD()">隐藏</span>
                    </div>
              </div>
              <div class="SwName"><span class="YesNoLb">显示隐藏名称</span>
                    <div class="YesNo">
                        <span class="Yes" :class="Swzzc == 1 ? 'pitch' : ''" @click="SwYesZz()">显示</span><span class="No" :class="Swzzc==2 ? 'pitch' : ''" @click="SwNoZz()">隐藏</span>
                    </div>
              </div>
          </div>
          <div class="Swcaozuo">
              <span class="Span">轮播间隔：</span>
              <el-input-number v-model="interval" @change="handleChange" :step="1000" :min="0" :max="10000" size="mini" label="修改轮播速度后再次点击轮播生效"></el-input-number>
          </div>
          <div >
              <span class="Span">轮播图：</span>
              <div class="Swrbox">
                  <el-button type="primary" @click="lunbotu()" size="mini">添加轮播图</el-button><span class="Swboxspan">最多五张轮播图</span>
                    <div class="Swlunboliebiao" v-for="(tem,ind) in list" :key="ind" @click="xuanze(ind)">
                        <div class="Switem">
                            <div class="Swbody" v-on:mouseenter="SwdataDetails(ind)" v-on:mouseleave="SwhiddenDetail(ind)">
                                <el-button class="Swshanchu" style="padding:0px" type="text" @click="Swhide(ind)"><i class="el-icon-error col"></i></el-button>
                                <div class="Swtupian" @click="Swipetianjia(ind)">
                                    <img class="Stuimg" :src="tem.link" alt="">
                                    <span class="Stuspan">修改{{ind}}图</span>
                                </div>
                            </div>
                            <div class="Swnamedizhi">
                                <div class="Swipername">
                                    <span class="SwNavname">轮播图名称：</span><el-input style="width:244px" placeholder="输入内容" :maxlength="4" :value="tem.name" @blur="Swipename" clearable></el-input>
                                </div>
                                <div class="Swiperdizhi">
                                    <span class="SwNavname1">页面：</span><el-cascader class="Swinput" :options="options" :clearable="true" @change="Swipechange"  :show-all-levels="false"></el-cascader>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
    </div>
  </div>
</template>

<script>
import Imageupload from '../components/comm/Imageupload'
import Xiangqing from '../components/comm/xiangqing'
import Danyemian from "../components/comm/danyemian"
import Yingxiaohd from "../components/comm/yingxiaohuodong"
import Fenleiye from "../components/comm/fenleiye"
import {http,TemplatePage,Www1,BackEnd} from '../assets/BaseApi'

export default {
    name:'swipe',
    props: {
        showhide:Boolean,
        swipes:Array,
        Swtype: Boolean,
        // 分类
        ArrClassify:Array,
        options:Array,
        // 单页
        Singlepage:Array,
        // 详情
        Totalpages:Number, 
        particulars:Array,
        currentPage:Number,
        perpage:Number,
        // 轮播图
        indicatorposition: Boolean,
        autoplay: Boolean,
        list: Array,
        // 控制显示隐藏
        SwipeShowHide: Boolean,
        Swtpname: Boolean,
        Swyn: Number,
        Swynd: Number,
        Swzzc: Number,
        SwynMK: Boolean,
        interval: Number,
    },
    components: {
        Imageupload,
        Xiangqing,
        Danyemian,
        Fenleiye,
        Yingxiaohd
    },
    data () {
        return {
            bol: false,
            // 遮罩层
            index: null,
            type:'',
            // 商品详情
            Swipexiangqing:false,
            Dxiangqing:false,
            Fxiangqing:false,
            Swipezhezhao:false,
            page:null,
            // 营销活动
            Yxiangqing:false,
        }
    },
    // 挂载结束后
    mounted:function() {

    },
    methods: {
        SwYesMK () {
            this.SwynMK = true
            var Show = true
            this.$emit('SwShowHide',Show)
        },
        SwNoMK () {
            this.SwynMK = false
            var Hide = false
            this.$emit('SwShowHide',Hide)
        },
        SwYesZz() {
            this.Swtpname = true
            this.Swzzc = 1
            this.$emit('SwName',true,1)
        },
        SwNoZz () {
            this.Swtpname = false
            this.Swzzc = 2
            this.$emit('SwName',false,2)
        },
        SwYes() {
            this.autoplay = true;
            this.$emit('autoplay',this.autoplay,1)
            this.Swyn = 1
        },
        SwNo() {
            this.autoplay = false;
            this.$emit('autoplay',this.autoplay,2)
            this.Swyn = 2
        },
        SwYesD() {
            this.indicatorposition = true
            this.$emit('indicatorposition',this.indicatorposition,1)
            this.Swynd = 1
        },
        SwNoD() {
            this.indicatorposition = false
            this.$emit('indicatorposition',this.indicatorposition,2)
            this.Swynd = 2
        },
        // 删除轮播图
        SwdataDetails (i) {
            var SwArr = document.getElementsByClassName('Swshanchu')
            SwArr[i].style.display = 'block'
        },
        SwhiddenDetail (i) {
            var SwArr = document.getElementsByClassName('Swshanchu')
            SwArr[i].style.display = 'none'
        },
        // 加减速度
        handleChange(value) {
            this.$emit('speed',value)
        },
        // navjava (id) {
        //     var _this = this
        //     this.$ajax.get(TemplatePage+id)
        //     .then(function (res) {
        //         _this.options = res.data
        //     })
        //     .catch(function (err) {
        //         console.log(err)
        //         console.log('轮播图分类地址请求失败了')
        //     });
        // },
        //删除 
        Swhide(ind) {
            this.$confirm('删除当前轮播图, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.list.splice(ind,1);
            // this.$emit('delChange', this.index)
            this.$message({
                type: 'success',
                message: '删除成功!',
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        Dxqguanbi (e) {
            this.Dxiangqing = false
        },
        Dxuanzele (id) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.list[this.index].page = a + id ? a + id : this.tpimgs[this.index].page
            this.$emit('Swipequeren',this.list)
        },
        Fxqguanbi (e) {
            this.Fxiangqing = false
        },
        Fxuanzele (id) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.list[this.index].page = a + id ? a + id : this.tpimgs[this.index].page
            this.$emit('Swipequeren',this.list)
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
            this.list[this.index].page = a + id ? a + id : this.tpimgs[this.index].page
            this.$emit('Swipequeren',this.list)
        },
        // 图片上传
        Swipetianjia (ind) {
            console.log('图片上传')
            this.Swipezhezhao = true
            this.index = ind
        },
        Swipequeren (id) {
            this.Swipezhezhao = false
            this.list[this.index].link = http + id.value
            this.$emit('Swipequeren',this.list)
        },
        Swipeguanbi () {
            this.Swipezhezhao = false
        },
        // 商品详情
        xiangqingguanbi () {
            this.Swipexiangqing = false
        },
        // 保存index
        xuanze (ind) {
            // console.log('触发了选择'+ ind)
            this.index = ind
        },
        // 修改名字
        Swipename (err) {
            this.list[this.index].name = err.target.value ? err.target.value : this.list[this.index].name
            this.$emit('Swipequeren',this.list)
        },
        Swipexuanzele (id) {
            var p = this.page
            var s = p.substring(p.indexOf("=")+1,p.length);
            var reg = new RegExp(s);
            var a = p.replace(reg,"");
            this.list[this.index].page = a + id ? a + id : this.tpimgs[this.index].page
            this.$emit('Swipequeren',this.list)
        },
        // 分类选择
        Swipechange(value) {
            this.page = value[0] || 'page'
            this.list[this.index].page = value[0] || 'page'
            this.$emit('Swipequeren',this.list)
            if (value[0] == "goodsInfo?id=") {
                this.Swipexiangqing = true
            }else if (value[0] == "article?id=") {
                this.Dxiangqing = true
            }else if (value[0] == "categoryInfo?id=" || value[0] == "categoryScrollDetail?id=" || value[0] == "categoryInfoTopScroll?id=") {
                this.Fxiangqing = true
            }else if (value[0] == "discount?type=") {
                console.log(value[0])
                this.Yxiangqing = true
                console.log('营销活动')
            }
        },
        // 添加轮播图
        lunbotu () {
            let swipe = { link: 'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',
                  name: '轮播图'+this.list.length,
                  page: 'page' }
            if (this.list.length >= 5) {
                return alert('最多添加五个')
            }
            this.list.push(swipe)
            this.$emit('Swipequeren',this.list)
        },
        // 详情组件事件
        xuanzhong (e) {
            this.$emit('xuanzhong', e)
        },
        paging (e) {
            this.$emit('paging', e)
        },
        sousuo (e) {
            this.$emit('sousuo', e)
        }
        // 
    }
}
</script>

<style>
    .swipe {
        box-sizing:border-box;
        position: relative;
    }
    .mtimgs {
        width: 100%;
        height: 100%;
    }
    .mtname {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: left;
        padding-left: 5px; 
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
    }
    .SWright {
        display: none;
        font-size: 14px;
        color: #666;
        width: 743px;
        height: 440px;
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
        overflow: auto;
    }
    .SWright::-webkit-scrollbar {display:none}
    .Swcaozuo {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 24px;
    }
    .SwLunbo {
        width: 175px;
        margin-right: 15px;
        float: left;
    }
    .SwDian {
        width: 210px;
        margin-right: 15px;
        float: left;
    }
    .SwName {
        width: 200px;
        margin-right: 15px;
        float: left;
    }
    .SwName .YesNo {
        width: 83px;
        height: 32px;
        border-radius: 5px;
        overflow: hidden;
        float: right;
    }
    .YesNoLb {
        display: block;
        font-size: 16px;
        margin-right: 12px;
        float: left;
    }
    .SwLunbo .YesNo {
        width: 62px;
        height: 32px;
        border-radius: 5px;
        overflow: hidden;
        float: right;
    }
    .SwDian .YesNo {
        width: 83px;
        height: 32px;
        border-radius: 5px;
        overflow: hidden;
        float: right;
    }
    .Yes {
        display: block;
        width: 50%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        float: left;
        background-color: #ecf0f5;
        color: #000;
    }
    .No{
        display: block;
        width: 50%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        float: right;
        background-color: #ecf0f5;
        color: #000;
    }
    .Swinput {
        width: 244px;
        height: 41px;
    }
    .pitch {
        background-color: #1e81ff;
        color: #fff;
    }
    .Swrbox {
        width: 640px;
        margin-left: 16px;
        float: left;
    }
    .Swlunboliebiao {
        margin-top: 18px;
    }
    .Swboxspan {
        font-size: 12px;
        margin-left: 10px;
        color: #ccc;
    }
    .Switem {
        width: 100%;
        height: 120px;
        line-height: 60px;
        margin-bottom: 10px;
    }
    .Swtupian {
        display: inline-block;
        width: 120px;
        height: 120px;
        cursor: pointer;
        text-align: center;
        line-height: 120px;
        background-color: #eee;
        color: #7560f7;
        font-size: 16px;
        float: left;
        position: relative;
    }
    .Swnamedizhi {
        width: 480px;
        float: right;
    }
    .SwNavname {
        font-size: 16px;
        margin-right: 15px;
    }
    .SwNavname1 {
        font-size: 16px;
        margin-left: 48px;
        margin-right: 15px;
    }
    .zhanwei {
        width: 100px;
        height: 10px;
    }
    .el-carousel__indicator .el-carousel__button {
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .Swbody {
        display: inline-block;
        width: 120px;
        height: 120px;
        position: relative;
    }
    .Swshanchu {
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 0;
        cursor:pointer;
        color: #606266;
        z-index: 2000;
        display: none;
    }
</style>
