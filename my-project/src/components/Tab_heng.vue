<template>
    <div class="tabheng">
        <!-- <div class="tabh" v-for="(items,keys) in list" :key="keys"> -->
            <!-- <input type="text" value="请输入"> -->
            <div class="itemh" v-for="(item,key) in list" :key="key">
                <img class="itemimg" :src="item.thumb" alt="">
                <span class="itemsp">{{item.name}}</span>
            </div>
        <!-- </div> -->
        <div class="clear"></div>
    </div>
</template>

<script>
import {https,GoodssCategory} from '../assets/BaseApi'

export default {
    name:'tabheng',
    data () {
        return {
            list:[
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'2',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'3',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'4',price:'999.99'},
             ],
            https:'https://www.xiaoniren.cn'
        }
    },
    mounted:function () {

    },
    methods: {

    }
}
</script>

<style>
    .tabheng {
        width: 100%;
        overflow: auto;
        background-color: #f1f1f1;
        margin: 0;
    }
    .tabheng::-webkit-scrollbar {display:none}
    clear{ clear:both} 
    .tabh {
        width: 100%;
        height: 100%;
    }
    .itemh {
        width: 50%;
        height: 75px;
        line-height: 75px;
        background-color: #fff;
        border-radius: 5px;
        padding: 2px 4px;
        box-sizing: border-box;
        float: left;
    }
    .itemimg {
        width: 50%;
        height: 100%;
        background-size: 100%;
        float: left;
    }
    .itemsp {
        font-size: 12px;
        width: 45%;
        height: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        float: right;
    }
</style>
