<template>
    <div class="modulethree">
        <div class="todiv">
            <ul class='todul'>
                <li class="todli" :class="ky == key ? 'tor' : ''" @click="xuanzhong(item.id,key)" v-for="(item,key) in lists" :key='key'>{{item.name}}</li>
            </ul>
        </div>
        <div class="Tblock" v-for="(value,index) in items" :key='index' v-if="id == value.category_id">
            <!-- <div class="titem" v-for="(val,ind) in value" :key='ind'> -->
                <img class="timg" :src="http + value.thumb" alt="">
                <div class="tright">
                    <div class="t_names">{{value.name}}</div>
                    <div class="t_price">￥{{value.price}}</div>
                    <div class="t_div"><span class="t_goumai">立即购买</span></div>
                </div>
            <!-- </div> -->
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
  name:'modulethree',
  data() {
     return {
         lists:['斗破苍穹','武动乾坤','大主宰','元尊','哈哈','嘿嘿','呵呵'],
         items:[
             [{name:'萧炎我可去你妈的吧啊这样对你有什么好处，楚天歌叶枫林雪一起玩啊'},{name:'萧薰儿'},{name:'彩鳞'},{name:'小医仙'}],
             [{name:'林动'},{name:'应欢欢'},{name:'凌青竹'},{name:'青檀'}],
             [{name:'牧尘'},{name:'洛璃'},{name:'九幽'},{name:'牧小公主'}],
             [{name:'周元'},{name:'苏幼薇'},{name:'夭夭'},{name:'吞吞'}]
             ],
         ky: 0,
         id: 21,
         http: 'https://www.xiaoniren.cn'
     }
  },
  mounted:function () {
      this.ajax()
      this.shangpin()
  },
  methods: {
      xuanzhong(id,key) {
          this.ky = key;
          this.id = id
      },
      ajax() {
        var _this = this
        this.lists = []
        this.$ajax.get(this.http + '/restapi/goods-category', {
            params: {
            merchant_id : 130,
            type : 0,
            }
        })
        .then(function (res) {
            var dait = res.data.data.items
            for (var k in dait) {
                if (dait[k].level == 1) {
                    _this.lists.push(dait[k])
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
      },
      shangpin () {
            var _this = this
            this.$ajax.get(this.http + '/restapi/goods', {
                params: {
                merchant_id : 130,
                page : 1,
                per_page : 100
                }
            })
            .then(function (res) {
                _this.items = res.data.data.items
            })
            .catch(function (err) {
                console.log(err);
            });
        }
  }
}
</script>


<style>
    ::-webkit-scrollbar{
        width: 0;
        display: none;
    }
    .modulethree{
        width: 100%;
        height: 500px;
        position: relative;
        overflow: auto;
    }
    .clear{ clear:both} 
    .todiv {
        width: 100%;
        height: 40px;
        overflow: auto;
    }
    .todul {
        width: 100%;
        height: 40px;
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
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        cursor:pointer;
        box-sizing:border-box;
    }
    .tor {
        color: red;
        border-bottom: 2px solid red;
        background-color: #fff;
    }
    .Tblock {
        width: 98%;
        height: 90px;
        background-color: #fff;
        float: right;
        padding-top: 5px;
        padding-left: 6px; 
    }
    .titem {
        float: left;
        width: 98%;
        height: 90px;
        /* line-height: 80px; */
        margin: 2px;
        box-sizing: border-box;
        border-bottom: 1px solid #f1f1f1;
    }
    .timg {
        width: 35%;
        height: 100%;
        background-color: blueviolet;
        float: left;
    }
    .tright {
        width: 62%;
        height: 100%;
        float: right;
        position: relative;
        margin: 3px;
    }
    .t_names {
        width: 97%;
        font-size: 12px;
        margin: 3px;
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
        margin-top: 4px;
        margin-bottom: 2px;
        font-size: 12px;
        color: #f3b60c;
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
