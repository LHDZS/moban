<template>
    <div class="module">
        <div class="zimokua" v-for="(item,key) in list" :key="key">
            <img class="moimg" :src="http + item.thumb" alt="">
            <div class="mobuttom">
                <div class="mbtop">{{item.name}}</div>
                <div class="mbleft">
                    <span class="price">￥{{item.price}}</span>
                    <!-- <span class="prices">￥{{item.market_price}}</span> -->
                </div>
                <div class="mbright">立即购买</div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import {http,Goodss,GoodssCategory} from '../assets/BaseApi'

export default {
  name:'module',
  data () {
      return {
          list:[
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'2',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'3',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'4',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'5',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'6',price:'999.99'},
             ],
          http:''
      }
  },
  mounted:function () {
      
  },
  methods:{
           
  }
}
</script>

<style>
    .clear{ clear:both}
    .module {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-top: 3px;
        box-sizing: border-box;
    }
    .module::-webkit-scrollbar {display:none}
    .zimokua {
        width: 47.54%;
        height: 200px;
        margin: 2px 3px;
        float: left;
        /* border: 1px solid #999; */
    }
    .moimg {
        width: 100%;
        height: 70%;
    }
    .mobuttom {
        width: 100%;
        height: 27%;
        box-shadow: 0px 1px 2px #888888;
        position: relative;
    }
    .mbtop {
        font-size: 14px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .mbleft {
        position: absolute;
        bottom: 7px;
        left: 5px;
        font-size: 12px;
    }
    .mbright {
        position: absolute;
        padding: 3px 5px;
        bottom: 6px;
        right: 5px;
        border-radius: 5px;
        font-size: 10px;
        background-color: red;
        color: #fff; 
    }
    .price {
        color: red;
    }
    .prices {
        text-decoration:line-through;
    }
</style>
