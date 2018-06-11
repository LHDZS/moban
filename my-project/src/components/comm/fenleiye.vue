<template>
    <div class="Fxiangqing" v-if="Fyincang">
        <div class="Fxuanzechuankou" ref="xqbox">
        <div class="FxzckTop">
            <el-button class="X" type="text" @click="guanbi"><i class="el-icon-error col"></i></el-button>
            <div class="Fxzfuwenben">分类详情页面</div>
            <div style="width: 10px; display: inline-block;"></div>
        </div>
        <!-- 中间部分 -->
        <div class="FenleiMiddle">
            <div class="xzPrice">
                <div class="dyimg">图片</div>
                <div class="dyname">名称</div>
            </div>
            <div class="xzMdiv" v-for="(item,index) in items" :key="index">
                <img class="dyMimg" :src="http + item.icon" alt="">
                <span class="dyMspan">{{item.name}}</span>
                <div class="xzMxuanze" @click="xuanzedaole(item.id)">
                    <span v-if="item.id != id" class="XuanZe">选择</span>
                    <span v-if="item.id == id" class="YiXuanZe">已选择</span>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="xzckBottom">
            <div class="block">
            <el-button class="xzqueren" @click="guanbi" size="mini" type="primary">确认</el-button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {http,Goods,GoodsCategory} from '../../assets/BaseApi'

export default {
    name:'feleiye',
    props: {
        Fyincang: Boolean,
        items: Array,
        ids: Number,
        isd: Number
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
            id:null,
            value: '',
            http:''
        }
    },
    watch: {
        
    },
    mounted:function () {
        var doc = document.documentElement.clientHeight
    },
    methods: {
        // 商品详情
        // 分页选择
        handleCurrentChange (j) {
            this.page = j
            this.shangpin()
        },
        handleSizeChange (e) {
            // console.log(e)
        },
        guanbi () {
            this.$emit('Fxqguanbi',this.yincang)
        },
        xuanzedaole (id) {
            this.id = id
            this.$emit('Fchoose', id)
        }
    }
}
</script>

<style>
/* 商品详情CSS */
.Fxiangqing {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2000;
}
.Fxuanzechuankou {
    width: 600px;
    background-color: #fff;
    margin: 0 auto;
    max-height: 419px;
    position: relative;
    outline: 0;
    top: 10%;
    border-radius: 8px;
}
.FxzckTop {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
}
.X {
    float: right;
    padding-right: 15px;
}
.FenleiMiddle {
    width: 100%;
    height: 277px;
    min-height: 50px;
    border-bottom: 1px solid #ccc;
    overflow-y: auto;
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
.Fxzfuwenben {
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