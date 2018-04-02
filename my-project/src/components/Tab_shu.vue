<template>
    <div class="tabshu">
        <ul class='tabul'>
            <li class="tabli" :class="ky == key ? 'bor' : ''" @click="xuanzhong(item.id,key)" v-for="(item,key) in list" :key='key'>{{item.name}}</li>
        </ul>
        <div class="Cblock">
            <div class="itemz" v-for="(value,index) in items" :key='index' v-if="id == value.parent_id">
                <img class="Cblock_img" :src="http + value.icon" alt="">
                <span class="Cblock_span">{{value.name}}</span>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
  name:'tabshu',
  data() {
     return {
         list:['斗破苍穹','武动乾坤','大主宰','元尊'],
         items:[
             [{name:'萧炎'},{name:'萧薰儿'},{name:'彩鳞'},{name:'小医仙'}],
             [{name:'林动'},{name:'应欢欢'},{name:'凌青竹'},{name:'青檀'}],
             [{name:'牧尘'},{name:'洛璃'},{name:'九幽'},{name:'牧小公主'}],
             [{name:'周元'},{name:'苏幼薇'},{name:'武煌'},{name:'小兽'}]
             ],
         ky: 0,
         id: 90,
         http: 'https://www.xiaoniren.cn'
     }
  },
  mounted:function () {
      this.ajax()
  },
  methods: {
      xuanzhong(id,key) {
          this.ky = key
          this.id = id
      },
      ajax() {
        var _this = this
        this.list = []
        this.items = []
        this.$ajax.get(this.http + '/restapi/goods-category', {
            params: {
            merchant_id : 130,
            type : 0,
            }
        })
        .then(function (res) {
            var dait = res.data.data.items
            for (var k in dait) {
                if (dait[k].level == 0) {
                    _this.list.push(dait[k])
                }
                if (dait[k].level == 1) {
                    _this.items.push(dait[k])
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
      },
  }
}
</script>


<style>
    .tabshu{
        width: 100%;
        height: 500px;
        position: relative;
        background-color: #f3f3f3;
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
        border: 2px solid #e0e0e0;
        border-left: 2px solid red;
        background-color: #fff;
    }
    .Cblock {
        width: 78%;
        height: 100%;
        float: right;
        padding-top: 5px;
        margin-left: 6px; 
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
        height: 80%;
        background-image: url('../assets/logo.png');
        background-size: 100%;
        float: left;
    }
    .Cblock_span {
        width: 100%;
        height: 20%;
        font-size: 14px;
    }
</style>
