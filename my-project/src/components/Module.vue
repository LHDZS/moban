<template>
    <div class="module">
        <div class="zimokua" v-for="(item,key) in list" :key="key">
            <img class="moimg" :src="http + item.thumb" alt="">
            <div class="mobuttom">
                <div class="mbtop">{{item.name}}</div>
                <div class="mbleft">
                    <span class="price">￥{{item.price}}</span>
                    <span class="prices">￥{{item.market_price}}</span>
                </div>
                <div class="mbright">立即购买</div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
  name:'module',
  data () {
      return {
          list:[
              {name:'苹果',img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4036913110,470345339&fm=27&gp=0.jpg',
              price:'15',prices:'20',goumai:'立即购买'},
              {name:'苹果',img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4036913110,470345339&fm=27&gp=0.jpg',
              price:'15',prices:'20',goumai:'立即购买'},
              {name:'苹果',img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4036913110,470345339&fm=27&gp=0.jpg',
              price:'15',prices:'20',goumai:'立即购买'},
              {name:'苹果',img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4036913110,470345339&fm=27&gp=0.jpg',
              price:'15',prices:'20',goumai:'立即购买'}
          ],
          http: 'https://www.xiaoniren.cn'
      }
  },
  mounted:function () {
      this.ajax()
  },
  methods:{
        ajax (style) {
            var _this = this
            this.$ajax.get(this.http + '/restapi/goods', {
                params: {
                merchant_id : 130,
                page : 1,
                per_page : 100
                }
            })
            .then(function (res) {
                _this.list = res.data.data.items
            })
            .catch(function (err) {
                console.log(err);
            });
        }         
  }
}
</script>

<style>
    .clear{ clear:both}
    .module {
        width: 100%;
        height: 500px;
        overflow: auto;
        margin: 0px 2px;
        padding-top: 3px; 
    }
    .zimokua {
        width: 47%;
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
