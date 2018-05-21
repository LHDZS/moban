<template>
  <div class="Commoditybar" v-if="ComShowHide" ref="Commarr">
      <div class="Cbody" v-on:mouseenter="dataDetails()" v-on:mouseleave="hiddenDetail()">
        <el-button id="shanchu" v-if="bol" type="text" @click="open2"><i class="el-icon-error col"></i></el-button>
        <div class="Commtitle"> 
            <i class="Commi"></i>
            <span>{{biaoti ? biaoti : '标题不能为空'}}</span>
        </div>
        <div v-if="Commswitch == 1">
            <div class="henglie" v-for="(item,key) in list" :key="key" v-if="key<shul">
                <img class="hengimg" :src="item.thumb" alt="">
                <div class="hengright">
                    <span class="hengname">{{item.name}}</span>
                    <span class="hengnum">数量：{{item.num}}个</span>
                    <div class="hengjiage">
                        <span :style="{color:color}"><i class="yangtoufu">￥</i><i class="jiaf">{{item.price}}</i></span>
                        <span class="jiar">{{item.market}}人付款</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 竖二栏 -->
        <div class="Coshulie" v-if="Commswitch == 2">
            <div class="shulie" v-for="(item,key) in list" :key="key" v-if="!item.style && key<shul">
                <img class="shuimg" :src="item.thumb" alt="">
                <div class="shubottom">
                    <span class="shuname">{{item.name}}</span>
                    <span class="shunum">库存：{{item.num}}个</span>
                    <div class="shujiage">
                        <span :style="{color:color}"><i class="yangtoufu">￥</i><i class="jiaf">{{item.price}}</i></span>
                        <span class="jiar">{{item.market}}人付款</span>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <!-- 竖三栏 -->
        <div v-if="Commswitch == 3">
            <div class="Commshulie" v-for="(item,key) in list" :key="key" v-if="key<shul">
                    <img class="Commshuimg" :src="item.thumb" alt="">
                    <div class="shusanbottom">
                        <span class="Commshuname">{{item.name}}</span>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
      <div class="Commright">
        <div class="Sdianzhao"><i></i><span>商品设置{{index}}</span></div>
        <div class="Commcaozuo" v-if="Comtype">
        <span class="Span" style="margin-top:0px">模块配置：</span>
            <div class="SwLunbo" style="width:140px">
                <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                <div class="YesNo">
                    <span class="Yes" :class="ComynMK ? 'pitch' : '' "  @click="ComYesMK()">是</span>
                    <span class="No" :class="!ComynMK ? 'pitch' : '' "  @click="ComNoMK()">否</span>
                </div>
            </div>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">新增商品栏：</span>
            <el-button type="primary" @click="add()" size="mini">添加商品栏</el-button>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商城名称：</span>
            <el-input class="shurukuang" placeholder="最多可输入6字" :maxlength="6" @blur="biaot" clearable></el-input>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品类型：</span>
            <el-checkbox-group v-model="checkedCities" :min="1" @change="handle">
                <el-checkbox class="ele" v-for="(city,idx) in cities" :label="idx+1" :key="idx">{{city}}</el-checkbox>
            </el-checkbox-group>
            <div class="CommHelpcenter" v-on:mouseenter="HelpcenterShow()" v-on:mouseleave="HelpcenterHide()">
                <img class="Commbangzhu" src="../assets/wenhao.png" alt="">
                <div class="HelpStep" v-if="Helpcenter">
                    <h4>勾选显示类型后，请在商品管理内勾选商品为该类型，才可显示商品</h4>
                    <p>例如：</p>
                    <p>第一步：勾选显示推荐类</p>
                    <p>第二步：打开左侧菜单——商品管理，在商品详情内勾选某个商品为推荐</p>
                    <p>即可把该商品显示到小程序对应位置</p>
                    <div class="array"></div>
                </div>
            </div>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品样式：</span>
            <el-radio-group v-model="radio6" size="mini" @change="Theradiobutton">
                <el-radio-button label="横栏"></el-radio-button>
                <el-radio-button label="竖二栏"></el-radio-button>
                <el-radio-button label="竖三栏"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品显示数量：</span>
            <el-input-number v-model="shul" :step="1" :min="0" :max="10" size="mini" @change="Digitalchange" label="修改商品显示数量"></el-input-number>
        </div>
      </div>
  </div>
</template>

<script>
    import {https,Goodss,Www1,BackEnd} from '../assets/BaseApi'


    const cityOptions = ['热卖','最新','推荐','更新'];
    const aiya = [1,2,3,4];

    export default {
    name: 'Commoditybar',
    props: {
        index: Number,
        items: Array,
        color: String,
        Comtype: Boolean
    },
    data () {
        return {
            biaoti:"推荐商品",
            list:[
                {name:'商品名称',price:"88.88",market:"5234",boll:'true',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
                {name:'商品名称',price:"88.88",market:"5234",thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg'},
            ],
            Commfenlei:[
                {name:'热卖区',id:1},
                {name:'新品区',id:2},
                {name:'推荐区',id:3},
                {name:'促销区',id:4}
            ],
            radioNames: [],
            checkedNames: [],
            // UI
            CoRedIn:1,
            // 删除事件需要的参数
            aid: 1,
            // checkAll: false,
            checkedCities: [1,2,3,4],
            cities: cityOptions,
            // isIndeterminate: true,
            ComShowHide:true,
            // 帮助显示隐藏
            Helpcenter: false,
            // Comtype:true,
            type:'',
            ComynMK:true,
            // UI单选
            radio6: '横栏',
            style: [],
            // 切换样式
            Commswitch:1,
            // 网址
            shul:4,
            bol: false,
            https:'https://www.xiaoniren.cn'
        }
    },
    mounted: function () {
        var getUrlStr =  function(name) {
    　　var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    　　var r = window.location.search.substr(1).match(reg);
        　　if(r != null) return unescape(r[2]);
        　　return null;
        }
        // console.log('再次获取URL--id')
        var id = getUrlStr ("id")
        var type = getUrlStr("type")

        this.colum(id,type)
        // this.ajax()
    },
    methods:{
        colum (id,type) {
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
                    if (data.flag) {
                    for (var k in data.flag ) {
                        if (k == _this.index) {
                            _this.Commswitch = data.flag[k].style || 1
                            _this.biaoti = data.flag[k].tag || _this.biaoti
                            _this.shul = data.flag[k].num || _this.shul
                            _this.ComynMK = data.flag_display
                            _this.radio6 = data.flag[k].classify || _this.radio6
                            // 把字符串转化成整数数组
                            _this.checkedCities = data.flag[k].flag || _this.checkedCities
                            var dataStrArr = _this.checkedCities.split(",")
                            var dataIntArr = []
                            var dataIntArr =  dataStrArr.map(function(data){  
                                return +data;
                            })
                            _this.checkedCities = dataIntArr
                        }
                    }
                    } 
                }else {
                    var data = res.data.ext.ext
                    if (data.flag) {
                    for (var k in data.flag ) {
                        if (k == _this.index) {
                            _this.Commswitch = data.flag[k].style || 1
                            _this.biaoti = data.flag[k].tag || _this.biaoti
                            _this.shul = data.flag[k].num || _this.shul
                            _this.ComShowHide = data.flag_display
                            _this.ComynMK = data.flag_display
                            _this.radio6 = data.flag[k].classify || _this.radio6
                            console.log(data.flag[k].flag)
                            // 把字符串转化成整数数组
                            _this.checkedCities = data.flag[k].flag || _this.checkedCities
                            var dataStrArr = _this.checkedCities.split(",")
                            var dataIntArr = []
                            var dataIntArr =  dataStrArr.map(function(data){  
                                return +data;
                            })
                            _this.checkedCities = dataIntArr
                        }
                    }
                    }
                }     
                // _this.ajax()
            })
            .catch(function (err) {
                console.log(err)
                console.log('失败了')
            });
        },
        ComYesMK () {
            this.ComynMK = true
            var Show = true
            this.$emit('ComShowHide',Show)
        },
        ComNoMK () {
            this.ComynMK = false
            var Hide = false
            this.$emit('ComShowHide',Hide)
        },
        dataDetails() {
            this.bol = true
        },
        hiddenDetail() {
            this.bol = false
        },
        // 帮助显示隐藏
        HelpcenterShow() {
            this.Helpcenter = true
        },
        HelpcenterHide() {
            this.Helpcenter = false
        },
        //删除 
        open2() {
            this.$confirm('删除当前商品组件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                if (this.index > 0) {
                    this.items.splice(this.index,1,2);
                    console.log(this.items)
                }else{
                    return this.$message({
                        message: '至少保留一条商品栏 , 如想隐藏请点击模块配置“否”',
                        type: 'warning'
                    });
                }
            this.$emit('FlagItems', this.items,this.index)
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
        // 商品数量改变
        Digitalchange (value) {
            this.$emit('digital',value, this.index)
        },
        Commdianji (id) {
            this.CoRedIn = id
            this.checkedCities = []
            this.checkedCities.push(id)
            // this.ajax()
            this.$emit('duoxuan',this.checkedCities,this.index)
        },
        // 标题
        biaot(err) {
            this.biaoti = err.target.value
            this.$emit('biaoti',this.biaoti,this.index)
        },
        handle(value) {
            this.checkedCities = value
            // this.ajax()
            this.$emit('duoxuan',this.checkedCities,this.index)
        },
        // 添加
        add() {
            let normal = {
                tag: '商品栏',
                style: 1,
                flag: '1,2,3,4',
                num: 6,
                classify: '横栏'
            }
            this.items.push({
                'component': "Commoditybar"
            })
            console.log(this.items)
            this.$emit('AddPush',normal)
            // this.delBol = false
            // this.shale.push(normal)
        },
        // 单选
        Theradiobutton(value) {
            if ( value == '横栏' ) {
                this.Commswitch = 1
                this.checkedCities = [1,2,3,4]
                // this.ajax()
                this.$emit('fenlei',1,this.index,value)
                this.$emit('duoxuan',this.checkedCities,this.index) 
            }else if ( value == '竖三栏' ) {
                this.Commswitch = 3
                this.checkedCities = [1,2,3,4]
                // this.ajax()
                this.$emit('fenlei',3,this.index,value)   
                this.$emit('duoxuan',this.checkedCities,this.index)
            }else if ( value == '竖二栏' ) {
                this.Commswitch = 2
                this.checkedCities = [1,2,3,4]
                // this.ajax()
                this.$emit('fenlei',2,this.index,value)   
                this.$emit('duoxuan',this.checkedCities,this.index)
            }
        },
        ajax () {
            var _this = this
            _this.list = []
            this.$ajax.get(Goodss, {
                params: {
                merchant_id : 130,
                page : 1,
                per_page : 100
                }
            })
            .then(function (res) {
                var data = res.data.data.items
                for (var key in data) {
                    for (var i in data[key].flag) {
                        for (var j in _this.checkedCities) {
                            if (data[key].flag[i] == _this.checkedCities[j]) {  
                                _this.list.push(data[key])
                            }
                        }
                    }
                }
                // 数组去重
                var hash = {}; 
                _this.list = _this.list.reduce(function(item, next) { 
                hash[next.name] ? '' : hash[next.name] = true && item.push(next); 
                return item 
                }, [])
                // console.log(style)
                // 判断商品栏横竖
                // for (var k in _this.list) {
                //     for (var i in style) {
                //         if ( k = i) {
                //             _this.list[k]['style'] = (style[i])
                //         }
                //     }
                // }
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }  
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    @import '../../css.less';
    .Commoditybar {
        width: 100%;
        position: relative;
        padding-bottom: 5px;
    }
    .Cbody {
        width: 100%;
        border: 1px solid #fff;
        box-sizing:border-box;
    }
    .Cbody:hover {
        cursor: move;
        border-left: 1px dashed #409EFF;
        border-right: 1px dashed #409EFF;
        border-top: 1px solid #409EFF;
        border-bottom: 1px solid #409EFF;
    }
    .clear{ clear:both}
    #shanchu {
        position: absolute;
        top: 0px;
        right: 0px;
        padding: 0;
        cursor:pointer;
        color: #606266;
        z-index: 2000;
    }
    #shanchu:hover {
        color: #66b1ff;
    }
    .col {
        font-size: 20px;
    }
    .Commtitle {
        padding: 10px;
        padding-left: 0px;
        font-size: 18px;
        text-align: left;
    }
    .Commtitle_center {
        padding: 10px;
        padding-left: 0px;
        font-size: 18px;
        text-align: center;
    }
    .Commi {
        display: inline-block;
        width: 3px;
        height: 16px;
        background-color: #000;
    }
    .Commshulie {
        width: 30.33333%;
        height: 115px;
        display: block;
        float: left;
        position: relative;
        margin:2px 4px; 
        box-sizing: border-box;
    }
    .Commshuimg {
        width: 100%;
        height: 70%;
    }
    .shusanbottom {
        height: 27%;
    }
    .Commshuname {
        font-size: 12px;
        width: 100%;
        display: inline-block;
        overflow:hidden; /*超出的部分隐藏起来。*/ 
        text-overflow:ellipsis;/* 支持 IE */
        display:-webkit-box; 
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .Commright {
        display: none;
        font-size: 14px;
        color: @Lightgrey;
        width: 550px;
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
    }
    input {
        text-indent:1em;
        color: @Lightgrey;
        border-radius: 5px;
        border:1px solid #DBDBDB;
    }
    // 组件修改值
    .ele {
        margin-left: 10px !important;
    }
    .Sshangcheng .el-checkbox-group {
        display: inline-block;
        width: 300px;
    }
    // 商品TAB栏
    .CommUl {
        width: 100%;
        padding: 0px 25px;
        margin: 0;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    .Coomli {
        width: 25%;
        float: left;
        padding: 10px 0px;
        text-align: center;
        font-size: 14px;
        color: #000;
        list-style: none;
        border-bottom: 2px solid #fff;
        cursor: pointer;
    }
    .Coomred {
        border-bottom: 2px solid #ca0000;
    }
    .henglie {
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        height: 100px;
        padding: 5px;
    }
    .hengimg {
        width: 34.5%;
        height: 100%;
        border-radius: 5px;
        float: left;
    }
    .hengright {
        width: 63%;
        height: 100%;
        float: right;
        position: relative;
    }
    .hengjiage {
        position: absolute;
        left: 0px;
        bottom: 0px;
    }
    .hengname {
        font-size: 13px;
        margin-top: 2px;
        width: 100%;
        color: #000;
        display: inline-block;
        text-align: left;
        overflow: hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .hengnum {
        font-size: 12px;
        color: #666;
        position: absolute;
        left: 0;
        top: 48%;
    }
    // 竖
    .Coshulie {
        padding: 5px;
    }
    .shulie {
        width: 50%;
        height: 200px;
        display: block;
        float: left;
        position: relative;
        padding: 2px;
        box-sizing: border-box;
    }
    .shuimg {
        width: 100%;
        height: 51%;
    }
    .shubottom {
        height: 46%;
        box-shadow: 0px 1px 1px #ccc;
    }
    .shuname {
        font-size: 14px;
        width: 100%;
        display: inline-block;
        text-align: left;
        margin-left: 5px;
        overflow: hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .shunum {
        font-size: 12px;
        color: #666;
        position: absolute;
        left: 5px;
        bottom: 19%;
    }
    .shujiage {
        position: absolute;
        left: 0;
        bottom: 5px;
        font-size: 13px;
    }
    .jiaf {
        font-size: 16px;
        color: @red;
    }
    .yangtoufu {
        font-size: 12px;
        color: @red;
    }
    .jiar {
        font-size: 10px;
        color: #ccc;
    }
    .Commcaozuo {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 10px;
    }
    .CommHelpcenter {
        display: inline-block;
        width: 50px;
        cursor: pointer;
        position: relative;
    }
    .Commbangzhu {
        display: inline-block;
        width: 20px;
        height: 20px;
    }
    .HelpStep {
        position: absolute;
        top: 0;
        left: 30px;
        width: 250px;
        line-height: 20px;
        padding: 0px 5px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>