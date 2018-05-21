<template>
    <div class="Dxiangqing" v-if="Dyincang">
        <div class="xuanzechuankou">
        <div class="xzckTop">
            <el-button class="X" type="text" @click="guanbi"><i class="el-icon-error col"></i></el-button>
            <div class="xzfuwenben">富文本单页面</div>
            <div style="width: 10px; display: inline-block;"></div>
        </div>
        <!-- 中间部分 -->
        <div class="DxzckMiddle">
            <div class="xzPrice">
                <div class="dyimg">图片</div>
                <div class="dyname">名称</div>
            </div>
            <div class="xzMdiv" v-for="(item,index) in items" :key="index">
                <img class="dyMimg" :src="http + item.icon" alt="">
                <span class="dyMspan">{{item.title}}</span>
                <div class="xzMxuanze" @click="xuanzedaole(item.id)">
                    <span v-if="item.id != id" class="XuanZe">选择</span>
                    <span v-if="item.id == id" class="YiXuanZe">已选择</span>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="xzckBottom">
            <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size="perpage"
                layout="total, prev, pager, next, jumper"
                :total="Totalpages">
            </el-pagination>
            <el-button class="xzqueren" @click="guanbi" size="mini" type="primary">确认</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {http,WechatPage} from '../../assets/BaseApi'

export default {
    name:'Dxiangqing',
    props: {
        Dyincang:Boolean,
        MerchantId:Number
    },
    data () {
        return {
            // 搜索名字
            ssname: '',
            // 第几页
            page:1,
            currentPage4: 1,
            // 一页显示多少个
            perpage:3,
            // 分类选择
            flxz: null,
            // 总页
            Totalpages:1,
            // 分类
            options :[],
            id:null,
            value: '',
            items:[
                {name:'youhuijuan1', id:1,title:'如何通过CSS自动隐藏超出宽度的字不带省略号如何通过CSS自动隐藏超出宽度的字不带省略号',lingqu:'liji',icon:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804789786.jpg'},
                {name:'youhuijuan2',id:2,title:'双列',lingqu:'liji',icon:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804847298.jpg'},
                {name:'youhuijuan3',id:3,title:'三列',lingqu:'liji2',icon:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15254804889866.jpg'},
            ],
            http: ''
        }
    },
    watch: {
        MerchantId(newVal){
            this.shangpin()
        }
    },

    methods: {
        // 商品详情
        shangpin () {
            var _this = this
            this.$ajax.get(WechatPage, {
                params: {
                    merchant_id : this.MerchantId,
                    page: this.page,
                    per_page:this.perpage,
                    name: this.ssname || '',
                    category_id: this.flxz
                }
            })
            .then(function (res) {
                _this.items = res.data.data || _this.items
                _this.http = http
            })
            .catch(function (err) {
                console.log(err)
                console.log('商品详情请求失败了')
            });
        },
        // 选中了分类项
        xuanzhong (e) {
            this.flxz = e
            this.shangpin()
        },
        // 分页选择
        handleCurrentChange (j) {
            this.page = j
            this.shangpin()
        },
        handleSizeChange (e) {
            // console.log(e)
        },
        // 搜索商品
        sousuoname (event) {
            this.ssname = event.target.value
        },
        // 搜索按钮
        sousuo () {
            this.shangpin()
        },
        guanbi () {
            this.$emit('Dxqguanbi',this.Dyincang)
        },
        xuanzedaole (id,ind) {
            this.id = id
            this.$emit('Dchoose', id,ind)
        }
    }
}
</script>

<style>
/* 商品详情CSS */
.Dxiangqing {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2000;
}
.xuanzechuankou {
    width: 600px;
    background-color: #fff;
    margin: 0 auto;
    max-height: 419px;
    overflow-y: auto;
    position: relative;
    outline: 0;
    top: 10%;
    border-radius: 8px;
}
.xzckTop {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ccc;
}
.X {
    float: right;
    padding-right: 15px;
}
.DxzckMiddle {
    width: 100%;
    height: 277px;
    overflow: auto;
    min-height: 50px;
    border-bottom: 1px solid #ccc;
    padding-top: 10px;
    padding-bottom: 10px;
}
.xzckBottom {
    width: 100%;
    height: 60px;
}
.block {
    height: 28px;
    padding: 15px;
}
.el-pagination {
    float: left;
}
.xzqueren {
    float: right;
}
/* 商品详情选择 */
.xzPrice {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    border: 1px solid #ccc;
    background-color: #f8f8f9;
}
.xzMdiv {
    width: 90%;
    height: 60px;
    line-height: 60px;
    border: 1px solid #ccc;
    border-top: none;
    margin: 0 auto;
}
.dyMimg {
    width: 15%;
    height: 100%;
    float: left;
    margin-right: 10px;
    margin-left: 5px
}
.dyMspan {
    display: inline-block;
    width: 40%;
    height: 70%;
    margin: 9px 20px;
    line-height: 20px;
    float: left;
    font-size: 14px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.xzfuwenben {
    height: 100%;
    line-height: 60px;
    font-size: 18px;
}
.dyimg {
    float: left;
    width: 18.5%;
    height: 100%;
    line-height: 40px;
    font-size: 15px;
}
.dyname {
    float: left;
    width: 46.5%;
    height: 100%;
    line-height: 40px;
    font-size: 15px;
}
</style>