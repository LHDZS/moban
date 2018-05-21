<template>
    <div class="tabshu">
        <ul class='tabul'>
            <li class="tabli" :class="ky == key ? 'bor' : ''" @click="xuanzhong(item.id,key)" v-for="(item,key) in list" :key='key'>{{item.name}}</li>
        </ul>
        <div class="Cblock">
            <div class="itemz" v-for="(value,index) in items" :key='index' v-if="id == value.id">
                <img class="Cblock_img" :src="value.thumb" alt="">
                <span class="Cblock_span">{{value.name}}</span>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>


<script>
import {https,GoodssCategory} from '../assets/BaseApi'

export default {
  name:'tabshu',
  data() {
     return {
         list:[{name:'分类1',id:1},{name:'分类2',id:2},{name:'分类3',id:3},{name:'分类4',id:4}],
         items:[
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'2',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'3',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'4',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'5',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'6',price:'999.99'},
             ],
         ky: 0,
         id: 1,
         https:'https://www.xiaoniren.cn'
     }
  },
  mounted:function () {
      
  },
  methods: {
      xuanzhong(id,key) {
          this.ky = key
          this.id = id
      },
  }
}
</script>


<style>
    .tabshu{
        width: 100%;
        position: relative;
    }
    .clear{ clear:both} 
    .tabul {
        width: 20%;
        float: left;
        list-style:none;
        padding: 0;
        margin: 0;
    }
    .tabli {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        cursor:default;
        box-sizing:border-box;
    }
    .bor {
        border: 1px solid #e0e0e0;
        border-left: 1px solid red;
        background-color: #fff;
    }
    .Cblock {
        width: 77%;
        height: 100%;
        float: right;
        padding-top: 5px;
        margin-left: 6px; 
        box-sizing: border-box;
        overflow: auto;
    }
    .itemz {
        float: left;
        width: 31%;
        height: 100px;
        text-align: center;
        background-color: #fff;
        margin: 2px;
        box-sizing: border-box;
    }
    .Cblock_img {
        width: 100%;
        height: 70%;
        background-image: url('../assets/logo.png');
        background-size: 100%;
        float: left;
    }
    .Cblock_span {
        width: 100%;
        height: 30px;
        font-size: 12px;
        text-align: left;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>
