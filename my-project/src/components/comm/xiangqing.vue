<template>
    <div class="xiangqing" v-if="yincang">
        <div class="xuanzechuankou" ref="xqbox">
        <div class="xzckTop">
            <el-button class="X" type="text" @click="guanbi"><i class="el-icon-error col"></i></el-button>
            <span>搜索商品</span>
            <el-select style="padding: 12px 0px;" :clearable="true" v-model="value" size="mini" @change="xuanzhong" placeholder="所有分组">
                <el-option
                    v-for="item in optione"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-input
            style="width:170px"
            size="mini"
            v-model="ssname"
            @blur="sousuoname"
            placeholder="请输入内容"
            ></el-input>
            <el-button type="primary" size="mini" @click="sousuo" icon="el-icon-search">搜索</el-button>
            <div style="width: 10px; display: inline-block;"></div>
        </div>
        <!-- 中间部分 -->
        <div class="xzckMiddle">
            <div class="xzPrice">
                <div class="xzname" v-for="(ite,ind) in lists" :key="ind">{{ite.name}}</div>
            </div>
            <div class="xzMdiv" v-for="(item,index) in items" :key="index">
                <img class="xzMimg" :src="http + item.thumb" alt="">
                <span class="xzMspanname">{{item.name}}</span>
                <span class="xzMspan">￥{{item.market_max}}/{{item.market_min}}</span>
                <span class="xzMspan">{{item.stock}}</span>
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
                    :current-page="currentPage"
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
import {http,Goods,GoodsCategory} from '../../assets/BaseApi'

export default {
    name:'xiangqing',
    props: {
        yincang:Boolean,
        optione:Array,
        items:Array,
        Totalpages:Number,
        currentPage:Number,
        perpage: Number
    },
    data () {
        return {
            // 分页页数
            ssname: '',
            id:null,
            value: '',
            lists:[{name:'图片'},{name:'名称'},{name:'价格'},{name:'库存'},{name:''}],
            http:'',
            // 分类
        }
    },
    methods: {
        // 选中了分类项
        xuanzhong (e) {
            this.$emit('xuanzhong',e)
        },
        // 分页选择
        handleCurrentChange (j) {
            // this.page = j
            // this.shangpin()
            this.$emit('paging',j)
        },
        handleSizeChange (e) {
            
        },
        // 搜索商品
        sousuoname (event) {
            this.ssname = event.target.value
            // this.$emit('sousuoname',event.target.value)
        },
        // 搜索按钮
        sousuo () {
            this.$emit('sousuo',this.ssname)
        },
        guanbi () {
            this.$emit('xqguanbi',this.yincang)
        },
        xuanzedaole (id) {
            this.id = id
            this.$emit('choose', id)
        }
    }
}
</script>

<style>
/* 商品详情CSS */
.xiangqing {
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
    max-height: 450px;
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
.xzckMiddle {
    width: 100%;
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
    height: 75px;
    line-height: 75px;
    border: 1px solid #ccc;
    border-top: none;
    margin: 0 auto;
}
.xzMimg {
    width: 15%;
    height: 100%;
    float: left;
    margin-right: 10px;
    margin-left: 5px;
}
.xzMspan {
    display: inline-block;
    width: 19%;
    height: 100%;
    float: left;
    font-size: 12px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.xzMspanname {
    display: inline-block;
    width: 19%;
    height: 70%;
    margin: 9px 0px;
    line-height: 20px;
    float: left;
    font-size: 12px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.xzname {
    float: left;
    width: 18.5%;
    height: 100%;
    line-height: 40px;
    font-size: 15px;
}
</style>
