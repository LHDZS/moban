<template>
  <div class="Secondskill" v-if="ComShowHide">
      <div class="Cbody">
        <el-button id="shanchu" v-if="bol" type="text"><i class="el-icon-error col"></i></el-button>
        <div class="Spetitle"> 
            <i class="Spei"></i>
            <span>{{biaoti}}</span>
        </div>
        <div v-if="Secswitch == 1">
            <div class="henglie" v-for="(item,key) in list" :key="key" v-if="key<shul">
                <div class="Secbody">
                    <img class="Sechengimg" :src="item.thumb" alt="">
                    <div class="SecBigBox" v-if="timeshowhide">
                        <div class="Secmiddlebox">
                            仅剩<span>00</span>:<span>00</span>:<span>00</span>
                        </div>
                    </div>
                </div>
                <div class="Sechengright">
                    <span class="Sechengname">{{item.name}}</span>
                    <span class="Seconly" v-if="inventoryshowhide">仅剩20件</span>
                    <div class="Sechengjiage">
                        <span class="ShaJia" :style="{color:color}">秒杀价<span class="yangtoufu">￥</span><span class="jiaf">{{item.price}}</span></span>
                        <div class="Secdanmai" v-if="priceshowhide">活动结束价￥139.99</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 竖二栏 -->
        <div class="Coshulie" v-if="Secswitch == 2">
            <div class="shulie" v-for="(item,key) in list" :key="key" v-if="!item.style && key<shul">
                <div class="Secshubody">
                   <img class="Secshuimg" :src="item.thumb" alt="">
                    <div class="SecBigBox" v-if="timeshowhide">
                        <div class="Secmiddlebox">
                            距结束仅剩<span>00</span>:<span>00</span>:<span>00</span>
                        </div>
                    </div>
                </div>    
                <div class="shubottom">
                    <span class="shuname">{{item.name}}</span>
                    <div class="Secshujiage">
                        <span class="Secshunum">秒杀价<span :style="{color:color}">￥<span class="Secshujiaf">{{item.price}}</span></span></span>
                        <span class="Secdanmai" v-if="priceshowhide">活动结束价￥139</span>
                    </div>
                    <div class="Secshujiage_bottom" v-if="inventoryshowhide">
                        <span>仅剩20件</span>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
      </div>  
      <div class="Secright">
        <div class="Sdianzhao"><i></i><span>秒杀设置{{index}}</span></div>
        <div class="Seccaozuo" v-if="Comtype">
        <span class="Span" style="margin-top:0px">模块配置：</span>
            <div class="SwLunbo" style="width:140px">
                <span class="YesNoLb" style="marginRight:6px">是否显示</span>
                <div class="YesNo">
                    <span class="Yes" :class="ComynMK ? 'pitch' : '' " @click="ComYesMK()">是</span>
                    <span class="No" :class="!ComynMK ? 'pitch' : '' " @click="ComNoMK()">否</span>
                </div>
            </div>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商城名称：</span>
            <el-input class="shurukuang" placeholder="最多可输入6字" :maxlength="6" @blur="biaot" clearable></el-input>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品显示数量：</span>
            <el-input-number v-model="shul" :step="1" :min="0" :max="10" size="mini" @change="Digitalchange" label="修改商品显示数量"></el-input-number>
        </div>
        <div class="Seccaozuo">
            <span class="Span" style="margin-top:0px">显示活动剩余时间：</span>
            <el-radio-group v-model="time" @change="whethertime">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
            </el-radio-group>
        </div>
        <div class="Seccaozuo">
            <span class="Span" style="margin-top:0px">显示剩余库存：</span>
            <el-radio-group v-model="inventory" @change="whetherinventory">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
            </el-radio-group>
        </div>
        <div class="Seccaozuo">
            <span class="Span" style="margin-top:0px">是否显示原价：</span>
            <el-radio-group v-model="price" @change="whetherprice">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
            </el-radio-group>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">排序规则：</span>
            <el-cascader class="Navinput" size="mini" :options="options" :clearable="true" @change="change" :show-all-levels="false"></el-cascader>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品样式：</span>
            <el-radio-group v-model="radio6" size="mini" @change="Theradiobutton">
                <el-radio-button label="横栏"></el-radio-button>
                <el-radio-button label="竖二栏"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">更多设置：</span>
            <el-checkbox-group v-model="checkedCities" @change="handle">
                <el-checkbox class="ele" v-for="(city,idx) in cities" :label="idx+1" :key="idx">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>    
        
      </div>
  </div>
</template>

<script>
    import {https,Goodss,Www1,BackEnd} from '../assets/BaseApi'


    const cityOptions = ['隐藏活动结束商品','隐藏已售罄商品'];

    export default {
    name: 'Secondskill',
    props: {
        index: Number,
        items: Array,
        color: String,
        Comtype: Boolean
    },
    data () {
        return {
            biaoti:"秒杀商品",
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
            Secfenlei:[
                {name:'热卖区',id:1},
                {name:'新品区',id:2},
                {name:'推荐区',id:3},
                {name:'促销区',id:4}
            ],
            options :[
            {
                value: 'pages/article?id=',
                label: '销量越高越靠前',
            },{
                value: 'pages/categoryInfo?id=',
                label: '开始时间越晚越靠前',
            },{
                value: 'pages/categoryScrollDetail?id=',
                label: '开始时间越早越靠前',
            }
            ],
            radioNames: [],
            checkedNames: [],
            // 剩余时间
            time:'true',
            timeshowhide: true,
            // 库存
            inventory: 'true',
            inventoryshowhide: true,
            // 原价
            price:'true',
            priceshowhide: true,
            // UI
            CoRedIn:1,
            // 删除事件需要的参数
            aid: 1,
            // checkAll: false,
            checkedCities: [1,2],
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
            Secswitch:1,
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
                    _this.Secswitch = data.secondskill.style || 1
                    _this.biaoti = data.secondskill.tag || _this.biaoti
                    _this.shul = data.secondskill.num || _this.shul
                    _this.ComynMK = data.secondskill.display
                    _this.radio6 = data.secondskill.classify || _this.radio6
                    _this.time = data.secondskill.time
                    _this.timeshowhide = data.secondskill.timebool
                    _this.inventory = data.secondskill.inventory
                    _this.inventoryshowhide = data.secondskill.inventorybool
                    _this.price = data.secondskill.price
                    _this.priceshowhide = data.secondskill.pricebool
                    // 把字符串转化成整数数组
                    _this.checkedCities = data.secondskill.flag || _this.checkedCities
                    var dataStrArr = _this.checkedCities.split(",")
                    var dataIntArr = []
                    var dataIntArr =  dataStrArr.map(function(data){  
                        return +data;
                    })
                    _this.checkedCities = dataIntArr
                    console.log('秒杀数据请求成功')
                }else {
                    var data = res.data.ext.ext
                    _this.Secswitch = data.secondskill.style || 1
                    _this.biaoti = data.secondskill.tag || _this.biaoti
                    _this.shul = data.secondskill.num || _this.shul
                    _this.ComShowHide = false
                    _this.ComynMK = data.secondskill.display
                    _this.radio6 = data.secondskill.classify || _this.radio6
                    _this.time = data.secondskill.time
                    _this.timeshowhide = data.secondskill.timebool
                    _this.inventory = data.secondskill.inventory
                    _this.inventoryshowhide = data.Secondskill.inventorybool
                    _this.price = data.secondskill.price
                    _this.priceshowhide = data.secondskill.pricebool
                    // 把字符串转化成整数数组
                    _this.checkedCities = data.secondskill.flag || _this.checkedCities
                    var dataStrArr = _this.checkedCities.split(",")
                    var dataIntArr = []
                    var dataIntArr =  dataStrArr.map(function(data){  
                        return +data;
                    })
                    _this.checkedCities = dataIntArr
                }     
            })
            .catch(function (err) {
                console.log(err)
                console.log('失败了')
            });
        },
        // 选择器
        change(value) {
            console.log(value[0])
            
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
        // dataDetails() {
        //     this.bol = true
        // },
        // hiddenDetail() {
        //     this.bol = false
        // },
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
        Secdianji (id) {
            this.CoRedIn = id
            this.checkedCities = []
            this.checkedCities.push(id)
            // this.ajax()
            this.$emit('duoxuan',this.checkedCities,this.index)
        },
        // 标题
        biaot(err) {
            this.biaoti = err.target.value || this.biaoti
            this.$emit('biaoti',this.biaoti,this.index)
        },
        handle(value) {
            console.log(value)
            this.checkedCities = value
            this.$emit('duoxuan',value,this.index)
        },
        // 时间显示隐藏
        whethertime (value) {
            if (value == 'true') {
                this.timeshowhide = true
                this.$emit('time',true,value)
            }else {
                this.timeshowhide = false
                this.$emit('time',false,value)
            }
        },
        whetherinventory (value) {
            if (value == 'true') {
                this.inventoryshowhide = true
                this.$emit('inventory',true,value)
            }else {
                this.inventoryshowhide = false
                this.$emit('inventory',false,value)
            }
        },
        whetherprice (value) {
            if (value == 'true') {
                this.priceshowhide = true
                this.$emit('price',true,value)
            }else {
                this.priceshowhide = false
                this.$emit('price',false,value)
            }
        },
        // 添加
        // add() {
            //     let normal = {
            //         tag: '商品栏',
            //         style: 1,
            //         flag: '1,2,3,4',
            //         num: 6,
            //         classify: '横栏'
            //     }
            //     this.items.push({
            //         'component': "Secoditybar"
            //     })
            //     console.log(this.items)
            //     this.$emit('AddPush',normal)
            // },
        // 单选
        Theradiobutton(value) {
            if ( value == '横栏' ) {
                this.Secswitch = 1
                this.checkedCities = [1,2]
                // this.ajax()
                this.$emit('fenlei',1,this.index,value)
                this.$emit('duoxuan',this.checkedCities,this.index) 
            }else if ( value == '竖二栏' ) {
                this.Secswitch = 2
                this.checkedCities = [1,2]
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
    .Secondskill {
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
    .Sectitle {
        padding: 10px;
        padding-left: 0px;
        font-size: 18px;
        text-align: left;
    }
    .Sectitle_center {
        padding: 10px;
        padding-left: 0px;
        font-size: 18px;
        text-align: center;
    }
    .Seci {
        display: inline-block;
        width: 3px;
        height: 16px;
        background-color: #000;
    }
    .Secright {
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
    .SecUl {
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
    .Sechengimg {
        width: 100%;
        height: 100%;
        float: left;
    }
    .Sechengright {
        width: 60%;
        height: 100%;
        float: right;
        position: relative;
        text-align: left;
    }
    .Sechengjiage {
        position: absolute;
        left: 0px;
        bottom: 0px;
    }
    .Sechengname {
        font-size: 13px;
        margin-top: 2px;
        width: 100%;
        color: #000;
        margin-bottom: 3px;
        display: inline-block;
        text-align: left;
        overflow: hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
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
    .Secshubody {
        width: 100%;
        height: 51%;
        position: relative;
    }
    .Secshuimg {
        width: 100%;
        height: 100%;
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
    .Secshunum {
        display: block;
        font-size: 14px;
        color: #f44;
    }
    .Secshujiage {
        position: absolute;
        left: 5px;
        bottom: 32px;
        font-size: 13px;
    }
    .Secshujiage_bottom {
        position: absolute;
        left: 5px;
        bottom: 10px;
        font-size: 12px;
        color: #ccc;
    }
    .jiaf {
        font-size: 18px;
        font-weight: 500;
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
    .Seccaozuo {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 10px;
    }
    .SecHelpcenter {
        display: inline-block;
        width: 50px;
        cursor: pointer;
        position: relative;
    }
    .Secbangzhu {
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
    // 拼团
    .Secbody {
        position: relative;
        display: inline-block;
        width: 34.5%;
        height: 100%;
        float: left;
        overflow: hidden;
    }
    .Secdanmai {
        display: block;
        font-size: 12px;
        color:#666;
        text-align: left;
        margin-top: 3px;
    }
    .Secshujiaf {
        font-size: 18px;
        font-weight: 500;
        color: @red;
    }
    // 秒杀
    .SecBigBox {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .hide {
        display: none;
    }
    .Secmiddlebox {
        padding: 2px 0;
        background: rgba(255,68,68,.8);
        color: #fff;
        text-align: center;
        font-size: 10px;
    }
    .Secmiddlebox span {
        background-color: #fff;
        color: rgba(255,68,68,.8);
        border-radius: 3px;
        padding: 0px 1px;
        margin: 1px;
    }
    .ShaJia {
        text-align: left;
        font-size: 14px;
        color: @red;
    }
    .Seconly {
        font-size: 12px;
        background-color: #fff;
        color: rgba(255,68,68,.8);
        padding: 2px;
        border: 1px solid #ccc;
    }
</style>