<template>
    <div class="modulethree">
        <div class="todiv">
            <ul class='todul'>
                <li class="todli" :class="ky == key ? 'tor' : ''" @click="xuanzhong(item.id,key)" v-for="(item,key) in lists" :key='key'>{{item.name}}</li>
            </ul>
        </div>
        <div class="Tblock" v-for="(value,index) in items" :key='index' v-if="id == value.id">
            <!-- <div class="titem" v-for="(val,ind) in value" :key='ind'> -->
                <img class="timg" :src="value.thumb" alt="">
                <div class="tright">
                    <div class="t_names">{{value.name}}</div>
                    <div class="t_price">￥{{value.price}}</div>
                    <!-- <div class="t_div"><span class="t_goumai">立即购买</span></div> -->
                </div>
            <!-- </div> -->
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import {http,Goodss,GoodssCategory} from '../assets/BaseApi'

export default {
  name:'modulethree',
  data() {
     return {
         lists:[
             {name:'分类1',id:'1'},
             {name:'分类2',id:'2'},
             {name:'分类3',id:'3'},
             {name:'分类4',id:'4'},
             {name:'分类5',id:'5'},
             {name:'分类6',id:'6'},
             {name:'分类7',id:'7'},
         ],
         items:[
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'1',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'2',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'3',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'4',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'5',price:'999.99'},
             {name:'此处是商品名称',thumb:'http://www1.xiaoniren.cn/upload/attachment/5/130/201805/15253158643349.jpg',id:'4',price:'999.99'},
             ],
         ky: 0,
         id: 1,
         http:'http://www1.xiaoniren.cn'
     }
  },
  mounted:function () {
    //   this.ajax()
    //   this.shangpin()
  },
  methods: {
      xuanzhong(id,key) {
          this.ky = key;
          this.id = id
      },
    //   ajax() {
    //     var _this = this
    //     this.lists = []
    //     this.$ajax.get(GoodssCategory, {
    //         params: {
    //         merchant_id : 130,
    //         type : 0,
    //         }
    //     })
    //     .then(function (res) {
    //         var dait = res.data.data.items
    //         for (var k in dait) {
    //             if (dait[k].level == 1) {
    //                 _this.lists.push(dait[k])
    //             }
    //         }
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });
    //   },
    // shangpin () {
    //         var _this = this
    //         this.$ajax.get(Goodss, {
    //             params: {
    //             merchant_id : 130,
    //             page : 1,
    //             per_page : 100
    //             }
    //         })
    //         .then(function (res) {
    //             _this.items = res.data.data.items
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });
    // }
  }
}
</script>


<style>
    .todiv::-webkit-scrollbar{
        width: 0;
        display: none;
    }
    .modulethree{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: auto;
    }
    .clear{ clear:both} 
    .todiv {
        width: 100%;
        height: 30px;
        overflow-y: auto;
    }
    .todul {
        width: 100%;
        height: 30px;
        list-style:none;
        padding: 0;
        margin: 0;
        display: inline;
        white-space: nowrap;
        float:left;
        text-align: left;
        /* display: flex; */
    }
    .todli {
        /* flex: 1; */
        display: inline-block;
        width: 55px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 13px;
        cursor:pointer;
        box-sizing:border-box;
    }
    .tor {
        color: red;
        border-bottom: 1px solid red;
        background-color: #fff;
    }
    .Tblock {
        width: 100%;
        height: 90px;
        background-color: #fff;
        float: right;
        padding: 10px 5px;
        box-sizing: border-box;
    }
    .titem {
        float: left;
        width: 98%;
        height: 72px;
        margin: 2px;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
    }
    .timg {
        width: 26%;
        height: 68px;
        line-height: 68px;
        float: left;
    }
    .tright {
        width: 62%;
        height: 107%;
        float: right;
        position: relative;
        margin: 3px;
        border-bottom: 1px dashed #ccc;
    }
    .t_names {
        width: 97%;
        font-size: 13px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
    }
    .t_price {
        height: 20px;
        line-height: 20px;
        position: absolute;
        left: 0px;
        bottom: 10px;
        font-size: 16px;
        color: #ac0000;
        text-align: left;
    }
    .t_goumai {
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        padding: 5px 17px;
        background-color: red;
        color: #fff;
        border-radius: 20px;
    }
    .t_div {
        text-align: left;
    }
</style>
