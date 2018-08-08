<template>
    <div class="Dxiangqing" v-if="Yyincang">
        <div class="Dxuanzechuankou">
            <div class="xzckTop">
                <el-button class="X" type="text" @click="guanbi"><i class="el-icon-error col"></i></el-button>
                <div class="xzfuwenben">营销活动</div>
                <div style="width: 10px; display: inline-block;"></div>
            </div>
            <!-- 中间部分 -->
            <div class="DxzckMiddle">
                <div class="xzPrice">
                    <div class="dyimg">图片</div>
                    <div class="dyname">名称</div>
                </div>
                <div class="xzMdiv" v-for="(item,index) in items" :key="index">
                    <img class="dyMimg" :src="item.icon" alt="">
                    <span class="yxMspan">{{item.title}}</span>
                    <div class="yxMxuanze" @click="xuanzedaole(item.id)">
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
import {http,WechatPage} from '../../assets/BaseApi'

export default {
    name:'Dxiangqing',
    props: {
        Yyincang:Boolean
    },
    data () {
        return {
            items:[
                {title:'拼团', id:1,icon:'http://www.xiaoniren.cn/upload/attachment/5/130/201807/15325018642349.jpg'},
                {title:'秒杀', id:2,icon:'http://www.xiaoniren.cn/upload/attachment/5/130/201807/15325018396747.jpg'},
            ],
            // 分页页数记录
            currentPage4: 1,
            // 总页
            Totalpages:1,
            // 分类
            options :[],
            id:null,
            value: '',
            http: ''
        }
    },
    methods: {
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
            this.$emit('Yxqguanbi',this.Dyincang)
        },
        xuanzedaole (id) {
            this.id = id
            this.$emit('Ychoose', id)
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
.Dxuanzechuankou {
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
.yxMspan {
    display: inline-block;
    width: 40%;
    height: 70%;
    margin: 9px 20px;
    line-height: 40px;
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
.yxMxuanze {
    display: inline-block;
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    font-size: 12px;
    cursor: pointer;
}
</style>