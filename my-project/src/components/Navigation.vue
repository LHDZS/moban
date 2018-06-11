<template>
  <div class="Navigation" v-if="NavShowHide">
    <div class="Cbody">
      <!-- <el-button id="shanchu" v-if="bol" type="text" @click="open3"><i class="el-icon-error col"></i></el-button> -->
      <div :class=" menu.length%3 == 0 ? 'qishu' : 'oushu'" v-for="(item,key) in menu" :key="key">
          <img class="icon" :src="item.icon">
          <span class="daospan">{{item.name}}</span>
          <div id="icon-div" class="icondiv" style="display:none"></div>
      </div>
      <div class="clear"></div>
    </div>
     <!-- 图片上传小页面 -->
    <Imageupload :Iyincang="shangchuan" v-on:queren="queren" v-on:guanbi="guanbi1"></Imageupload>
    <Imageupload :Iyincang="xiugaishangchuan" v-on:queren="querenxiugai" v-on:guanbi="xiugaiguanbi"></Imageupload>
    <Xiangqing :yincang="xiangqing" :Totalpages="Totalpages" :items="particulars" :perpage="perpage" :currentPage="currentPage" :optione="ArrClassify" v-on:xqguanbi="xqguanbi" v-on:choose="xuanzele" v-on:xuanzhong="xuanzhong" v-on:paging="paging" v-on:sousuo="sousuo"></Xiangqing>
    <Danyemian :Dyincang="Dxiangqing" :items="Singlepage" v-on:Dxqguanbi="Dxqguanbi" v-on:Dchoose="Dxuanzele"></Danyemian>
    <Fenleiye :Fyincang="Fxiangqing" :items="ArrClassify" v-on:Fxqguanbi="Fxqguanbi" v-on:Fchoose="Fxuanzele"></Fenleiye>
    <div class="Nright">
      <div class="Sdianzhao"><i></i><span>导航设置</span></div>
      <div class="Swcaozuo" v-if="Navtype">
          <span class="Span" style="margin-top:0px">模块配置：</span>
          <div class="SwLunbo" style="width:140px">
              <span class="YesNoLb" style="marginRight:6px">是否显示</span>
              <div class="YesNo">
                  <span class="Yes" :class="NavynMK ? 'pitch' : '' "  @click="NavYesMK()">是</span>
                  <span class="No" :class="!NavynMK ? 'pitch' : '' "  @click="NavNoMK()">否</span>
              </div>
          </div>
      </div>
      <!-- 导航数据展示 -->
      <div class="NavIliebiao">
        <el-button class="Navlbli" type="primary" @click="tupian">添加导航</el-button>
        <ul class="liebiao">
          <li class="lbli" :class="key == ine ? 'lanse' : ''" @click="fuzhi(val,ine)" v-for="(val,ine) in menu" :key="ine">
            <div class="lbdiv">
                <img class="lbimg" :src="val.icon" alt="">
                <span class="lbspan">{{val.name}}</span>
            </div>
            <el-button class="navshanchu" v-if="key == ine" type="text" @click="handleRemove(ine,val.name)"><i class="el-icon-error nav"></i></el-button>
          </li>
          <div class="clear"></div>
        </ul>
        <div class="clear"></div>
      </div>
        <div class="zhanwei"></div>
        <div class="xinzeng">
            <div class="Swtupian"  @click="xiugai">
              <img class="Stuimg" :src="icons" alt="">
              <span class="Ntuspan">修改图片</span>
              </div>
            <div class="Swyoulan">
                <div class="zhanwei"></div>
                <div class="Navdiv">
                  <span class="Navname">修改名称：</span>
                  <el-input class="Navinput" placeholder="输入内容" :value="names":placeholder="Navplaceholder" :maxlength="4" :disabled="namedisable" @blur="name" clearable></el-input>
                </div>
                <div class="zhanwei"></div>
                <div class="Navdiv">
                  <span class="Navname">修改地址：</span>
                  <el-radio class="Navwailian" v-model="radio" label="1">外链</el-radio>
                  <el-radio v-model="radio" label="2">页面</el-radio>
                </div>
                <div class="zhanwei" style="width: 100px height: 5px"></div>
                <div class="Navdiv" :id="Vred ? 'Video' : ''" v-if="radio == 1">
                  <span class="Navname">外链：</span><el-input class="Navinput" placeholder="输入链接" :value="pageu" @blur="pages" :disabled="pagedisable" clearable></el-input>
                  <span v-if="Vred" class="Vispan">请输入正确地址</span>
                </div>
                <div class="Navdiv" v-if="radio == 2">
                  <span class="Navname">页面：</span>
                  <el-cascader 
                    class="Navinput"
                    :options="options"
                    :clearable="true" 
                    :value="paget"
                    @change="change" 
                    :disabled="pagedisable"
                    :show-all-levels="false"
                    :placeholder="pageu"
                  ></el-cascader>
                </div>
            </div>
            <div class="clear"></div>
            <!-- 商品详情小页面 -->
        </div>
    </div>
  </div>
</template>

<script>
import Xiangqing from "../components/comm/xiangqing"
import Danyemian from "../components/comm/danyemian"
import Imageupload from "../components/comm/Imageupload"
import Fenleiye from "../components/comm/fenleiye"
import {http,TemplatePage,Www1,BackEnd} from '../assets/BaseApi'

export default {
  name: 'Navigation',
  components: {
    Xiangqing,
    Imageupload,
    Danyemian,
    Fenleiye
  },
  props:{
    showhide:Boolean,
    index: Number,
    navigs: Array,
    Navtype: Boolean,
    ArrClassify:Array,
    Singlepage:Array,
    Totalpages:Number, 
    particulars:Array,
    currentPage:Number,
    perpage:Number,
    menu:Array,
    NavynMK:Boolean,
    NavShowHide:Boolean,
    // 页面
    options: Array
  },
  data () {
      return {
        Vred:false,
        radio: '1',
        Navplaceholder: '',
        namedisable: true,
        pagedisable: true,
        type:'',
        pageu: '',
        names:'',
        icons:'',
        key: null,
        bol: false,
        xiugaishangchuan:false,
        shangchuan:false,
        xiangqing:false,
        Dxiangqing:false,
        Fxiangqing:false,
        paget:['value']
      }
  },
  methods: {
    NavYesMK () {
        this.NavynMK = true
        var Show = true
        this.$emit('NavShowHide',Show)
    },
    NavNoMK () {
        this.NavynMK = false
        var Hide = false
        this.$emit('NavShowHide',Hide)
    },
    fuzhi (val,ine) {
      this.Vred = false
      this.namedisable = false
      this.pagedisable = false
      this.names = val.name
      this.paget = []
      this.icons = val.icon
      this.key = ine
      let _this = this
      function isURL(domain) {
        var name = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        if(!(name.test(domain)))
        {
          _this.radio = '2'
          _this.pageu = domain
        }
        else
        {
          _this.radio = '1'
          _this.pageu = domain
        }
      }
      isURL(val.page)
      
    },
    // 图片上传点击确认
    queren (id) {
      this.shangchuan = false
      var sss = {
        name: '菜单'+ (this.menu.length+1),
        icon: http + id.value,
        page: 'http://'
      }
      this.key = this.menu.length
      this.names = sss.name
      this.pageu = sss.page
      this.icons = sss.icon
      this.menu.push(sss)
      if (this.menu[this.key].name == '') {
        return alert('内容不能为空')
      }
      this.$emit('naviga',this.menu)
    },
    querenxiugai (id) {
      this.xiugaishangchuan = false
      this.menu[this.key].icon = http + id.value
      this.icons = http + id.value
      console.log(http)
      this.$emit('naviga',this.menu)
    },
    // 关闭图片小窗口
    guanbi1 () {
      this.shangchuan = false
    },
    // 选择商品ID
    xuanzele (id) {
      var p = this.menu[this.key].page
      var s = p.substring(p.indexOf("=")+1,p.length);
      var reg = new RegExp(s);
      var a = p.replace(reg,"");
      this.menu[this.key].page = a + id || this.menu[this.key].page
      console.log(this.menu)
      this.$emit('naviga',this.menu)
    },
    Dxuanzele (id) {
      var p = this.menu[this.key].page
      var s = p.substring(p.indexOf("=")+1,p.length);
      var reg = new RegExp(s);
      var a = p.replace(reg,"");
      this.menu[this.key].page = a+id || this.menu[this.key].page
      console.log(this.menu)
      this.$emit('naviga',this.menu)
    },
    Fxuanzele (id) {
      var p = this.menu[this.key].page
      var s = p.substring(p.indexOf("=")+1,p.length);
      var reg = new RegExp(s);
      var a = p.replace(reg,"");
      this.menu[this.key].page = a+id || this.menu[this.key].page
      console.log(this.menu)
      this.$emit('naviga',this.menu)
    },
    tupian () {
      this.shangchuan = true
    },
    xiugai (e) {
      this.xiugaishangchuan = true
    },
    xiugaiguanbi () {
      this.xiugaishangchuan = false
    },
    // 多级菜单选择器
    change(value) {
      console.log(value[0])
      this.menu[this.key].page = value[0] || 'page'
      this.$emit('naviga',this.menu)
        if (value[0] == "goodsInfo?id=") {
          this.xiangqing = true
          console.log('商品页')
        }else if (value[0] == "article?id=") {
          this.Dxiangqing = true
          console.log('单页')
        }else if (value[0] == "categoryInfo?id=" || value[0] == "categoryScrollDetail?id=" || value[0] == "categoryInfoTopScroll?id=") {
          this.Fxiangqing = true
        }
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
    },
    // 
    xqguanbi (e) {
        this.xiangqing = false
    },
    Dxqguanbi (e) {
        this.Dxiangqing = false
    },
    Fxqguanbi (e) {
        this.Fxiangqing = false
    },
    name (err) {
      this.menu[this.key].name = err.target.value ? err.target.value : this.menu[this.key].name
      console.log(this.menu)
      this.$emit('naviga',this.menu)
    },
    pages (err) {
      this.menu[this.key].page = ''
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        if (!err.target.value.match(reg)) {
            return this.Vred = true
        }
      this.Vred = false  
      var p = err.target.value
      var s = p.substring(0,p.indexOf("=")+1);
      var a = p.replace(s,"");
      this.menu[this.key].page = 'webView?url=' + a || this.menu[this.key].page
      this.$emit('naviga',this.menu)
    },
    //删除数组指定元素   
      handleRemove(ine,name) {
        this.$confirm('确定删除“'+ name +'”吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.menu.splice(ine,1)
            this.$emit('naviga',this.menu)
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
    //删除组件
      // open3() {
      //     this.$confirm('删除当前导航组件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //     }).then(() => {
      //     this.navigs.splice(this.index,1);
      //     // this.$emit('delChange', this.index)
      //     this.$message({
      //         type: 'success',
      //         message: '删除成功!',
      //     });
      //     }).catch(() => {
      //     this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //     });          
      //     });
      // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Navigation {
    width: 100%;
    position: relative;
    border: 1px solid #fff;
    box-sizing:border-box;
}
.Cbody {
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
.clear{ clear:both} 
.oushu {
    padding: 8px 0px;
    width: 25%;
    height: 60px;
    line-height: 20px;
    float: left;
}
.qishu {
    padding-top: 10px;
    width: 33.333%;
    height: 70px;
    line-height: 20px;
    float: left;
}
.icon {
    width: 40px;
    height: 40px;
}
.daospan {
    display:block;
    width: 100%;
    height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 14px;
}
.Nright {
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
.NavIliebiao {
  width: 100%;
  line-height: 35px;
}
.Swyoulan {
  float: right;
}
.xinzeng {
  width: 540px;
  margin-top: 20px;
}
.NavSpan {
  font-size: 16px;
  margin-right: 15px;
  float: left;
}
input {
  text-indent:1em;
  color: #999;
  border-radius: 5px;
  border:1px solid #DBDBDB;
}
.zhanwei {
  width: 100px;
  height: 5px;
}
.Navdiv {
  width: 365px;
  height: 41px;
  line-height: 40px;
}
.Navinput {
  width: 275px;
  height: 41px;
  float: right;
}
.Navname {
  float: left;
  font-size: 16px;
}
.icondiv {
  width: 50%;
  float: left;
}
.liebiao {
  width: 475px;
  float: left;
  list-style: none;
  padding: 0;
  margin: 0;
}
.lbli {
  width: 108px;
  height: 30px;
  line-height: 30px;
  margin: 5px;
  cursor: pointer;
  float: left;
  position: relative;
}
.Navlbli {
  text-align: center;
  cursor: pointer;
  float: left;
}
.lbdiv {
  width: 100%;
  height: 30px;
}
.navshanchu {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
}
.lanse {
  color: #10ADE6;
}
.lbli:hover {
  color: #10ADE6;
  cursor: pointer;
}
.lbimg {
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 5px;
  float: left;
}
.lbspan {
  width: 100px;
}
.Ntuspan {
  display: inline-block;
  width: 100%;
  height: 20%;
  line-height: 25px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
.Navwailian {
  margin-left: 15px;
}
</style>