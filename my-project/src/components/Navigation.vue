<template>
  <div class="Navigation">
    <div :class=" menu.length%3 == 0 ? 'qishu' : 'oushu'" v-for="(item,key) in menu" :key="key">
        <img class="icon" :src="item.icon">
        <!-- <input class="daospan" type="text" :value="item.name"> -->
        <span class="daospan">{{item.name}}</span>
        <div id="icon-div" class="icondiv" style="display:none"></div>
    </div>
    <div class="right" v-if="showhide">
      <input id="wechatpage-icon" style="display:none" type="text">
      <div class="zhezhaoceng" v-if="shangchuan">
        <div class="picture">
          <div class="pictureTop">
            <span class="picTopSpan">我的图片</span>
            <div @click="guanbi" class="guanbi">
              <i class="el-icon-error"></i>
            </div>
          </div>
          <div class="pictureCentre"><iframe id="attachment" width="100%" height="100%" style="border:none" src="/attachment/create?div=icon-div&input=wechatpage-icon&single=1"></iframe></div>
          <div class="pictureBottom">
            <el-button @click="guanbi">取消</el-button>
            <el-button type="primary" @click="queren">确认</el-button>
          </div>
        </div> 
      </div>
        <!-- <div>
            <span>导航个数:</span>
            <el-radio-group v-model="digital" size="mini" @change="choose">
                <el-radio-button label="3"></el-radio-button>
                <el-radio-button label="4"></el-radio-button>
                <el-radio-button label="6"></el-radio-button>
                <el-radio-button label="8"></el-radio-button>
                <el-radio-button label="9"></el-radio-button>
            </el-radio-group>
        </div> -->
        <!-- <div style="width:100px ; height:10px"></div> -->
        <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="fileupload"
            multiple
            :limit="limi"
            :on-exceed="handleExceed"
            :file-list="menu">
        </el-upload> -->
        <ul class="liebiao">
          <li class="lbli" :class="key == ine ? 'lanse' : ''" @click="fuzhi(val,ine)" v-for="(val,ine) in menu" :key="ine">
            <img class="lbimg" :src="val.icon" alt="">
            <span class="lbspan">{{val.name}}</span>
            <el-button class="navshanchu" v-if="key == ine" type="text" @click="handleRemove(ine)"><i class="el-icon-error nav"></i></el-button>
          </li>
        </ul>
        <div class="zhanwei"></div>
        <div class="xinzeng">
            <el-button type="primary" @click="tupian">新增</el-button>
            <div class="zhanwei"></div>
            <div class="Navdiv">
              <span class="Navname">修改名称:</span><el-input class="Navinput" size="mini" placeholder="输入内容点击要修改的项并替换" :value="names" @blur="name" clearable></el-input>
            </div>
            <div class="zhanwei"></div>
            <el-radio v-model="radio" label="1">添加外链</el-radio>
            <el-radio v-model="radio" label="2">添加地址</el-radio>
            <div class="zhanwei"></div>
            <div class="Navdiv" v-if="radio == 1">
              <span class="Navname">添加外链:</span><el-input class="Navinput" size="mini" placeholder="输入链接地址点击要赋予的项" :value="pageu" @blur="pages" clearable></el-input>
            </div>
            <div class="Navdiv" v-if="radio == 2">
              <span class="Navname">添加地址:</span><el-cascader :options="options" size="mini" :clearable="true" @change="change" :show-all-levels="false"></el-cascader>
            </div>
            <!-- <div class="zhanwei"></div>
            <el-button type="primary" @click="xiugai">修改</el-button> -->
        </div>
      <div class="array"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props:{
    // mune:Array,
    showhide:Boolean
  },
  data () {
      return {
        menu:[
            {icon:"/upload/attachment/5/130/201803/15223879856986.png",
            name:'成功案例',
            page:'1'},
            {icon:"/upload/attachment/5/130/201803/15223879732217.png",
            name:'公司介绍',
            page:'2'},
            {icon:"/upload/attachment/5/130/201803/15223879667553.png",
            name:'留言薄',
            page:'3'},
            {icon:'/upload/attachment/5/130/201803/15223879588638.png',
            name:'地图导航',
            page:'4'}
        ],
        radio: '1',
        menulength: true,
        limi: 4,
        digital: '4',
        page: '',
        pageu: '',
        names:'',
        key: null,
        bol: false,
        options :[
          {
            value: 'danye',
            label: '单页',
            children: [
              {
                value: 'article?id=889',
                label: '新闻',
              },
              {
                value: 'article?id=888',
                label: '介绍',
              }
            ],
          },{
            value: 'tiaozhuan',
            label: '跳转',
            children: [
              {
                value: 'gbook',
                label: '调查',
              },
              {
                value: 'map',
                label: '物流',
              }
            ],
          }
        ],
        shangchuan: false,
        https: 'https://www.xiaoniren.cn',
        http:'http://www1.xiaoniren.cn'

      }
  },
  mounted:function() {
        this.navi()
  },
  methods: {
    fuzhi (val,ine) {
      this.names = val.name
      this.pageu = val.page
      this.key = ine
    },
    // xiugai () {
    //   this.menu[this.key].name = this.names
    //   this.menu[this.key].page = this.pageu
    // },
    navi () {
      var _this = this
      this.$ajax.get(this.http + '/weapp-config/setting')
      .then(function (res) {
          // 取值
          var data = res.data.ext.ext

          _this.menu = data.menu || _this.menu

          console.log('导航栏请求数据成功')
      })
      .catch(function (err) {
          console.log(err)
          console.log('失败了')
      });
    },
    queren () {
      this.shangchuan = false
      var id = document.getElementById('wechatpage-icon')
      var dss = document.getElementById("icon-div")
      var sss = {
        name: '自定义',
        icon: this.http + id.value,
        page: 'gbook'
      }
      this.key = this.menu.length
      this.names = sss.name
      this.pageu = sss.page
      this.menu.push(sss)
      this.$emit('naviga',this.menu)
    },
    guanbi () {
      this.shangchuan = false
    },
    tupian () {
      this.shangchuan = true
    },
    // 多级菜单选择器
    change(value) {
      console.log(value)
      // this.page = value[1] || 'page'
      this.menu[this.key].page = value[1] || 'page'
      console.log(this.menu)
    },
    name (err) {
      console.log(err.target.value)
      // this.names = err.target.value
      this.menu[this.key].name = err.target.value
      console.log(this.menu)
    },
    pages (err) {
      console.log(err.target.value)
      // this.page = err.target.value ? err.target.value : 'page'
      this.menu[this.key].page = err.target.value ? err.target.value : 'page'
      console.log(this.menu)
    },
    //   导航个数
      // choose (value){
      //   this.limi = parseInt(this.digital)
      //   console.log('最多只能添加'+this.limi+'条数据')
      // },
    //删除数组指定元素   
      handleRemove(ine) {
        this.$confirm('删除当前导航栏, 是否继续?', '提示', {
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
    //   点击查看详情
      // handlePreview(file) {
      //   console.log(file);
      //   file.name = this.names ? this.names : file.name
      //   file['page'] = this.page ? this.page : 'article?id=889'
      //   this.$emit('naviga',this.menu)
      // },
      // handleExceed(files, menu) {
      //   this.$message.warning(`当前限制选择 ${this.limi} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + menu.length} 个文件`);
      // },
      // beforeRemove(file, menu) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // }
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
.Navigation:hover {
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
    height: 100%;
    line-height: 20px;
    float: left;
}
.qishu {
    padding-top: 10px;
    width: 33.333%;
    height: 100%;
    line-height: 20px;
    float: left;
}
.icon {
    width: 50%;
}
.daospan {
    display:block;
    font-size: 14px;
}
.right {
  font-size: 14px;
  color: #666;
  width: 280px;
  cursor: default;
  position: absolute;
  right: -330px;
  top: -30px;
  padding: 10px 10px;
  min-height: 28px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
}
.zhezhaoceng {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2000;
}
.guanbi {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 50px;
  line-height: 50px;
  z-index: 99999;
}
.guanbi:hover {
  color: #409EFF;
  background-color: #ccc;
  cursor: pointer;
}
.picture{
  width: 67%;
  height: 95%;
  margin: 1px auto;
  background-color: #fff;
}
.pictureTop {
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #ccc;
  z-index: 2000;
}
.picTopSpan {
  float: left;
  font-size: 18px;
  margin: 15px;
}
.pictureCentre {
  width: 100%;
  height: 500px;
  overflow: auto;
}
.pictureBottom{
  width: 100%;
  height: 50px;
  background-color: #fff;
}
input {
  text-indent:1em;
  color: #999;
  border-radius: 5px;
  border:1px solid #DBDBDB;
}
.array {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent #d1d1d1 transparent transparent;
  position: absolute;
  left: -8px;
  top: 50px;
}
.array::after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent #f8f8f8 transparent transparent;
  position: absolute;
  left: 2px;
  top: -6px;
}
.zhanwei {
  width: 100px;
  height: 5px;
}
.Navdiv {
  width: 100%;
  height: 28px;
}
.Navinput {
  width: 215px;
  float: right;
}
.Navname {
  float: left;
  line-height: 28px;
}
.icondiv {
  width: 50%;
  float: left;
}
.liebiao {
  list-style: none;
  padding: 0;
  margin: 0;
}
.lbli {
  margin: 10px 0 10px 0;
  position: relative;
}
.navshanchu {
  padding: 0;
}
.nav {
  position: absolute;
  top: 25%;
  right: 0;
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
}
.lbspan {
  display: inline-block;
  width: 100px;
}
.xinzeng {
  background-color: #fff;
}

</style>