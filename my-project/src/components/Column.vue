<template>
  <div class="Column">
      <div class="Cbody" v-on:mouseenter="dataDetails()" v-on:mouseleave="hiddenDetail()">
        <el-button id="shanchu" v-if="bol" type="text" @click="open2"><i class="el-icon-error col"></i></el-button>
        <div class="title">{{biaoti ? biaoti : '标题不能为空'}}</div>
        <div class="henglie" v-for="(item,key) in list" :key="key" v-if="item.style && key<shul">
            <img class="hengimg" :src="https + item.thumb" alt="">
            <div class="hengright">
                <span class="hengname">{{item.name}}</span>
                <div class="hengjiage">
                    <span class="jiaf" :style="{color:color}">￥{{item.price}}</span>
                    <span class="jiar">￥{{item.market_price}}</span>
                </div>
                <div class="henggoumai" :style="{backgroundColor:color}">立即购买</div>
            </div>
        </div>
        <div class="shulie" v-for="(item,key) in list" :key="key" v-if="!item.style && key<shul">
            <img class="shuimg" :src="https + item.thumb" alt="">
            <div class="shubottom">
                    <span class="shuname">{{item.name}}</span>
                    <div class="shujiage">
                        <span class="jiaf" :style="{color:color}">￥{{item.price}}</span>
                        <span class="jiar">￥{{item.market_price}}</span>
                    </div>
                    <div class="shugoumai" :style="{backgroundColor:color}">立即购买</div>
            </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="Cright">
        <div class="Sdianzhao"><i></i><span>商品设置</span></div>
        <div class="Sshangcheng">
            <span class="shangchengname">商城名称：</span>
            <el-input class="shurukuang" placeholder="最多可输入20字" :maxlength="20" @blur="biaot" clearable></el-input>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品类型：</span>
            <el-checkbox-group v-model="checkedCities" :min="1" @change="handle">
                <el-checkbox class="ele" v-for="(city,idx) in cities" :label="idx+1" :key="idx">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="Sshangcheng">
            <span class="shangchengname">商品样式：</span>
            <el-radio-group v-model="radio6" size="mini" @change="Theradiobutton">
                <el-radio-button label="横图"></el-radio-button>
                <el-radio-button label="竖图"></el-radio-button>
                <el-radio-button label="一横多竖"></el-radio-button>
                <el-radio-button label="多横俩竖"></el-radio-button>
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
    const cityOptions = ['热卖','最新','推荐','更新'];
    const aiya = [1,2,3,4];

    export default {
    name: 'Column',
    props: {
        index: Number,
        items: Array,
        color: String
    },
    data () {
        return {
            biaoti:"标题",
            list:[
                {name:'进口 牛油果 4个装 单果重量130~150g',jiage:"45",boll:'true'},
                {name:'张三',jiage:"45"},
                {name:'李四',jiage:"45"},
                {name:'王五',jiage:"45"},
                {name:'赵六',jiage:"45"},
            ],
            radioNames: [],
            checkedNames: [],
            // UI
            // checkAll: false,
            checkedCities: [1,2,3,4],
            cities: cityOptions,
            // isIndeterminate: true,
            // UI单选
            radio6: '一横多竖',
            style: ["long","long"],
            // 网址
            shul:6,
            bol: false
        }
    },
    mounted: function () {
        // this.colum()
    },
    methods:{
        dataDetails() {
            this.bol = true
        },
        hiddenDetail() {
            this.bol = false
        },
        //删除 
            open2() {
                this.$confirm('删除当前商品组件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.items.splice(this.index,1,2);
                this.$emit('delChange', this.index)
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
                // console.log(value)
                this.$emit('digital',value, this.index)
            },
            // 标题
            biaot(err) {
                // console.log(err.target.value)
                this.biaoti = err.target.value
                this.$emit('biaoti',this.biaoti,this.index)
            },
            handle(value) {
                // let checkedCount = value.length;
                this.checkedCities = value
                console.log(value)
                this.ajax(this.style)
                this.$emit('duoxuan',this.checkedCities,this.index)
            },
            // 单选
            Theradiobutton(value) {
                // this.$emit('fenlei',value)
                if ( value == '横图' ) {
                    var style = ["long","long","long","long","long","long","long","long","long","long"]
                    this.ajax(style)
                    this.$emit('fenlei',style,this.index)    
                }else if ( value == '竖图' ) {
                    var style = []
                    this.ajax(style)
                    this.$emit('fenlei',style,this.index)   
                }else if ( value == '一横多竖' ) {
                    var style = ["long","long"]
                    this.ajax(style)
                    this.$emit('fenlei',style,this.index)
                }else if ( value == '多横俩竖' ) {
                    var style = ["long","long","long","long"]
                    this.ajax(style)
                    this.$emit('fenlei',style,this.index)
                }
            },
            ajax (style) {
                var _this = this
                _this.list = []
                console.log(style)
                this.$ajax.get(this.https + '/restapi/goods', {
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
                    for (var k in _this.list) {
                        for (var i in style) {
                            if ( k = i) {
                                _this.list[k]['style'] = (style[i])
                            }
                        }
                    }
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
    // @import '../../css.less';
    // .Column {
    //     width: 100%;
    //     position: relative;
    //     padding-bottom: 5px;
    // }
    // .Cbody {
    //     width: 100%;
    //     border: 1px solid #fff;
    //     box-sizing:border-box;
    // }
    // .Cbody:hover {
    //     cursor: move;
    //     border-left: 1px dashed #409EFF;
    //     border-right: 1px dashed #409EFF;
    //     border-top: 1px solid #409EFF;
    //     border-bottom: 1px solid #409EFF;
    // }
    // .clear{ clear:both} 
    // #shanchu {
    //     position: absolute;
    //     top: 0px;
    //     right: 0px;
    //     padding: 0;
    //     cursor:pointer;
    //     color: #606266;
    //     z-index: 2000;
    // }
    // #shanchu:hover {
    //     color: #66b1ff;
    // }
    // .col {
    //     font-size: 20px;
    // }
    // .title {
    //     padding: 10px;
    //     margin-top: 5px;
    //     font-size: 18px;
    //     background-color: #F1F1F1;
    // }
    // .shulie {
    //     width: 45%;
    //     height: 175px;
    //     display: block;
    //     float: left;
    //     position: relative;
    //     margin:2px 4px; 
    //     padding: 2px;
    // }
    // .shuimg {
    //     width: 100%;
    //     height: 70%;
    // }
    // .shubottom {
    //     height: 28%;
    //     // box-shadow: 2px 4px 10px #dedede;
    // }
    // .shuname {
    //     font-size: 14px;
    //     width: 100%;
    //     display: inline-block;
    //     overflow:hidden; /*超出的部分隐藏起来。*/ 
    //     white-space:nowrap;/*不显示的地方用省略号...代替*/
    //     text-overflow:ellipsis;/* 支持 IE */
    // }
    // .shujiage {
    //     position: absolute;
    //     left: 5px;
    //     bottom: 5px;
    //     font-size: 13px;
    // }
    // .jiaf {
    //     font-size: 16px;
    //     color: @red;
    // }
    // .jiar {
    //     font-size: 10px;
    //     color: @Lightgrey;
    //     text-decoration:line-through;
    // }
    // .shugoumai {
    //     position: absolute;
    //     right: 5px;
    //     bottom: 5px;
    //     padding: 2px;
    //     color: @white;
    //     background-color: @red;
    //     border-radius: 5px;
    //     font-size: 10px;
    // }
    // .henglie {
    //     width: 90%;
    //     margin: 0 auto;
    //     height: 70px;
    //     padding: 10px;
    //     box-shadow: 0px 3px 10px #dedede;
    // }
    // .hengimg {
    //     width: 30%;
    //     height: 100%;
    //     float: left;
    // }
    // .hengright {
    //     width: 66%;
    //     height: 100%;
    //     float: right;
    //     position: relative;
    // }
    // .hengname {
    //     font-size: 14px;
    //     margin-top: 5px;
    //     width: 100%;
    //     display: inline-block;
    //     overflow:hidden; /*超出的部分隐藏起来。*/ 
    //     white-space:nowrap;/*不显示的地方用省略号...代替*/
    //     text-overflow:ellipsis;/* 支持 IE */
    // }
    // .hengjiage {
    //     position: absolute;
    //     left: 5px;
    //     bottom: 5px;
    // }
    // .henggoumai {
    //     position: absolute;
    //     right: 5px;
    //     bottom: 5px;
    //     padding: 2px;
    //     color: @white;
    //     background-color: @red;
    //     border-radius: 5px;
    //     font-size: 10px;
    // }
    // .Cright {
    //     display: none;  
    //     font-size: 14px;
    //     color: @Lightgrey;
    //     width: 550px;
    //     cursor: default;
    //     position: fixed;
    //     left: 34%;
    //     top: 8px;
    //     padding: 28px 17px 15px 17px;
    //     text-align: left;
    //     background: #f8f8f8;
    //     border-radius: 5px;
    //     border: 1px solid #d1d1d1;
    //     z-index: 1999;
    // }
    // input {
    // text-indent:1em;
    // color: @Lightgrey;
    // border-radius: 5px;
    // border:1px solid #DBDBDB;
    // }
    // // 组件修改值
    // .ele {
    //     margin-left: 10px !important;
    // }
    // .Sshangcheng .el-checkbox-group {
    //     display: inline-block;
    //     width: 300px;
    // }
</style>